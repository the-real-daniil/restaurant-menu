<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';
	import CategoryCarousel from '$lib/components/CategoryCarousel.svelte';
	import CategoryBlock from '$lib/components/CategoryBlock.svelte';
	import Visibility from '../lib/components/Visibility.svelte';
	import { MENU_EVENT_TYPES } from '../lib/constants';

	export let categories: string[]

	let event;

	const visibleEventHandler = ({detail}) => {
		const {category} = detail;
		event = {
			category,
			type: MENU_EVENT_TYPES.VISIBLE
		};
	}

</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<div class='relative'>
	<CategoryCarousel categories={categories} event={event}/>
	<div class='mt-[42px]'>
		{#each categories as category}
			<Visibility steps={100} let:percent let:unobserve>
				<CategoryBlock
					category={category}
					isVisible={percent > 20}
					unobserve={unobserve}
					on:visible={visibleEventHandler}
				/>
			</Visibility>
		{/each}
	</div>
	<CartButton/>
</div>

