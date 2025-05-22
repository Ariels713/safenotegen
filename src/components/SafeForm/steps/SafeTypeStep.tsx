'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { SafeType } from '@/types/safeForm'
import styles from '../SafeForm.module.css'

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
	const { state, updateSafeType, updateValuationCap, updateDiscount, updateStep } =
		useSafeForm()

	const handleContinue = () => {
		if (state.safeType) {
			updateStep(3)
		}
	}

	const showValuationCap =
		state.safeType?.includes('Valuation Cap') &&
		!state.safeType?.includes('Discount Only')

	const showDiscount =
		state.safeType?.includes('Discount') &&
		!state.safeType?.includes('Valuation Cap Only')

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
					/>
				</div>
			)}

			<button
				className={styles.button}
				onClick={handleContinue}
				disabled={!state.safeType}
			>
				Continue
			</button>
		</>
	)
} 