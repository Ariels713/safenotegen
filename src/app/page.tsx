'use client'

import { SafeFormProvider } from '@/context/SafeFormContext'
import SafeForm from '@/components/SafeForm/SafeForm'

export default function Home() {
	return (
		<main className="min-h-screen p-8">
			<SafeFormProvider>
				<SafeForm />
			</SafeFormProvider>
		</main>
	)
}
