import { Text, View, StyleSheet, Document, Page } from '@react-pdf/renderer'
import { SafeFormState } from '@/types/safeForm'

const styles = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 10,
		lineHeight: 1.5,
		fontFamily: 'Times'
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		fontFamily: 'Times'
	},
	companyName: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
		fontFamily: 'Times'
	},
	section: {
		marginBottom: 10,
	},
	bold: {
		fontWeight: 'bold',
		fontFamily: 'Times'
	},
	italic: {
		fontStyle: 'italic',
		fontFamily: 'Times'
	},
	indent: {
		marginLeft: 40
	},
	disclaimer: {
		marginBottom: 20,
		textAlign: 'justify',
		textIndent: 0
	},
	signatureSection: {
		marginTop: 20,
		textIndent: 0
	},
	signatureLine: {
		marginBottom: 20,
		textIndent: 0
	},
	signatureName: {
		fontWeight: 'bold',
		marginBottom: 10,
		textIndent: 0
	},
	signatureField: {
		marginBottom: 5,
		textIndent: 0
	},
	definitionList: {
		marginBottom: 10,
		textIndent: 0
	},
	definitionItem: {
		marginBottom: 5,
		textIndent: 0
	}
})

interface PreMoneyValuationCapSafeProps {
	state: SafeFormState
}

