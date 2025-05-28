import { DocumentTemplate } from './types'

export const proRataRightsTemplate: DocumentTemplate = {
	title: 'PRO RATA RIGHTS AGREEMENT',
	disclaimer: 'THIS INSTRUMENT AND ANY SECURITIES ISSUABLE PURSUANT HERETO HAVE NOT BEEN REGISTERED UNDER THE SECURITIES ACT OF 1933, AS AMENDED (THE "SECURITIES ACT"), OR UNDER THE SECURITIES LAWS OF CERTAIN STATES. THESE SECURITIES MAY NOT BE OFFERED, SOLD OR OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT AS PERMITTED IN THIS AGREEMENT AND UNDER THE ACT AND APPLICABLE STATE SECURITIES LAWS PURSUANT TO AN EFFECTIVE REGISTRATION STATEMENT OR AN EXEMPTION THEREFROM.',
	companyName: '[companyName]',
	subtitle: 'PRO RATA RIGHTS AGREEMENT',
	ycombinatorNote: '',
	valuationCapNote: '',
	header: 'THIS AGREEMENT is made and entered into as of [dateOfSafe] by and between [companyName], a [stateIncorporation] corporation (the "Company"), and [investorName] (the "Investor").',
	sections: [
		{
			title: '1. Pro Rata Rights',
			content: `The Investor shall have the right to purchase its pro rata share of any new securities that the Company may issue from time to time after the date hereof (a "Subsequent Financing"). The Investor's pro rata share shall be equal to the ratio of (a) the number of shares of Common Stock owned by the Investor immediately prior to the Subsequent Financing (assuming full conversion of all convertible securities and exercise of all options and warrants) to (b) the total number of shares of Common Stock outstanding immediately prior to the Subsequent Financing (assuming full conversion of all convertible securities and exercise of all options and warrants).`
		},
		{
			title: '2. Notice',
			content: `The Company shall give the Investor written notice of any proposed Subsequent Financing at least 10 business days prior to the closing of such Subsequent Financing. Such notice shall describe the proposed Subsequent Financing, including the type and amount of securities proposed to be issued and the price and terms upon which they are to be issued.`
		},
		{
			title: '3. Exercise of Rights',
			content: `The Investor shall have 10 business days from the date of receipt of the notice to elect to purchase its pro rata share of the securities proposed to be issued in the Subsequent Financing. The Investor shall exercise this right by delivering written notice to the Company within such 10 business day period.`
		},
		{
			title: '4. Term',
			content: `This Agreement shall remain in effect until the earlier of (a) the consummation of a Qualified IPO (as defined in the Company's Certificate of Incorporation) or (b) the date on which the Investor no longer holds any shares of Common Stock.`
		}
	],
	signature: {
		witness: 'IN WITNESS WHEREOF, the undersigned have caused this Agreement to be duly executed and delivered.',
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