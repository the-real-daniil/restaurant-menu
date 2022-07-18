<script context="module">
	import { handleFetchCart } from '../../lib/handlers/cart.js';
	export async function load() {
		await handleFetchCart();
		return {};
	}
</script>

<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import cart from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import CartItem from '$lib/components/CartItem.svelte';
	import CartButton from '$lib/components/CartButton.svelte';

	console.log('$cart', $cart);
	$: if ($cart.items.length === 0 && browser) {
			goto('/menu')
	}

</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>


{#if ($cart.items.length > 0)}
	<div class='px-4'>
		<div class='flex justify-between pt-[22px] pb-[42px] items-center'>
			<h1 class='text-xxl font-semibold'>Ваш заказ</h1>
			<a href='./menu' class='w-[107px]' sveltekit:noscroll>
				<Button type='action' classes='w-[107px] text-m'>
					Изменить
				</Button>
			</a>
		</div>
		<div class='grid grid-cols-1 gap-5 mb-7'>
			{#each $cart.items as item}
				<CartItem item={item}/>
			{/each}
		</div>
		<h1 class='text-xxl font-semibold mb-5'>Комментарий к заказу</h1>
		<textarea name='' rows='5' placeholder='Погорячее и побольше салфеток'
							class='rounded bg-bg-gray w-full py-4 px-5
						text-xbase placeholder:text-black3
						focus:outline-none mb-10 resize-none'></textarea>
		<div class='fixed bottom-0 left-0 right-0'>
			<CartButton actionText='Оформить заказ'/>
		</div>
	</div>
{/if}
