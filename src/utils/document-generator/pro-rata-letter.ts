import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { SafeFormState } from '@/types/safeForm'

export const generateProRataLetter = async (state: SafeFormState): Promise<Blob> => {
	const doc = new Document({
		sections: [{
			properties: {},
			children: [
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
							text: 'PRO RATA AGREEMENT',
							bold: true
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
							text: `This agreement (this "Agreement") is entered into on or about ${state.investorInfo.investDate || '[Date of Safe]'} in connection with the purchase by ${state.investorInfo.investorLegalName || '[Investor Name]'} (the "Investor") of that certain simple agreement for future equity with a "Post-Money Valuation Cap" (the "Investor's Safe") issued by ${state.companyInfo.legalName || '[Company Name]'} (the "Company") on or about the date of this Agreement.  As a material inducement to the Investor's investment, the Company agrees to the provisions set forth in this Agreement.  Capitalized terms used herein shall have the meanings set forth in the Investor's Safe.`
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Pro Rata Right
				new Paragraph({
					children: [
						new TextRun({
							text: 'The Investor shall have the right to purchase its pro rata share of Standard Preferred Stock being sold in the Equity Financing (the "Pro Rata Right").  Pro rata share for purposes of this Pro Rata Right is the ratio of (x) the number of shares of Capital Stock issued from the conversion of all of the Investor\'s Safes with a "Post-Money Valuation Cap" to (y) the Company Capitalization.  The Pro Rata Right described above shall automatically terminate upon the earlier of (i) the initial closing of the Equity Financing; (ii) immediately prior to the closing of a Liquidity Event; or (iii) immediately prior to the Dissolution Event.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Assignment
				new Paragraph({
					children: [
						new TextRun({
							text: 'Neither this Agreement nor the rights contained herein may be assigned, by operation of law or otherwise, by Investor without the prior written consent of the Company; provided, however, that this Agreement and/or the rights contained herein may be assigned without the Company\'s consent by the Investor to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Investor, including, without limitation, any general partner, managing member, officer or director of the Investor, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Investor.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Amendments
				new Paragraph({
					children: [
						new TextRun({
							text: 'Any provision of this Agreement may be amended, waived or modified upon the written consent of the Company and either (i) the holders of a majority of shares of Capital Stock issued from all Safes converted in connection with the Equity Financing held by the Investor and other Safe holders with Pro Rata Rights pursuant to agreements on the same form as this Agreement (available at http://ycombinator.com/documents), provided that such amendment, waiver or modification treats all such holders in the same manner, or (ii) the Investor.  The Company will promptly notify the Investor of any amendment, waiver or modification that the Investor did not consent to.  This Agreement is the form available at http://ycombinator.com/documents and the Company and the Investor agree that neither one has modified the form, except to fill in blanks and bracketed terms.  The choice of law governing any dispute or claim arising out of or in connection with this Agreement shall be consistent with that set forth in the Investor\'s Safe.'
						})
					],
					spacing: {
						after: 400
					}
				}),

				// Signature Section
				new Paragraph({
					text: 'IN WITNESS WHEREOF, the undersigned have caused this Agreement to be duly executed and delivered.',
					spacing: {
						after: 400
					}
				}),

				// Company Signature
				new Paragraph({
					children: [
						new TextRun({
							text: state.companyInfo.legalName || '[COMPANY NAME]',
							bold: true
						})
					],
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
						after: 400
					}
				}),

				// Investor Signature
				new Paragraph({
					children: [
						new TextRun({
							text: state.investorInfo.investorLegalName || '[INVESTOR NAME]',
							bold: true
						})
					],
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
				})
			]
		}]
	})

	return await Packer.toBlob(doc)
} 