<script lang="ts">
	import animateScrollTo from 'animated-scroll-to';
	import AsyncQueue from '../utils/asyncQueue';
	import {MENU_EVENT_TYPES} from '../constants';
	import {onMount} from 'svelte';

	/**
	 * Из чего состоит карусель:
	 * 1. данные - нужно создать коллекцию категорий
	 * 2. верстка - мапимся по категориям и рисуем полоску, которую можно скроллить
	 * 3. функционал
	 *
	 * Функционал:
	 * 1. Клик по айтему прокручивает нас до заголовка категории
	 * 2. При преодолении заголовком категории середины экрана переключать айтем
	 * 3. При переключении айтемов в 1 и 2 пункте бабл перемещается на активные айтем
	 *
	 * Как избежать багов, связанных с быстрым переключением меню
	 * 1. Быстрая анимация
	 * 2. Не обрабатывать событие, пока не закончилась обработка предыдущего
	 *
	 * Сделаем асинхронную очередь - события будут сыпаться в нее и последовательно обрабатываться
	 * Обрабатывам только одно событие - изменилась активная категория.
	 * Что стало причиной ее изменения - неважно.
	 * События будут эмитится из компонента menu.svelte
	 */

	export let event;
	export let categories;
	let bubble, scrollBar;
	const menuItemsElems = {}
	const PADDING = 15;
	const MENU_ITEM_PADDING = 15;

	/** сдвиг бабла */
	const bubbleGoTo = async (category: string) => {
		// const width = menuItemsElems[category].getBoundingClientRect().width;
		const width = menuItemsElems[category].clientWidth;
		console.log('width', width);
		const scrollLeft = scrollBar.scrollLeft;
		const left = menuItemsElems[category].getBoundingClientRect().left;
		console.log('left', left);
		bubble.style.width = `${width}px`;
		bubble.style.transform = `translateX(${left + scrollLeft - PADDING}px)`;
	}

	/** скролл менюшки */
	const moveScrollBar = async (category: string) => {
		console.log('moveScrollBar');
		const left = menuItemsElems[category]?.getBoundingClientRect().left;
		const scrollLeft = scrollBar.scrollLeft;
		await animateScrollTo([scrollLeft + left - PADDING, 0], { maxDuration: 200, minDuration: 100, elementToScroll: scrollBar});
	}

	/** скролл к блоку с категорией */
	const scrollTo = async (category: string) => {
		console.log('scrollTo', category);
		const categoryEl = document.getElementById(category);
		await animateScrollTo(categoryEl, { maxDuration: 300, minDuration: 100, verticalOffset: -30});
	}

	const eventsHandler = async ({ category, type }, {lock, unlock}) => {
		console.log('eventsHandler ', type, category);
		switch (type) {
			case MENU_EVENT_TYPES.CLICK:
				lock();
				await Promise.all([moveScrollBar(category), bubbleGoTo(category)]);
				await scrollTo(category);
				unlock();
				return;
			case MENU_EVENT_TYPES.VISIBLE:
				await moveScrollBar(category)
				await bubbleGoTo(category)
				return;
			default:
				return;
		}
	};

	const clickItemHandler = (category) => {
		eventsQueue.add({
			type: MENU_EVENT_TYPES.CLICK,
			category,
		});
	};

	let eventsQueue;
	onMount(() => {
		eventsQueue = AsyncQueue
			.channels(1)
			.process(eventsHandler)
			.success(() => console.log('menu item has been changed'))
			.failure((err, task) => console.error(`failure: ${err} ${task.category}`))
	})

	$: if (event && eventsQueue) {
		// setTimeout(() => {
			eventsQueue.add(event);
		// }, 1000)
	}
</script>

<div class='fixed top-0 bg-white w-full z-10'>
	<nav class='overflow-x-scroll scroll-smooth overflow-y-hidden w-full shadow h-[62px] py-3.5 relative'
			 bind:this={scrollBar}>
		<div class='absolute w-[171.5px] bg-bg-gray top-3.5 left-4 h-[34px] rounded transition-transform' bind:this={bubble}></div>
		<ul class='relative flex flex-row align-center w-full'>
			<span class='min-w-[15px] min-h-[1px] fake-padding'></span>
			{#each categories as category}
				<li
					class='text-xbase whitespace-nowrap
								px-2.5 py-1.75 align-middle text-center
								flex justify-center align-center cursor-pointer'
					on:click={() => clickItemHandler(category)}
					bind:this={menuItemsElems[category]}
				>
					{category}
				</li>
			{/each}
			<span class='min-w-[15px] min-h-[1px] fake-padding'></span>
		</ul>
	</nav>
</div>
