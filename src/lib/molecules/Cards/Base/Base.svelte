<script lang="ts">
	export let backgroundColor: string;
	export let titleColor: string;
</script>

<div class="container" style="--background: {backgroundColor};">
	<h1 style="color: {titleColor};"><slot name="title" /></h1>

	{#if $$slots.description}
		<p><slot name="description" /></p>
	{:else}
		<div class="placeholder" />
	{/if}

	{#if $$slots.content}
		<div class="content">
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
		padding: 55px 35px;
		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-color: var(--background);
			opacity: 0.12;
			border-radius: 35px;
			top: 0;
			left: 0;
		}

		h1 {
			font-size: 50px;
			font-weight: 800;
			margin: 0;

			@media screen and (max-width: 1100px) {
				font-size: 35px;
			}
		}

		.placeholder {
			height: 10px;
		}
		.content {
			margin-top: 20px;
		}

		p {
			margin: 35px 0 0;
			font-size: 20px;
			color: #0b0b0b;
		}
	}
</style>
