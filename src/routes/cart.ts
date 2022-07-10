import type {RequestHandler} from '@sveltejs/kit'
import { getCartItems } from '$lib/resources/api';

export const get: RequestHandler = async () => {
	console.log('getCartItems');
	try {
		const products = await getCartItems();
		return {
			body: {
				products
			}
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		}
	}
}