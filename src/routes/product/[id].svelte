<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';
	import Button from '$lib/components/Button.svelte'
	import AddToCartButton from '../../lib/components/CartCounterButton.svelte';

	export let product: App.Product;
	const {image, title, description, id, price, weight} = product;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class='flex flex-col justify-between min-h-screen bg-bg-gray'>
	<div>
		<img src={image} alt={title} class='object-cover w-full h-[300px]'>
		<div class='px-4'>
			<div class='mt-5 font-semibold text-xl'>
				{title}
			</div>
			<div class='mt-1 text-m text-black3'>
				{weight}
			</div>
			<div class='mt-5 text-xbase text-black2'>
				{description}
			</div>
		</div>
	</div>
	<div class='px-4 pb-4 pt-5 w-full bg-white'>
		<div class='flex flex-row justify-between mb-5 text-xxxbase text-black2'>
			<div>
				{title}
			</div>
			<div>
				{price}
			</div>
		</div>
		<Button type='action' size='m' classes='font-semibold text-lg'>
			Добавить
		</Button>
	</div>

<!--	<CartButton/>-->
</div>



