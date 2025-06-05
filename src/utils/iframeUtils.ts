import { useEffect } from 'react'

// Debounce function to prevent too frequent updates
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Function to send height to parent window
export const sendHeightToParent = () => {
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
export const useIframeResize = () => {
  useEffect(() => {
    let lastHeight = 0

    // Function to check if height has actually changed
    const checkAndSendHeight = () => {
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
    const handleResize = () => {
      checkAndSendHeight()
    }
    window.addEventListener('resize', handleResize)

    // Listen for messages from parent
    const handleMessage = (event: MessageEvent) => {
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
    }
  }, [])
} 