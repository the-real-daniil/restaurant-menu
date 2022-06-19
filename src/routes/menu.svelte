<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';

	export let products: App.Product[];
</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<div>
	{#each products as drink}
		<a href={`/product/${drink.id}`}>
			<img src={drink.image} width='100' height='100' alt={drink.name}/>
			<div>{drink.name}</div>
		</a>
	{/each}
</div>

<CartButton/>
