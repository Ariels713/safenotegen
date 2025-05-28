import { SafeFormState, SafeFormData, SafeType } from '@/types/safeForm'
import { Paragraph, TextRun, AlignmentType } from 'docx'
import { DocumentTemplate } from '@/templates/safe/types'
import { getDocumentStyle } from './documentStyles'

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
	const isPostMoney = Boolean(state.safeType?.startsWith('postMoney'))
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
	const style = getDocumentStyle(formData.safeType)

	// Disclaimer
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.disclaimer,
					bold: style.disclaimer.bold,
					size: style.disclaimer.size
				})
			],
			alignment: style.disclaimer.alignment,
			spacing: style.disclaimer.spacing
		})
	)

	// Company Name
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.companyName.replace('[companyName]', formData.companyName),
					bold: true,
					size: style.title.size
				})
			],
			alignment: 'center',
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	// Subtitle
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.subtitle,
					bold: true,
					size: style.title.size
				})
			],
			alignment: 'center',
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	// YCombinator Note
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.ycombinatorNote,
					size: style.section.content.size
				})
			],
			spacing: {
				before: 200,
				after: 200
			}
		})
	)

	// Valuation Cap Note
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.valuationCapNote.replace('[valuationCap]', formData.valuationCap?.toString() || ''),
					size: style.section.content.size
				})
			],
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
					bold: style.header.bold,
					size: style.header.size
				})
			],
			spacing: style.header.spacing
		})
	)

	// Sections
	template.sections.forEach(section => {
		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: section.title,
						bold: style.section.title.bold,
						size: style.section.title.size
					})
				],
				spacing: style.section.title.spacing
			})
		)

		paragraphs.push(
			new Paragraph({
				children: [
					new TextRun({
						text: section.content,
						size: style.section.content.size
					})
				],
				spacing: style.section.content.spacing
			})
		)
	})

	// Witness
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.signature.witness,
					bold: true,
					size: style.signature.title.size
				})
			],
			spacing: {
				before: 400,
				after: 200
			}
		})
	)

	// Signature
	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.signature.company.title,
					bold: style.signature.title.bold,
					size: style.signature.title.size
				})
			],
			spacing: style.signature.title.spacing
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
						size: style.signature.field.size
					})
				],
				spacing: style.signature.field.spacing
			})
		)
	})

	paragraphs.push(
		new Paragraph({
			children: [
				new TextRun({
					text: template.signature.investor.title,
					bold: style.signature.title.bold,
					size: style.signature.title.size
				})
			],
			spacing: style.signature.title.spacing
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
						size: style.signature.field.size
					})
				],
				spacing: style.signature.field.spacing
			})
		)
	})

	return paragraphs
} 