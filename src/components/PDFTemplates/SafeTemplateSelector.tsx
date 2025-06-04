import { ReactElement } from 'react'
import { SafeFormState } from '@/types/safeForm'
import PostMoneyValuationCapSafe from './PostMoneyValuationCapSafe'
import PostMoneyDiscountSafe from './PostMoneyDiscountSafe'
import PostMoneyMfnSafe from './PostMoneyMfnSafe'
import PreMoneyValuationCapSafe from './PreMoneyValuationCapSafe'
import PreMoneyDiscountSafe from './PreMoneyDiscountSafe'
import PreMoneyValuationCapAndDiscountSafe from './PreMoneyValuationCapAndDiscountSafe'
import PreMoneyMfnSafe from './PreMoneyMfnSafe'

export const getSafeTemplate = (state: SafeFormState): ReactElement => {
	switch (state.safeType) {
		case 'Post-Money SAFE - Valuation Cap Only':
			return <PostMoneyValuationCapSafe state={state} />
		case 'Post-Money SAFE - Discount Only':
			return <PostMoneyDiscountSafe state={state} />
		case 'Post-Money SAFE - MFN (Most Favored Nation)':
			return <PostMoneyMfnSafe state={state} />
		case 'Pre-Money SAFE - Valuation Cap Only':
			return <PreMoneyValuationCapSafe state={state} />
		case 'Pre-Money SAFE - Discount Only':
			return <PreMoneyDiscountSafe state={state} />
		case 'Pre-Money SAFE - Valuation Cap and Discount':
			return <PreMoneyValuationCapAndDiscountSafe state={state} />
		case 'Pre-money SAFE - MFN (Most Favored Nation)':
			return <PreMoneyMfnSafe state={state} />
		default:
			return <PostMoneyValuationCapSafe state={state} /> // Fallback to a default template
	}
} 