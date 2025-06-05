import { useEffect } from 'react'

// Function to send height to parent window
export const sendHeightToParent = () => {
  if (typeof window !== 'undefined') {
    // Get the actual height of the content
    const height = document.documentElement.scrollHeight
    
    // Send message to parent window
    window.parent.postMessage(
      { 
        type: 'RESIZE_IFRAME',
        height: height,
        iframeId: 'dynamic-iframe' // Match the ID in Webflow
      }, 
      '*' // You can restrict this to your specific domain for security
    )
  }
}

// Custom hook to handle iframe resizing
export const useIframeResize = () => {
  useEffect(() => {
    // Initial height calculation
    sendHeightToParent()

    // Create ResizeObserver to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      sendHeightToParent()
    })

    // Observe the document body for changes
    resizeObserver.observe(document.body)

    // Also handle window resize events
    const handleResize = () => {
      sendHeightToParent()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])
} 