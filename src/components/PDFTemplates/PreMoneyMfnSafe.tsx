import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { SafeFormState } from '@/types/safeForm'
import BaseSafeTemplate from './BaseSafeTemplate'

const styles = StyleSheet.create({
	text: {
		marginBottom: 5,
		lineHeight: 1.5
	}
})

interface PreMoneyMfnSafeProps {
	state: SafeFormState
}

export default function PreMoneyMfnSafe({ state }: PreMoneyMfnSafeProps) {
	return (
		<BaseSafeTemplate state={state}>
			<View>
				<Text style={styles.text}>
					This Pre-Money SAFE includes a Most Favored Nation (MFN) provision
				</Text>
				<Text style={styles.text}>
					The MFN provision means that if the Company issues any SAFE with terms more favorable to the 
					holder than those in this SAFE, the Company will notify the Investor and the Investor will 
					have the right to exchange this SAFE for a new SAFE with such more favorable terms.
				</Text>
				<Text style={styles.text}>
					The number of shares of Capital Stock to be issued to the Investor upon conversion of this 
					SAFE shall be equal to the quotient obtained by dividing (x) the Purchase Amount by (y) the 
					price per share of the Standard Preferred Stock in the Equity Financing.
				</Text>
			</View>
		</BaseSafeTemplate>
	)
} 