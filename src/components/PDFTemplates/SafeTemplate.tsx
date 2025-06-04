import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { SafeFormState } from '@/types/safeForm'

const styles = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 12,
		fontFamily: 'Helvetica'
	},
	header: {
		marginBottom: 20,
		textAlign: 'center'
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10
	},
	section: {
		marginBottom: 15
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5
	},
	text: {
		marginBottom: 5,
		lineHeight: 1.5
	},
	companyInfo: {
		marginBottom: 20
	},
	investorInfo: {
		marginBottom: 20
	},
	terms: {
		marginBottom: 20
	}
})

interface SafeTemplateProps {
	state: SafeFormState
}

export default function SafeTemplate({ state }: SafeTemplateProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>SIMPLE AGREEMENT FOR FUTURE EQUITY</Text>
					<Text style={styles.text}>{state.safeType}</Text>
				</View>

				<View style={styles.companyInfo}>
					<Text style={styles.sectionTitle}>Company Information</Text>
					<Text style={styles.text}>Company Name: {state.companyInfo.legalName}</Text>
					<Text style={styles.text}>State of Incorporation: {state.companyInfo.stateOfIncorporation}</Text>
					<Text style={styles.text}>State of Governance: {state.companyInfo.stateOfGovernance}</Text>
					<Text style={styles.text}>Company Address: {state.companyInfo.companyAddress}</Text>
				</View>

				<View style={styles.investorInfo}>
					<Text style={styles.sectionTitle}>Investor Information</Text>
					<Text style={styles.text}>Investor Type: {state.investorInfo.entityType}</Text>
					<Text style={styles.text}>Investor Name: {state.investorInfo.investorLegalName}</Text>
					<Text style={styles.text}>Investment Amount: ${state.investorInfo.investmentAmount}</Text>
					<Text style={styles.text}>Investment Date: {state.investorInfo.investDate}</Text>
				</View>

				<View style={styles.terms}>
					<Text style={styles.sectionTitle}>Terms</Text>
					{state.valuationCap && (
						<Text style={styles.text}>Valuation Cap: ${state.valuationCap}</Text>
					)}
					{state.discount && (
						<Text style={styles.text}>Discount: {state.discount}%</Text>
					)}
				</View>
			</Page>
		</Document>
	)
} 