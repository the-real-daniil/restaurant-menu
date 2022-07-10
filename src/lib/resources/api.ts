import axios from "axios";

const api = axios.create({
	baseURL: 'https://fakestoreapi.com',
	timeout: 3000,
});

const EMPTY_ARRAY = Object.freeze([])
const EMPTY_OBJECT = Object.freeze({})
const PRODUCTS_MOCKS =  [
	{
		id: 1,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: '565 ₽',
		weight: '280 г',
	},
	{
		id: 2,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: '565 ₽',
		weight: '280 г',
	},
	{
		id: 3,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: '565 ₽',
		weight: '280 г',
	},
	{
		id: 4,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: '565 ₽',
		weight: '280 г',
	},
	{
		id: 5,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: '565 ₽',
		weight: '280 г',
	},
]
export const CATEGORIES_MOCKS = ['Популярные блюда', 'Суши', 'Бургеры', 'Пицца', 'Напитки', 'Десерты', 'Морепродукты']
const USER_ID = 1;
const CART_ID = 1;

// export const getProducts = () => api.get('/products?limit=5')
// 	.then(res => res.data)
// 	.catch(err => {
// 		console.error(err);
// 		return EMPTY_ARRAY;
// 	});

function sleep(milliseconds: number) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

export const getProducts = async () => Promise.resolve(PRODUCTS_MOCKS);
export const getProductsByCategory = (category: string): Promise<any[]> =>
	new Promise((resolve) => {
			setTimeout(() => resolve(PRODUCTS_MOCKS), 1000)
	})


export const getCategories = async () => {
	sleep(200);
	return Promise.resolve(CATEGORIES_MOCKS);
};

export const getProduct = (id: number) => api.get(`/products/${id}`)
	.then(res => res.data)
	.catch(err => {
		console.error(err);
		return EMPTY_OBJECT;
	});

async function* getCartItemsGenerator() {
	const result = await api.get(`/carts/${CART_ID}`);
	if (!result.data?.products) {
		yield EMPTY_ARRAY;
	}
	for (const product of result.data.products) {
		const cartProduct = await getProduct(product.productId);
		yield {...cartProduct, count: product.quantity}
	}
}

export async function getCartItems() {
	const result = [];
	for await (const product of getCartItemsGenerator()) {
		result.push(product);
	}
	return result;
}

export const addToCart = (productId: number) => api.put(`/carts/${productId}`, {
	userId: USER_ID,
	products: [{productId, quantity: 1}]
})
	.then(res => res.data)
	.catch(err => {
		console.error(err);
		return EMPTY_OBJECT;
	});