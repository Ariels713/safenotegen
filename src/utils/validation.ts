import { SafeFormState, SafeType } from '@/types/safeForm'

const COMMON_FIELDS = {
	company: [
		{ id: 'company-name', type: 'text', required: true },
		{ id: 'state-incorporation', type: 'select', required: true, default: 'Delaware' },
		{ id: 'state-governance', type: 'select', required: true, default: 'Delaware' },
		{ id: 'company-address', type: 'text', required: true },
		{ id: 'signatory-name', type: 'text', required: true },
		{ id: 'signatory-title', type: 'text', required: true },
		{ id: 'signatory-email', type: 'email', required: true }
	],
	investor: [
		{ id: 'investor-name', type: 'text', required: true },
		{ id: 'investor-address', type: 'text', required: false },
		{ id: 'investment-amount', type: 'currency', required: true },
		{ id: 'investment-date', type: 'date', required: true },
		{ id: 'entity-type', type: 'select', required: true },
		{ id: 'entity-signatory-name', type: 'text', required: false, dependsOn: 'entity-type' },
		{ id: 'entity-signatory-title', type: 'text', required: false, dependsOn: 'entity-type' },
		{ id: 'entity-signatory-email', type: 'email', required: false, dependsOn: 'entity-type' },
		{ id: 'invest-by-lines', type: 'text', required: false }
	]
}

interface SafeTypeConfig {
	safeType: {
		id: string
		type: string
		required: boolean
	}[]
}

const SAFE_TYPES: Record<SafeType, SafeTypeConfig> = {
	'postMoneyValuationCap': {
		safeType: [
			{ id: 'valuation-cap-input', type: 'currency', required: true },
			{ id: 'pro-rata-select', type: 'select', required: true }
		]
	},
	'postMoneyDiscount': {
		safeType: [
			{ id: 'discount-input', type: 'percentage', required: true },
			{ id: 'pro-rata-select', type: 'select', required: true }
		]
	},
	'postMoneyMfn': {
		safeType: [
			{ id: 'pro-rata-select', type: 'select', required: true }
		]
	},
	'preMoneyValuationCap': {
		safeType: [
			{ id: 'valuation-cap-input', type: 'currency', required: true }
		]
	},
	'preMoneyDiscount': {
		safeType: [
			{ id: 'discount-input', type: 'percentage', required: true }
		]
	},
	'preMoneyValuationCapAndDiscount': {
		safeType: [
			{ id: 'valuation-cap-input', type: 'currency', required: true },
			{ id: 'discount-input', type: 'percentage', required: true }
		]
	},
	'preMoneyMfn': {
		safeType: []
	},
	'proRata': {
		safeType: []
	}
}

export const validateSafeTypeStep = (state: SafeFormState): boolean => {
	if (!state.safeType) return false

	const safeTypeConfig = SAFE_TYPES[state.safeType]
	if (!safeTypeConfig) return false

	// Check all required fields for the selected SAFE type
	return safeTypeConfig.safeType.every((field: { id: string; required: boolean }) => {
		if (!field.required) return true

		switch (field.id) {
			case 'valuation-cap-input':
				return !!state.valuationCap
			case 'discount-input':
				return !!state.discount
			case 'pro-rata-select':
				return !!state.proRataLetter
			default:
				return false
		}
	})
}

export const validateCompanyStep = (state: SafeFormState): boolean => {
	return COMMON_FIELDS.company.every((field) => {
		if (!field.required) return true

		switch (field.id) {
			case 'company-name':
				return !!state.companyInfo.legalName
			case 'state-incorporation':
				return !!state.companyInfo.stateOfIncorporation
			case 'state-governance':
				return !!state.companyInfo.stateOfGovernance
			case 'company-address':
				return !!state.companyInfo.companyAddress
			case 'signatory-name':
				return !!state.companyInfo.authorizedSignatoryName
			case 'signatory-title':
				return !!state.companyInfo.authorizedSignatoryTitle
			case 'signatory-email':
				return !!state.companyInfo.authorizedSignatoryEmail
			default:
				return false
		}
	})
}

export const validateInvestorStep = (state: SafeFormState): boolean => {
	return COMMON_FIELDS.investor.every((field) => {
		if (!field.required) return true

		// Check if field depends on entity type
		if (field.dependsOn === 'entity-type') {
			// Only validate these fields if entity type is not Individual
			if (state.investorInfo.entityType === 'Individual') {
				return true
			}
		}

		switch (field.id) {
			case 'investor-name':
				return !!state.investorInfo.investorLegalName
			case 'investment-amount':
				return !!state.investorInfo.investmentAmount
			case 'investment-date':
				return !!state.investorInfo.investDate
			case 'entity-type':
				return !!state.investorInfo.entityType
			case 'entity-signatory-name':
				return state.investorInfo.entityType === 'Individual' ||
					!!state.investorInfo.authorizedSignatoryName
			case 'entity-signatory-title':
				return state.investorInfo.entityType === 'Individual' ||
					!!state.investorInfo.authorizedSignatoryTitle
			case 'entity-signatory-email':
				return state.investorInfo.entityType === 'Individual' ||
					!!state.investorInfo.authorizedSignatoryEmail
			default:
				return false
		}
	})
} 