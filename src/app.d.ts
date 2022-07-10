/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	type Product = {
		title: string,
		image: string,
		id: number,
		price: number,
		description: string,
		count?: number,
	}

	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
