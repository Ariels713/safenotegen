import { useState } from 'react'
import styles from './SafeForm.module.css'

interface DownloadDropdownProps {
	label: string
	onDownload: (format: 'docx' | 'pdf') => Promise<void>
	isDownloading: boolean
}

export default function DownloadDropdown({ label, onDownload, isDownloading }: DownloadDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleDownload = async (format: 'docx' | 'pdf') => {
		setIsOpen(false)
		await onDownload(format)
	}

	return (
		<div className={styles.dropdownContainer}>
			<button
				className={styles.button}
				onClick={() => setIsOpen(!isOpen)}
				disabled={isDownloading}
			>
				{isDownloading ? 'Generating...' : label}
			</button>
			{isOpen && (
				<div className={styles.dropdownContent}>
					<button
						className={styles.dropdownItem}
						onClick={() => handleDownload('docx')}
						disabled={isDownloading}
					>
						DOCX
					</button>
					<button
						className={styles.dropdownItem}
						onClick={() => handleDownload('pdf')}
						disabled={isDownloading}
					>
						PDF
					</button>
				</div>
			)}
		</div>
	)
} 