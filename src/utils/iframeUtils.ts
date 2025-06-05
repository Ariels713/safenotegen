import { useEffect } from 'react'

// Define types for the debounce function
type DebouncedFunction<T extends (...args: unknown[]) => unknown> = {
  (...args: Parameters<T>): void
  cancel: () => void
}

// Debounce function to prevent too frequent updates
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): DebouncedFunction<T> => {
  let timeout: NodeJS.Timeout

  const debouncedFn = (...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  debouncedFn.cancel = () => {
    clearTimeout(timeout)
  }

  return debouncedFn
}

// Function to send height to parent window
export const sendHeightToParent = (): void => {
  if (typeof window !== 'undefined') {
    // Get the actual height of the content
    const height = Math.ceil(document.documentElement.scrollHeight)
    
    // Send message to parent window
    window.parent.postMessage(
      { 
        type: 'RESIZE_IFRAME',
        height: height,
        iframeId: 'dynamic-iframe'
      }, 
      '*'
    )
  }
}

// Debounced version of sendHeightToParent
const debouncedSendHeight = debounce(sendHeightToParent, 100)

// Custom hook to handle iframe resizing
export const useIframeResize = (): void => {
  useEffect(() => {
    let lastHeight = 0

    // Function to check if height has actually changed
    const checkAndSendHeight = (): void => {
      const currentHeight = Math.ceil(document.documentElement.scrollHeight)
      if (currentHeight !== lastHeight) {
        lastHeight = currentHeight
        debouncedSendHeight()
      }
    }

    // Initial height calculation
    checkAndSendHeight()

    // Create ResizeObserver to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      checkAndSendHeight()
    })

    // Observe the document body for changes
    resizeObserver.observe(document.body)

    // Also handle window resize events
    const handleResize = (): void => {
      checkAndSendHeight()
    }
    window.addEventListener('resize', handleResize)

    // Listen for messages from parent
    const handleMessage = (event: MessageEvent): void => {
      if (event.data.type === 'REQUEST_HEIGHT') {
        checkAndSendHeight()
      }
    }
    window.addEventListener('message', handleMessage)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('message', handleMessage)
      debouncedSendHeight.cancel()
    }
  }, [])
} 