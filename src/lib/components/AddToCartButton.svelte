<script lang="ts">
	import cart, {removeFromCart } from '$lib/stores/cart';
	import {addToCart} from '$lib/resources/api';

	export let id;

	const onAddToCart = (e) => {
		e.preventDefault();
		addToCart(id);
	}
	const onRemoveFromCart = (e) => {
		e.preventDefault();
		removeFromCart(id);
	}
	let isAdded = false;
	let count = 1;
	// $: {
	// 	isAdded = $cart.items.some(item => item.id === id);
	// 	if (isAdded) {
	// 		count = $cart.items.find(item => item.id === id).count;
	// 	}
	// }
</script>

{#if (isAdded)}
	<div class='flex flex-row  justify-between mb-2 w-[calc(100%-30px)] mx-2'>
		<button
			class='text-center rounded w-33 flex-1'
			on:click={onRemoveFromCart}>
			-
		</button>
		<div class='flex-1 text-center'>
			{count}
		</div>
		<button
			class='flex-1'
			on:click={onAddToCart}>
			+
		</button>
	</div>
{:else}
	<button on:click={onAddToCart} class='rounded bg-bg-gray mb-2 w-[calc(100%-30px)] mx-2'>
		<span class='py-2 text-xs block'>Добавить</span>
	</button>
{/if}




