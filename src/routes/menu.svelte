<script lang="ts">
	import animateScrollTo from 'animated-scroll-to';
	import CartButton from '$lib/components/CartButton.svelte';
	import CategoryCarousel from '$lib/components/CategoryCarousel.svelte';
	import CategoryBlock from '$lib/components/CategoryBlock.svelte';
	import Visibility from '$lib/components/Visibility.svelte';
	import { MENU_EVENT_TYPES } from '$lib/constants';
	import AsyncQueue from '$lib/utils/asyncQueue';

	export let categories: string[]
	export let scrollBar: HTMLElement;
	export let bubble: HTMLElement;
	export let carouselXPadding: number;
	export const carouselItems: {[category: string]: HTMLElement} = {};

	/** сдвиг и ресайз бабла */
	const moveBubble = async (category: string) => {
		console.log('moveBubble', category);
		if (bubble && scrollBar && carouselItems[category]) {
			const width = carouselItems[category].clientWidth;
			const scrollLeft = scrollBar.scrollLeft;
			const left = carouselItems[category].getBoundingClientRect().left;
			bubble.style.width = `${width}px`;
			bubble.style.transform = `translateX(${left + scrollLeft - carouselXPadding}px)`;
		}
	}

	/** скролл менюшки */
	const DELTA = 2; // погрешность скролла карусели
	const moveScrollBar = async (category: string) => {
		console.log('moveScrollBar', category);
		if (scrollBar && carouselItems[category]) {
			const left = carouselItems[category].getBoundingClientRect().left;
			const scrollLeft = scrollBar.scrollLeft;
			await animateScrollTo([scrollLeft + left - carouselXPadding + DELTA, 0], {
				maxDuration: 200,
				minDuration: 100,
				elementToScroll: scrollBar
			});
		}
	}

	/** скролл к блоку с категорией */
	const scrollTo = async (category: string) => {
		console.log('scrollTo', category);
		const categoryBlockEl = document.getElementById(category);
		await animateScrollTo(categoryBlockEl, { maxDuration: 300, minDuration: 100, verticalOffset: -30 });
	}

	const styleCarouselItemsText = (category: string) => {
		console.log('styleCarouselItemsText', category);
		console.log('carouselItems', carouselItems);
		Object.keys(carouselItems).forEach((key) => {
			if (key === category) {
				carouselItems[key].classList.replace('text-black3', 'text-black2')
			} else {
				carouselItems[key].classList.replace('text-black2', 'text-black3')
			}
		})
	}

	/** обработчик всех событий в очереди */
	const eventsHandler = async ({ category, type }, {lock, unlock}) => {
		console.log('eventsHandler ', type, category);
		switch (type) {
			case MENU_EVENT_TYPES.CAROUSEL_CLICK:
				lock();
				styleCarouselItemsText(category)
				await Promise.all([moveScrollBar(category), moveBubble(category)]);
				await scrollTo(category);
				unlock();
				return;
			case MENU_EVENT_TYPES.CATEGORY_VISIBLE:
				styleCarouselItemsText(category)
				await moveScrollBar(category);
				await moveBubble(category);
				return;
			default:
				return;
		}
	};

	const eventsQueue = AsyncQueue
		.channels(1)
		.process(eventsHandler)
		.success(() => console.log('event has been handled'))
		.failure((err, task) => console.error(`failure: ${err} ${task.category}`))

	let first = true;
	const categoryVisibleEventHandler = ({detail}) => {
		const {category} = detail;
		const event = {
			category,
			type: MENU_EVENT_TYPES.CATEGORY_VISIBLE
		};

		/** костыль, чтобы избежать некорректного размера бабла при первом событии */
		if (first) {
			setTimeout(() => {
				eventsQueue.add(event);
				first = false;
			}, 100)
		} else {
			eventsQueue.add(event);
		}
	}

	const carouselClickEventHandler = ({detail}) => {
		const {category} = detail;
		const event = {
			category,
			type: MENU_EVENT_TYPES.CAROUSEL_CLICK
		}
		eventsQueue.add(event)
	}


</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<div class='relative'>
	<CategoryCarousel
		categories={categories}
		bind:scrollBar={scrollBar}
		bind:bubble={bubble}
		bind:carouselXPadding={carouselXPadding}
		carouselItems={carouselItems}
		on:carousel-click={carouselClickEventHandler}
	/>
	<div class='mt-[42px]'>
		{#each categories as category}
			<Visibility steps={100} let:percent let:unobserve>
				<CategoryBlock
					category={category}
					isVisible={percent > 20}
					unobserve={unobserve}
					on:category-visible={categoryVisibleEventHandler}
				/>
			</Visibility>
		{/each}
	</div>
	<CartButton/>
</div>

