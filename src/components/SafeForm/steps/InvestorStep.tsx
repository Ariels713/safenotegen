'use client'

import { useSafeForm } from '@/context/SafeFormContext'
import { EntityType } from '@/types/safeForm'
import styles from '../SafeForm.module.css'
import { useState, useEffect } from 'react'

const ENTITY_TYPES: EntityType[] = ['Individual', 'LLC', 'Corporation']

export default function InvestorStep() {
	const { state, updateInvestorInfo, updateStep } = useSafeForm()
	const [formattedInvestmentAmount, setFormattedInvestmentAmount] = useState<string>('')

	useEffect(() => {
		if (state.investorInfo.investmentAmount !== undefined) {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			})
			setFormattedInvestmentAmount(formatter.format(state.investorInfo.investmentAmount))
		} else {
			setFormattedInvestmentAmount('')
		}
	}, [state.investorInfo.investmentAmount])

	const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, '')
		updateInvestorInfo({
			...state.investorInfo,
			investmentAmount: value ? Number(value) : undefined
		})
	}

	const handleContinue = () => {
		const {
			entityType,
			investorLegalName,
			investmentAmount,
			investDate
		} = state.investorInfo

		if (entityType && investorLegalName && investmentAmount && investDate) {
			updateStep(5)
		}
	}

	const showSignatoryFields = state.investorInfo.entityType !== 'Individual'

	return (
		<>
			<div className={styles.stepHeader}>
				<h2>Investor Information</h2>
				<p className={styles.stepDescription}>
					Please provide the following investor details.
				</p>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="entityType" className={styles.label}>
					Entity Type
				</label>
				<select
					id="entityType"
					className={styles.select}
					value={state.investorInfo.entityType || ''}
					onChange={(e) =>
						updateInvestorInfo({ entityType: e.target.value as EntityType })
					}
					required
				>
					<option value="">Select entity type</option>
					{ENTITY_TYPES.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="investorLegalName" className={styles.label}>
					Investor Legal Name
				</label>
				<input
					type="text"
					id="investorLegalName"
					className={styles.input}
					value={state.investorInfo.investorLegalName || ''}
					onChange={(e) =>
						updateInvestorInfo({ investorLegalName: e.target.value })
					}
					placeholder="Enter investor legal name"
					required
				/>
			</div>

			<div className={styles.formRow}>
				<div className={styles.formColumn}>
					<div className={styles.formGroup}>
						<label htmlFor="investmentAmount" className={styles.label}>
							Investment Amount
						</label>
						<input
							type="text"
							id="investmentAmount"
							className={styles.input}
							value={formattedInvestmentAmount}
							onChange={handleInvestmentAmountChange}
							placeholder="Enter investment amount"
							required
						/>
					</div>
				</div>
				<div className={styles.formColumn}>
					<div className={styles.formGroup}>
						<label htmlFor="investDate" className={styles.label}>
							Investment Date
						</label>
						<input
							type="date"
							id="investDate"
							className={styles.input}
							value={state.investorInfo.investDate || ''}
							onChange={(e) =>
								updateInvestorInfo({ investDate: e.target.value })
							}
							required
						/>
					</div>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="investorAddress" className={styles.label}>
					Investor Address (Optional)
				</label>
				<input
					type="text"
					id="investorAddress"
					className={styles.input}
					value={state.investorInfo.investorAddress || ''}
					onChange={(e) =>
						updateInvestorInfo({ investorAddress: e.target.value })
					}
					placeholder="Enter investor address"
				/>
			</div>

			{showSignatoryFields && (
				<>
					<div className={styles.formRow}>
						<div className={styles.formColumn}>
							<div className={styles.formGroup}>
								<label
									htmlFor="authorizedSignatoryName"
									className={styles.label}
								>
									Authorized Signatory Name
								</label>
								<input
									type="text"
									id="authorizedSignatoryName"
									className={styles.input}
									value={state.investorInfo.authorizedSignatoryName || ''}
									onChange={(e) =>
										updateInvestorInfo({
											authorizedSignatoryName: e.target.value
										})
									}
									placeholder="Enter authorized signatory name"
									required
								/>
							</div>
						</div>
						<div className={styles.formColumn}>
							<div className={styles.formGroup}>
								<label
									htmlFor="authorizedSignatoryTitle"
									className={styles.label}
								>
									Authorized Signatory Title
								</label>
								<input
									type="text"
									id="authorizedSignatoryTitle"
									className={styles.input}
									value={state.investorInfo.authorizedSignatoryTitle || ''}
									onChange={(e) =>
										updateInvestorInfo({
											authorizedSignatoryTitle: e.target.value
										})
									}
									placeholder="Enter authorized signatory title"
									required
								/>
							</div>
						</div>
					</div>

					<div className={styles.formGroup}>
						<label
							htmlFor="authorizedSignatoryEmail"
							className={styles.label}
						>
							Authorized Signatory Email
						</label>
						<input
							type="email"
							id="authorizedSignatoryEmail"
							className={styles.input}
							value={state.investorInfo.authorizedSignatoryEmail || ''}
							onChange={(e) =>
								updateInvestorInfo({
									authorizedSignatoryEmail: e.target.value
								})
							}
							placeholder="Enter authorized signatory email"
							required
						/>
					</div>
				</>
			)}

			<div className={styles.formGroup}>
				<label htmlFor="additionalBylines" className={styles.label}>
					Additional Bylines (Optional)
				</label>
				<textarea
					id="additionalBylines"
					className={styles.textarea}
					value={state.investorInfo.additionalBylines || ''}
					onChange={(e) =>
						updateInvestorInfo({ additionalBylines: e.target.value })
					}
					placeholder="Enter any additional bylines"
				/>
			</div>

			<div className={styles.buttonGroup}>
				<button
					className={`${styles.button} ${styles.secondaryButton}`}
					onClick={() => updateStep(3)}
				>
					Back
				</button>
				<button
					className={styles.button}
					onClick={handleContinue}
					disabled={
						!state.investorInfo.entityType ||
						!state.investorInfo.investorLegalName ||
						!state.investorInfo.investmentAmount ||
						!state.investorInfo.investDate ||
						(showSignatoryFields &&
							(!state.investorInfo.authorizedSignatoryName ||
								!state.investorInfo.authorizedSignatoryTitle ||
								!state.investorInfo.authorizedSignatoryEmail))
					}
				>
					Continue
				</button>
			</div>
		</>
	)
} 