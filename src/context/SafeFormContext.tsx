'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { SafeFormState, SafeType, CompanyInfo, InvestorInfo } from '@/types/safeForm'

interface SafeFormContextType {
	state: SafeFormState
	updateStep: (step: number) => void
	updateDisclaimer: (accepted: boolean) => void
	updateSafeType: (type: SafeType) => void
	updateValuationCap: (amount: number | undefined) => void
	updateDiscount: (amount: number | undefined) => void
	updateProRataLetter: (include: boolean) => void
	updateCompanyInfo: (info: Partial<CompanyInfo>) => void
	updateInvestorInfo: (info: Partial<InvestorInfo>) => void
	updateSlackNotified: (notified: boolean) => void
}

const initialState: SafeFormState = {
	currentStep: 1,
	disclaimerAccepted: false,
	safeType: null,
	proRataLetter: 'yes',
	companyInfo: {},
	investorInfo: {},
	slackNotified: false
}

type Action =
	| { type: 'UPDATE_STEP'; payload: number }
	| { type: 'UPDATE_DISCLAIMER'; payload: boolean }
	| { type: 'UPDATE_SAFE_TYPE'; payload: SafeType }
	| { type: 'UPDATE_VALUATION_CAP'; payload: number | undefined }
	| { type: 'UPDATE_DISCOUNT'; payload: number | undefined }
	| { type: 'UPDATE_PRO_RATA_LETTER'; payload: boolean }
	| { type: 'UPDATE_COMPANY_INFO'; payload: Partial<CompanyInfo> }
	| { type: 'UPDATE_INVESTOR_INFO'; payload: Partial<InvestorInfo> }
	| { type: 'UPDATE_SLACK_NOTIFIED'; payload: boolean }

const SafeFormContext = createContext<SafeFormContextType | undefined>(undefined)

function safeFormReducer(state: SafeFormState, action: Action): SafeFormState {
	switch (action.type) {
		case 'UPDATE_STEP':
			return { ...state, currentStep: action.payload }
		case 'UPDATE_DISCLAIMER':
			return { ...state, disclaimerAccepted: action.payload }
		case 'UPDATE_SAFE_TYPE':
			return { ...state, safeType: action.payload }
		case 'UPDATE_VALUATION_CAP':
			return { ...state, valuationCap: action.payload }
		case 'UPDATE_DISCOUNT':
			return { ...state, discount: action.payload }
		case 'UPDATE_PRO_RATA_LETTER':
			return { ...state, proRataLetter: action.payload ? 'yes' : 'none' }
		case 'UPDATE_COMPANY_INFO':
			return {
				...state,
				companyInfo: { ...state.companyInfo, ...action.payload }
			}
		case 'UPDATE_INVESTOR_INFO':
			return {
				...state,
				investorInfo: { ...state.investorInfo, ...action.payload }
			}
		case 'UPDATE_SLACK_NOTIFIED':
			return { ...state, slackNotified: action.payload }
		default:
			return state
	}
}

export function SafeFormProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(safeFormReducer, initialState)

	const updateStep = (step: number) => {
		dispatch({ type: 'UPDATE_STEP', payload: step })
	}

	const updateDisclaimer = (accepted: boolean) => {
		dispatch({ type: 'UPDATE_DISCLAIMER', payload: accepted })
	}

	const updateSafeType = (type: SafeType) => {
		dispatch({ type: 'UPDATE_SAFE_TYPE', payload: type })
	}

	const updateValuationCap = (amount: number | undefined) => {
		dispatch({ type: 'UPDATE_VALUATION_CAP', payload: amount })
	}

	const updateDiscount = (amount: number | undefined) => {
		dispatch({ type: 'UPDATE_DISCOUNT', payload: amount })
	}

	const updateProRataLetter = (include: boolean) => {
		dispatch({ type: 'UPDATE_PRO_RATA_LETTER', payload: include })
	}

	const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
		dispatch({ type: 'UPDATE_COMPANY_INFO', payload: info })
	}

	const updateInvestorInfo = (info: Partial<InvestorInfo>) => {
		dispatch({ type: 'UPDATE_INVESTOR_INFO', payload: info })
	}

	const updateSlackNotified = (notified: boolean) => {
		dispatch({ type: 'UPDATE_SLACK_NOTIFIED', payload: notified })
	}

	return (
		<SafeFormContext.Provider
			value={{
				state,
				updateStep,
				updateDisclaimer,
				updateSafeType,
				updateValuationCap,
				updateDiscount,
				updateProRataLetter,
				updateCompanyInfo,
				updateInvestorInfo,
				updateSlackNotified
			}}
		>
			{children}
		</SafeFormContext.Provider>
	)
}

export function useSafeForm() {
	const context = useContext(SafeFormContext)
	if (context === undefined) {
		throw new Error('useSafeForm must be used within a SafeFormProvider')
	}
	return context
} 