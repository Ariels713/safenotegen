'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { SafeFormState, SafeType, CompanyInfo, InvestorInfo } from '@/types/safeForm'

interface SafeFormContextType {
	state: SafeFormState
	updateStep: (step: number) => void
	updateDisclaimer: (accepted: boolean) => void
	updateSafeType: (type: SafeType) => void
	updateValuationCap: (amount: number) => void
	updateDiscount: (amount: number) => void
	updateProRataLetter: (include: boolean) => void
	updateCompanyInfo: (info: Partial<CompanyInfo>) => void
	updateInvestorInfo: (info: Partial<InvestorInfo>) => void
}

const initialState: SafeFormState = {
	currentStep: 1,
	disclaimerAccepted: false,
	safeType: null,
	companyInfo: {},
	investorInfo: {}
}

type Action =
	| { type: 'UPDATE_STEP'; payload: number }
	| { type: 'UPDATE_DISCLAIMER'; payload: boolean }
	| { type: 'UPDATE_SAFE_TYPE'; payload: SafeType }
	| { type: 'UPDATE_VALUATION_CAP'; payload: number }
	| { type: 'UPDATE_DISCOUNT'; payload: number }
	| { type: 'UPDATE_PRO_RATA_LETTER'; payload: boolean }
	| { type: 'UPDATE_COMPANY_INFO'; payload: Partial<CompanyInfo> }
	| { type: 'UPDATE_INVESTOR_INFO'; payload: Partial<InvestorInfo> }

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
			return { ...state, includeProRataLetter: action.payload }
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

	const updateValuationCap = (amount: number) => {
		dispatch({ type: 'UPDATE_VALUATION_CAP', payload: amount })
	}

	const updateDiscount = (amount: number) => {
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
				updateInvestorInfo
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