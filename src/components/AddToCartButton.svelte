<script>
	import cart, { addToCart, removeFromCart } from '../stores/cart';

	export let id;

	const onAddToCart = () => addToCart(id);
	const onRemoveFromCart = () => removeFromCart(id);
	let isAdded;
	let count;
	$: {
		isAdded = $cart.items.some(item => item.id === id);
		if (isAdded) {
			count = $cart.items.find(item => item.id === id).count;
		}
	}
</script>

{#if (isAdded)}
	<div>
		<button on:click={onRemoveFromCart}>-</button>
		{count}
		<button on:click={onAddToCart}>+</button>
	</div>
{:else}
	<button on:click={onAddToCart}>
		Добавить в корзину
	</button>
{/if}




