import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { SafeFormState } from '@/types/safeForm'
import BaseSafeTemplate from './BaseSafeTemplate'

const styles = StyleSheet.create({
	text: {
		marginBottom: 5,
		lineHeight: 1.5
	}
})

interface PreMoneyValuationCapAndDiscountSafeProps {
	state: SafeFormState
}

export default function PreMoneyValuationCapAndDiscountSafe({ state }: PreMoneyValuationCapAndDiscountSafeProps) {
	return (
		<BaseSafeTemplate state={state}>
			<View>
				<Text style={styles.text}>
					This Pre-Money SAFE includes both a Valuation Cap of ${state.valuationCap} and a Discount Rate of {state.discount}%
				</Text>
				<Text style={styles.text}>
					The Valuation Cap shall mean the price per share used to determine the number of shares of 
					Capital Stock to be issued to the Investor upon conversion of this SAFE.
				</Text>
				<Text style={styles.text}>
					The Discount Rate shall mean the percentage discount applied to the price per share of the 
					Standard Preferred Stock in the Equity Financing to determine the Conversion Price.
				</Text>
				<Text style={styles.text}>
					The number of shares of Capital Stock to be issued to the Investor upon conversion of this 
					SAFE shall be equal to the quotient obtained by dividing (x) the Purchase Amount by (y) the 
					lower of the Valuation Cap or the Conversion Price.
				</Text>
			</View>
		</BaseSafeTemplate>
	)
} 