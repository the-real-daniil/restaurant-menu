<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';

	export let product: App.Product;
	const {image, title, description, id} = product;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div>
	<img src={image} alt={title} width='300' height='300'>
	<div>
		{title}
	</div>
	<div>
		{description}
	</div>
	<AddToCartButton id={id}/>
</div>

<CartButton/>