interface DownloadDropdownProps {
	selectedFormat: 'docx' | 'pdf'
	onFormatChange: (format: 'docx' | 'pdf') => void
}

export function DownloadDropdown({ selectedFormat, onFormatChange }: DownloadDropdownProps) {
	return (
		<select
			value={selectedFormat}
			onChange={(e) => onFormatChange(e.target.value as 'docx' | 'pdf')}
			className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="docx">DOCX</option>
			<option value="pdf">PDF</option>
		</select>
	)
} 