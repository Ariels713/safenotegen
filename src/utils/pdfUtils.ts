import { SafeFormState } from '@/types/safeForm'
import { pdf } from '@react-pdf/renderer'
import { DocumentProps } from '@react-pdf/renderer'
import { getSafeTemplate } from '@/components/PDFTemplates/SafeTemplateSelector'
import { ReactElement } from 'react'
import ProRataLetter from '@/components/PDFTemplates/ProRataLetter'
import './fonts' // Import font registration

export async function generateSafePDF(state: SafeFormState): Promise<Uint8Array> {
	const template = getSafeTemplate(state) as ReactElement<DocumentProps>
	const blob = await pdf(template).toBlob()
	const arrayBuffer = await blob.arrayBuffer()
	return new Uint8Array(arrayBuffer)
}

export async function generateProRataLetterPDF(state: SafeFormState): Promise<Uint8Array> {
	const template = ProRataLetter({ state }) as ReactElement<DocumentProps>
	const blob = await pdf(template).toBlob()
	const arrayBuffer = await blob.arrayBuffer()
	return new Uint8Array(arrayBuffer)
}

export async function downloadSafePDF(state: SafeFormState): Promise<void> {
	const pdfBytes = await generateSafePDF(state)
	const blob = new Blob([pdfBytes], { type: 'application/pdf' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = `${state.companyInfo.legalName || 'Company'}_SAFE_${state.investorInfo.investorLegalName || 'Investor'}.pdf`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

export async function downloadProRataLetterPDF(state: SafeFormState): Promise<void> {
	const pdfBytes = await generateProRataLetterPDF(state)
	const blob = new Blob([pdfBytes], { type: 'application/pdf' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = `${state.companyInfo.legalName || 'Company'}_ProRata_${state.investorInfo.investorLegalName || 'Investor'}.pdf`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
} 