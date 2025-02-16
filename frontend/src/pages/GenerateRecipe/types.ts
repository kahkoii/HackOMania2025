interface Ingredient {
	name: string
	amount: number
	unit: string
	expiryDays: number
	info: string
}

interface Recipe {
	title: string
	description: string
	ingredients: string[]
	instructions: {
		title: string
		details: string
	}[]
}

export type { Ingredient, Recipe }
