import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({params}) => {
	const id = params.id;
	console.log('fetchProductById');
	const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		const {strDrink, strDrinkThumb, idDrink, strInstructions}: App.ProductResponse = data.drinks[0];
		const product = {
			name: strDrink,
			image: strDrinkThumb + '/preview',
			id: idDrink,
			instruction: strInstructions,
		}
		return {
			body: {
				product,
				id,
			}
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		}
	}
}