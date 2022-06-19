/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type Product = {
		name: string,
		image: string,
		id: number,
		instruction?: string,
	}

	type ProductResponse = {
		strDrink: string,
		strDrinkThumb: string,
		idDrink: number,
		strInstructions?: string,
	}

	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
