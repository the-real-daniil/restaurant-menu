<script lang="ts">
	export let onClick = null;
	export let type: 'action' | 'default' | 'danger' = 'default'
	export let size: 's' | 'm' = 's';
	export let classes: string;

	let backgroundCssClass = '';
	$: switch (type) {
		case 'action':
			backgroundCssClass = 'bg-yellow';
			break;
		case 'default':
			backgroundCssClass = 'bg-bg-gray';
			break;
		case 'danger':
			backgroundCssClass = 'bg-red';
			break;
	}

	let heightCssClass = ''
	$: switch (size) {
		case 's':
			heightCssClass = 'h-[35px]';
			break;
		case 'm':
			heightCssClass = 'h-[49px]';
			break;
	}
</script>

<button on:click={onClick}
				class={`
				rounded w-full
				${classes}
				${backgroundCssClass}
				${heightCssClass}`
				}
>
	<slot/>
</button>