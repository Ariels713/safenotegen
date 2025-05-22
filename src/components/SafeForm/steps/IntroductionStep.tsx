'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import styles from '../SafeForm.module.css'

export default function IntroductionStep() {
	const { state, updateDisclaimer, updateStep } = useSafeForm()

	const handleContinue = () => {
		if (state.disclaimerAccepted) {
			updateStep(2)
		}
	}

	return (
		<>
			<div className={styles.stepHeader}>
				<h2>Welcome to the SAFE Agreement Generator</h2>
				<p className={styles.stepDescription}>
					This tool will help you create a Simple Agreement for Future Equity (SAFE)
					document. Please review the following disclaimer before proceeding.
				</p>
			</div>

			<div className={styles.disclaimer}>
				<h3>Disclaimer</h3>
				<p>
					This SAFE Agreement Generator is provided for informational purposes only
					and does not constitute legal advice. The generated document should be
					reviewed by qualified legal counsel before use. By proceeding, you
					acknowledge that:
				</p>
				<ul>
					<li>
						You understand this is not legal advice and should consult with a
						qualified attorney
					</li>
					<li>
						You are authorized to enter into this agreement on behalf of the
						company
					</li>
					<li>
						You understand the implications and risks associated with SAFE
						agreements
					</li>
					<li>
						You will review the final document with legal counsel before execution
					</li>
				</ul>
			</div>

			<div className={styles.checkboxContainer}>
				<input
					type="checkbox"
					id="disclaimer"
					checked={state.disclaimerAccepted}
					onChange={(e) => updateDisclaimer(e.target.checked)}
					className={styles.checkbox}
				/>
				<label htmlFor="disclaimer">
					I have read and agree to the terms of the disclaimer
				</label>
			</div>

			<button
				className={styles.button}
				onClick={handleContinue}
				disabled={!state.disclaimerAccepted}
			>
				Continue
			</button>
		</>
	)
} 