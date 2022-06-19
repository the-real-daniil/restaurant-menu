<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';

	export let id: number;
	export let product: App.Product;
	const {image, name, instruction} = product;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div>
	<img src={image} alt={name} width='300' height='300'>
	<div>
		{name}
	</div>
	<div>
		{instruction}
	</div>
	<AddToCartButton id={id}/>
</div>

<CartButton/>