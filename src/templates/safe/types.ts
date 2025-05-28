import { SafeType } from '@/types/safeForm'

export interface DocumentTemplate {
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

export type SafeTemplateType = SafeType | 'ProRata' 