export default function PreMoneyValuationCapSafe({ state }: PreMoneyValuationCapSafeProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Disclaimer */}
				<Text style={styles.disclaimer}>
					THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE &ldquo;<Text style={styles.bold}>SECURITIES ACT</Text>&rdquo;), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.
				</Text>

				{/* Company Name */}
				<Text style={styles.companyName}>
					{state.companyInfo.legalName || "[COMPANY NAME]"}
				</Text>

				{/* Title */}
				<Text style={styles.title}>SAFE</Text>
				<Text style={[styles.title, { fontStyle: 'italic', fontSize: 10, fontWeight: '400' }]}>
					(Simple Agreement for Future Equity)
				</Text>

				{/* Introduction */}
				<View style={styles.section}>
					<Text>
						THIS CERTIFIES THAT in exchange for the payment by {state.investorInfo.investorLegalName || "[INVESTOR NAME]"} (the &ldquo;<Text style={styles.bold}>Investor</Text>&rdquo;) of ${state.investorInfo.investmentAmount?.toLocaleString() || "[PURCHASE AMOUNT]"} (the &ldquo;<Text style={styles.bold}>Purchase Amount</Text>&rdquo;) on or about {state.investorInfo.investDate || "[DATE]"}, {state.companyInfo.legalName || "[COMPANY NAME]"}, a {state.companyInfo.stateOfIncorporation || "[STATE]"} corporation (the &ldquo;<Text style={styles.bold}>Company</Text>&rdquo;), hereby issues to the Investor the right to certain shares of the Company&apos;s capital stock, subject to the terms set forth below.
					</Text>
				</View>

				{/* Valuation Cap */}
				<View style={styles.section}>
					<Text>
						The &ldquo;<Text style={styles.bold}>Valuation Cap</Text>&rdquo; is ${state.valuationCap?.toLocaleString() || "[VALUATION CAP]"}. See <Text style={styles.bold}>Section 2</Text> for certain additional defined terms.
					</Text>
				</View>

				{/* Section 1: Events */}
				<View style={styles.section}>
					<Text style={[styles.bold, styles.italic]}>1. Events</Text>
				</View>

				{/* Section 1(a): Equity Financing */}
				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(a) Equity Financing. </Text>
						If there is an Equity Financing before the expiration or termination of this instrument, the Company will automatically issue to the Investor either: (1) a number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the price per share of the Standard Preferred Stock, if the pre-money valuation is less than or equal to the Valuation Cap; or (2) a number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Safe Price, if the pre-money valuation is greater than the Valuation Cap.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						In connection with the issuance of Standard Preferred Stock or Safe Preferred Stock, as applicable, by the Company to the Investor pursuant to this Section 1(a):
					</Text>
				</View>

				<View style={[styles.section, styles.indent]}>
					<Text>
						(i) The Investor will execute and deliver to the Company all transaction documents related to the Equity Financing; provided, that such documents are the same documents to be entered into with the purchasers of Standard Preferred Stock, with appropriate variations for the Safe Preferred Stock if applicable, and provided further, that such documents have customary exceptions to any drag-along applicable to the Investor, including, without limitation, limited representations and warranties and limited liability and indemnification obligations on the part of the Investor; and
					</Text>
				</View>

				<View style={[styles.section, styles.indent]}>
					<Text>
						(ii) The Investor and the Company will execute a Pro Rata Rights Agreement, unless the Investor is already included in such rights in the transaction documents related to the Equity Financing.
					</Text>
				</View>

				{/* Section 1(b): Liquidity Event */}
				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(b) Liquidity Event. </Text>
						If there is a Liquidity Event before the expiration or termination of this instrument, the Investor will, at its option, either (i) receive a cash payment equal to the Purchase Amount (subject to the following paragraph) or (ii) automatically receive from the Company a number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price, if the Investor fails to select the cash option.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						In connection with Section (b)(i), the Purchase Amount will be due and payable by the Company to the Investor immediately prior to, or concurrent with, the consummation of the Liquidity Event. If there are not enough funds to pay the Investor and holders of other Safes (collectively, the &ldquo;Cash-Out Investors&rdquo;) in full, then all of the Company&apos;s available funds will be distributed with equal priority and pro rata among the Cash-Out Investors in proportion to their Purchase Amounts, and the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price. In connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce, pro rata, the Purchase Amounts payable to the Cash-Out Investors by the amount determined by its board of directors in good faith to be advisable for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, and in such case, the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price.
					</Text>
				</View>

				{/* Section 1(c): Dissolution Event */}
				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(c) Dissolution Event. </Text>
						If there is a Dissolution Event before this instrument expires or terminates, the Company will pay an amount equal to the Purchase Amount, due and payable to the Investor immediately prior to, or concurrent with, the consummation of the Dissolution Event. The Purchase Amount will be paid prior and in preference to any Distribution of any of the assets of the Company to holders of outstanding Capital Stock by reason of their ownership thereof. If immediately prior to the consummation of the Dissolution Event, the assets of the Company legally available for distribution to the Investor and all holders of all other Safes (the &ldquo;Dissolving Investors&rdquo;), as determined in good faith by the Company&apos;s board of directors, are insufficient to permit the payment to the Dissolving Investors of their respective Purchase Amounts, then the entire assets of the Company legally available for distribution will be distributed with equal priority and pro rata among the Dissolving Investors in proportion to the Purchase Amounts they would otherwise be entitled to receive pursuant to this Section 1(c).
					</Text>
				</View>

				{/* Section 1(d): Termination */}
				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(d) Termination. </Text>
						This instrument will expire and terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this instrument) upon either (i) the issuance of stock to the Investor pursuant to Section 1(a) or Section 1(b)(ii); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b)(i) or Section 1(c).
					</Text>
				</View>

				{/* Section 2: Definitions */}
				<View style={styles.section}>
					<Text style={[styles.bold, styles.italic]}>2. Definitions</Text>
				</View>

				{/* Definitions */}
				<View style={styles.definitionList}>
					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Capital Stock&rdquo; </Text>
						means the capital stock of the Company, including, without limitation, the &ldquo;<Text style={styles.bold}>Common Stock</Text>&rdquo; and the &ldquo;<Text style={styles.bold}>Preferred Stock</Text>&rdquo;.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Change of Control&rdquo; </Text>
						means (i) a transaction or series of related transactions in which any &ldquo;person&rdquo; or &ldquo;group&rdquo; (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the &ldquo;beneficial owner&rdquo; (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company&apos;s board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Company Capitalization&rdquo; </Text>
						means the sum, as of immediately prior to the Equity Financing, of: (1) all shares of Capital Stock (on an as-converted basis) issued and outstanding, assuming exercise or conversion of all outstanding vested and unvested options, warrants and other convertible securities, but excluding (A) this instrument, (B) all other Safes, and (C) convertible promissory notes; and (2) all shares of Common Stock reserved and available for future grant under any equity incentive or similar plan of the Company, and/or any equity incentive or similar plan to be created or increased in connection with the Equity Financing.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Distribution&rdquo; </Text>
						means the transfer to holders of Capital Stock by reason of their ownership thereof of cash or other property without consideration whether by way of dividend or otherwise, other than dividends on Common Stock payable in Common Stock, or the purchase or redemption of Capital Stock by the Company or its subsidiaries for cash or property other than: (i) repurchases of Common Stock held by employees, officers, directors or consultants of the Company or its subsidiaries pursuant to an agreement providing, as applicable, a right of first refusal or a right to repurchase shares upon termination of such service provider&apos;s employment or services; or (ii) repurchases of Capital Stock in connection with the settlement of disputes with any stockholder.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Dissolution Event&rdquo; </Text>
						means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company&apos;s creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Equity Financing&rdquo; </Text>
						means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed pre-money valuation.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Initial Public Offering&rdquo; </Text>
						means the closing of the Company&apos;s first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Liquidity Capitalization&rdquo; </Text>
						means the number, as of immediately prior to the Liquidity Event, of shares of Capital Stock (on an as-converted basis) outstanding, assuming exercise or conversion of all outstanding vested and unvested options, warrants and other convertible securities, but excluding: (i) shares of Common Stock reserved and available for future grant under any equity incentive or similar plan; (ii) this instrument; (iii) other Safes; and (iv) convertible promissory notes.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Liquidity Event&rdquo; </Text>
						means a Change of Control or an Initial Public Offering.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Liquidity Price&rdquo; </Text>
						means the price per share equal to the Valuation Cap divided by the Liquidity Capitalization.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Pro Rata Rights Agreement&rdquo; </Text>
						means a written agreement between the Company and the Investor (and holders of other Safes, as appropriate) giving the Investor a right to purchase its pro rata share of private placements of securities by the Company occurring after the Equity Financing, subject to customary exceptions. Pro rata for purposes of the Pro Rata Rights Agreement will be calculated based on the ratio of (1) the number of shares of Capital Stock owned by the Investor immediately prior to the issuance of the securities to (2) the total number of shares of outstanding Capital Stock on a fully diluted basis, calculated as of immediately prior to the issuance of the securities.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Safe&rdquo; </Text>
						means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company&apos;s business operations.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Safe Preferred Stock&rdquo; </Text>
						means the shares of a series of Preferred Stock issued to the Investor in an Equity Financing, having the identical rights, privileges, preferences and restrictions as the shares of Standard Preferred Stock, other than with respect to: (i) the per share liquidation preference and the conversion price for purposes of price-based anti-dilution protection, which will equal the Safe Price; and (ii) the basis for any dividend rights, which will be based on the Safe Price.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Safe Price&rdquo; </Text>
						means the price per share equal to the Valuation Cap divided by the Company Capitalization.
					</Text>

					<Text style={styles.definitionItem}>
						<Text style={styles.bold}>&ldquo;Standard Preferred Stock&rdquo; </Text>
						means the shares of a series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.
					</Text>
				</View>

				{/* Section 3: Company Representations */}
				<View style={styles.section}>
					<Text style={[styles.bold, styles.italic]}>3. Company Representations</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(a) </Text>
						The Company is a corporation duly organized, validly existing and in good standing under the laws of the state of its incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(b) </Text>
						The execution, delivery and performance by the Company of this instrument is within the power of the Company and, other than with respect to the actions to be taken when equity is to be issued to the Investor, has been duly authorized by all necessary actions on the part of the Company. This instrument constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors&apos; rights generally and general principles of equity. To the knowledge of the Company, it is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material indenture or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(c) </Text>
						The performance and consummation of the transactions contemplated by this instrument do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material indenture or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(d) </Text>
						No consents or approvals are required in connection with the performance of this instrument, other than: (i) the Company&apos;s corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(e) </Text>
						To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.
					</Text>
				</View>

				{/* Section 4: Investor Representations */}
				<View style={styles.section}>
					<Text style={[styles.bold, styles.italic]}>4. Investor Representations</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(a) </Text>
						The Investor has full legal capacity, power and authority to execute and deliver this instrument and to perform its obligations hereunder. This instrument constitutes valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors&apos; rights generally and general principles of equity.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(b) </Text>
						The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act. The Investor has been advised that this instrument and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this instrument and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor&apos;s financial condition and is able to bear the economic risk of such investment for an indefinite period of time.
					</Text>
				</View>

				{/* Section 5: Miscellaneous */}
				<View style={styles.section}>
					<Text style={[styles.bold, styles.italic]}>5. Miscellaneous</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(a) </Text>
						Any provision of this instrument may be amended, waived or modified only upon the written consent of the Company and the Investor.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(b) </Text>
						Any notice required or permitted by this instrument will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party&apos;s address listed on the signature page, as subsequently modified by written notice.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(c) </Text>
						The Investor is not entitled, as a holder of this instrument, to vote or receive dividends or be deemed the holder of Capital Stock for any purpose, nor will anything contained herein be construed to confer on the Investor, as such, any of the rights of a stockholder of the Company or any right to vote for the election of directors or upon any matter submitted to stockholders at any meeting thereof, or to give or withhold consent to any corporate action or to receive notice of meetings, or to receive subscription rights or otherwise until shares have been issued upon the terms described herein.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(d) </Text>
						Neither this instrument nor the rights contained herein may be assigned, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this instrument and/or the rights contained herein may be assigned without the Company&apos;s consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor; and provided, further, that the Company may assign this instrument in whole, without the consent of the Investor, in connection with a reincorporation to change the Company&apos;s domicile.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(e) </Text>
						In the event any one or more of the provisions of this instrument is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this instrument operate or would prospectively operate to invalidate this instrument, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this instrument and the remaining provisions of this instrument will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.
					</Text>
				</View>

				<View style={styles.section}>
					<Text>
						<Text style={styles.bold}>(f) </Text>
						All rights and obligations hereunder will be governed by the laws of the State of {state.companyInfo.stateOfGovernance || "[GOVERNING LAW JURISDICTION]"}, without regard to the conflicts of law provisions of such jurisdiction.
					</Text>
				</View>

				{/* Signature Section */}
				<View style={styles.signatureSection}>
					<Text style={[styles.title, { fontStyle: 'italic', fontSize: 10, fontWeight: '400' }]}>(Signature page follows)</Text>
				</View>

				<View style={[styles.signatureSection, { marginBottom: 20 }]} break>
					<Text>IN WITNESS WHEREOF, the undersigned have caused this instrument to be duly executed and delivered.</Text>
				</View>

				<View style={styles.signatureLine}>
					<Text style={styles.signatureName}>
						{state.companyInfo.legalName || "[COMPANY]"}
					</Text>
					<Text style={styles.signatureField}>By:_________________________________</Text>
					<Text style={styles.signatureField}>
						Name: {state.companyInfo.authorizedSignatoryName || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Title: {state.companyInfo.authorizedSignatoryTitle || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Address: {state.companyInfo.companyAddress || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Email: {state.companyInfo.authorizedSignatoryEmail || "_________________________________"}
					</Text>
				</View>

				<View style={styles.signatureLine}>
					<Text style={styles.signatureName}>INVESTOR:</Text>
					<Text style={styles.signatureField}>By:_________________________________</Text>
					<Text style={styles.signatureField}>
						Name: {state.investorInfo.authorizedSignatoryName || state.investorInfo.investorLegalName || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Title: {state.investorInfo.authorizedSignatoryTitle || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Address: {state.investorInfo.investorAddress || "_________________________________"}
					</Text>
					<Text style={styles.signatureField}>
						Email: {state.investorInfo.authorizedSignatoryEmail || "_________________________________"}
					</Text>
				</View>
			</Page>
		</Document>
	)
} 