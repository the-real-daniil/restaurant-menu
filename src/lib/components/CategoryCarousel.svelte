<script lang="ts">
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
	import {MENU_EVENT_TYPES} from '../constants';
	import { createEventDispatcher } from 'svelte';

	export let bubble, scrollBar, carouselItems, categories, carouselXPadding;

	carouselXPadding = 15;

	const dispatch = createEventDispatcher();

	const clickItemHandler = (category) => {
			dispatch(MENU_EVENT_TYPES.CAROUSEL_CLICK, {
				category,
			})
	};
</script>

<div class='fixed top-0 bg-white w-full z-10'>
	<nav class='overflow-x-scroll scroll-smooth overflow-y-hidden w-full shadow h-[62px] py-3.5 relative'
			 bind:this={scrollBar}>
		<div class='absolute w-[171.5px] bg-bg-gray top-3.5 left-4 h-[34px] rounded transition-transform' bind:this={bubble}></div>
		<ul class='relative flex flex-row align-center w-full'>
			<span class='min-w-[15px] min-h-[1px] fake-padding'></span>
			{#each categories as category}
				<li
					class='text-xbase whitespace-nowrap text-black3
								px-2.5 py-1.75 align-middle text-center
								flex justify-center align-center cursor-pointer'
					on:click={() => clickItemHandler(category)}
					bind:this={carouselItems[category]}
				>
					{category}
				</li>
			{/each}
			<span class='min-w-[15px] min-h-[1px] fake-padding'></span>
		</ul>
	</nav>
</div>
