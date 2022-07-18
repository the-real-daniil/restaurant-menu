import { addToCart, getCart, removeFromCart, setCartItemCount } from '$lib/resources/api';
import { updateCartIfChanged, setCartItem, removeFromCart as removeFromCartStore } from '$lib/stores/cart';

export const handleFetchCart = async () => {
	try {
		const cart = await getCart();
		updateCartIfChanged(cart)
	} catch(err) {
		console.error((err as Error).message);
	}
}

export const handleAddToCart = async (productId: number) => {
	try {
		const cartItem = await addToCart(productId);
		setCartItem(cartItem);
	} catch(err) {
		console.error((err as Error).message);
	}
}

export const handleSetCartItemCount = async (productId: number, count: number) => {
	try {
		const cartItem = await setCartItemCount(productId, count);
		setCartItem(cartItem);
	} catch(err) {
		console.error((err as Error).message);
	}
}

export const handleRemoveFromCart= async (productId: number) => {
	try {
		const cartItem = await removeFromCart(productId);
		if (cartItem) {
			setCartItem(cartItem);
		} else {
			removeFromCartStore(productId);
		}
	} catch(err) {
		console.error((err as Error).message);
	}
}