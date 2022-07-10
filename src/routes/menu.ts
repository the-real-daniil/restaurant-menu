import type {RequestHandler} from '@sveltejs/kit'
import { getCategories, getProducts } from '../lib/resources/api';

export const get: RequestHandler = async () => {
	console.log('fetchProducts');
	try {
		const products = await getProducts()
		const categories = await getCategories()
		return {
			body: {
				products,
				categories,
			},
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		}
	}
}