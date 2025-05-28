import { SafeType } from '@/types/safeForm'

export interface DocumentTemplate {
	title: string
	disclaimer: string
	subtitle: string
	companyName: string
	ycombinatorNote: string
	valuationCapNote: string
	header: string
	sections: {
		title: string
		content: string
	}[]
	signature: {
		witness: string
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

export type SafeTemplateType = SafeType | 'ProRata' 