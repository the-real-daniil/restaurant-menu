import { writable } from 'svelte/store';

const products = writable<Product[]>([]);

export type Product = {
	name: string,
	image: string,
	id: number,
}

type ProductResponse = {
	strDrink: string,
	strDrinkThumb: string,
	idDrink: number,
}

// TODO:
//  1. ленивая загрузка (а-ля пагинация)
// 	2. поиск по названию
// 	3. виртуализация длинного списка

const fetchDrinks = async () => {
	const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
	try {
		const res = await fetch(url);
		const data = await res.json();
		products.set(data.drinks.slice(0, 4).map(({strDrink, strDrinkThumb, idDrink}: ProductResponse) => ({
			name: strDrink,
			image: strDrinkThumb,
			id: idDrink,
		})));
	} catch (err) {
		console.error(err);
	}
}

fetchDrinks();

export default products;
