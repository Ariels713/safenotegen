import { SafeType } from '@/types/safeForm'
import { AlignmentType } from 'docx'

interface DocumentStyle {
	title: {
		bold: boolean
		size: number
		alignment: 'start' | 'center' | 'end' | 'both' | 'mediumKashida' | 'distribute' | 'numTab' | 'highKashida' | 'lowKashida' | 'thaiDistribute' | 'left' | 'right'
		spacing: {
			before: number
			after: number
		}
	}
	disclaimer: {
		bold: boolean
		size: number
		alignment: 'start' | 'center' | 'end' | 'both' | 'mediumKashida' | 'distribute' | 'numTab' | 'highKashida' | 'lowKashida' | 'thaiDistribute' | 'left' | 'right'
		spacing: {
			before: number
			after: number
		}
	}
	header: {
		bold: boolean
		size: number
		spacing: {
			before: number
			after: number
		}
	}
	section: {
		title: {
			bold: boolean
			size: number
			spacing: {
				before: number
				after: number
			}
		}
		content: {
			size: number
			spacing: {
				before: number
				after: number
			}
		}
	}
	signature: {
		title: {
			bold: boolean
			size: number
			spacing: {
				before: number
				after: number
			}
		}
		field: {
			size: number
			spacing: {
				before: number
				after: number
			}
		}
	}
}

const defaultStyle: DocumentStyle = {
	title: {
		bold: true,
		size: 32,
		alignment: 'center',
		spacing: {
			before: 200,
			after: 200
		}
	},
	disclaimer: {
		bold: true,
		size: 24,
		alignment: 'center',
		spacing: {
			before: 200,
			after: 200
		}
	},
	header: {
		bold: true,
		size: 24,
		spacing: {
			before: 200,
			after: 200
		}
	},
	section: {
		title: {
			bold: true,
			size: 24,
			spacing: {
				before: 200,
				after: 200
			}
		},
		content: {
			size: 24,
			spacing: {
				before: 200,
				after: 200
			}
		}
	},
	signature: {
		title: {
			bold: true,
			size: 24,
			spacing: {
				before: 200,
				after: 200
			}
		},
		field: {
			size: 24,
			spacing: {
				before: 200,
				after: 200
			}
		}
	}
}

const postMoneyValuationCapStyle: DocumentStyle = {
	...defaultStyle,
	title: {
		...defaultStyle.title,
		size: 36
	},
	header: {
		...defaultStyle.header,
		bold: true
	}
}

const postMoneyDiscountStyle: DocumentStyle = {
	...defaultStyle,
	title: {
		...defaultStyle.title,
		size: 36
	},
	header: {
		...defaultStyle.header,
		bold: true
	}
}

const proRataStyle: DocumentStyle = {
	...defaultStyle,
	title: {
		...defaultStyle.title,
		size: 36
	},
	header: {
		...defaultStyle.header,
		bold: true
	}
}

export function getDocumentStyle(safeType: SafeType): DocumentStyle {
	switch (safeType) {
		case 'postMoneyValuationCap':
			return postMoneyValuationCapStyle
		case 'postMoneyDiscount':
			return postMoneyDiscountStyle
		case 'postMoneyMfn':
			return postMoneyValuationCapStyle // Use same style as valuation cap
		case 'preMoneyValuationCap':
			return postMoneyValuationCapStyle // Use same style as post-money
		case 'preMoneyDiscount':
			return postMoneyDiscountStyle // Use same style as post-money
		case 'preMoneyValuationCapAndDiscount':
			return postMoneyValuationCapStyle // Use same style as valuation cap
		case 'preMoneyMfn':
			return postMoneyValuationCapStyle // Use same style as valuation cap
		case 'proRata':
			return proRataStyle
		default:
			return defaultStyle
	}
} 