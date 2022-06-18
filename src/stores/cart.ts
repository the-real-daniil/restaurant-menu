import { writable } from 'svelte/store';

export type Cart = {
	items: CartItem[],
	total: number,
}

export type CartItem = {
	id: number,
	count: number;
}

const cart = writable<Cart>({
	items: [],
	total: 0,
})

export const addToCart = (id: number) => {
	cart.update(cart => {
		const item = cart.items.find(item => item.id === id)
		if (item) {
			return {
				items: cart.items.map(item => item.id === id ? {...item, count: item.count + 1} : item),
				total: ++cart.total,
			};
		}
		return {
			items: [...cart.items, {id, count: 1}],
			total: ++cart.total,
		}
	})
}

export const removeFromCart = (id: number) => {
	cart.update(cart => {
		const item = cart.items.find(item => item.id === id)
		if (item) {
			if (item.count <= 1) {
				return {
					items: cart.items.filter(item => item.id !== id),
					total: --cart.total,
				}
			} else {
				return {
					items: cart.items.map(item => item.id === id ? {...item, count: item.count - 1} : item),
					total: --cart.total,
				};
			}
		}
		return cart;
	})
}

export default cart;