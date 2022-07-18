<script lang="ts">
	import {fly} from 'svelte/transition';
	import CartCounterButton from '$lib/components/CartCounterButton.svelte';
	import cart from '$lib/stores/cart';
	export let item = null;

	let visible = false
	// $: if (item) {
		// visible = $cart.items.some(cartItem => cartItem.id === item.product_id)
	// }

	const imageStub = 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg'

</script>

{#if (item)}
	<div class='rounded shadow flex w-full min-h-[150px]' out:fly={{duration: 350, x: -400}}>
		<img
			class='w-[150px] object-cover rounded mr-6'
			src={item.product.image || imageStub}
			alt={item.product.name}
		/>
		<div class='pt-3.5 pb-2 pr-4 flex flex-col justify-between'>
			<div>
				<div class='font-semibold text-lg mb-0.5'>{item.product.price} ₽</div>
				<div class='text-sm text-black2 mb-1.5'>{item.product.name}</div>
			</div>
			<div>
				<div class='text-xxs text-black3 mb-2.5'>{item.product.weight} г</div>
				<div class='w-[145px]'>
					<CartCounterButton id={item.product_id} price={item.product.price} counterOnly={true}/>
				</div>
			</div>
		</div>
	</div>
{/if}
