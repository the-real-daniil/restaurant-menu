<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onDestroy } from 'svelte';
	import AddToCartButton from './CartCounterButton.svelte';
	import { getProductsByCategory } from '../resources/api';
	import ProductsSkeleton from './ProductsSkeleton.svelte';
	import { MENU_EVENT_TYPES } from '../constants';
	const dispatch = createEventDispatcher();

	export let category: string;
	export let unobserve = () => null;
	export let onProductItemClick = () => null;
	export let isVisible: boolean;
	export let products: any[] = [];

	$: if (products.length === 0 && isVisible && category) {
			getProductsByCategory(category)
				.then(result => products = result);
		}

	$: if (isVisible) {
		dispatch(MENU_EVENT_TYPES.CATEGORY_VISIBLE, {
			category,
		})
	}

	onDestroy(unobserve);
</script>


<div class='pt-[60px] px-4' id={category}>
	<h1 class='mb-[40px] pl-2 text-xxl font-semibold'>
		{category}
	</h1>
	{#if (products.length > 0)}
		<div class='grid gap-4 grid-cols-2 grid-rows-2'>
			{#each products as product}
				<div class='rounded shadow' on:click={(event) => onProductItemClick(event, product)}>
					<img
						src={product.image}
						class='rounded mb-3 h-[150px] w-full object-cover'
						alt={product.title}/>
					<div class='font-medium mb-1 text-lg pr-4 pl-4 text-black1'>{product.price}</div>
					<div class='mb-1.5 text-sm pr-4 pl-4 text-black2'>{product.title}</div>
					<div class='text-xs mb-2.5 pr-4 pl-4 text-black3'>{product.weight}</div>
					<AddToCartButton/>
				</div>
			{/each}
		</div>
	{:else}
		<ProductsSkeleton count={5}/>
	{/if}
</div>








