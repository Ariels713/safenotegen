import { Document, Packer, Paragraph, TextRun, AlignmentType, Header } from 'docx'
import { SafeFormData } from '@/types/safeForm'
import { postMoneyValuationCapTemplate, postMoneyDiscountTemplate, postMoneyValuationCapAndDiscountTemplate, proRataRightsTemplate } from '@/templates/safe'
import { createDocumentParagraphs } from './documentUtils'

export async function generateSafeDocument(formData: SafeFormData): Promise<Buffer> {
	const template = getTemplate(formData.safeType)
	const doc = new Document({
		sections: [{
			properties: {
				page: {
					margin: {
						top: 1440,
						right: 1440,
						bottom: 1440,
						left: 1440
					}
				}
			},
			headers: {
				default: new Header({
					children: [
						new Paragraph({
							children: [
								new TextRun({
									text: template.title,
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
					]
				})
			},
			children: createDocumentParagraphs(template, formData)
		}]
	})

	return Packer.toBuffer(doc)
}

export async function generateProRataDocument(formData: SafeFormData): Promise<Buffer> {
	const doc = new Document({
		sections: [{
			properties: {
				page: {
					margin: {
						top: 1440,
						right: 1440,
						bottom: 1440,
						left: 1440
					}
				}
			},
			headers: {
				default: new Header({
					children: [
						new Paragraph({
							children: [
								new TextRun({
									text: proRataRightsTemplate.title,
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
					]
				})
			},
			children: createDocumentParagraphs(proRataRightsTemplate, formData)
		}]
	})

	return Packer.toBuffer(doc)
}

function getTemplate(safeType: string) {
	switch (safeType) {
		case 'Post-Money SAFE - Valuation Cap Only':
			return postMoneyValuationCapTemplate
		case 'Post-Money SAFE - Discount Only':
			return postMoneyDiscountTemplate
		case 'Post-Money SAFE - Valuation Cap and Discount':
			return postMoneyValuationCapAndDiscountTemplate
		default:
			throw new Error(`Invalid SAFE type: ${safeType}`)
	}
}

export const downloadDocument = async (buffer: Buffer, filename: string) => {
	const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
	const url = window.URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	window.URL.revokeObjectURL(url)
} 