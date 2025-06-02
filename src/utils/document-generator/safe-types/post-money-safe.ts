import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx'
import { SafeFormState } from '@/types/safeForm'

export const generatePostMoneySafe = async (state: SafeFormState): Promise<Blob> => {
	const doc = new Document({
		sections: [{
			properties: {},
			children: [
				// Disclaimer
				new Paragraph({
					children: [
						new TextRun({
							text: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES.  THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS SAFE AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
							bold: true
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Company Name
				new Paragraph({
					children: [
						new TextRun({
							text: state.companyInfo.legalName || '[COMPANY NAME]',
							bold: true
						})
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 400
					}
				}),

				// Title
				new Paragraph({
					children: [
						new TextRun({
							text: 'SAFE',
							bold: true
						})
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(Simple Agreement for Future Equity)',
							italics: true
						})
					],
					alignment: AlignmentType.CENTER,
					spacing: {
						after: 400
					}
				}),

				// Introduction
				new Paragraph({
					children: [
						new TextRun({
							text: `THIS CERTIFIES THAT in exchange for the payment by ${state.investorInfo.investorLegalName || '[Investor Name]'} (the "Investor") of $${state.investorInfo.investmentAmount || '[_____________]'} (the "Purchase Amount") on or about ${state.investorInfo.investDate || '[Date of Safe]'}, ${state.companyInfo.legalName || '[Company Name]'}, a ${state.companyInfo.stateOfIncorporation || '[State of Incorporation]'} corporation (the "Company"), issues to the Investor the right to certain shares of the Company's Capital Stock, subject to the terms described below.`
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Form Notice
				new Paragraph({
					children: [
						new TextRun({
							text: 'This Safe is one of the forms available at http://ycombinator.com/documents and the Company and the Investor agree that neither one has modified the form, except to fill in blanks and bracketed terms.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Post-Money Valuation Cap
				new Paragraph({
					children: [
						new TextRun({
							text: `The "Post-Money Valuation Cap" is $${state.valuationCap || '[_____________]'}.  See Section 2 for certain additional defined terms.`
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 1: Events
				new Paragraph({
					text: '1. Events',
					heading: HeadingLevel.HEADING_1,
					spacing: {
						after: 400
					}
				}),

				// Section 1(a): Equity Financing
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) Equity Financing. ',
							bold: true
						}),
						new TextRun({
							text: 'If there is an Equity Financing before the termination of this Safe, on the initial closing of such Equity Financing, this Safe will automatically convert into the greater of: (1) the number of shares of Standard Preferred Stock equal to the Purchase Amount divided by the lowest price per share of the Standard Preferred Stock; or (2) the number of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Safe Price.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 1(b): Liquidity Event
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) Liquidity Event. ',
							bold: true
						}),
						new TextRun({
							text: 'If there is a Liquidity Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds, due and payable to the Investor immediately prior to, or concurrent with, the consummation of such Liquidity Event, equal to the greater of (i) the Purchase Amount (the "Cash-Out Amount") or (ii) the amount payable on the number of shares of Common Stock equal to the Purchase Amount divided by the Liquidity Price (the "Conversion Amount").'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 1(c): Dissolution Event
				new Paragraph({
					children: [
						new TextRun({
							text: '(c) Dissolution Event. ',
							bold: true
						}),
						new TextRun({
							text: 'If there is a Dissolution Event before the termination of this Safe, the Investor will automatically be entitled (subject to the liquidation priority set forth in Section 1(d) below) to receive a portion of Proceeds equal to the Cash-Out Amount, due and payable to the Investor immediately prior to the consummation of the Dissolution Event.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 1(d): Liquidation Priority
				new Paragraph({
					children: [
						new TextRun({
							text: '(d) Liquidation Priority. ',
							bold: true
						}),
						new TextRun({
							text: 'In a Liquidity Event or Dissolution Event, this Safe is intended to operate like standard non-participating Preferred Stock. The Investor\'s right to receive its Cash-Out Amount is:'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Liquidation Priority Points
				new Paragraph({
					children: [
						new TextRun({
							text: '(i) Junior to payment of outstanding indebtedness and creditor claims, including contractual claims for payment and convertible promissory notes (to the extent such convertible promissory notes are not actually or notionally converted into Capital Stock);'
						})
					],
					indent: {
						left: 720
					},
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(ii) On par with payments for other Safes and/or Preferred Stock, and if the applicable Proceeds are insufficient to permit full payments to the Investor and such other Safes and/or Preferred Stock, the applicable Proceeds will be distributed pro rata to the Investor and such other Safes and/or Preferred Stock in proportion to the full payments that would otherwise be due; and'
						})
					],
					indent: {
						left: 720
					},
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '(iii) Senior to payments for Common Stock.'
						})
					],
					indent: {
						left: 720
					},
					spacing: {
						after: 400
					}
				}),

				// Section 1(e): Termination
				new Paragraph({
					children: [
						new TextRun({
							text: '(e) Termination. ',
							bold: true
						}),
						new TextRun({
							text: 'This Safe will automatically terminate (without relieving the Company of any obligations arising from a prior breach of or non-compliance with this Safe) immediately following the earliest to occur of: (i) the issuance of Capital Stock to the Investor pursuant to the automatic conversion of this Safe under Section 1(a); or (ii) the payment, or setting aside for payment, of amounts due the Investor pursuant to Section 1(b) or Section 1(c).'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 2: Definitions
				new Paragraph({
					text: '2. Definitions',
					heading: HeadingLevel.HEADING_1,
					spacing: {
						after: 400
					}
				}),

				// Definitions
				new Paragraph({
					children: [
						new TextRun({
							text: '"Capital Stock" means the capital stock of the Company, including, without limitation, the "Common Stock" and the "Preferred Stock."'
						})
					],
					spacing: {
						after: 400
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: '"Change of Control" means (i) a transaction or series of related transactions in which any "person" or "group" (within the meaning of Section 13(d) and 14(d) of the Securities Exchange Act of 1934, as amended), becomes the "beneficial owner" (as defined in Rule 13d-3 under the Securities Exchange Act of 1934, as amended), directly or indirectly, of more than 50% of the outstanding voting securities of the Company having the right to vote for the election of members of the Company\'s board of directors, (ii) any reorganization, merger or consolidation of the Company, other than a transaction or series of related transactions in which the holders of the voting securities of the Company outstanding immediately prior to such transaction or series of related transactions retain, immediately after such transaction or series of related transactions, at least a majority of the total voting power represented by the outstanding voting securities of the Company or such other surviving or resulting entity or (iii) a sale, lease or other disposition of all or substantially all of the assets of the Company.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Continue with more definitions...

				// Section 3: Company Representations
				new Paragraph({
					text: '3. Company Representations',
					heading: HeadingLevel.HEADING_1,
					spacing: {
						after: 400
					}
				}),

				// Company Representations (a)
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) ',
							bold: true
						}),
						new TextRun({
							text: 'The Company is a corporation duly organized, validly existing and in good standing under the laws of its state of incorporation, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Company Representations (b)
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) ',
							bold: true
						}),
						new TextRun({
							text: 'The execution, delivery and performance by the Company of this Safe is within the power of the Company and has been duly authorized by all necessary actions on the part of the Company (subject to section 3(d)). This Safe constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 4: Investor Representations
				new Paragraph({
					text: '4. Investor Representations',
					heading: HeadingLevel.HEADING_1,
					spacing: {
						after: 400
					}
				}),

				// Investor Representations (a)
				new Paragraph({
					children: [
						new TextRun({
							text: '(a) ',
							bold: true
						}),
						new TextRun({
							text: 'The Investor has full legal capacity, power and authority to execute and deliver this Safe and to perform its obligations hereunder. This Safe constitutes a valid and binding obligation of the Investor, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors\' rights generally and general principles of equity.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Investor Representations (b)
				new Paragraph({
					children: [
						new TextRun({
							text: '(b) ',
							bold: true
						}),
						new TextRun({
							text: 'The Investor is an accredited investor as such term is defined in Rule 501 of Regulation D under the Securities Act, and acknowledges and agrees that if not an accredited investor at the time of an Equity Financing, the Company may void this Safe and return the Purchase Amount.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Section 5: Miscellaneous
				new Paragraph({
					text: '5. Miscellaneous',
					heading: HeadingLevel.HEADING_1,
					spacing: {
						after: 400
					}
				}),

				// Signature Section
				new Paragraph({
					text: 'IN WITNESS WHEREOF, the undersigned have caused this Safe to be duly executed and delivered.',
					spacing: {
						after: 400
					}
				}),

				// Company Signature
				new Paragraph({
					text: '[COMPANY]',
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					text: 'By:',
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Name: ${state.companyInfo.authorizedSignatoryName || '[name]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Title: ${state.companyInfo.authorizedSignatoryTitle || '[title]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Address: ${state.companyInfo.companyAddress || '[address]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Email: ${state.companyInfo.authorizedSignatoryEmail || '[email]'}`
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Investor Signature
				new Paragraph({
					text: 'INVESTOR:',
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					text: 'By:',
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Name: ${state.investorInfo.authorizedSignatoryName || '[name]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Title: ${state.investorInfo.authorizedSignatoryTitle || '[title]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Address: ${state.investorInfo.investorAddress || '[address]'}`
						})
					],
					spacing: {
						after: 200
					}
				}),

				new Paragraph({
					children: [
						new TextRun({
							text: `Email: ${state.investorInfo.authorizedSignatoryEmail || '[email]'}`
						})
					],
					spacing: {
						after: 200
					}
				})
			]
		}]
	})

	return await Packer.toBlob(doc)
} 