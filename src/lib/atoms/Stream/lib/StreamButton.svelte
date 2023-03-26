<script lang="ts">
	export let recording = false;
	export let recorder = false;
	export let title: string | null = null;
</script>

<div class="container">
	<div on:click class:recording {title}>
		<slot name="icon" />
		{#if ($$slots.title && recorder && recording) || ($$slots.title && !recorder)}
			<div class="button--description"><slot name="title" /></div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		width: max-content;
		div {
			display: block;
			place-self: center start;
			cursor: pointer;
			width: max-content;

			display: flex;
			gap: 0.5rem;
			&.recording {
				:global(svg) {
					color: #ff0000;
				}
			}
			:global(svg) {
				width: max-content;
				color: black;
				display: block;
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
