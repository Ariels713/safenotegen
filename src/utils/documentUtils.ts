import { SafeFormState, SafeFormData } from '@/types/safeForm'
import { Paragraph, TextRun, AlignmentType } from 'docx'
import { DocumentTemplate } from '@/templates/safe/types'

interface DownloadOptions {
	showSafeDownload: boolean
	showProRataDownload: boolean
}

export const transformStateToFormData = (state: SafeFormState): SafeFormData => {
	if (!state.safeType || !state.companyInfo.legalName || !state.investorInfo.investorLegalName) {
		throw new Error('Required fields are missing')
	}

	return {
		safeType: state.safeType,
		companyName: state.companyInfo.legalName,
		stateIncorporation: state.companyInfo.stateOfIncorporation || 'Delaware',
		investorName: state.investorInfo.investorLegalName,
		dateOfSafe: state.investorInfo.investDate || new Date().toISOString().split('T')[0],
		investmentAmount: state.investorInfo.investmentAmount || 0,
		valuationCap: state.valuationCap,
		discountRate: state.discount,
		stateGovernance: state.companyInfo.stateOfGovernance || 'Delaware',
		companyAddress: state.companyInfo.companyAddress || '',
		signatoryName: state.companyInfo.authorizedSignatoryName || '',
		signatoryTitle: state.companyInfo.authorizedSignatoryTitle || '',
		signatoryEmail: state.companyInfo.authorizedSignatoryEmail || '',
		investorAddress: state.investorInfo.investorAddress || '',
		entitySignatoryName: state.investorInfo.authorizedSignatoryName || '',
		entitySignatoryTitle: state.investorInfo.authorizedSignatoryTitle || '',
		entitySignatoryEmail: state.investorInfo.authorizedSignatoryEmail || ''
	}
}

export const getDownloadOptions = (state: SafeFormState): DownloadOptions => {
	const isPostMoney = Boolean(state.safeType?.includes('Post-Money'))
	const hasProRataLetter = state.proRataLetter === 'yes'

	return {
		showSafeDownload: true, // Always show SAFE download
		showProRataDownload: isPostMoney && hasProRataLetter
	}
}

export const getSafeDocumentName = (state: SafeFormState): string => {
	if (!state.safeType) return 'SAFE Agreement'
	
	const companyName = state.companyInfo.legalName || 'Company'
	const investorName = state.investorInfo.investorLegalName || 'Investor'
	const date = state.investorInfo.investDate 
		? new Date(state.investorInfo.investDate).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0]

	return `${companyName}_${investorName}_SAFE_${date}.docx`
}

export const getProRataDocumentName = (state: SafeFormState): string => {
	if (state.proRataLetter !== 'yes') return ''

	const companyName = state.companyInfo.legalName || 'Company'
	const investorName = state.investorInfo.investorLegalName || 'Investor'
	const date = state.investorInfo.investDate 
		? new Date(state.investorInfo.investDate).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0]

	return `${companyName}_${investorName}_ProRata_Letter_${date}.docx`
}

export function createDocumentParagraphs(template: DocumentTemplate, formData: SafeFormData): Paragraph[] {
	const paragraphs: Paragraph[] = []

	// Disclaimer
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.disclaimer,
					bold: true,
					size: 20
				})
			],
			alignment: AlignmentType.CENTER,
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	// Header
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.header
						.replace('[investorName]', formData.investorName)
						.replace('[investmentAmount]', formData.investmentAmount.toString())
						.replace('[dateOfSafe]', formData.dateOfSafe)
						.replace('[companyName]', formData.companyName)
						.replace('[stateIncorporation]', formData.stateIncorporation),
					size: 20
				})
			],
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	// Sections
	template.sections.forEach(section => {
		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: section.title,
						bold: true,
						size: 20
					})
				],
				spacing: {
					before: 200,
					after: 200
				}
			})
		)

		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: section.content,
						size: 20
					})
				],
				spacing: {
					before: 200,
					after: 200
				}
			})
		)
	})

	// Signature
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.signature.company.title,
					bold: true,
					size: 20
				})
			],
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	template.signature.company.fields.forEach(field => {
		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: field
							.replace('[companyName]', formData.companyName)
							.replace('[signatoryName]', formData.signatoryName)
							.replace('[signatoryTitle]', formData.signatoryTitle)
							.replace('[companyAddress]', formData.companyAddress)
							.replace('[signatoryEmail]', formData.signatoryEmail),
						size: 20
					})
				],
				spacing: {
					before: 200,
					after: 200
				}
			})
		)
	})

	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.signature.investor.title,
					bold: true,
					size: 20
				})
			],
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	template.signature.investor.fields.forEach(field => {
		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: field
							.replace('[entitySignatoryName]', formData.entitySignatoryName)
							.replace('[entitySignatoryTitle]', formData.entitySignatoryTitle)
							.replace('[investorAddress]', formData.investorAddress)
							.replace('[entitySignatoryEmail]', formData.entitySignatoryEmail),
						size: 20
					})
				],
				spacing: {
					before: 200,
					after: 200
				}
			})
		)
	})

	return paragraphs
} 