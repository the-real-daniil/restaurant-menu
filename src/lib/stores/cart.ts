import { writable, get } from 'svelte/store';

const cart = writable<App.Cart>({
	items: [],
	totalAmount: 0,
})

export const setCartItem = (cartItem: App.CartItem) => {
	cart.update(cart => {
		const existedCartItem = cart.items.find(item => item.product_id === cartItem.product_id)
		if (existedCartItem) {
			return {
				items: cart.items.map(
					item => item.product_id === cartItem.product_id
									? cartItem
									: item
				),
				totalAmount: cart.totalAmount + cartItem.product.price,
			};
		}
		return {
			items: [...cart.items, cartItem],
			totalAmount: cart.totalAmount + cartItem.product.price,
		}
	})
}

export const removeFromCart = (productId: number) => {
	cart.update(cart => {
		const existedCartItem = cart.items.find(item => item.product_id === productId)
		if (existedCartItem) {
			return {
				items: cart.items.filter(item => item.product_id !== productId),
				totalAmount: cart.totalAmount - existedCartItem.product.price * existedCartItem.count,
			}
		}
		return cart;
	})
}

export const updateCartIfChanged = (updatedCart: App.Cart) => {
	if (get(cart).totalAmount !== updatedCart.totalAmount) {
		cart.set(updatedCart);
	}
}

export default cart;