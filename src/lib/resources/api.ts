import axios from "axios";

export const api = axios.create({
	baseURL: 'http://localhost:8000',
	timeout: 3000,
});

const EMPTY_ARRAY = Object.freeze([])
const EMPTY_OBJECT = Object.freeze({})
const PRODUCTS_MOCKS =  [
	{
		id: 1,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: 565,
		weight: 280,
		description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук'
	},
	{
		id: 2,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: 565,
		weight: 280,
		description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук'
	},
	{
		id: 3,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: 565,
		weight: 280,
		description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук'
	},
	{
		id: 4,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: 565,
		weight: 280,
		description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук'
	},
	{
		id: 5,
		image: 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg',
		title: 'Бургер с беконом',
		price: 565,
		weight: 280,
		description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук'
	},
]
export const CATEGORIES_MOCKS = ['Популярные блюда', 'Суши', 'Бургеры', 'Пицца', 'Напитки', 'Десерты', 'Морепродукты']

// export const getProducts = () => api.get('/products?limit=5')
// 	.then(res => res.data)
// 	.catch(err => {
// 		console.error(err);
// 		return EMPTY_ARRAY;
// 	});


export const getProducts = async () => Promise.resolve(PRODUCTS_MOCKS);
// export const getProductsByCategory = (category: string): Promise<any[]> =>
// 	new Promise((resolve) => {
// 			setTimeout(() => resolve(PRODUCTS_MOCKS), 700)
// 	});


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
export const getProductsByCategory =
	(category: string, page: number, size: number): Promise<App.Product[]> =>
		api.get(`/v1/products/list/?category=${category}&size=${size}&page=${page}`)
			.then(res => res.data.items)
			.catch(() => EMPTY_ARRAY);


// export const getCategories = async () =>
// 	new Promise((resolve) => {
// 		setTimeout(() => resolve(CATEGORIES_MOCKS), 1000)
// 	});

export const getCategories = async () =>
	api.get('/v1/category')
		.then(res => res.data);


export const setProductCardCount = (id: number, count: number) =>
	new Promise(resolve => {
		setTimeout(() => resolve({success: true}), 500)
	})


const MOCK = {
	name: 'Бургер с беконом',
	price: 565,
	weight: 280,
	description: 'Бифштекс из мраморной говядины, фирменный копченный сосус, сыр гауда, помидоры, красный лук',
	available: true,
};

export const uploadProducts = (categories: string[]) => {
	console.log('uploadProducts');
	categories.forEach((category, categoryIdx) => {
		[2534, 23452, 99485, 1309485, 276782].forEach(id => {
			api.post('/v1/products/create', {
				id: id + categoryIdx,
				category,
				...MOCK
			});
		});
	});
}

const USER_ID = 'test';

export const createUser = () =>
	api.post('/v1/users/register', {id: USER_ID});

export const getIsRegistered = () =>
	api.get(`/v1/users/${USER_ID}`)
		.then(res => res.data)
		.catch(() => false);

export const addToCart = (productId: number) =>
	api.post('/v1/cart/add', {user_id: USER_ID, product_id: productId})
		.then(res => res.data);

export const setCartItemCount = async (productId: number, count: number) => {
	let result;
	for (let i = 0; i < count; ++i) {
		result = await api.post('/v1/cart/add', {user_id: USER_ID, product_id: productId})
	}
	return result?.data;
}

export const removeFromCart = (productId: number) =>
	api.delete(`/v1/cart/product/${productId}`, {
		headers: {
			'user-id': USER_ID,
		},
	})
		.then(res => res.data);

export const getCart= () =>
	api.get<App.Cart>('/v1/cart/list/', {
		headers: {
			'user-id': USER_ID,
		},
	})
		.then(res => {
			return {...res.data, totalAmount: 3};
		});