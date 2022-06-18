<script>
	import products from '../stores/products';
	import CartButton from '../components/CartButton.svelte';
</script>

<div>
	{#each $products as drink}
		<a href={`/product/${drink.id}`}>
			<img src={drink.image} width='100' height='100' alt={drink.name}/>
			<div>{drink.name}</div>
		</a>
	{/each}
</div>

<CartButton/>
