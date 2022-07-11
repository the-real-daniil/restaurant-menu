import type {RequestHandler} from '@sveltejs/kit'
import { getProduct } from '$lib/resources/api';

export const get: RequestHandler = async ({params}) => {
	const id = params.id;
	console.log('fetchProductById');
	try {
		const product = await getProduct(Number(id));
		return {
			body: {
				product
			}
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500,
		}
	}
}