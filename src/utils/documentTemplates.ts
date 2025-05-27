import { Paragraph, HeadingLevel, AlignmentType, TextRun } from 'docx'
import { SafeFormState, SafeType } from '@/types/safeForm'

interface DocumentTemplate {
	title: string
	sections: {
		title: string
		content: string
	}[]
}

const SAFE_TEMPLATES: Record<SafeType, DocumentTemplate> = {
	'Post-Money SAFE - Valuation Cap Only': {
		title: 'POST-MONEY SAFE (VALUATION CAP)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. Valuation Cap',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the lower of (i) the price per share of the preferred stock sold in the Qualified Financing and (ii) the quotient obtained by dividing the Valuation Cap by the Company Capitalization.'
			}
		]
	},
	'Post-Money SAFE - Discount Only': {
		title: 'POST-MONEY SAFE (DISCOUNT)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. Discount',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the price per share of the preferred stock sold in the Qualified Financing, multiplied by the Discount.'
			}
		]
	},
	'Post-Money SAFE - MFN (Most Favored Nation)': {
		title: 'POST-MONEY SAFE (MFN)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. MFN',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the price per share of the preferred stock sold in the Qualified Financing, subject to adjustment as provided in the MFN provision.'
			}
		]
	},
	'Pre-Money SAFE - Valuation Cap Only': {
		title: 'PRE-MONEY SAFE (VALUATION CAP)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. Valuation Cap',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the lower of (i) the price per share of the preferred stock sold in the Qualified Financing and (ii) the quotient obtained by dividing the Valuation Cap by the Company Capitalization.'
			}
		]
	},
	'Pre-Money SAFE - Discount Only': {
		title: 'PRE-MONEY SAFE (DISCOUNT)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. Discount',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the price per share of the preferred stock sold in the Qualified Financing, multiplied by the Discount.'
			}
		]
	},
	'Pre-Money SAFE - Valuation Cap and Discount': {
		title: 'PRE-MONEY SAFE (VALUATION CAP AND DISCOUNT)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. Valuation Cap and Discount',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the lower of (i) the price per share of the preferred stock sold in the Qualified Financing, multiplied by the Discount and (ii) the quotient obtained by dividing the Valuation Cap by the Company Capitalization.'
			}
		]
	},
	'Pre-money SAFE - MFN (Most Favored Nation)': {
		title: 'PRE-MONEY SAFE (MFN)',
		sections: [
			{
				title: '1. Events',
				content: 'This SAFE will automatically convert into the next round of equity financing of the Company (a "Qualified Financing") in which the Company sells shares of its preferred stock at a price per share and with a total amount raised that meets the requirements of the Company\'s Certificate of Incorporation (as amended from time to time, the "Charter") for the authorization of a new series of preferred stock.'
			},
			{
				title: '2. MFN',
				content: 'The price per share of the shares of preferred stock sold in the Qualified Financing will be the price per share of the preferred stock sold in the Qualified Financing, subject to adjustment as provided in the MFN provision.'
			}
		]
	}
}

const PRO_RATA_TEMPLATE: DocumentTemplate = {
	title: 'PRO RATA RIGHTS LETTER',
	sections: [
		{
			title: '1. Pro Rata Rights',
			content: 'The Investor shall have the right to purchase its pro rata share of any new securities that the Company may issue in the future, subject to customary exceptions.'
		},
		{
			title: '2. Pro Rata Share',
			content: 'The Investor\'s pro rata share shall be equal to the ratio of (a) the number of shares of Common Stock owned by the Investor immediately prior to the issuance of such new securities to (b) the total number of shares of Common Stock outstanding immediately prior to the issuance of such new securities.'
		}
	]
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
			text: template.title,
			heading: HeadingLevel.HEADING_1,
			alignment: AlignmentType.CENTER
		}),
		new Paragraph({
			text: `Company: ${state.companyInfo.legalName}`,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: `Investor: ${state.investorInfo.investorLegalName}`,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: `Investment Amount: $${state.investorInfo.investmentAmount?.toLocaleString()}`,
			spacing: { after: 200 }
		}),
		new Paragraph({
			text: `Investment Date: ${new Date(state.investorInfo.investDate || '').toLocaleDateString()}`,
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

	// Add SAFE-specific details
	if (state.valuationCap) {
		paragraphs.push(
			new Paragraph({
				text: `Valuation Cap: $${state.valuationCap.toLocaleString()}`,
				spacing: { after: 200 }
			})
		)
	}

	if (state.discount) {
		paragraphs.push(
			new Paragraph({
				text: `Discount: ${state.discount}%`,
				spacing: { after: 200 }
			})
		)
	}

	return paragraphs
} 