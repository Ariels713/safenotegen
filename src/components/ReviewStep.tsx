import { useState } from 'react'
import { SafeFormState } from '@/types/safeForm'
import { downloadSafeDocument, downloadProRataLetter } from '@/utils/documentUtils'
import { downloadSafePDF, downloadProRataLetterPDF } from '@/utils/pdfUtils'
import { DownloadDropdown } from './DownloadDropdown'

interface ReviewStepProps {
	state: SafeFormState
}

export default function ReviewStep({ state }: ReviewStepProps) {
	const [selectedFormat, setSelectedFormat] = useState<'docx' | 'pdf'>('docx')

	const handleDownloadSafe = async () => {
		if (selectedFormat === 'docx') {
			await downloadSafeDocument(state)
		} else {
			await downloadSafePDF(state)
		}
	}

	const handleDownloadProRata = async () => {
		if (selectedFormat === 'docx') {
			await downloadProRataLetter(state)
		} else {
			await downloadProRataLetterPDF(state)
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Review and Download</h2>
				<DownloadDropdown
					selectedFormat={selectedFormat}
					onFormatChange={setSelectedFormat}
				/>
			</div>

			<div className="space-y-4">
				<button
					onClick={handleDownloadSafe}
					className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
				>
					Download SAFE
				</button>

				{state.proRataLetter === 'yes' && (
					<button
						onClick={handleDownloadProRata}
						className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
					>
						Download Pro Rata Letter
					</button>
				)}
			</div>
		</div>
	)
} 