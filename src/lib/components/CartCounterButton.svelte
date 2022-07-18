<script lang="ts">
	import cart from '$lib/stores/cart';
	import Button from './Button.svelte';
	import { handleAddToCart, handleRemoveFromCart } from '../handlers/cart';

	export let id;
	export let counterOnly = false;

	const onAddToCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await handleAddToCart(id)
	}
	const onRemoveFromCart = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		await handleRemoveFromCart(id);
	}

	let isAdded = false;
	let count;
	$: {
		isAdded = $cart.items.some(item => item.product_id === id);
		if (isAdded) {
			count = $cart.items.find(item => item.product_id === id).count;
		}
	}
</script>

{#if (isAdded || counterOnly)}
	<div class='flex flex-row items-center justify-between w-full h-[35px]'>
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
	<Button onClick={onAddToCart} size='s' type='default'>
		<span class='py-2 text-xs block'>Добавить</span>
	</Button>
{/if}




