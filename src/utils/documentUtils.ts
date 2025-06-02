import { SafeFormState } from '@/types/safeForm'
import { generateSafeDocument, generateProRataLetter } from './document-generator'

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
	const blob = await generateSafeDocument(state)
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