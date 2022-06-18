<script context="module">
	export const load = async ({ params, fetch }) => {
		const id = params.id;
		const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			const {strDrink, strDrinkThumb, idDrink, strInstructions} = data.drinks[0]
			return {
				props: {
					name: strDrink,
					image: strDrinkThumb,
					id: idDrink,
					instruction: strInstructions,
				},
			}
		} catch (err) {
			console.error(err);
			return {};
		}
	}
</script>

<script>
	import CartButton from '../../components/CartButton.svelte';
	import AddToCartButton from '../../components/AddToCartButton.svelte';

	export let id;
	export let name;
	export let image;
	export let instruction;
</script>

<div>
	<img src={image} alt={name} width='300' height='300'>
	<div>
		{name}
	</div>
	<div>
		{instruction}
	</div>
	<AddToCartButton id={id}/>
</div>

<CartButton/>