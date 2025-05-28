'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { SafeType } from '@/types/safeForm'
import styles from '../SafeForm.module.css'

const SAFE_TYPES: SafeType[] = [
	'postMoneyValuationCap',
	'postMoneyDiscount',
	'postMoneyMfn',
	'preMoneyValuationCap',
	'preMoneyDiscount',
	'preMoneyValuationCapAndDiscount',
	'preMoneyMfn'
]

export default function SafeTypeStep() {
	const { state, updateSafeType, updateValuationCap, updateDiscount, updateStep, updateProRataLetter } =
		useSafeForm()

	const handleContinue = () => {
		if (isStepValid()) {
			updateStep(3)
		}
	}

	const isStepValid = () => {
		if (!state.safeType) return false

		// Check required fields based on SAFE type
		switch (state.safeType) {
			case 'postMoneyValuationCap':
				return !!state.valuationCap
			case 'postMoneyDiscount':
				return !!state.discount
			case 'postMoneyMfn':
				return true
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
	}

	const showValuationCap =
		state.safeType?.includes('ValuationCap') &&
		!state.safeType?.includes('Discount')

	const showDiscount =
		state.safeType?.includes('Discount') &&
		!state.safeType?.includes('ValuationCap')

	const showProRata = state.safeType?.startsWith('postMoney')

	return (
		<>
			<div className={styles.stepHeader}>
				<h2>Select SAFE Type</h2>
				<p className={styles.stepDescription}>
					Choose the type of SAFE agreement that best suits your needs.
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
						type="number"
						id="valuationCap"
						className={styles.input}
						value={state.valuationCap || ''}
						onChange={(e) => updateValuationCap(Number(e.target.value))}
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
						type="number"
						id="discount"
						className={styles.input}
						value={state.discount || ''}
						onChange={(e) => updateDiscount(Number(e.target.value))}
						placeholder="Enter discount percentage"
						min="0"
						max="100"
						required
					/>
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