<script lang="ts">
	import Check from 'phosphor-svelte/lib/Check/Check.svelte';
	export let name: string;
	export let checked: boolean = false;
</script>

<div class="container">
	<div class="checkbox">
		<div class="checkmark" class:checked>
			<Check />
		</div>
	</div>
	<input id={name} {name} type="checkbox" bind:checked />
	<label for={name}><slot /></label>
</div>

<style lang="scss">
	.container {
		position: relative;
		display: inline-grid;
		grid-template-columns: max-content auto;
		overflow: hidden;
		gap: 1rem;
		z-index: 1;
		cursor: pointer;
		.checkbox {
			width: 20px;
			height: 20px;
			border-radius: 5px;
			background-color: white;
			padding: 2px;
			opacity: 0.999;
			z-index: -1;
			.checkmark {
				color: black;
				width: 100%;
				height: 100%;

				&:not(.checked) {
					color: transparent;
				}

				& :global(svg) {
					width: 100%;
					height: 100%;
				}
			}
		}

		label {
			word-break: normal;
			hyphens: auto;
			cursor: pointer;
		}

		input {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			opacity: 0;
			cursor: pointer;
		}
	}
</style>
