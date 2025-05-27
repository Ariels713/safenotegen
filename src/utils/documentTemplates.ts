import { Paragraph, HeadingLevel, AlignmentType, TextRun } from 'docx'
import { SafeFormState, SafeType } from '@/types/safeForm'

interface DocumentTemplate {
	title: string
	disclaimer: string
	header: string
	sections: {
		title: string
		content: string
	}[]
	signature: {
		company: {
			title: string
			fields: string[]
		}
		investor: {
			title: string
			fields: string[]
		}
	}
}

const SAFE_TEMPLATES: Record<SafeType, DocumentTemplate> = {
	'Post-Money SAFE - Valuation Cap Only': {
		title: 'POST-MONEY SAFE (VALUATION CAP)',
		disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS SAFE AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
		header: 'THIS CERTIFIES THAT in exchange for the payment by [investorName] (the "Investor") of [investmentAmount] (the "Purchase Amount") on or about [dateOfSafe], [companyName], a [stateIncorporation] corporation (the "Company"), issues to the Investor the right to certain shares of the Company\'s Capital Stock, subject to the terms described below.',
		sections: [
			{
				title: '1. Events',
				content: `(a) Equity Financing. If there is an Equity Financing before the termination of this Safe, on the initial closing of such Equity Financing, this Safe will automatically convert into the greater of: (1) the number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the lowest price per share of the Standard Preferred Stock; or (2) the number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Safe Price.

In connection with the automatic conversion of this Safe into shares of Standard Preferred Stock or Safe Preferred Stock, the Investor will execute and deliver to the Company all of the transaction documents related to the Equity Financing; provided, that such documents (i) are the same documents to be entered into with the purchasers of Standard Preferred Stock, with appropriate variations for the Safe Preferred Stock if applicable, and (ii) have customary exceptions to any drag-along applicable to the Investor, including (without limitation) limited representations, warranties, liability and indemnification obligations for the Investor.

(b) Liquidity Event. If there is a Liquidity Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds, due and payable to the Investor immediately prior to, or concurrent with, the consummation of such Liquidity Event, equal to the greater of (i) the Purchase Amount (the "Cash-Out Amount") or (ii) the amount payable on the number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price (the "Conversion Amount"). If any of the Company's securityholders are given a choice as to the form and amount of Proceeds to be received in a Liquidity Event, the Investor will be given the same choice, provided that the Investor may not choose to receive a form of consideration that the Investor would be ineligible to receive as a result of the Investor's failure to satisfy any requirement or limitation generally applicable to the Company's securityholders, or under any applicable laws.

Notwithstanding the foregoing, in connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce the cash portion of Proceeds payable to the Investor by the amount determined by its board of directors in good faith for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, provided that such reduction (A) does not reduce the total Proceeds payable to such Investor and (B) is applied in the same manner and on a pro rata basis to all securityholders who have equal priority to the Investor under Section 1(d).

(c) Dissolution Event. If there is a Dissolution Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds equal to the Cash-Out Amount, due and payable to the Investor immediately prior to the consummation of the Dissolution Event.

(d) Liquidation Priority. In a Liquidity Event or Dissolution Event, this Safe is intended to operate like standard non-participating Preferred Stock. The Investor's right to receive its Cash-Out Amount is:

(i) Junior to payment of outstanding indebtedness and creditor claims, including contractual claims for payment and convertible promissory notes (to the extent such convertible promissory notes are not actually or notionally converted into Capital Stock);

(ii) On par with payments for other Safes and/or Preferred Stock, and if the applicable Proceeds are insufficient to permit full payments to the Investor and such other Safes and/or Preferred Stock, the applicable Proceeds will be distributed pro rata to the Investor and such other Safes and/or Preferred Stock in proportion to the full payments that would otherwise be due; and

(iii) Senior to payments for Common Stock.

The Investor's right to receive its Conversion Amount is (A) on par with payments for Common Stock and other Safes and/or Preferred Stock who are also receiving Conversion Amounts or Proceeds on a similar as-converted to Common Stock basis, and (B) junior to payments described in clauses (i) and (ii) above (in the latter case, to the extent such payments are Cash-Out Amounts or similar liquidation preferences).

(e) Termination. This Safe will automatically terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this Safe) immediately following the earliest to occur of: (i) the issuance of Capital Stock to the Investor pursuant to the automatic conversion of this Safe under Section 1(a); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b) or Section 1(c).`
			},
			{
				title: '2. Valuation Cap',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the lower of (i) the price per share of the preferred stock sold in the Qualified Financing and (ii) the quotient obtained by dividing the Valuation Cap by the Company Capitalization.'
			},
			{
				title: '3. Definitions',
				content: `"Capital Stock" means the capital stock of the Company, including, without limitation, the "Common Stock" and the "Preferred Stock".

"Change of Control means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company's board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.

"Company Capitalization" is calculated as of immediately prior to the Equity Financing and (without double-counting, in each case calculated on an as-converted to Common Stock basis):

Includes all shares of Capital Stock issued and outstanding;
Includes all Converting Securities;
Includes all (i) issued and outstanding Options and (ii) Promised Options; and
Includes the Unissued Option Pool, except that any increase to the Unissued Option Pool in connection with the Equity Financing will only be included to the extent that the number of Promised Options exceeds the Unissued Option Pool prior to such increase.

"Converting Securities" includes this Safe and other convertible securities issued by the Company, including but not limited to: (i) other Safes; (ii) convertible promissory notes and other convertible debt instruments; and (iii) convertible securities that have the right to convert into shares of Capital Stock.

"Direct Listing" means the Company's initial listing of its Common Stock (other than shares of Common Stock not eligible for resale under Rule 144 under the Securities Act) on a national securities exchange by means of an effective registration statement on Form S-1 filed by the Company with the SEC that registers shares of existing capital stock of the Company for resale, as approved by the Company's board of directors. For the avoidance of doubt, a Direct Listing will not be deemed to be an underwritten offering and will not involve any underwriting services.

"Dissolution Event" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company's creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.

"Dividend Amount" means, with respect to any date on which the Company pays a dividend on its outstanding Common Stock, the amount of such dividend that is paid per share of Common Stock multiplied by (x) the Purchase Amount divided by (y) the Liquidity Price (treating the dividend date as a Liquidity Event solely for purposes of calculating such Liquidity Price).

"Equity Financing" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed valuation, including but not limited to, a pre-money or post-money valuation.

"Initial Public Offering" means the closing of the Company's first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.

"Liquidity Capitalization" is calculated as of immediately prior to the Liquidity Event, and (without double-counting, in each case calculated on an as-converted to Common Stock basis):

Includes all shares of Capital Stock issued and outstanding;
Includes all (i) issued and outstanding Options and (ii) to the extent receiving Proceeds, Promised Options;
Includes all Converting Securities, other than any Safes and other convertible securities (including without limitation shares of Preferred Stock) where the holders of such securities are receiving Cash-Out Amounts or similar liquidation preference payments in lieu of Conversion Amounts or similar "as-converted" payments; and
Excludes the Unissued Option Pool.

"Liquidity Event" means a Change of Control, a Direct Listing or an Initial Public Offering.

"Liquidity Price" means the price per share equal to the Post-Money Valuation Cap divided by the Liquidity Capitalization.

"Options" includes options, restricted stock awards or purchases, RSUs, SARs, warrants or similar securities, vested or unvested.

"Proceeds" means cash and other assets (including without limitation stock consideration) that are proceeds from the Liquidity Event or the Dissolution Event, as applicable, and legally available for distribution.

"Promised Options" means promised but ungranted Options that are the greater of those (i) promised pursuant to agreements or understandings made prior to the execution of, or in connection with, the term sheet or letter of intent for the Equity Financing or Liquidity Event, as applicable (or the initial closing of the Equity Financing or consummation of the Liquidity Event, if there is no term sheet or letter of intent), (ii) in the case of an Equity Financing, treated as outstanding Options in the calculation of the Standard Preferred Stock's price per share, or (iii) in the case of a Liquidity Event, treated as outstanding Options in the calculation of the distribution of the Proceeds.

"Safe" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company's business operations. References to "this Safe" mean this specific instrument.

"Safe Preferred Stock" means the shares of the series of Preferred Stock issued to the Investor in an Equity Financing, having the identical rights, privileges, preferences, seniority, liquidation multiple and restrictions as the shares of Standard Preferred Stock, except that any price-based preferences (such as the per share liquidation amount, initial conversion price and per share dividend amount) will be based on the Safe Price.

"Safe Price" means the price per share equal to the Post-Money Valuation Cap divided by the Company Capitalization.

"Standard Preferred Stock" means the shares of the series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.

"Unissued Option Pool" means all shares of Capital Stock that are reserved, available for future grant and not subject to any outstanding Options or Promised Options (but in the case of a Liquidity Event, only to the extent Proceeds are payable on such Promised Options) under any equity incentive or similar Company plan.`
			},
			{
				title: '4. Company Representations',
				content: `(a) The Company is a corporation duly organized, validly existing and in good standing under the laws of its state of incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.

(b) The execution, delivery and performance by the Company of this Safe is within the power of the Company and has been duly authorized by all necessary actions on the part of the Company (subject to section 3(d)). This Safe constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity. To its knowledge, the Company is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material debt or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.

(c) The performance and consummation of the transactions contemplated by this Safe do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material debt or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien on any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.

(d) No consents or approvals are required in connection with the performance of this Safe, other than: (i) the Company's corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.

(e) To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.`
			},
			{
				title: '5. Investor Representations',
				content: `(a) The Investor has full legal capacity, power and authority to execute and deliver this Safe and to perform its obligations hereunder. This Safe constitutes a valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity.

(b) The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act, and acknowledges and agrees that if not an accredited investor at the time of an Equity Financing, the Company may void this Safe and return the Purchase Amount. The Investor has been advised that this Safe and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this Safe and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor's financial condition and is able to bear the economic risk of such investment for an indefinite period of time.`
			},
			{
				title: '6. Miscellaneous',
				content: `(a) Any provision of this Safe may be amended, waived or modified by written consent of the Company and either (i) the Investor or (ii) the majority-in-interest of all then-outstanding Safes with the same "Post-Money Valuation Cap" and "Discount Rate" as this Safe (and Safes lacking one or both of such terms will be considered to be the same with respect to such term(s)), provided that with respect to clause (ii): (A) the Purchase Amount may not be amended, waived or modified in this manner, (B) the consent of the Investor and each holder of such Safes must be solicited (even if not obtained), and (C) such amendment, waiver or modification treats all such holders in the same manner. "Majority-in-interest" refers to the holders of the applicable group of Safes whose Safes have a total Purchase Amount greater than 50% of the total Purchase Amount of all of such applicable group of Safes.

(b) Any notice required or permitted by this Safe will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party's address listed on the signature page, as subsequently modified by written notice.

(c) The Investor is not entitled, as a holder of this Safe, to vote or be deemed a holder of Capital Stock for any purpose other than tax purposes, nor will anything in this Safe be construed to confer on the Investor, as such, any rights of a Company stockholder or rights to vote for the election of directors or on any matter submitted to Company stockholders, or to give or withhold consent to any corporate action or to receive notice of meetings, until shares have been issued on the terms described in Section 1. However, if the Company pays a dividend on outstanding shares of Common Stock (that is not payable in shares of Common Stock) while this Safe is outstanding, the Company will pay the Dividend Amount to the Investor at the same time.

(d) Neither this Safe nor the rights in this Safe are transferable or assignable, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this Safe and/or its rights may be assigned without the Company's consent by the Investor (i) to the Investor's estate, heirs, executors, administrators, guardians and/or successors in the event of Investor's death or disability, or (ii) to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor.

(e) In the event any one or more of the provisions of this Safe is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this Safe operate or would prospectively operate to invalidate this Safe, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this Safe and the remaining provisions of this Safe will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.

(f) All rights and obligations hereunder will be governed by the laws of the State of [stateGovernance], without regard to the conflicts of law provisions of such jurisdiction.

(g) The parties acknowledge and agree that for United States federal and state income tax purposes this Safe is, and at all times has been, intended to be characterized as stock, and more particularly as common stock for purposes of Sections 304, 305, 306, 354, 368, 1036 and 1202 of the Internal Revenue Code of 1986, as amended. Accordingly, the parties agree to treat this Safe consistent with the foregoing intent for all United States federal and state income tax purposes (including, without limitation, on their respective tax returns or other informational statements).`
			}
		],
		signature: {
			company: {
				title: 'COMPANY:',
				fields: [
					'[companyName]',
					'By:_____________________________________________',
					'[signatoryName]',
					'[signatoryTitle]',
					'Address: [companyAddress]',
					'Email: [signatoryEmail]'
				]
			},
			investor: {
				title: 'INVESTOR:',
				fields: [
					'By:_____________________________________________',
					'Name: [entitySignatoryName]',
					'Title: [entitySignatoryTitle]',
					'Address: [investorAddress]',
					'Email: [entitySignatoryEmail]'
				]
			}
		}
	},
	'Post-Money SAFE - Discount Only': {
		title: 'POST-MONEY SAFE (DISCOUNT)',
		disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS SAFE AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
		header: 'THIS CERTIFIES THAT in exchange for the payment by [investorName] (the "Investor") of [investmentAmount] (the "Purchase Amount") on or about [dateOfSafe], [companyName], a [stateIncorporation] corporation (the "Company"), hereby issues to the Investor the right to certain shares of the Company\'s capital stock, subject to the terms set forth below.',
		sections: [
			{
				title: '1. Events',
				content: `(a) Equity Financing. If there is an Equity Financing before the expiration or termination of this instrument, the Company will automatically issue to the Investor a number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Discount Price.

In connection with the issuance of Safe Preferred Stock by the Company to the Investor pursuant to this Section 1(a):

(i) The Investor will execute and deliver to the Company all transaction documents related to the Equity Financing; provided, that such documents are the same documents to be entered into with the purchasers of Standard Preferred Stock, with appropriate variations for the Safe Preferred Stock if applicable, and provided further, that such documents have customary exceptions to any drag-along applicable to the Investor, including, without limitation, limited representations and warranties and limited liability and indemnification obligations on the part of the Investor; and

(ii) The Investor and the Company will execute a Pro Rata Rights Agreement, unless the Investor is already included in such rights in the transaction documents related to the Equity Financing.

(b) Liquidity Event. If there is a Liquidity Event before the expiration or termination of this instrument, the Investor will, at its option, either (i) receive a cash payment equal to the Purchase Amount (subject to the following paragraph) or (ii) automatically receive from the Company a number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price, if the Investor fails to select the cash option.

In connection with Section (b)(i), the Purchase Amount will be due and payable by the Company to the Investor immediately prior to, or concurrent with, the consummation of the Liquidity Event. If there are not enough funds to pay the Investor and holders of other Safes (collectively, the "Cash-Out Investors") in full, then all of the Company's available funds will be distributed with equal priority and pro rata among the Cash-Out Investors in proportion to their Purchase Amounts, and the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price. In connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce, pro rata, the Purchase Amounts payable to the Cash-Out Investors by the amount determined by its board of directors in good faith to be advisable for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, and in such case, the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price.

(c) Dissolution Event. If there is a Dissolution Event before this instrument expires or terminates, the Company will pay an amount equal to the Purchase Amount, due and payable to the Investor immediately prior to, or concurrent with, the consummation of the Dissolution Event. The Purchase Amount will be paid prior and in preference to any Distribution of any of the assets of the Company to holders of outstanding Capital Stock by reason of their ownership thereof. If immediately prior to the consummation of the Dissolution Event, the assets of the Company legally available for distribution to the Investor and all holders of all other Safes (the "Dissolving Investors"), as determined in good faith by the Company's board of directors, are insufficient to permit the payment to the Dissolving Investors of their respective Purchase Amounts, then the entire assets of the Company legally available for distribution will be distributed with equal priority and pro rata among the Dissolving Investors in proportion to the Purchase Amounts they would otherwise be entitled to receive pursuant to this Section 1(c).

(d) Termination. This instrument will expire and terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this instrument) upon either (i) the issuance of stock to the Investor pursuant to Section 1(a) or Section 1(b)(ii); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b)(i) or Section 1(c).`
			},
			{
				title: '2. Definitions',
				content: `"Capital Stock" means the capital stock of the Company, including, without limitation, the "Common Stock" and the "Preferred Stock."

"Change of Control" means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company's board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.

"Discount Price" means the price per share of the Standard Preferred Stock sold in the Equity Financing multiplied by the Discount Rate.

"Distribution" means the transfer to holders of Capital Stock by reason of their ownership thereof of cash or other property without consideration whether by way of dividend or otherwise, other than dividends on Common Stock payable in Common Stock, or the purchase or redemption of Capital Stock by the Company or its subsidiaries for cash or property other than: (i) repurchases of Common Stock held by employees, officers, directors or consultants of the Company or its subsidiaries pursuant to an agreement providing, as applicable, a right of first refusal or a right to repurchase shares upon termination of such service provider's employment or services; or (ii) repurchases of Capital Stock in connection with the settlement of disputes with any stockholder.

"Dissolution Event" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company's creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.

"Equity Financing" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed pre-money valuation.

"Initial Public Offering" means the closing of the Company's first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.

"Liquidity Event" means a Change of Control or an Initial Public Offering.

"Liquidity Price" means the price per share equal to: the fair market value of the Common Stock at the time of the Liquidity Event, as determined by reference to the purchase price payable in connection with such Liquidity Event, multiplied by the Discount Rate.

"Pro Rata Rights Agreement" means a written agreement between the Company and the Investor (and holders of other Safes, as appropriate) giving the Investor a right to purchase its pro rata share of private placements of securities by the Company occurring after the Equity Financing, subject to customary exceptions. Pro rata for purposes of the Pro Rata Rights Agreement will be calculated based on the ratio of (1) the number of shares of Capital Stock owned by the Investor immediately prior to the issuance of the securities to (2) the total number of shares of outstanding Capital Stock on a fully diluted basis, calculated as of immediately prior to the issuance of the securities.

"Safe" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company's business operations.

"Safe Preferred Stock" means the shares of a series of Preferred Stock issued to the Investor in an Equity Financing, having the identical rights, privileges, preferences and restrictions as the shares of Standard Preferred Stock, other than with respect to: (i) the per share liquidation preference and the conversion price for purposes of price-based anti-dilution protection, which will equal the Discount Price; and (ii) the basis for any dividend rights, which will be based on the Discount Price.

"Safe Price" means the price per share equal to the Post-Money Valuation Cap divided by the Company Capitalization.

"Standard Preferred Stock" means the shares of a series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.`
			},
			{
				title: '3. Company Representations',
				content: `(a) The Company is a corporation duly organized, validly existing and in good standing under the laws of the state of its incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.

(b) The execution, delivery and performance by the Company of this instrument is within the power of the Company and, other than with respect to the actions to be taken when equity is to be issued to the Investor, has been duly authorized by all necessary actions on the part of the Company. This instrument constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity. To the knowledge of the Company, it is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material indenture or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.

(c) The performance and consummation of the transactions contemplated by this instrument do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material indenture or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.

(d) No consents or approvals are required in connection with the performance of this instrument, other than: (i) the Company's corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.

(e) To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.`
			},
			{
				title: '4. Investor Representations',
				content: `(a) The Investor has full legal capacity, power and authority to execute and deliver this instrument and to perform its obligations hereunder. This instrument constitutes valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity.

(b) The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act. The Investor has been advised that this instrument and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this instrument and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor's financial condition and is able to bear the economic risk of such investment for an indefinite period of time.`
			},
			{
				title: '5. Miscellaneous',
				content: `(a) Any provision of this instrument may be amended, waived or modified only upon the written consent of the Company and the Investor.

(b) Any notice required or permitted by this instrument will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party's address listed on the signature page, as subsequently modified by written notice.

(c) The Investor is not entitled, as a holder of this instrument, to vote or receive dividends or be deemed the holder of Capital Stock for any purpose, nor will anything contained herein be construed to confer on the Investor, as such, any of the rights of a stockholder of the Company or any right to vote for the election of directors or upon any matter submitted to stockholders at any meeting thereof, or to give or withhold consent to any corporate action or to receive notice of meetings, or to receive subscription rights or otherwise until shares have been issued upon the terms described herein.

(d) Neither this instrument nor the rights contained herein may be assigned, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this instrument and/or the rights contained herein may be assigned without the Company's consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor; and provided, further, that the Company may assign this instrument in whole, without the consent of the Investor, in connection with a reincorporation to change the Company's domicile.

(e) In the event any one or more of the provisions of this instrument is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this instrument operate or would prospectively operate to invalidate this instrument, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this instrument and the remaining provisions of this instrument will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.

(f) All rights and obligations hereunder will be governed by the laws of the State of [stateGovernance], without regard to the conflicts of law provisions of such jurisdiction.`
			}
		],
		signature: {
			company: {
				title: 'COMPANY:',
				fields: [
					'[companyName]',
					'By:_____________________________________________',
					'[signatoryName]',
					'[signatoryTitle]',
					'Address: [companyAddress]',
					'Email: [signatoryEmail]'
				]
			},
			investor: {
				title: 'INVESTOR:',
				fields: [
					'By:_____________________________________________',
					'Name: [investorName]',
					'Title: [entitySignatoryTitle]',
					'Address: [investorAddress]',
					'Email: [entitySignatoryEmail]'
				]
			}
		}
	},
	'Post-Money SAFE - MFN (Most Favored Nation)': {
		title: 'POST-MONEY SAFE (MFN)',
		disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS SAFE AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
		header: 'THIS CERTIFIES THAT in exchange for the payment by [investorName] (the "Investor") of [investmentAmount] (the "Purchase Amount") on or about [dateOfSafe], [companyName], a [stateIncorporation] corporation (the "Company"), issues to the Investor the right to certain shares of the Company\'s Capital Stock, subject to the terms described below.',
		sections: [
			{
				title: '1. Events',
				content: `(a) Equity Financing. If there is an Equity Financing before the termination of this Safe, on the initial closing of such Equity Financing, this Safe will automatically convert into the number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the lowest price per share of the Standard Preferred Stock.

In connection with the automatic conversion of this Safe into shares of Standard Preferred Stock, the Investor will execute and deliver to the Company all of the transaction documents related to the Equity Financing; provided, that such documents (i) are the same documents to be entered into with the purchasers of Standard Preferred Stock, and (ii) have customary exceptions to any drag-along applicable to the Investor, including (without limitation) limited representations, warranties, liability and indemnification obligations for the Investor.

(b) Liquidity Event. If there is a Liquidity Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below and the "MFN" Amendment Provision in Section 3 below) to receive a portion of Proceeds, due and payable to the Investor immediately prior to, or concurrent with, the consummation of such Liquidity Event, equal to the Purchase Amount (the "Cash-Out Amount"). If any of the Company's securityholders are given a choice as to the form and amount of Proceeds to be received in a Liquidity Event, the Investor will be given the same choice, provided that the Investor may not choose to receive a form of consideration that the Investor would be ineligible to receive as a result of the Investor's failure to satisfy any requirement or limitation generally applicable to the Company's securityholders, or under any applicable laws.

Notwithstanding the foregoing, in connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce the cash portion of Proceeds payable to the Investor by the amount determined by its board of directors in good faith for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, provided that such reduction (A) does not reduce the total Proceeds payable to such Investor and (B) is applied in the same manner and on a pro rata basis to all securityholders who have equal priority to the Investor under Section 1(d).

(c) Dissolution Event. If there is a Dissolution Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds equal to the Cash-Out Amount, due and payable to the Investor immediately prior to the consummation of the Dissolution Event.

(d) Liquidation Priority. In a Liquidity Event or Dissolution Event, this Safe is intended to operate like standard non-participating Preferred Stock. The Investor's right to receive its Cash-Out Amount is:

(i) Junior to payment of outstanding indebtedness and creditor claims, including contractual claims for payment and convertible promissory notes (to the extent such convertible promissory notes are not actually or notionally converted into Capital Stock);

(ii) On par with payments for other Safes and/or Preferred Stock, and if the applicable Proceeds are insufficient to permit full payments to the Investor and such other Safes and/or Preferred Stock, the applicable Proceeds will be distributed pro rata to the Investor and such other Safes and/or Preferred Stock in proportion to the full payments that would otherwise be due; and

(iii) Senior to payments for Common Stock.

The Investor's right to receive its Cash-Out Amount is (A) on par with payments for Common Stock and other Safes and/or Preferred Stock who are also receiving Cash-Out Amounts or Proceeds on a similar as-converted to Common Stock basis, and (B) junior to payments described in clauses (i) and (ii) above (in the latter case, to the extent such payments are Cash-Out Amounts or similar liquidation preferences).

(e) Termination. This Safe will automatically terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this Safe) immediately following the earliest to occur of: (i) the issuance of Capital Stock to the Investor pursuant to the automatic conversion of this Safe under Section 1(a); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b) or Section 1(c).`
			},
			{
				title: '2. Definitions',
				content: `"Capital Stock" means the capital stock of the Company, including, without limitation, the "Common Stock" and the "Preferred Stock".

"Change of Control" means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company's board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.

"Direct Listing" means the Company's initial listing of its Common Stock (other than shares of Common Stock not eligible for resale under Rule 144 under the Securities Act) on a national securities exchange by means of an effective registration statement on Form S-1 filed by the Company with the SEC that registers shares of existing capital stock of the Company for resale, as approved by the Company's board of directors. For the avoidance of doubt, a Direct Listing will not be deemed to be an underwritten offering and will not involve any underwriting services.

"Dissolution Event" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company's creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.

"Dividend Amount" means, with respect to any date on which the Company pays a dividend on its outstanding Common Stock, the amount of such dividend that is paid per share of Common Stock multiplied by (x) the Purchase Amount divided by (y) the Liquidity Price (treating the dividend date as a Liquidity Event solely for purposes of calculating such Liquidity Price).

"Equity Financing" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed valuation, including but not limited to, a pre-money or post-money valuation.

"Initial Public Offering" means the closing of the Company's first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.

"Liquidity Event" means a Change of Control, a Direct Listing or an Initial Public Offering.

"Liquidity Price" means the fair market value of the Common Stock at the time of the applicable Liquidity Event (determined by reference to the purchase price payable in connection with such Liquidity Event).

"Proceeds" means cash and other assets (including without limitation stock consideration) that are proceeds from the Liquidity Event or the Dissolution Event, as applicable, and legally available for distribution.

"Safe" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company's business operations. References to "this Safe" mean this specific instrument.

"Standard Preferred Stock" means the shares of the series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.

"Subsequent Convertible Securities" means convertible securities that the Company may issue after the issuance of this instrument with the principal purpose of raising capital, including but not limited to, other Safes, convertible debt instruments and other convertible securities. Subsequent Convertible Securities excludes: (i) side letters or ancillary agreements that do not amend or modify the terms of such convertible securities; and (ii) the following types of securities: (A) options issued pursuant to any equity incentive or similar plan of the Company; (B) convertible securities issued or issuable to (1) banks, equipment lessors, financial institutions or other persons engaged in the business of making loans pursuant to a debt financing or commercial leasing or (2) suppliers or third party service providers in connection with the provision of goods or services pursuant to transactions; and (C) convertible securities issued or issuable in connection with sponsored research, collaboration, technology license, development, OEM, marketing or other similar agreements or strategic partnerships.`
			},
			{
				title: '3. "MFN" Amendment Provision',
				content: `If the Company issues any Subsequent Convertible Securities with terms more favorable than those of this Safe (including, without limitation, a valuation cap and/or discount) prior to termination of this Safe, the Company will promptly provide the Investor with written notice thereof, together with a copy of such Subsequent Convertible Securities (the "MFN Notice") and, upon written request of the Investor, any additional information related to such Subsequent Convertible Securities as may be reasonably requested by the Investor. In the event the Investor determines that the terms of the Subsequent Convertible Securities are preferable to the terms of this instrument, the Investor will notify the Company in writing within 10 days of the receipt of the MFN Notice. Promptly after receipt of such written notice from the Investor, the Company agrees to amend and restate this instrument to be identical to the instrument(s) evidencing the Subsequent Convertible Securities.`
			},
			{
				title: '4. Company Representations',
				content: `(a) The Company is a corporation duly organized, validly existing and in good standing under the laws of its state of incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.

(b) The execution, delivery and performance by the Company of this Safe is within the power of the Company and has been duly authorized by all necessary actions on the part of the Company (subject to section 4(d)). This Safe constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity. To its knowledge, the Company is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material debt or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.

(c) The performance and consummation of the transactions contemplated by this Safe do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material debt or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.

(d) No consents or approvals are required in connection with the performance of this Safe, other than: (i) the Company's corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.

(e) To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.`
			},
			{
				title: '5. Investor Representations',
				content: `(a) The Investor has full legal capacity, power and authority to execute and deliver this Safe and to perform its obligations hereunder. This Safe constitutes a valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity.

(b) The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act, and acknowledges and agrees that if not an accredited investor at the time of an Equity Financing, the Company may void this Safe and return the Purchase Amount. The Investor has been advised that this Safe and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this Safe and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor's financial condition and is able to bear the economic risk of such investment for an indefinite period of time.`
			},
			{
				title: '6. Miscellaneous',
				content: `(a) Any provision of this Safe may be amended, waived or modified by written consent of the Company and either (i) the Investor or (ii) the majority-in-interest of all then-outstanding Safes with the same "Post-Money Valuation Cap" and "Discount Rate" as this Safe (and Safes lacking one or both of such terms will be considered to be the same with respect to such term(s)), provided that with respect to clause (ii): (A) the Purchase Amount and Section 3 may not be amended, waived or modified in this manner, (B) the consent of the Investor and each holder of such Safes must be solicited (even if not obtained), and (C) such amendment, waiver or modification treats all such holders in the same manner. "Majority-in-interest" refers to the holders of the applicable group of Safes whose Safes have a total Purchase Amount greater than 50% of the total Purchase Amount of all of such applicable group of Safes.

(b) Any notice required or permitted by this Safe will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party's address listed on the signature page, as subsequently modified by written notice.

(c) The Investor is not entitled, as a holder of this Safe, to vote or be deemed a holder of Capital Stock for any purpose other than tax purposes, nor will anything in this Safe be construed to confer on the Investor, as such, any rights of a Company stockholder or rights to vote for the election of directors or on any matter submitted to Company stockholders, or to give or withhold consent to any corporate action or to receive notice of meetings, until shares have been issued on the terms described in Section 1. However, if the Company pays a dividend on outstanding shares of Common Stock (that is not payable in shares of Common Stock) while this Safe is outstanding, the Company will pay the Dividend Amount to the Investor at the same time.

(d) Neither this Safe nor the rights in this Safe are transferable or assignable, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this Safe and/or its rights may be assigned without the Company's consent by the Investor (i) to the Investor's estate, heirs, executors, administrators, guardians and/or successors in the event of Investor's death or disability, or (ii) to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor.

(e) In the event any one or more of the provisions of this Safe is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this Safe operate or would prospectively operate to invalidate this Safe, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this Safe and the remaining provisions of this Safe will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.

(f) All rights and obligations hereunder will be governed by the laws of the State of [stateGovernance], without regard to the conflicts of law provisions of such jurisdiction.

(g) The parties acknowledge and agree that for United States federal and state income tax purposes this Safe is, and at all times has been, intended to be characterized as stock, and more particularly as common stock for purposes of Sections 304, 305, 306, 354, 368, 1036 and 1202 of the Internal Revenue Code of 1986, as amended. Accordingly, the parties agree to treat this Safe consistent with the foregoing intent for all United States federal and state income tax purposes (including, without limitation, on their respective tax returns or other informational statements).`
			}
		],
		signature: {
			company: {
				title: 'COMPANY:',
				fields: [
					'[companyName]',
					'By:_____________________________________________',
					'[signatoryName]',
					'[signatoryTitle]',
					'Address: [companyAddress]',
					'Email: [signatoryEmail]'
				]
			},
			investor: {
				title: 'INVESTOR:',
				fields: [
					'By:_____________________________________________',
					'Name: [investorName]',
					'Title: [entitySignatoryTitle]',
					'Address: [investorAddress]',
					'Email: [entitySignatoryEmail]'
				]
			}
		}
	},
	'Pre-Money SAFE - Valuation Cap Only': {
		title: 'PRE-MONEY SAFE (VALUATION CAP)',
		disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
		header: 'THIS CERTIFIES THAT in exchange for the payment by [investorName] (the "Investor") of [investmentAmount] (the "Purchase Amount") on or about [dateOfSafe], [companyName], a [stateIncorporation] corporation (the "Company"), hereby issues to the Investor the right to certain shares of the Company\'s capital stock, subject to the terms set forth below.',
		sections: [
			{
				title: '1. Events',
				content: `(a) Equity Financing. If there is an Equity Financing before the expiration or termination of this instrument, the Company will automatically issue to the Investor either: (1) a number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the price per share of the Standard Preferred Stock, if the pre-money valuation is less than or equal to the Valuation Cap; or (2) a number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Safe Price, if the pre-money valuation is greater than the Valuation Cap.

In connection with the issuance of Standard Preferred Stock or Safe Preferred Stock, as applicable, by the Company to the Investor pursuant to this Section 1(a):

(i) The Investor will execute and deliver to the Company all transaction documents related to the Equity Financing; provided, that such documents are the same documents to be entered into with the purchasers of Standard Preferred Stock, with appropriate variations for the Safe Preferred Stock if applicable, and provided further, that such documents have customary exceptions to any drag-along applicable to the Investor, including, without limitation, limited representations and warranties and limited liability and indemnification obligations on the part of the Investor; and

(ii) The Investor and the Company will execute a Pro Rata Rights Agreement, unless the Investor is already included in such rights in the transaction documents related to the Equity Financing.

(b) Liquidity Event. If there is a Liquidity Event before the expiration or termination of this instrument, the Investor will, at its option, either (i) receive a cash payment equal to the Purchase Amount (subject to the following paragraph) or (ii) automatically receive from the Company a number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price, if the Investor fails to select the cash option.

In connection with Section (b)(i), the Purchase Amount will be due and payable by the Company to the Investor immediately prior to, or concurrent with, the consummation of the Liquidity Event. If there are not enough funds to pay the Investor and holders of other Safes (collectively, the "Cash-Out Investors") in full, then all of the Company's available funds will be distributed with equal priority and pro rata among the Cash-Out Investors in proportion to their Purchase Amounts, and the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price. In connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce, pro rata, the Purchase Amounts payable to the Cash-Out Investors by the amount determined by its board of directors in good faith to be advisable for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, and in such case, the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price.

(c) Dissolution Event. If there is a Dissolution Event before this instrument expires or terminates, the Company will pay an amount equal to the Purchase Amount, due and payable to the Investor immediately prior to, or concurrent with, the consummation of the Dissolution Event. The Purchase Amount will be paid prior and in preference to any Distribution of any of the assets of the Company to holders of outstanding Capital Stock by reason of their ownership thereof. If immediately prior to the consummation of the Dissolution Event, the assets of the Company legally available for distribution to the Investor and all holders of all other Safes (the "Dissolving Investors"), as determined in good faith by the Company's board of directors, are insufficient to permit the payment to the Dissolving Investors of their respective Purchase Amounts, then the entire assets of the Company legally available for distribution will be distributed with equal priority and pro rata among the Dissolving Investors in proportion to the Purchase Amounts they would otherwise be entitled to receive pursuant to this Section 1(c).

(d) Termination. This instrument will expire and terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this instrument) upon either (i) the issuance of stock to the Investor pursuant to Section 1(a) or Section 1(b)(ii); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b)(i) or Section 1(c).`
			},
			{
				title: '2. Definitions',
				content: `"Capital Stock" means the capital stock of the Company, including, without limitation, the "Common Stock" and the "Preferred Stock".

"Change of Control" means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company's board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.

"Company Capitalization" means the sum, as of immediately prior to the Equity Financing, of: (1) all shares of Capital Stock (on an as-converted basis) issued and outstanding, assuming exercise or conversion of all outstanding vested and unvested options, warrants and other convertible securities, but excluding (A) this instrument, (B) all other Safes, and (C) convertible promissory notes; and (2) all shares of Common Stock reserved and available for future grant under any equity incentive or similar plan of the Company, and/or any equity incentive or similar plan to be created or increased in connection with the Equity Financing.

"Distribution" means the transfer to holders of Capital Stock by reason of their ownership thereof of cash or other property without consideration whether by way of dividend or otherwise, other than dividends on Common Stock payable in Common Stock, or the purchase or redemption of Capital Stock by the Company or its subsidiaries for cash or property other than: (i) repurchases of Common Stock held by employees, officers, directors or consultants of the Company or its subsidiaries pursuant to an agreement providing, as applicable, a right of first refusal or a right to repurchase shares upon termination of such service provider's employment or services; or (ii) repurchases of Capital Stock in connection with the settlement of disputes with any stockholder.

"Dissolution Event" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company's creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.

"Equity Financing" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed pre-money valuation.

"Initial Public Offering" means the closing of the Company's first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.

"Liquidity Capitalization" means the number, as of immediately prior to the Liquidity Event, of shares of Capital Stock (on an as-converted basis) outstanding, assuming exercise or conversion of all outstanding vested and unvested options, warrants and other convertible securities, but excluding: (i) shares of Common Stock reserved and available for future grant under any equity incentive or similar plan; (ii) this instrument; (iii) other Safes; and (iv) convertible promissory notes.

"Liquidity Event" means a Change of Control or an Initial Public Offering.

"Liquidity Price" means the price per share equal to the Valuation Cap divided by the Liquidity Capitalization.

"Proceeds" means cash and other assets (including without limitation stock consideration) that are proceeds from the Liquidity Event or the Dissolution Event, as applicable, and legally available for distribution.

"Promised Options" means promised but ungranted Options that are the greater of those (i) promised pursuant to agreements or understandings made prior to the execution of, or in connection with, the term sheet or letter of intent for the Equity Financing or Liquidity Event, as applicable (or the initial closing of the Equity Financing or consummation of the Liquidity Event, if there is no term sheet or letter of intent), (ii) in the case of an Equity Financing, treated as outstanding Options in the calculation of the Standard Preferred Stock's price per share, or (iii) in the case of a Liquidity Event, treated as outstanding Options in the calculation of the distribution of the Proceeds.

"Safe" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company's business operations.

"Safe Preferred Stock" means the shares of a series of Preferred Stock issued to the Investor in an Equity Financing, having the identical rights, privileges, preferences and restrictions as the shares of Standard Preferred Stock, other than with respect to: (i) the per share liquidation preference and the conversion price for purposes of price-based anti-dilution protection, which will equal the Safe Price; and (ii) the basis for any dividend rights, which will be based on the Safe Price.

"Safe Price" means the price per share equal to the Valuation Cap divided by the Company Capitalization.

"Standard Preferred Stock" means the shares of a series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.`
			},
			{
				title: '3. Company Representations',
				content: `(a) The Company is a corporation duly organized, validly existing and in good standing under the laws of the state of its incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.

(b) The execution, delivery and performance by the Company of this instrument is within the power of the Company and, other than with respect to the actions to be taken when equity is to be issued to the Investor, has been duly authorized by all necessary actions on the part of the Company. This instrument constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity. To the knowledge of the Company, it is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material debt or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.

(c) The performance and consummation of the transactions contemplated by this instrument do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material debt or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.

(d) No consents or approvals are required in connection with the performance of this instrument, other than: (i) the Company's corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.

(e) To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.`
			},
			{
				title: '4. Investor Representations',
				content: `(a) The Investor has full legal capacity, power and authority to execute and deliver this instrument and to perform its obligations hereunder. This instrument constitutes valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors' rights generally and general principles of equity.

(b) The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act. The Investor has been advised that this instrument and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this instrument and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor's financial condition and is able to bear the economic risk of such investment for an indefinite period of time.`
			},
			{
				title: '5. Miscellaneous',
				content: `(a) Any provision of this instrument may be amended, waived or modified only upon the written consent of the Company and the Investor.

(b) Any notice required or permitted by this instrument will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party's address listed on the signature page, as subsequently modified by written notice.

(c) The Investor is not entitled, as a holder of this instrument, to vote or receive dividends or be deemed the holder of Capital Stock for any purpose, nor will anything contained herein be construed to confer on the Investor, as such, any of the rights of a stockholder of the Company or any right to vote for the election of directors or upon any matter submitted to stockholders at any meeting thereof, or to give or withhold consent to any corporate action or to receive notice of meetings, or to receive subscription rights or otherwise until shares have been issued upon the terms described herein.

(d) Neither this instrument nor the rights contained herein may be assigned, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this instrument and/or the rights contained herein may be assigned without the Company's consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor; and provided, further, that the Company may assign this instrument in whole, without the consent of the Investor, in connection with a reincorporation to change the Company's domicile.

(e) In the event any one or more of the provisions of this instrument is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this instrument operate or would prospectively operate to invalidate this instrument, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this instrument and the remaining provisions of this instrument will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.

(f) All rights and obligations hereunder will be governed by the laws of the State of [stateGovernance], without regard to the conflicts of law provisions of such jurisdiction.`
			}
		],
		signature: {
			company: {
				title: 'COMPANY:',
				fields: [
					'[companyName]',
					'By:_____________________________________________',
					'[signatoryName]',
					'[signatoryTitle]',
					'Address: [companyAddress]',
					'Email: [signatoryEmail]'
				]
			},
			investor: {
				title: 'INVESTOR:',
				fields: [
					'By:_____________________________________________',
					'Name: [investorName]',
					'Title: [entitySignatoryTitle]',
					'Address: [investorAddress]',
					'Email: [entitySignatoryEmail]'
				]
			}
		}
	}
}

