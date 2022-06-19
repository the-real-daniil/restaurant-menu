import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async () => {
	console.log('fetchProducts');
	const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
	try {
		const res = await fetch(url);
		const data = await res.json();
		const products = data.drinks.slice(0, 4).map(({strDrink, strDrinkThumb, idDrink}: App.ProductResponse) => ({
			name: strDrink,
			image: strDrinkThumb + '/preview',
			id: idDrink,
		}));
		return {
			body: {
				products,
			},
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		}
	}
}