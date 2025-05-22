'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { FORM_STEPS } from '@/types/safeForm'
import styles from './SafeForm.module.css'
import IntroductionStep from './steps/IntroductionStep'
import SafeTypeStep from './steps/SafeTypeStep'
import CompanyStep from './steps/CompanyStep'
import InvestorStep from './steps/InvestorStep'
import ReviewStep from './steps/ReviewStep'

export default function SafeForm() {
	const { state, updateStep } = useSafeForm()

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
			<nav className={styles.navigation}>
				{FORM_STEPS.map((step) => (
					<button
						key={step.id}
						className={`${styles.navItem} ${
							state.currentStep === step.id ? styles.active : ''
						} ${step.id > state.currentStep ? styles.disabled : ''}`}
						onClick={() => {
							if (step.id <= state.currentStep) {
								updateStep(step.id)
							}
						}}
						disabled={step.id > state.currentStep}
					>
						{step.title}
					</button>
				))}
			</nav>
			<div className={`${styles.formStep} ${styles.active}`}>
				{renderStep()}
			</div>
		</div>
	)
} 