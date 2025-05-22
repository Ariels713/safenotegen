import { SafeFormState } from '@/types/safeForm'

interface DownloadOptions {
	showSafeDownload: boolean
	showProRataDownload: boolean
}

export const getDownloadOptions = (state: SafeFormState): DownloadOptions => {
	const isPostMoney = Boolean(state.safeType?.includes('Post-Money'))
	const hasProRataLetter = Boolean(state.includeProRataLetter)

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
	if (!state.includeProRataLetter) return ''

	const companyName = state.companyInfo.legalName || 'Company'
	const investorName = state.investorInfo.investorLegalName || 'Investor'
	const date = state.investorInfo.investDate 
		? new Date(state.investorInfo.investDate).toISOString().split('T')[0]
		: new Date().toISOString().split('T')[0]

	return `${companyName}_${investorName}_ProRata_Letter_${date}.docx`
} 