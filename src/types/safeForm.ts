export type SafeType = 
	| 'postMoneyValuationCap'
	| 'postMoneyDiscount'
	| 'postMoneyMfn'
	| 'preMoneyValuationCap'
	| 'preMoneyDiscount'
	| 'preMoneyValuationCapAndDiscount'
	| 'preMoneyMfn'
	| 'proRata'

export type EntityType = 'Individual' | 'LLC' | 'Corporation'

export interface CompanyInfo {
	legalName: string
	stateOfIncorporation: string
	stateOfGovernance: string
	companyAddress: string
	authorizedSignatoryName: string
	authorizedSignatoryTitle: string
	authorizedSignatoryEmail: string
}

export interface InvestorInfo {
	entityType: EntityType
	investorLegalName: string
	investmentAmount: number
	investDate: string
	investorAddress?: string
	authorizedSignatoryName?: string
	authorizedSignatoryTitle?: string
	authorizedSignatoryEmail?: string
	additionalBylines?: string
	postMoneyValuationCap?: number
	companyLegalName?: string
	stateOfIncorporation?: string
}

export interface SafeFormData {
	safeType: SafeType
	companyName: string
	stateIncorporation: string
	investorName: string
	dateOfSafe: string
	investmentAmount: number
	valuationCap?: number
	discountRate?: number
	companyCapitalization?: number
	stateGovernance: string
	companyAddress: string
	signatoryName: string
	signatoryTitle: string
	signatoryEmail: string
	investorAddress: string
	entitySignatoryName: string
	entitySignatoryTitle: string
	entitySignatoryEmail: string
}

export interface SafeFormState {
	currentStep: number
	disclaimerAccepted: boolean
	safeType: SafeType | null
	valuationCap?: number
	discount?: number
	proRataLetter: string
	companyInfo: Partial<CompanyInfo>
	investorInfo: Partial<InvestorInfo>
}

export interface FormStep {
	id: number
	title: string
	description: string
	isValid: boolean
}

export const FORM_STEPS: FormStep[] = [
	{
		id: 1,
		title: 'Introduction',
		description: 'Please review and accept the disclaimer',
		isValid: false
	},
	{
		id: 2,
		title: 'SAFE Type',
		description: 'Select the type of SAFE agreement',
		isValid: false
	},
	{
		id: 3,
		title: 'Company',
		description: 'Enter company information',
		isValid: false
	},
	{
		id: 4,
		title: 'Investor',
		description: 'Enter investor information',
		isValid: false
	},
	{
		id: 5,
		title: 'Review',
		description: 'Review all information before submission',
		isValid: false
	}
] 