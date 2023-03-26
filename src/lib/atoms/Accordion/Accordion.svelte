<script lang="ts">
	import Plus from 'phosphor-svelte/lib/Plus/Plus.svelte';
	export let open: boolean = false;
</script>

<div class="container" class:open>
	<div class="header" on:click={() => (open = !open)}>
		<h2><slot name="title" /></h2>
		<div class="indicator" class:open>
			<Plus />
		</div>
	</div>
	{#if open}
		<div class="content">
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		&.open {
			border-radius: 35px;
			background-color: #fff;
			padding: 55px 35px;

			@media screen and (max-width: 1100px) {
				padding: 50px 25px;
			}
		}

		.header {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			cursor: pointer;
			h2 {
				font-size: 24px;
				font-weight: 600;
				margin: 0;

				@media screen and (max-width: 1100px) {
					font-size: 20px;
				}
			}
			.indicator {
				&.open {
					display: none;
				}
				& :global(svg) {
					width: 30px;
					height: 30px;
				}
			}
		}

		.content {
			margin: 30px 0 0;
			color: #0b0b0b;
			line-height: 25px;
		}
	}
</style>
