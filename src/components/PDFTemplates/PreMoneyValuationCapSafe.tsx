import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { SafeFormState } from '@/types/safeForm'
import BaseSafeTemplate from './BaseSafeTemplate'

const styles = StyleSheet.create({
	text: {
		marginBottom: 5,
		lineHeight: 1.5
	}
})

interface PreMoneyValuationCapSafeProps {
	state: SafeFormState
}

export default function PreMoneyValuationCapSafe({ state }: PreMoneyValuationCapSafeProps) {
	return (
		<BaseSafeTemplate state={state}>
			<View>
				<Text style={styles.text}>
					This Pre-Money SAFE includes a Valuation Cap of ${state.valuationCap}
				</Text>
				<Text style={styles.text}>
					The Valuation Cap shall mean the price per share used to determine the number of shares of 
					Capital Stock to be issued to the Investor upon conversion of this SAFE.
				</Text>
				<Text style={styles.text}>
					The number of shares of Capital Stock to be issued to the Investor upon conversion of this 
					SAFE shall be equal to the quotient obtained by dividing (x) the Purchase Amount by (y) the 
					Valuation Cap.
				</Text>
			</View>
		</BaseSafeTemplate>
	)
} 