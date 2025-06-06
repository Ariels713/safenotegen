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

export const generatePostMoneyMfnSafe = async (state: SafeFormState): Promise<Blob> => {
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
									text: 'Post-Money SAFE - MFN',
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
							text: '"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES.  THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS SAFE AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
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
							text: state.companyInfo.legalName || '[COMPANY NAME]',
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
								state.investorInfo.investorLegalName || '[Investor Name]'
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
									: '[_____________]'
							} (the "`,
						}),
						new TextRun({
							text: 'Purchase Amount',
							bold: true,
						}),
						new TextRun({
							text: `") on or about ${state.investorInfo.investDate || '[Date of Safe]'}, ${
								state.companyInfo.legalName || '[Company Name]'
							}, a ${state.companyInfo.stateOfIncorporation || '[State of Incorporation]'} corporation (the "`,
						}),
						new TextRun({
							text: 'Company',
							bold: true,
						}),
						new TextRun({
							text: '"), issues to the Investor the right to certain shares of the Company\'s Capital Stock, subject to the terms described below.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
					},
				}),

				// Form Notice
				new Paragraph({
					children: [
						new TextRun({
							text: 'This Safe is one of the forms available at ',
						}),
						new TextRun({
							text: 'ycombinator.com/documents',
							style: 'Hyperlink',
						}),
						new TextRun({
							text: ' and the Company and the Investor agree that neither one has modified the form, except to fill in blanks and bracketed terms.',
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
							text: 'If there is an Equity Financing before the termination of this Safe, on the initial closing of such Equity Financing, this Safe will automatically convert into the number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the lowest price per share of the Standard Preferred Stock.',
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
							text: 'In connection with the automatic conversion of this Safe into shares of Standard Preferred Stock, the Investor will execute and deliver to the Company all of the transaction documents related to the Equity Financing; provided, that such documents (i) are the same documents to be entered into with the purchasers of Standard Preferred Stock, and (ii) have customary exceptions to any drag-along applicable to the Investor, including (without limitation) limited representations, warranties, liability and indemnification obligations for the Investor.',
						}),
					],
					spacing: {
						after: 200,
					},
					indent: {
						firstLine: 500,
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
							text: 'If there is a Liquidity Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below and the "MFN" Amendment Provision in Section 3 below) to receive a portion of Proceeds, due and payable to the Investor immediately prior to, or concurrent with, the consummation of such Liquidity Event, equal to the Purchase Amount (the "',
						}),
						new TextRun({
							text: 'Cash-Out Amount',
							bold: true,
						}),
						new TextRun({
							text: '").  If any of the Company\'s securityholders are given a choice as to the form and amount of Proceeds to be received in a Liquidity Event, the Investor will be given the same choice, provided that the Investor may not choose to receive a form of consideration that the Investor would be ineligible to receive as a result of the Investor\'s failure to satisfy any requirement or limitation generally applicable to the Company\'s securityholders, or under any applicable laws.',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Tax-free reorganization text
				new Paragraph({
					children: [
						new TextRun({
							text: 'Notwithstanding the foregoing, in connection with a Change of Control intended to qualify as a tax-free reorganization, the Company may reduce the cash portion of Proceeds payable to the Investor by the amount determined by its board of directors in good faith for such Change of Control to qualify as a tax-free reorganization for U.S. federal income tax purposes, provided that such reduction (A) does not reduce the total Proceeds payable to such Investor and (B) is applied in the same manner and on a pro rata basis to all securityholders who have equal priority to the Investor under Section 1(d).',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'If there is a Dissolution Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds equal to the Cash-Out Amount, due and payable to the Investor immediately prior to the consummation of the Dissolution Event.',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Section 1(d): Liquidation Priority
				new Paragraph({
					children: [
						new TextRun({
							text: '(d) Liquidation Priority. ',
							bold: true,
						}),
						new TextRun({
							text: 'In a Liquidity Event or Dissolution Event, this Safe is intended to operate like standard non-participating Preferred Stock. The Investor\'s right to receive its Cash-Out Amount is:',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Liquidation Priority Points
				new Paragraph({
					children: [
						new TextRun({
							text: '(i) Junior to payment of outstanding indebtedness and creditor claims, including contractual claims for payment and convertible promissory notes (to the extent such convertible promissory notes are not actually or notionally converted into Capital Stock);',
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
							text: '(ii) On par with payments for other Safes and/or Preferred Stock, and if the applicable Proceeds are insufficient to permit full payments to the Investor and such other Safes and/or Preferred Stock, the applicable Proceeds will be distributed pro rata to the Investor and such other Safes and/or Preferred Stock in proportion to the full payments that would otherwise be due; and',
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
							text: '(iii) Senior to payments for Common Stock.',
						}),
					],
					indent: {
						left: 720,
					},
					spacing: {
						after: 400,
					},
				}),

				// Conversion Amount Priority
				new Paragraph({
					children: [
						new TextRun({
							text: 'The Investor\'s right to receive its Cash-Out Amount is (A) on par with payments for Common Stock and other Safes and/or Preferred Stock who are also receiving Cash-Out Amounts or Proceeds on a similar as-converted to Common Stock basis, and (B) junior to payments described in clauses (i) and (ii) above (in the latter case, to the extent such payments are Cash-Out Amounts or similar liquidation preferences).',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Section 1(e): Termination
				new Paragraph({
					children: [
						new TextRun({
							text: '(e) Termination. ',
							bold: true,
						}),
						new TextRun({
							text: 'This Safe will automatically terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this Safe) immediately following the earliest to occur of: (i) the issuance of Capital Stock to the Investor pursuant to the automatic conversion of this Safe under Section 1(a); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b) or Section 1(c).',
						}),
					],
					spacing: {
						after: 400,
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
							text: "Direct Listing",
							bold: true,
						}),
						new TextRun({
							text: '" means the Company\'s initial listing of its Common Stock (other than shares of Common Stock not eligible for resale under Rule 144 under the Securities Act) on a national securities exchange by means of an effective registration statement on Form S-1 filed by the Company with the SEC that registers shares of existing capital stock of the Company for resale, as approved by the Company\'s board of directors. For the avoidance of doubt, a Direct Listing will not be deemed to be an underwritten offering and will not involve any underwriting services.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means (i) a voluntary termination of operations, (ii) a general assignment for the benefit of the Company\'s creditors or (iii) any other liquidation, dissolution or winding up of the Company (excluding a Liquidity Event), whether voluntary or involuntary.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Dividend Amount",
							bold: true,
						}),
						new TextRun({
							text: '" means, with respect to any date on which the Company pays a dividend on its outstanding Common Stock, the amount of such dividend that is paid per share of Common Stock multiplied by (x) the Purchase Amount divided by (y) the Liquidity Price (treating the dividend date as a Liquidity Event solely for purposes of calculating such Liquidity Price).'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means a bona fide transaction or series of transactions with the principal purpose of raising capital, pursuant to which the Company issues and sells Preferred Stock at a fixed valuation, including but not limited to, a pre-money or post-money valuation.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means the closing of the Company\'s first firm commitment underwritten initial public offering of Common Stock pursuant to a registration statement filed under the Securities Act.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means a Change of Control, a Direct Listing or an Initial Public Offering.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means the fair market value of the Common Stock at the time of the applicable Liquidity Event (determined by reference to the purchase price payable in connection with such Liquidity Event).'
						})
					],
					spacing: {
						after: 400
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Proceeds",
							bold: true,
						}),
						new TextRun({
							text: '" means cash and other assets (including without limitation stock consideration) that are proceeds from the Liquidity Event or the Dissolution Event, as applicable, and legally available for distribution.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means an instrument containing a future right to shares of Capital Stock, similar in form and content to this instrument, purchased by investors for the purpose of funding the Company\'s business operations. References to "this Safe" mean this specific instrument.'
						})
					],
					spacing: {
						after: 400
					}
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
							text: '" means the shares of the series of Preferred Stock issued to the investors investing new money in the Company in connection with the initial closing of the Equity Financing.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"',
						}),
						new TextRun({
							text: "Subsequent Convertible Securities",
							bold: true,
						}),
						new TextRun({
							text: '" means convertible securities that the Company may issue after the issuance of this instrument with the principal purpose of raising capital, including but not limited to, other Safes, convertible debt instruments and other convertible securities. Subsequent Convertible Securities excludes: (i) side letters or ancillary agreements that do not amend or modify the terms of such convertible securities; and (ii) the following types of securities: (A) options issued pursuant to any equity incentive or similar plan of the Company; (B) convertible securities issued or issuable to (1) banks, equipment lessors, financial institutions or other persons engaged in the business of making loans pursuant to a debt financing or commercial leasing or (2) suppliers or third party service providers in connection with the provision of goods or services pursuant to transactions; and (C) convertible securities issued or issuable in connection with sponsored research, collaboration, technology license, development, OEM, marketing or other similar agreements or strategic partnerships.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 3: MFN Amendment Provision
				new Paragraph({
					children: [
						new TextRun({
							text: '3. "MFN" Amendment Provision',
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

				new Paragraph({
					children: [
						new TextRun({
							text: 'If the Company issues any Subsequent Convertible Securities with terms more favorable than those of this Safe (including, without limitation, a valuation cap and/or discount) prior to termination of this Safe, the Company will promptly provide the Investor with written notice thereof, together with a copy of such Subsequent Convertible Securities (the "',
						}),
						new TextRun({
							text: "MFN Notice",
							bold: true,
						}),
						new TextRun({
							text: '") and, upon written request of the Investor, any additional information related to such Subsequent Convertible Securities as may be reasonably requested by the Investor. In the event the Investor determines that the terms of the Subsequent Convertible Securities are preferable to the terms of this instrument, the Investor will notify the Company in writing within 10 days of the receipt of the MFN Notice. Promptly after receipt of such written notice from the Investor, the Company agrees to amend and restate this instrument to be identical to the instrument(s) evidencing the Subsequent Convertible Securities.',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Section 4: Company Representations
				new Paragraph({
					children: [
						new TextRun({
							text: '4. Company Representations',
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
							text: 'The Company is a corporation duly organized, validly existing and in good standing under the laws of its state of incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'The execution, delivery and performance by the Company of this Safe is within the power of the Company and has been duly authorized by all necessary actions on the part of the Company (subject to section 4(d)). This Safe constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity. To its knowledge, the Company is not in violation of (i) its current certificate of incorporation or bylaws, (ii) any material statute, rule or regulation applicable to the Company or (iii) any material debt or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'The performance and consummation of the transactions contemplated by this Safe do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material debt or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien on any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'No consents or approvals are required in connection with the performance of this Safe, other than: (i) the Company\'s corporate approvals; (ii) any qualifications or filings under applicable securities laws; and (iii) necessary corporate approvals for the authorization of Capital Stock issuable pursuant to Section 1.',
						}),
					],
					spacing: {
						after: 400,
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
						after: 400,
					},
				}),

				// Section 5: Investor Representations
				new Paragraph({
					children: [
						new TextRun({
							text: '5. Investor Representations',
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
							text: 'The Investor has full legal capacity, power and authority to execute and deliver this Safe and to perform its obligations hereunder. This Safe constitutes a valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act, and acknowledges and agrees that if not an accredited investor at the time of an Equity Financing, the Company may void this Safe and return the Purchase Amount. The Investor has been advised that this Safe and the underlying securities have not been registered under the Securities Act, or any state securities laws and, therefore, cannot be resold unless they are registered under the Securities Act and applicable state securities laws or unless an exemption from such registration requirements is available. The Investor is purchasing this Safe and the securities to be acquired by the Investor hereunder for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Investor has no present intention of selling, granting any participation in, or otherwise distributing the same. The Investor has such knowledge and experience in financial and business matters that the Investor is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Investor\'s financial condition and is able to bear the economic risk of such investment for an indefinite period of time.',
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Section 6: Miscellaneous
				new Paragraph({
					children: [
						new TextRun({
							text: '6. Miscellaneous',
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
							text: 'Any provision of this Safe may be amended, waived or modified by written consent of the Company and either (i) the Investor or (ii) the majority-in-interest of all then-outstanding Safes with the same "Post-Money Valuation Cap" and "Discount Rate" as this Safe (and Safes lacking one or both of such terms will be considered to be the same with respect to such term(s)), provided that with respect to clause (ii): (A) the Purchase Amount and Section 3 may not be amended, waived or modified in this manner, (B) the consent of the Investor and each holder of such Safes must be solicited (even if not obtained), and (C) such amendment, waiver or modification treats all such holders in the same manner. "Majority-in-interest" refers to the holders of the applicable group of Safes whose Safes have a total Purchase Amount greater than 50% of the total Purchase Amount of all of such applicable group of Safes.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'Any notice required or permitted by this Safe will be deemed sufficient when delivered personally or by overnight courier or sent by email to the relevant address listed on the signature page, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party\'s address listed on the signature page, as subsequently modified by written notice.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'The Investor is not entitled, as a holder of this Safe, to vote or be deemed a holder of Capital Stock for any purpose other than tax purposes, nor will anything in this Safe be construed to confer on the Investor, as such, any rights of a Company stockholder or rights to vote for the election of directors or on any matter submitted to Company stockholders, or to give or withhold consent to any corporate action or to receive notice of meetings, until shares have been issued on the terms described in Section 1. However, if the Company pays a dividend on outstanding shares of Common Stock (that is not payable in shares of Common Stock) while this Safe is outstanding, the Company will pay the Dividend Amount to the Investor at the same time.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'Neither this Safe nor the rights in this Safe are transferable or assignable, by operation of law or otherwise, by either party without the prior written consent of the other; provided, however, that this Safe and/or its rights may be assigned without the Company\'s consent by the Investor (i) to the Investor\'s estate, heirs, executors, administrators, guardians and/or successors in the event of Investor\'s death or disability, or (ii) to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor.',
						}),
					],
					spacing: {
						after: 400,
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
							text: 'In the event any one or more of the provisions of this Safe is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this Safe operate or would prospectively operate to invalidate this Safe, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this Safe and the remaining provisions of this Safe will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.',
						}),
					],
					spacing: {
						after: 400,
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
							text: `All rights and obligations hereunder will be governed by the laws of the State of ${state.companyInfo.stateOfGovernance || '[Governing Law Jurisdiction]'}, without regard to the conflicts of law provisions of such jurisdiction.`,
						}),
					],
					spacing: {
						after: 400,
					},
				}),

				// Miscellaneous (g)
				new Paragraph({
					children: [
						new TextRun({
							text: '(g) ',
							bold: true,
						}),
						new TextRun({
							text: 'The parties acknowledge and agree that for United States federal and state income tax purposes this Safe is, and at all times has been, intended to be characterized as stock, and more particularly as common stock for purposes of Sections 304, 305, 306, 354, 368, 1036 and 1202 of the Internal Revenue Code of 1986, as amended. Accordingly, the parties agree to treat this Safe consistent with the foregoing intent for all United States federal and state income tax purposes (including, without limitation, on their respective tax returns or other informational statements).',
						}),
					],
					spacing: {
						after: 400,
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
					text: 'IN WITNESS WHEREOF, the undersigned have caused this Safe to be duly executed and delivered.',
					spacing: {
						after: 400,
					}
				}),

				// Company Signature
				new Paragraph({
					children: [
						new TextRun({
							text: state.companyInfo.legalName || '__________________________________',
							bold: true,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				new Paragraph({
					text: 'By: __________________________________',
					spacing: {
						after: 50,
					},

				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Name: ${
								state.companyInfo.authorizedSignatoryName ||
								'__________________________________'
							}`,
						}),
					],
					spacing: {
						after: 50,
					},

				}),

				...(state.companyInfo.authorizedSignatoryTitle
					? [
						new Paragraph({
							children: [
								new TextRun({
									text: `Title: ${state.companyInfo.authorizedSignatoryTitle}`,
								}),
							],
							spacing: {
								after: 200,
							},
							indent: {
								firstLine: 500,
							},
						}),
					]
					: []),

				new Paragraph({
					children: [
						new TextRun({
							text: `Address: ${
								state.companyInfo.companyAddress || '__________________________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				}),

				...(state.companyInfo.authorizedSignatoryEmail
					? [
						new Paragraph({
							children: [
								new TextRun({
									text: `Email: ${state.companyInfo.authorizedSignatoryEmail}`,
								}),
							],
							spacing: {
								after: 200,
							},
							indent: {
								firstLine: 500,
							},
						}),
					]
					: []),

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
					children: [
						new TextRun({
							text: 'By:',
						}),
					],
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
								'__________________________________'
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
								'__________________________________'
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
								'__________________________________'
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
								'__________________________________'
							}`,
						}),
					],
					spacing: {
						after: 200,
					},

				})
			]
		}]
	})

	return await Packer.toBlob(doc)
} 