const PRO_RATA_TEMPLATE: DocumentTemplate = {
	title: 'PRO RATA AGREEMENT',
	disclaimer: '',
	header: 'This agreement (this "Agreement") is entered into on or about [dateOfSafe] in connection with the purchase by [investorName] (the "Investor") of that certain simple agreement for future equity with a "Post-Money Valuation Cap" (the "Investor\'s Safe") issued by [companyName] (the "Company") on or about the date of this Agreement. As a material inducement to the Investor\'s investment, the Company agrees to the provisions set forth in this Agreement. Capitalized terms used herein shall have the meanings set forth in the Investor\'s Safe.',
	sections: [
		{
			title: '1. Pro Rata Rights',
			content: `The Investor shall have the right to purchase its pro rata share of Standard Preferred Stock being sold in the Equity Financing (the "Pro Rata Right"). Pro rata share for purposes of this Pro Rata Right is the ratio of (x) the number of shares of Capital Stock issued from the conversion of all of the Investor's Safes with a "Post-Money Valuation Cap" to (y) the Company Capitalization. The Pro Rata Right described above shall automatically terminate upon the earlier of (i) the initial closing of the Equity Financing; (ii) immediately prior to the closing of a Liquidity Event; or (iii) immediately prior to the Dissolution Event.`
		},
		{
			title: '2. Assignment',
			content: `Neither this Agreement nor the rights contained herein may be assigned, by operation of law or otherwise, by Investor without the prior written consent of the Company; provided, however, that this Agreement and/or the rights contained herein may be assigned without the Company's consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor.`
		},
		{
			title: '3. Amendments',
			content: `Any provision of this Agreement may be amended, waived or modified upon the written consent of the Company and either (i) the holders of a majority of shares of Capital Stock issued from all Safes converted in connection with the Equity Financing held by the Investor and other Safe holders with Pro Rata Rights pursuant to agreements on the same form as this Agreement (available at http://ycombinator.com/documents), provided that such amendment, waiver or modification treats all such holders in the same manner, or (ii) the Investor. The Company will promptly notify the Investor of any amendment, waiver or modification that the Investor did not consent to. This Agreement is the form available at http://ycombinator.com/documents and the Company and the Investor agree that neither one has modified the form, except to fill in blanks and bracketed terms. The choice of law governing any dispute or claim arising out of or in connection with this Agreement shall be consistent with that set forth in the Investor's Safe.`
		}
	],
	signature: {
		company: {
			title: 'COMPANY:',
			fields: [
				'[companyName]',
				'By:_____________________________________________',
				'[signatoryName]',
				'[signatoryTitle]'
			]
		},
		investor: {
			title: 'INVESTOR:',
			fields: [
				'[investorName]',
				'By:_____________________________________________',
				'Name: [investorName]',
				'Title: [entitySignatoryTitle]'
			]
		}
	}
}

