'use client'

import { SafeFormProvider } from '@/context/SafeFormContext'
import SafeForm from '@/components/SafeForm/SafeForm'

export default function Home() {
	return (
		<main>
			<SafeFormProvider>
				<SafeForm />
			</SafeFormProvider>
		</main>
	)
}
