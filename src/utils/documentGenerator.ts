import { Document, Packer } from 'docx'
import { SafeFormState } from '@/types/safeForm'
import { getDocumentTemplate, getProRataTemplate, createDocumentParagraphs } from './documentTemplates'

export const generateSafeDocument = (state: SafeFormState): Document => {
	const template = getDocumentTemplate(state)
	const paragraphs = createDocumentParagraphs(template, state)

	const doc = new Document({
		sections: [{
			properties: {},
			children: paragraphs
		}]
	})

	return doc
}

export const generateProRataDocument = (state: SafeFormState): Document => {
	const template = getProRataTemplate()
	const paragraphs = createDocumentParagraphs(template, state)

	const doc = new Document({
		sections: [{
			properties: {},
			children: paragraphs
		}]
	})

	return doc
}

export const downloadDocument = async (doc: Document, filename: string) => {
	const blob = await Packer.toBlob(doc)
	const url = window.URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	window.URL.revokeObjectURL(url)
} 