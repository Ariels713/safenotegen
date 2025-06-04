'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { SafeType } from '@/types/safeForm'
import styles from '../SafeForm.module.css'
import { useState, useEffect } from 'react'

const SAFE_TYPES: SafeType[] = [
	'Post-Money SAFE - Valuation Cap Only',
	'Post-Money SAFE - Discount Only',
	'Post-Money SAFE - MFN (Most Favored Nation)',
	'Pre-Money SAFE - Valuation Cap Only',
	'Pre-Money SAFE - Discount Only',
	'Pre-Money SAFE - Valuation Cap and Discount',
	'Pre-money SAFE - MFN (Most Favored Nation)'
]

export default function SafeTypeStep() {
	const { state, updateSafeType, updateValuationCap, updateDiscount, updateStep, updateProRataLetter } =
		useSafeForm()
	const [formattedValuationCap, setFormattedValuationCap] = useState<string>('')
	const [discountError, setDiscountError] = useState<string>('')

	useEffect(() => {
		if (state.valuationCap !== undefined) {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			})
			setFormattedValuationCap(formatter.format(state.valuationCap))
		} else {
			setFormattedValuationCap('')
		}
	}, [state.valuationCap])

	const handleValuationCapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, '')
		updateValuationCap(value ? Number(value) : undefined)
	}

	const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9.]/g, '')
		const numValue = Number(value)
		
		if (value === '') {
			updateDiscount(undefined)
			setDiscountError('')
			return
		}

		if (isNaN(numValue)) {
			setDiscountError('Please enter a valid number')
			return
		}

		if (numValue < 0 || numValue > 100) {
			setDiscountError('Discount must be between 0 and 100')
			return
		}

		setDiscountError('')
		updateDiscount(numValue)
	}

	const handleContinue = () => {
		if (isStepValid()) {
			updateStep(3)
		}
	}

	const isStepValid = () => {
		if (!state.safeType) return false

		// Check required fields based on SAFE type
		switch (state.safeType) {
			case 'Post-Money SAFE - Valuation Cap Only':
				return !!state.valuationCap
			case 'Post-Money SAFE - Discount Only':
				return !!state.discount
			case 'Post-Money SAFE - MFN (Most Favored Nation)':
				return true
			case 'Pre-Money SAFE - Valuation Cap Only':
				return !!state.valuationCap
			case 'Pre-Money SAFE - Discount Only':
				return !!state.discount
			case 'Pre-Money SAFE - Valuation Cap and Discount':
				return !!state.valuationCap && !!state.discount
			case 'Pre-money SAFE - MFN (Most Favored Nation)':
				return true // No required fields for this type
			default:
				return false
		}
	}

	const showValuationCap =
		state.safeType?.includes('Valuation Cap') &&
		!state.safeType?.includes('Discount Only')

	const showDiscount =
		state.safeType?.includes('Discount') &&
		!state.safeType?.includes('Valuation Cap Only')

	const showProRata = state.safeType?.includes('Post-Money')

	return (
		<>
			<div className={styles.stepHeader}>
				<h2>Select SAFE Type</h2>
				<p className={styles.stepDescription}>
					Choose which type of SAFE you would like to generate.
				</p>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="safeType" className={styles.label}>
					SAFE Type
				</label>
				<select
					id="safeType"
					className={styles.select}
					value={state.safeType || ''}
					onChange={(e) => updateSafeType(e.target.value as SafeType)}
				>
					<option value="">Select a SAFE type</option>
					{SAFE_TYPES.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			{showValuationCap && (
				<div className={styles.formGroup}>
					<label htmlFor="valuationCap" className={styles.label}>
						Valuation Cap
					</label>
					<input
						type="text"
						id="valuationCap"
						className={styles.input}
						value={formattedValuationCap}
						onChange={handleValuationCapChange}
						placeholder="Enter valuation cap amount"
						required
					/>
				</div>
			)}

			{showDiscount && (
				<div className={styles.formGroup}>
					<label htmlFor="discount" className={styles.label}>
						Discount Percentage
					</label>
					<input
						type="text"
						id="discount"
						className={`${styles.input} ${discountError ? styles.inputError : ''}`}
						value={state.discount || ''}
						onChange={handleDiscountChange}
						placeholder="Enter discount percentage (0-100)"
						required
					/>
					{discountError && (
						<span className={styles.errorMessage}>{discountError}</span>
					)}
				</div>
			)}

			{showProRata && (
				<div className={styles.formGroup}>
					<label htmlFor="proRataLetter" className={styles.label}>
						Pro Rata Rights Letter
					</label>
					<select
						id="proRataLetter"
						className={styles.select}
						value={state.proRataLetter ? 'include' : 'exclude'}
						onChange={(e) => updateProRataLetter(e.target.value === 'include')}
						required
					>
						<option value="include">Include Pro Rata Letter</option>
						<option value="exclude">Don&apos;t Include Pro Rata Letter</option>
					</select>
				</div>
			)}

			<div className={styles.buttonGroup}>
				<button
					className={`${styles.button} ${styles.secondaryButton}`}
					onClick={() => updateStep(1)}
				>
					Back
				</button>
				<button
					className={styles.button}
					onClick={handleContinue}
					disabled={!isStepValid()}
				>
					Continue
				</button>
			</div>
		</>
	)
} 