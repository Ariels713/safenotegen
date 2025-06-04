import { NextResponse } from 'next/server'
import { SafeFormState } from '@/types/safeForm'

export async function POST(request: Request) {
	try {
		const formData: SafeFormState = await request.json()
		const SLACK_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

		if (!SLACK_WEBHOOK_URL) {
			return NextResponse.json(
				{ error: 'Slack webhook URL is not configured' },
				{ status: 500 }
			)
		}

		const formatCurrency = (amount: number | undefined) => {
			if (!amount) return 'N/A'
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(amount)
		}

		const formatDate = (date: string | undefined) => {
			if (!date) return 'N/A'
			return new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		}

		const message = {
			blocks: [
				{
					type: 'header',
					text: {
						type: 'plain_text',
						text: 'New SAFE Form Submission',
						emoji: true
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '*SAFE Type*\n' +
							`*Type:* ${formData.safeType || 'N/A'}\n` +
							(formData.valuationCap ? `*Valuation Cap:* ${formatCurrency(formData.valuationCap)}\n` : '') +
							(formData.discount ? `*Discount:* ${formData.discount}%\n` : '') +
							(formData.proRataLetter ? '*Pro Rata Letter:* Included\n' : '')
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '*Company Information*\n' +
							`*Legal Name:* ${formData.companyInfo.legalName || 'N/A'}\n` +
							`*State of Incorporation:* ${formData.companyInfo.stateOfIncorporation || 'N/A'}\n` +
							`*State of Governance:* ${formData.companyInfo.stateOfGovernance || 'N/A'}\n` +
							`*Company Address:* ${formData.companyInfo.companyAddress || 'N/A'}\n` +
							`*Authorized Signatory Name:* ${formData.companyInfo.authorizedSignatoryName || 'N/A'}\n` +
							`*Authorized Signatory Title:* ${formData.companyInfo.authorizedSignatoryTitle || 'N/A'}\n` +
							`*Authorized Signatory Email:* ${formData.companyInfo.authorizedSignatoryEmail || 'N/A'}`
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '*Investor Information*\n' +
							`*Entity Type:* ${formData.investorInfo.entityType || 'N/A'}\n` +
							`*Investor Legal Name:* ${formData.investorInfo.investorLegalName || 'N/A'}\n` +
							`*Investment Amount:* ${formatCurrency(formData.investorInfo.investmentAmount)}\n` +
							`*Investment Date:* ${formatDate(formData.investorInfo.investDate)}\n` +
							(formData.investorInfo.investorAddress ? `*Investor Address:* ${formData.investorInfo.investorAddress}\n` : '') +
							(formData.investorInfo.entityType !== 'Individual' ? 
								`*Entity Signatory Name:* ${formData.investorInfo.authorizedSignatoryName || 'N/A'}\n` +
								`*Entity Signatory Title:* ${formData.investorInfo.authorizedSignatoryTitle || 'N/A'}\n` +
								`*Entity Signatory Email:* ${formData.investorInfo.authorizedSignatoryEmail || 'N/A'}\n` : '') +
							(formData.investorInfo.additionalBylines ? `*Additional Bylines:* ${formData.investorInfo.additionalBylines}` : '')
					}
				}
			]
		}

		const response = await fetch(SLACK_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Error sending message to Slack:', error)
		return NextResponse.json(
			{ error: 'Failed to send message to Slack' },
			{ status: 500 }
		)
	}
} 