export const getDocumentTemplate = (state: SafeFormState): DocumentTemplate => {
	if (!state.safeType) {
		throw new Error('SAFE type is required')
	}
	return SAFE_TEMPLATES[state.safeType]
}

export const getProRataTemplate = (): DocumentTemplate => {
	return PRO_RATA_TEMPLATE
}

export const createDocumentParagraphs = (template: DocumentTemplate, state: SafeFormState): Paragraph[] => {
	const paragraphs: Paragraph[] = [
		new Paragraph({
			text: template.disclaimer,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: state.companyInfo.legalName || '',
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: template.title,
			heading: HeadingLevel.HEADING_1,
			alignment: AlignmentType.CENTER,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: '(Simple Agreement for Future Equity)',
			alignment: AlignmentType.CENTER,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: template.header
				.replace('[investorName]', state.investorInfo.investorLegalName || '')
				.replace('[investmentAmount]', state.investorInfo.investmentAmount?.toLocaleString() || '')
				.replace('[dateOfSafe]', new Date(state.investorInfo.investDate || '').toLocaleDateString())
				.replace('[companyName]', state.companyInfo.legalName || '')
				.replace('[stateIncorporation]', state.companyInfo.stateOfIncorporation || ''),
			spacing: { after: 200 }
		})
	]

	// Add template-specific sections
	template.sections.forEach(section => {
		paragraphs.push(
			new Paragraph({
				text: section.title,
				heading: HeadingLevel.HEADING_2,
				spacing: { before: 400, after: 200 }
			}),
			new Paragraph({
				text: section.content,
				spacing: { after: 200 }
			})
		)
	})

	// Add signature sections
	paragraphs.push(
		new Paragraph({
			text: 'IN WITNESS WHEREOF, the undersigned have caused this Safe to be duly executed and delivered.',
			spacing: { before: 400, after: 200 }
		}),
		new Paragraph({
			text: template.signature.company.title,
			spacing: { before: 400, after: 200 }
		})
	)

	template.signature.company.fields.forEach(field => {
		paragraphs.push(
			new Paragraph({
				text: field
					.replace('[companyName]', state.companyInfo.legalName || '')
					.replace('[signatoryName]', state.companyInfo.authorizedSignatoryName || '')
					.replace('[signatoryTitle]', state.companyInfo.authorizedSignatoryTitle || '')
					.replace('[companyAddress]', state.companyInfo.companyAddress || '')
					.replace('[signatoryEmail]', state.companyInfo.authorizedSignatoryEmail || ''),
				spacing: { after: 200 }
			})
		)
	})

	paragraphs.push(
		new Paragraph({
			text: template.signature.investor.title,
			spacing: { before: 400, after: 200 }
		})
	)

	template.signature.investor.fields.forEach(field => {
		paragraphs.push(
			new Paragraph({
				text: field
					.replace('[entitySignatoryName]', state.investorInfo.authorizedSignatoryName || '')
					.replace('[entitySignatoryTitle]', state.investorInfo.authorizedSignatoryTitle || '')
					.replace('[investorAddress]', state.investorInfo.investorAddress || '')
					.replace('[entitySignatoryEmail]', state.investorInfo.authorizedSignatoryEmail || ''),
				spacing: { after: 200 }
			})
		)
	})

	return paragraphs
} 