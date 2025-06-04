import { Text, View, StyleSheet, Document, Page, Link } from "@react-pdf/renderer";
import { SafeFormState } from "@/types/safeForm";

const styles = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 10,
		lineHeight: 1.5
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20
	},
	companyName: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10
	},
	section: {
		marginBottom: 10
	},
	bold: {
		fontWeight: 'bold'
	},
	link: {
		color: '#00a688',
		textDecoration: 'underline'
	},
	signatureSection: {
		marginTop: 10
	},
	signatureLine: {
		marginBottom: 20
	},
	signatureName: {
		fontWeight: 'bold',
		marginBottom: 10
	},
	signatureField: {
		marginBottom: 0
	}
});

interface ProRataLetterProps {
  state: SafeFormState;
}

export default function ProRataLetter({ state }: ProRataLetterProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.companyName}>
          {state.companyInfo.legalName || "[COMPANY NAME]"}
        </Text>
        <Text style={styles.title}>PRO RATA AGREEMENT</Text>

        <View style={styles.section}>
          <Text>
            This agreement (this &ldquo;<Text style={styles.bold}>Agreement</Text>&rdquo;)
            is entered into on or about{" "}
            {state.investorInfo.investDate || "[Date of Safe]"} in connection
            with the purchase by{" "}
            {state.investorInfo.investorLegalName || "[Investor Name]"} (the &ldquo;
            <Text style={styles.bold}>Investor</Text>&rdquo;) of that certain simple
            agreement for future equity with a &ldquo;Post-Money Valuation Cap&rdquo; (the &ldquo;
            <Text style={styles.bold}>Investor&apos;s Safe</Text>&rdquo;) issued by{" "}
            {state.companyInfo.legalName || "[Company Name]"} (the &ldquo;
            <Text style={styles.bold}>Company</Text>&rdquo;) on or about the date of
            this Agreement. As a material inducement to the Investor&apos;s
            investment, the Company agrees to the provisions set forth in this
            Agreement. Capitalized terms used herein shall have the meanings set
            forth in the Investor&apos;s Safe.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            The Investor shall have the right to purchase its pro rata share of
            Standard Preferred Stock being sold in the Equity Financing (the &ldquo;
            <Text style={styles.bold}>Pro Rata Right</Text>&rdquo;). Pro rata share
            for purposes of this Pro Rata Right is the ratio of (x) the number
            of shares of Capital Stock issued from the conversion of all of the
            Investor&apos;s Safes with a &ldquo;Post-Money Valuation Cap&rdquo; to (y) the
            Company Capitalization. The Pro Rata Right described above shall
            automatically terminate upon the earlier of (i) the initial closing
            of the Equity Financing; (ii) immediately prior to the closing of a
            Liquidity Event; or (iii) immediately prior to the Dissolution
            Event.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            Neither this Agreement nor the rights contained herein may be
            assigned, by operation of law or otherwise, by Investor without the
            prior written consent of the Company; provided, however, that this
            Agreement and/or the rights contained herein may be assigned without
            the Company&apos;s consent by the Investor to any other entity who
            directly or indirectly, controls, is controlled by or is under
            common control with the Investor, including, without limitation, any
            general partner, managing member, officer or director of the
            Investor, or any venture capital fund now or hereafter existing
            which is controlled by one or more general partners or managing
            members of, or shares the same management company with, the
            Investor.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            Any provision of this Agreement may be amended, waived or modified
            upon the written consent of the Company and either (i) the holders
            of a majority of shares of Capital Stock issued from all Safes
            converted in connection with the Equity Financing held by the
            Investor and other Safe holders with Pro Rata Rights pursuant to
            agreements on the same form as this Agreement (available at{' '}
            <Link src="http://ycombinator.com/documents" style={styles.link}>
              http://ycombinator.com/documents
            </Link>
            ), provided that such amendment, waiver or modification treats all
            such holders in the same manner, or (ii) the Investor. The Company
            will promptly notify the Investor of any amendment, waiver or
            modification that the Investor did not consent to. This Agreement is
            the form available at{' '}
            <Link src="http://ycombinator.com/documents" style={styles.link}>
              http://ycombinator.com/documents
            </Link>
            {' '}and the Company and the Investor agree that neither one has
            modified the form, except to fill in blanks and bracketed terms. The
            choice of law governing any dispute or claim arising out of or in
            connection with this Agreement shall be consistent with that set
            forth in the Investor&apos;s Safe.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            IN WITNESS WHEREOF, the undersigned have caused this Agreement to be
            duly executed and delivered.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureName}>
              {state.companyInfo.legalName || "[COMPANY NAME]"}
            </Text>
            <Text style={styles.signatureField}>By:_________________________________</Text>
            <Text style={styles.signatureField}>
              Name: {state.companyInfo.authorizedSignatoryName || "[name]"}
            </Text>
            <Text style={styles.signatureField}>
              Title: {state.companyInfo.authorizedSignatoryTitle || "[title]"}
            </Text>
          </View>

          <View style={styles.signatureLine}>
            <Text style={styles.signatureName}>
              {state.investorInfo.investorLegalName || "[INVESTOR NAME]"}
            </Text>
            <Text style={styles.signatureField}>By:_________________________________</Text>
            <Text style={styles.signatureField}>
              Name: {state.investorInfo.authorizedSignatoryName || "[name]"}
            </Text>
            <Text style={styles.signatureField}>
              Title: {state.investorInfo.authorizedSignatoryTitle || "[title]"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
