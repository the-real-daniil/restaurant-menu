<script>
	import cart from '$lib/stores/cart';
	import Button from './Button.svelte';
	import { slide } from 'svelte/transition';

	export let actionText;
	export let action = () => null;
</script>


{#if ($cart.totalAmount)}
	<div class='w-full p-4 flex bg-white font-medium text-lg' in:slide out:slide>
		<Button size='m' classes='mr-2 basis-7/12 '>{$cart.totalAmount} ₽</Button>
		<a href='../cart' class='w-full' sveltekit:noscroll>
			<Button size='m' type='action' onClick={action}>{actionText}</Button>
		</a>
	</div>
{/if}
