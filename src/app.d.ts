/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type Product = {
		name: string,
		id: number,
		image: string,
		weight: number,
		price: number,
		available: boolean,
		description?: string,
		sale_price?: number,
		category?: string
	}

	type CartItem = {
		count: number,
		id?: number,
		product: Product,
		product_id: number,
		user_id?: string,
	}

	type Cart = {
		items: CartItem[],
		totalAmount: number,
	}

	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
