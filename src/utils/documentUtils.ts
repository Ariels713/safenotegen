import { SafeFormState } from '@/types/safeForm'
import { generateDocument, generateProRataLetter } from './document-generator'

interface DownloadOptions {
	showSafeDownload: boolean
	showProRataDownload: boolean
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

export const downloadSafeDocument = async (state: SafeFormState): Promise<void> => {
	const blob = await generateDocument(state)
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = getSafeDocumentName(state)
	document.body.appendChild(a)
	a.click()
	window.URL.revokeObjectURL(url)
	document.body.removeChild(a)
}

export const downloadProRataLetter = async (state: SafeFormState): Promise<void> => {
	const blob = await generateProRataLetter(state)
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = getProRataDocumentName(state)
	document.body.appendChild(a)
	a.click()
	window.URL.revokeObjectURL(url)
	document.body.removeChild(a)
}

export const downloadDocuments = async (state: SafeFormState, options: DownloadOptions) => {
	const documents: { blob: Blob; filename: string }[] = []

	if (options.showSafeDownload) {
		const safeBlob = await generateDocument(state)
		documents.push({
			blob: safeBlob,
			filename: `${state.companyInfo.legalName || 'Company'}_SAFE.docx`
		})
	}

	if (options.showProRataDownload) {
		const proRataBlob = await generateProRataLetter(state)
		documents.push({
			blob: proRataBlob,
			filename: `${state.companyInfo.legalName || 'Company'}_Pro_Rata_Agreement.docx`
		})
	}

	return documents
} 