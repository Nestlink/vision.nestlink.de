<script lang="ts">
	export let adaptive: boolean = true;
</script>

<button id="button" tabindex={0} class:adaptive class:active={false} on:click>
	<slot />
</button>

<style lang="scss">
	@use './lib/button.scss' as button;
	button {
		@include button.button;
		width: 100%;
		&.adaptive {
			width: auto;
		}
	}
</style>
