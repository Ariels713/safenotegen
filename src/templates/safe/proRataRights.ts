import { DocumentTemplate } from './types'

export const proRataRightsTemplate: DocumentTemplate = {
	title: 'PRO RATA RIGHTS AGREEMENT',
	disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS AGREEMENT AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
	header: 'THIS AGREEMENT is made and entered into as of [dateOfSafe] by and between [companyName], a [stateIncorporation] corporation (the "Company"), and [investorName] (the "Investor").',
	sections: [
		{
			title: '1. Pro Rata Rights',
			content: `The Investor shall have the right to purchase its pro rata share of any new securities that the Company may issue in the future, subject to the terms and conditions set forth in this Agreement. The Investor's pro rata share shall be equal to the ratio of (a) the number of shares of Common Stock owned by the Investor immediately prior to the issuance of such new securities to (b) the total number of shares of Common Stock outstanding immediately prior to the issuance of such new securities.`
		},
		{
			title: '2. Notice of Issuance',
			content: `The Company shall give the Investor written notice of any proposed issuance of new securities, which notice shall specify the type and amount of securities proposed to be issued, the price and terms of such issuance, and the Investor's pro rata share of such issuance. The Investor shall have 15 days from the date of such notice to elect to purchase its pro rata share of such new securities.`
		},
		{
			title: '3. Excluded Securities',
			content: `The pro rata rights granted hereunder shall not apply to the following securities: (a) securities issued pursuant to the conversion or exercise of convertible or exercisable securities outstanding as of the date hereof; (b) securities issued pursuant to a bona fide public offering; (c) securities issued pursuant to a bona fide acquisition of another entity by the Company; (d) securities issued to employees, officers, directors, consultants, or advisors of the Company pursuant to any stock option, stock purchase, or similar plan or agreement; and (e) securities issued in connection with any stock split, stock dividend, or similar transaction.`
		},
		{
			title: '4. Term',
			content: `This Agreement shall remain in effect until the earlier of (a) the consummation of a Qualified IPO (as defined in the Company's Certificate of Incorporation) or (b) the date on which the Investor no longer holds any shares of Common Stock.`
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
} 