<script lang="ts">
	export let products: App.Product[];
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<div>
	{#each products as product}
		<a href={`/product/${product.id}`}>
			<img src={product.image} width='100' height='100' alt={product.title}/>
			<div>{product.title}</div>
			<div>{product.count}</div>
		</a>
	{/each}
</div>