import { SafeFormState } from '@/types/safeForm'
import { generatePostMoneySafe } from './safe-types/post-money-safe'

export const generateSafeDocument = async (state: SafeFormState): Promise<Blob> => {
	switch (state.safeType) {
		case 'Post-Money SAFE - Valuation Cap Only':
			return await generatePostMoneySafe(state)
		// Add other SAFE types as they are implemented
		default:
			throw new Error(`Unsupported SAFE type: ${state.safeType}`)
	}
}

export const generateProRataLetter = async (state: SafeFormState): Promise<Blob> => {
	// TODO: Implement Pro Rata letter generation
	throw new Error('Pro Rata letter generation not yet implemented')
} 