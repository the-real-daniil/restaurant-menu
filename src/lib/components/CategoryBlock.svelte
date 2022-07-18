<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onDestroy } from 'svelte';
	import { getProductsByCategory } from '$lib/resources/api';
	import { MENU_EVENT_TYPES } from '$lib/constants';
	import CartCounterButton from './CartCounterButton.svelte';
	import ProductsSkeleton from './ProductsSkeleton.svelte';

	const dispatch = createEventDispatcher();

	export let category: string;
	export let unobserve = () => null;
	export let openProductCard = () => null;
	export let isVisible: boolean;
	export let products: App.Product[] = [];

	$: if (products.length === 0 && isVisible && category) {
			getProductsByCategory(category, 1, 75)
				.then(result => {
					if (result.length > 0) {
						products = result;
					}
				});
		}

	$: if (isVisible) {
		dispatch(MENU_EVENT_TYPES.CATEGORY_VISIBLE, {
			category,
		})
	}

	const imageStub = 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg'

	onDestroy(unobserve);
</script>

<div class='pt-[60px] px-4' id={category}>
	<h1 class='mb-[40px] pl-2 text-xxl font-semibold'>
		{category}
	</h1>
	{#if (products.length > 0)}
		<div class='grid gap-4 grid-cols-2 grid-rows-2'>
			{#each products as product}
				<div class='rounded shadow' on:click={() => openProductCard(product)}>
					<img
						src={product.image || imageStub}
						class='rounded mb-3 h-[150px] w-full object-cover'
						alt={product.name}/>
					<div class='font-medium mb-1 text-lg pr-4 pl-4 text-black1'>{product.price} ₽</div>
					<div class='mb-1.5 text-sm pr-4 pl-4 text-black2'>{product.name}</div>
					<div class='text-xs mb-2.5 pr-4 pl-4 text-black3'>{product.weight} г</div>
					<div class='mb-2 w-[calc(100%-30px)] mx-2'>
						<CartCounterButton id={product.id} price={product.price}/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<ProductsSkeleton count={5}/>
	{/if}
</div>
