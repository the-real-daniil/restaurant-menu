<script lang="ts">
	export let onClick = null;
	export let type: 'action' | 'default' = 'default'
	export let size: 's' | 'm';
	export let classes: string;

	const getBackgroundCssClass = () => {
		switch (type) {
			case 'action': return 'bg-yellow';
			case 'default': return 'bg-bg-gray';
			default: return ''
		}
	}
	const getHeightCssClasses = () => {
		switch (size) {
			case 's': return 'h-[35px]';
			case 'm': return 'h-[49px]';
			default: return ''
		}
	}
</script>

<button on:click={onClick}
				class={`
				rounded w-full
				${classes}
				${getBackgroundCssClass()}
				${getHeightCssClasses()}`
				}
>
	<slot/>
</button>