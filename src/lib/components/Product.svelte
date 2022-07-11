<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let product: App.Product;
</script>

{#if (!!product)}
	<div class='flex flex-col justify-between bg-bg-gray h-full rounded-t overflow-hidden'>
		<div class='pb-5'>
			<img src={product.image} alt={product.title} class='object-cover w-full h-[300px]'>
			<div class='px-4'>
				<div class='mt-5 font-semibold text-xl'>
					{product.title}
				</div>
				<div class='mt-1 text-m text-black3'>
					{product.weight}
				</div>
				<div class='mt-5 text-xbase text-black2'>
					{product.description}
				</div>
			</div>
		</div>
		<div class='px-4 pb-4 pt-5 w-full bg-white'>
			<div class='flex flex-row justify-between mb-5 text-xxxbase text-black2'>
				<div>
					{product.title}
				</div>
				<div>
					{product.price}
				</div>
			</div>
			<Button type='action' size='m' classes='font-semibold text-lg'>
				Добавить
			</Button>
		</div>
	</div>
{/if}




