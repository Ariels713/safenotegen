'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { FORM_STEPS } from '@/types/safeForm'
import styles from './SafeForm.module.css'
import IntroductionStep from './steps/IntroductionStep'
import SafeTypeStep from './steps/SafeTypeStep'
import CompanyStep from './steps/CompanyStep'
import InvestorStep from './steps/InvestorStep'
import ReviewStep from './steps/ReviewStep'
import { useEffect, useRef } from 'react'

export default function SafeForm() {
	const { state, updateStep } = useSafeForm()
	const navRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const scrollToCurrentStep = () => {
			if (navRef.current) {
				const activeButton = navRef.current.querySelector(`.${styles.active}`)
				if (activeButton) {
					activeButton.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'center'
					})
				}
			}
		}

		scrollToCurrentStep()
	}, [state.currentStep])

	const isStepValid = (stepId: number) => {
		switch (stepId) {
			case 1:
				return state.disclaimerAccepted
			case 2:
				if (!state.safeType) return false

				// Check required fields based on SAFE type
				switch (state.safeType) {
					case 'postMoneyValuationCap':
						return !!state.valuationCap && state.proRataLetter !== 'none'
					case 'postMoneyDiscount':
						return !!state.discount && state.proRataLetter !== 'none'
					case 'postMoneyMfn':
						return state.proRataLetter !== 'none'
					case 'preMoneyValuationCap':
						return !!state.valuationCap
					case 'preMoneyDiscount':
						return !!state.discount
					case 'preMoneyValuationCapAndDiscount':
						return !!state.valuationCap && !!state.discount
					case 'preMoneyMfn':
						return true // No required fields for this type
					default:
						return false
				}
			case 3:
				return !!(
					state.companyInfo.legalName &&
					(state.companyInfo.stateOfIncorporation || 'Delaware') &&
					(state.companyInfo.stateOfGovernance || 'Delaware') &&
					state.companyInfo.companyAddress &&
					state.companyInfo.authorizedSignatoryName &&
					state.companyInfo.authorizedSignatoryTitle &&
					state.companyInfo.authorizedSignatoryEmail
				)
			case 4:
				return !!(
					state.investorInfo.entityType &&
					state.investorInfo.investorLegalName &&
					state.investorInfo.investmentAmount &&
					state.investorInfo.investDate &&
					(state.investorInfo.entityType === 'Individual' ||
						(state.investorInfo.authorizedSignatoryName &&
							state.investorInfo.authorizedSignatoryTitle &&
							state.investorInfo.authorizedSignatoryEmail))
				)
			case 5:
				return true // Review step is always valid
			default:
				return false
		}
	}

	const renderStep = () => {
		switch (state.currentStep) {
			case 1:
				return <IntroductionStep />
			case 2:
				return <SafeTypeStep />
			case 3:
				return <CompanyStep />
			case 4:
				return <InvestorStep />
			case 5:
				return <ReviewStep />
			default:
				return null
		}
	}

	return (
		<div className={styles.formContainer}>
			<nav ref={navRef} className={styles.navigation}>
				{FORM_STEPS.map((step) => {
					const isCurrentStep = state.currentStep === step.id
					const isPreviousStep = step.id < state.currentStep
					const isNextStep = step.id === state.currentStep + 1
					const isEnabled =
						isCurrentStep ||
						isPreviousStep ||
						(isNextStep && isStepValid(state.currentStep))
					const isValidated = isStepValid(step.id)
					const isNextEnabled = isNextStep && isStepValid(state.currentStep)

					return (
						<button
							key={step.id}
							className={`${styles.navItem} ${
								isCurrentStep ? styles.active : ''
							} ${isValidated ? styles.validated : ''} ${
								isNextEnabled ? styles.nextEnabled : ''
							} ${!isEnabled ? styles.disabled : ''}`}
							onClick={() => {
								if (isEnabled) {
									updateStep(step.id)
								}
							}}
							disabled={!isEnabled}
						>
							{step.title}
						</button>
					)
				})}
			</nav>
			<div className={`${styles.formStep} ${styles.active}`}>
				{renderStep()}
			</div>
		</div>
	)
} 