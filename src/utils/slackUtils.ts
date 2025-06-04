import { SafeFormState } from '@/types/safeForm'

export const sendToSlack = async (formData: SafeFormState) => {
	try {
		const response = await fetch('/api/slack', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return true
	} catch (error) {
		console.error('Error sending message to Slack:', error)
		return false
	}
} 