import { SafeFormState } from '@/types/safeForm'
import { generatePostMoneySafe } from './safe-types/post-money-safe'
import { generatePostMoneyDiscountSafe } from './safe-types/post-money-discount-safe'
import { generatePostMoneyMfnSafe } from './safe-types/post-money-mfn-safe'
import { generatePreMoneySafe } from './safe-types/pre-money-safe'
import { generatePreMoneyDiscountSafe } from './safe-types/pre-money-discount-safe'
import { generatePreMoneyValuationCapAndDiscountSafe } from './safe-types/pre-money-valuation-cap-and-discount-safe'
import { generatePreMoneyMfnSafe } from './safe-types/pre-money-mfn-safe'
import { generateProRataLetter as generateProRataLetterDoc } from './pro-rata-letter'

export const generateDocument = async (state: SafeFormState): Promise<Blob> => {
	switch (state.safeType) {
		case 'Post-Money SAFE - Valuation Cap Only':
			return await generatePostMoneySafe(state)
		case 'Post-Money SAFE - Discount Only':
			return await generatePostMoneyDiscountSafe(state)
		case 'Post-Money SAFE - MFN (Most Favored Nation)':
			return await generatePostMoneyMfnSafe(state)
		case 'Pre-Money SAFE - Valuation Cap Only':
			return await generatePreMoneySafe(state)
		case 'Pre-Money SAFE - Discount Only':
			return await generatePreMoneyDiscountSafe(state)
		case 'Pre-Money SAFE - Valuation Cap and Discount':
			return await generatePreMoneyValuationCapAndDiscountSafe(state)
		case 'Pre-money SAFE - MFN (Most Favored Nation)':
			return await generatePreMoneyMfnSafe(state)
		default:
			throw new Error('Invalid SAFE type')
	}
}

export const generateProRataLetter = async (state: SafeFormState): Promise<Blob> => {
	return await generateProRataLetterDoc(state)
} 