import {
	Document,
	Packer,
	Paragraph,
	TextRun,
	AlignmentType,
	Header,
	Footer,
	PageNumber,
	NumberFormat,
	PageBreak,
} from 'docx'
import { SafeFormState } from '@/types/safeForm'

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount)
}

export const generatePreMoneyDiscountSafe = async (state: SafeFormState): Promise<Blob> => {
	const doc = new Document({
		sections: [{
			properties: {
				page: {
					pageNumbers: {
						start: 1,
						formatType: NumberFormat.DECIMAL,
					},
				},
			},
			headers: {
				default: new Header({
					children: [
						new Paragraph({
							children: [
								new TextRun({
									text: 'Pre-Money SAFE - Discount Only',
									font: 'Times New Roman',
									size: 24,
									bold: true,
								}),
							],
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
			},
			footers: {
				default: new Footer({
					children: [
						new Paragraph({
							alignment: AlignmentType.CENTER,
							children: [
								new TextRun({
									text: 'Page ',
									font: 'Times New Roman',
									size: 20,
								}),
								new TextRun({
									children: [PageNumber.CURRENT],
									font: 'Times New Roman',
									size: 20,
								}),
							],
						}),
					],
				}),
			},
			children: [
				// Disclaimer
				new Paragraph({
					children: [
						new TextRun({
							text: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "',
						}),
						new TextRun({
							text: 'SECURITIES ACT',
							bold: true,
						}),
						new TextRun({
							text: '"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES.  THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
						}),
					],
					spacing: {
						after: 200,
					},
					alignment: AlignmentType.JUSTIFIED,
				}),

				// Company Name
				new Paragraph({
					children: [
						new TextRun({
							text: state.companyInfo.legalName || '_________________',
							bold: true,
							size: 22,
						}),
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 400,
					},
				}),

				// Title
				new Paragraph({
					children: [
						new TextRun({
							text: 'SAFE',
							bold: true,
							size: 22,
						}),
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 25,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(Simple Agreement for Future Equity)',
							bold: true,
							size: 22,
						}),
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 400,
					},
				}),

				// Introduction
				new Paragraph({
					children: [
						new TextRun({
							text: `THIS CERTIFIES THAT in exchange for the payment by ${
								state.investorInfo.investorLegalName || '_________________'
							} (the "`,
						}),
						new TextRun({
							text: 'Investor',
							bold: true,
						}),
						new TextRun({
							text: `") of ${
								state.investorInfo.investmentAmount 
									? formatCurrency(state.investorInfo.investmentAmount)
									: '_________________'
							} (the "`,
						}),
						new TextRun({
							text: 'Purchase Amount',
							bold: true,
						}),
						new TextRun({
							text: `") on or about ${state.investorInfo.investDate || '_________________'}, ${
								state.companyInfo.legalName || '_________________'
							}, a ${state.companyInfo.stateOfIncorporation || '_________________'} corporation (the "`,
						}),
						new TextRun({
							text: 'Company',
							bold: true,
						}),
						new TextRun({
							text: '"), hereby issues to the Investor the right to certain shares of the Company\'s Capital Stock, subject to the terms set forth below.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Discount Rate
				new Paragraph({
					children: [
						new TextRun({
							text: 'The "',
						}),
						new TextRun({
							text: 'Discount Rate',
							bold: true,
						}),
						new TextRun({
							text: `" is ${100 - (state.discount || 0)}%.`,
						})
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: "See ",
						}),
						new TextRun({
							text: "Section 2",
							bold: true,
						}),
						new TextRun({
							text: " for certain additional defined terms.",
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 1: Events
				new Paragraph({
					children: [
						new TextRun({
							text: '1. Events',
							bold: true,
							italics: true,
							font: 'Times New Roman',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 1(a): Equity Financing
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) Equity Financing. ',
							bold: true,
						}),
						new TextRun({
							text: 'If there is an Equity Financing before the expiration or termination of this instrument, the Company will automatically issue to the Investor a number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Discount Price.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Additional Equity Financing text
				new Paragraph({
					children: [
						new TextRun({
							text: 'In connection with the issuance of Safe Preferred Stock by the Company to the Investor pursuant to this Section 1(a):',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(i) The Investor will execute and deliver to the Company all transaction documents related to the Equity Financing; provided, that such documents are the same documents to be entered into with the purchasers of Standard Preferred Stock, with appropriate variations for the Safe Preferred Stock if applicable, and provided further, that such documents have customary exceptions to any drag-along applicable to the Investor, including, without limitation, limited representations and warranties and limited liability and indemnification obligations on the part of the Investor; and',
						}),
					],
					indent: {
						left: 720,
					},
					spacing: {
						after: 200,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(ii) The Investor and the Company will execute a Pro Rata Rights Agreement, unless the Investor is already included in such rights in the transaction documents related to the Equity Financing.',
						}),
					],
					indent: {
						left: 720,
					},
					spacing: {
						after: 400,
					},
				}),

				// Section 1(b): Liquidity Event
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) Liquidity Event. ',
							bold: true,
						}),
						new TextRun({
							text: 'If there is a Liquidity Event before the expiration or termination of this instrument, the Investor will, at its option, either (i) receive a cash payment equal to the Purchase Amount (subject to the following paragraph) or (ii) automatically receive from the Company a number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price, if the Investor fails to select the cash option.',
						}),
					],
					spacing: {
						after: 400,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Additional Liquidity Event text
				new Paragraph({
					children: [
						new TextRun({
							text: 'In connection with Section (b)(i), the Purchase Amount will be due and payable by the Company to the Investor immediately prior to, or concurrent with, the consummation of the Liquidity Event. If there are not enough funds to pay the Investor and holders of other Safes (collectively, the "',
						}),
						new TextRun({
							text: 'Cash-Out Investors',
							bold: true,
						}),
						new TextRun({
							text: '") in full, then all of the Company\'s available funds will be distributed with equal priority and pro rata among the Cash-Out Investors in proportion to their Purchase Amounts, and the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price.  In connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce, pro rata, the Purchase Amounts payable to the Cash-Out Investors by the amount determined by its board of directors in good faith to be advisable for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, and in such case, the Cash-Out Investors will automatically receive the number of shares of Common Stock equal to the remaining unpaid Purchase Amount divided by the Liquidity Price.',
						}),
					],
					spacing: {
						after: 400,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 1(c): Dissolution Event
				new Paragraph({
					children: [
						new TextRun({
							text: '(c) Dissolution Event. ',
							bold: true,
						}),
						new TextRun({
							text: 'If there is a Dissolution Event before this instrument expires or terminates, the Company will pay an amount equal to the Purchase Amount, due and payable to the Investor immediately prior to, or concurrent with, the consummation of the Dissolution Event. The Purchase Amount will be paid prior and in preference to any Distribution of any of the assets of the Company to holders of outstanding Capital Stock by reason of their ownership thereof. If immediately prior to the consummation of the Dissolution Event, the assets of the Company legally available for distribution to the Investor and all holders of all other Safes (the "',
						}),
						new TextRun({
							text: 'Dissolving Investors',
							bold: true,
						}),
						new TextRun({
							text: '"), as determined in good faith by the Company\'s board of directors, are insufficient to permit the payment to the Dissolving Investors of their respective Purchase Amounts, then the entire assets of the Company legally available for distribution will be distributed with equal priority and pro rata among the Dissolving Investors in proportion to the Purchase Amounts they would otherwise be entitled to receive pursuant to this Section 1(c).',
						}),
					],
					spacing: {
						after: 400,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 1(d): Termination
				new Paragraph({
					children: [
						new TextRun({
							text: '(d) Termination. ',
							bold: true,
						}),
						new TextRun({
							text: 'This instrument will expire and terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this instrument) upon either (i) the issuance of stock to the Investor pursuant to Section 1(a) or Section 1(b)(ii); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b)(i) or Section 1(c).',
						}),
					],
					spacing: {
						after: 400,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 2: Definitions
				new Paragraph({
					children: [
						new TextRun({
							text: '2. Definitions',
							bold: true,
							italics: true,
							font: 'Times New Roman',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Definitions
				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Capital Stock",
							bold: true,
						}),
						new TextRun({
							text: '" means the capital stock of the Company, including, without limitation, the "',
						}),
						new TextRun({
							text: "Common Stock",
							bold: true,
						}),
						new TextRun({
							text: '" and the "',
						}),
						new TextRun({
							text: "Preferred Stock",
							bold: true,
						}),
						new TextRun({
							text: '."',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Change of Control",
							bold: true,
						}),
						new TextRun({
							text: '" means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company\'s board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Discount Price",
							bold: true,
						}),
						new TextRun({
							text: '" means the price per share of the Standard Preferred Stock sold in the Equity Financing multiplied by the Discount Rate.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Distribution",
							bold: true,
						}),
						new TextRun({
							text: '" means the transfer to holders of Capital Stock by reason of their ownership thereof of cash or other property without consideration whether by way of dividend or otherwise, other than dividends on Common Stock payable in Common Stock, or the purchase or redemption of Capital Stock by the Company or its subsidiaries for cash or property other than: (i) repurchases of Common Stock held by employees, officers, directors or consultants of the Company or its subsidiaries pursuant to an agreement providing, as applicable, a right of first refusal or a right to repurchase shares upon termination of such service provider\'s employment or services; or (ii) repurchases of Capital Stock in connection with the settlement of disputes with any stockholder.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Dissolution Event",
							bold: true,
						}),
						new TextRun({
							text: '" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company\'s creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Equity Financing",
							bold: true,
						}),
						new TextRun({
							text: '" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed pre-money valuation.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Initial Public Offering",
							bold: true,
						}),
						new TextRun({
							text: '" means the closing of the Company\'s first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Liquidity Event",
							bold: true,
						}),
						new TextRun({
							text: '" means a Change of Control or an Initial Public Offering.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Liquidity Price",
							bold: true,
						}),
						new TextRun({
							text: '" means the price per share equal to: the fair market value of the Common Stock at the time of the Liquidity Event, as determined by reference to the purchase price payable in connection with such Liquidity Event, multiplied by the Discount Rate.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Pro Rata Rights Agreement",
							bold: true,
						}),
						new TextRun({
							text: '" means a written agreement between the Company and the Investor (and holders of other Safes, as appropriate) giving the Investor a right to purchase its pro rata share of private placements of securities by the Company ',
						}),
						new TextRun({
							text: "occurring after the Equity Financing",
							bold: true,
							underline: {},
						}),
						new TextRun({
							text: ', subject to customary exceptions.  Pro rata for purposes of the Pro Rata Rights Agreement will be calculated based on the ratio of (1) the number of shares of Capital Stock owned by the Investor immediately prior to the issuance of the securities to (2) the total number of shares of outstanding Capital Stock on a fully diluted basis, calculated as of immediately prior to the issuance of the securities.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Safe",
							bold: true,
						}),
						new TextRun({
							text: '" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company\'s business operations.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Safe Preferred Stock",
							bold: true,
						}),
						new TextRun({
							text: '" means the shares of a series of Preferred Stock issued to the Investor in an Equity Financing, having the identical rights, privileges, preferences and restrictions as the shares of Standard Preferred Stock, other than with respect to: (i) the per share liquidation preference and the conversion price for purposes of price-based anti-dilution protection, which will equal the Discount Price; and (ii) the basis for any dividend rights, which will be based on the Discount Price.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Standard Preferred Stock",
							bold: true,
						}),
						new TextRun({
							text: '" means the shares of a series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 3: Company Representations
				new Paragraph({
					children: [
						new TextRun({
							text: '3. Company Representations',
							bold: true,
							italics: true,
							font: 'Times New Roman',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Company Representations (a)
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) ',
							bold: true,
						}),
						new TextRun({
							text: 'The Company is a corporation duly organized, validly existing and in good standing under the laws of the state of its incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Company Representations (b)
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) ',
							bold: true,
						}),
						new TextRun({
							text: 'The execution, delivery and performance by the Company of this instrument is within the power of the Company and, other than with respect to the actions to be taken when equity is to be issued to the Investor, has been duly authorized by all necessary actions on the part of the Company. This instrument constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity.  To the knowledge of the Company, it is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material indenture or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Company Representations (c)
				new Paragraph({
					children: [
						new TextRun({
							text: '(c) ',
							bold: true,
						}),
						new TextRun({
							text: 'The performance and consummation of the transactions contemplated by this instrument do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material indenture or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Company Representations (d)
				new Paragraph({
					children: [
						new TextRun({
							text: '(d) ',
							bold: true,
						}),
						new TextRun({
							text: 'No consents or approvals are required in connection with the performance of this instrument, other than: (i) the Company\'s corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Company Representations (e)
				new Paragraph({
					children: [
						new TextRun({
							text: '(e) ',
							bold: true,
						}),
						new TextRun({
							text: 'To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with, or infringement of the rights of, others.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 4: Investor Representations
				new Paragraph({
					children: [
						new TextRun({
							text: '4. Investor Representations',
							bold: true,
							italics: true,
							font: 'Times New Roman',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Investor Representations (a)
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) ',
							bold: true,
						}),
						new TextRun({
							text: 'The Investor has full legal capacity, power and authority to execute and deliver this instrument and to perform its obligations hereunder. This instrument constitutes valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Investor Representations (b)
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) ',
							bold: true,
						}),
						new TextRun({
							text: 'The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act. The Investor has been advised that this instrument and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this instrument and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor\'s financial condition and is able to bear the economic risk of such investment for an indefinite period of time.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Section 5: Miscellaneous
				new Paragraph({
					children: [
						new TextRun({
							text: '5. Miscellaneous',
							bold: true,
							italics: true,
							font: 'Times New Roman',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (a)
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) ',
							bold: true,
						}),
						new TextRun({
							text: 'Any provision of this instrument may be amended, waived or modified only upon the written consent of the Company and the Investor.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (b)
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) ',
							bold: true,
						}),
						new TextRun({
							text: 'Any notice required or permitted by this instrument will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party\'s address listed on the signature page, as subsequently modified by written notice.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (c)
				new Paragraph({
					children: [
						new TextRun({
							text: '(c) ',
							bold: true,
						}),
						new TextRun({
							text: 'The Investor is not entitled, as a holder of this instrument, to vote or receive dividends or be deemed the holder of Capital Stock for any purpose, nor will anything contained herein be construed to confer on the Investor, as such, any of the rights of a stockholder of the Company or any right to vote for the election of directors or upon any matter submitted to stockholders at any meeting thereof, or to give or withhold consent to any corporate action or to receive notice of meetings, or to receive subscription rights or otherwise until shares have been issued upon the terms described herein.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (d)
				new Paragraph({
					children: [
						new TextRun({
							text: '(d) ',
							bold: true,
						}),
						new TextRun({
							text: 'Neither this instrument nor the rights contained herein may be assigned, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this instrument and/or the rights contained herein may be assigned without the Company\'s consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor; and provided, further, that the Company may assign this instrument in whole, without the consent of the Investor, in connection with a reincorporation to change the Company\'s domicile.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (e)
				new Paragraph({
					children: [
						new TextRun({
							text: '(e) ',
							bold: true,
						}),
						new TextRun({
							text: 'In the event any one or more of the provisions of this instrument is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this instrument operate or would prospectively operate to invalidate this instrument, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this instrument and the remaining provisions of this instrument will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Miscellaneous (f)
				new Paragraph({
					children: [
						new TextRun({
							text: '(f) ',
							bold: true,
						}),
						new TextRun({
							text: `All rights and obligations hereunder will be governed by the laws of the State of ${state.companyInfo.stateOfGovernance || '_________________'}, without regard to the conflicts of law provisions of such jurisdiction.`,
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Signature Section
				new Paragraph({
					children: [
						new TextRun({
							text: '(Signature page follows)',
							size: 22,
						}),
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 400,
					},
				}),

				// Add page break before signature section
				new Paragraph({
					children: [new PageBreak()],
				}),

				// Signature Section
				new Paragraph({
					text: 'IN WITNESS WHEREOF, the undersigned have caused this instrument to be duly executed and delivered.',
					spacing: {
						after: 400,
					}
				}),

				// Company Signature
				new Paragraph({
					children: [
						new TextRun({
							text: state.companyInfo.legalName || '_________________',
							bold: true,
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				new Paragraph({
					text: 'By:',
					spacing: {
						after: 50,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Name: ${
								state.companyInfo.authorizedSignatoryName ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 50,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Title: ${
								state.companyInfo.authorizedSignatoryTitle ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Address: ${
								state.companyInfo.companyAddress ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Email: ${
								state.companyInfo.authorizedSignatoryEmail ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 400,
					},

				}),

				// Investor Signature
				new Paragraph({
					children: [
						new TextRun({
							text: 'INVESTOR:',
							bold: true,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					text: 'By:',
					spacing: {
						after: 50,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Name: ${
								state.investorInfo.authorizedSignatoryName ||
								state.investorInfo.investorLegalName ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 50,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Title: ${
								state.investorInfo.authorizedSignatoryTitle ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Address: ${
								state.investorInfo.investorAddress ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Email: ${
								state.investorInfo.authorizedSignatoryEmail ||
								'_________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),
			],
		}],
	})

	return await Packer.toBlob(doc)
} 