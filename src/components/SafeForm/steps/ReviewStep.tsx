'use client'

import { useState, useEffect } from 'react'
import { useSafeForm } from '@/context/SafeFormContext'
import { getDownloadOptions, downloadSafeDocument, downloadProRataLetter } from '@/utils/documentUtils'
import { sendToSlack } from '@/utils/slackUtils'
import styles from '../SafeForm.module.css'
import DownloadDropdown from '../DownloadDropdown'

export default function ReviewStep() {
	const { state, updateStep, updateSlackNotified } = useSafeForm()
	const downloadOptions = getDownloadOptions(state)
	const [isSafeDownloading, setIsSafeDownloading] = useState(false)
	const [isProRataDownloading, setIsProRataDownloading] = useState(false)

	useEffect(() => {
		const sendSlackNotification = async () => {
			if (!state.slackNotified) {
				const success = await sendToSlack(state)
				if (success) {
					updateSlackNotified(true)
				}
			}
		}

		sendSlackNotification()
	}, [state, updateSlackNotified])

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount)
	}

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const handleDownloadSafe = async (format: 'docx' | 'pdf') => {
		try {
			setIsSafeDownloading(true)
			// For now, we only support DOCX format
			await downloadSafeDocument(state)
		} catch (error) {
			console.error('Error downloading SAFE document:', error)
			// TODO: Add proper error handling UI
		} finally {
			setIsSafeDownloading(false)
		}
	}

	const handleDownloadProRata = async (format: 'docx' | 'pdf') => {
		try {
			setIsProRataDownloading(true)
			// For now, we only support DOCX format
			await downloadProRataLetter(state)
		} catch (error) {
			console.error('Error downloading Pro Rata letter:', error)
			// TODO: Add proper error handling UI
		} finally {
			setIsProRataDownloading(false)
		}
	}

	return (
		<>
			<div className={styles.stepHeader}>
				<h2>Review Information</h2>
				<p className={styles.stepDescription}>
				You acknowledge that the Rho SAFE Docs are for general informational purposes
                only and should not be relied upon absent a review of your specific circumstances by a legal
                professional and/or other advisors.
				</p>
			</div>

			<div className={styles.reviewSection}>
				<h3>SAFE Type</h3>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Type:</span>
					<span>{state.safeType}</span>
				</div>
				{state.valuationCap && (
					<div className={styles.reviewItem}>
						<span className={styles.label}>Valuation Cap:</span>
						<span>{formatCurrency(state.valuationCap)}</span>
					</div>
				)}
				{state.discount && (
					<div className={styles.reviewItem}>
						<span className={styles.label}>Discount:</span>
						<span>{state.discount}%</span>
					</div>
				)}
				{state.proRataLetter === 'yes' && (
					<div className={styles.reviewItem}>
						<span className={styles.label}>Pro Rata Letter:</span>
						<span>Included</span>
					</div>
				)}
			</div>

			<div className={styles.reviewSection}>
				<h3>Company Information</h3>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Legal Name:</span>
					<span>{state.companyInfo.legalName}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>State of Incorporation:</span>
					<span>{state.companyInfo.stateOfIncorporation}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>State of Governance:</span>
					<span>{state.companyInfo.stateOfGovernance}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Company Address:</span>
					<span>{state.companyInfo.companyAddress}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Authorized Signatory Name:</span>
					<span>{state.companyInfo.authorizedSignatoryName}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Authorized Signatory Title:</span>
					<span>{state.companyInfo.authorizedSignatoryTitle}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Authorized Signatory Email:</span>
					<span>{state.companyInfo.authorizedSignatoryEmail}</span>
				</div>
			</div>

			<div className={styles.reviewSection}>
				<h3>Investor Information</h3>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Entity Type:</span>
					<span>{state.investorInfo.entityType}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Investor Legal Name:</span>
					<span>{state.investorInfo.investorLegalName}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Investment Amount:</span>
					<span>{formatCurrency(state.investorInfo.investmentAmount || 0)}</span>
				</div>
				<div className={styles.reviewItem}>
					<span className={styles.label}>Investment Date:</span>
					<span>{formatDate(state.investorInfo.investDate || '')}</span>
				</div>
				{state.investorInfo.investorAddress && (
					<div className={styles.reviewItem}>
						<span className={styles.label}>Investor Address:</span>
						<span>{state.investorInfo.investorAddress}</span>
					</div>
				)}
				{state.investorInfo.entityType !== 'Individual' && (
					<>
						<div className={styles.reviewItem}>
							<span className={styles.label}>Entity Signatory Name:</span>
							<span>{state.investorInfo.authorizedSignatoryName}</span>
						</div>
						<div className={styles.reviewItem}>
							<span className={styles.label}>Entity Signatory Title:</span>
							<span>{state.investorInfo.authorizedSignatoryTitle}</span>
						</div>
						<div className={styles.reviewItem}>
							<span className={styles.label}>Entity Signatory Email:</span>
							<span>{state.investorInfo.authorizedSignatoryEmail}</span>
						</div>
					</>
				)}
				{state.investorInfo.additionalBylines && (
					<div className={styles.reviewItem}>
						<span className={styles.label}>Additional Bylines:</span>
						<span>{state.investorInfo.additionalBylines}</span>
					</div>
				)}
			</div>

			<div className={styles.buttonGroup}>
				<button
					className={`${styles.button} ${styles.secondaryButton}`}
					onClick={() => updateStep(4)}
					disabled={isSafeDownloading || isProRataDownloading}
				>
					Back
				</button>
				{downloadOptions.showSafeDownload && (
					<DownloadDropdown
						label="Download SAFE"
						onDownload={handleDownloadSafe}
						isDownloading={isSafeDownloading}
					/>
				)}
				{downloadOptions.showProRataDownload && (
					<DownloadDropdown
						label="Download Pro Rata Letter"
						onDownload={handleDownloadProRata}
						isDownloading={isProRataDownloading}
					/>
				)}
			</div>
		</>
	)
} 