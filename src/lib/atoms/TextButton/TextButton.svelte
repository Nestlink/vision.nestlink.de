<p role="button" tabindex={0} on:click class:active={false}>
	<slot />
</p>

<style lang="scss">
	@use '$scss/hover.scss' as *;
	p {
		display: inline-flex;
		color: #006dff;

		cursor: pointer;

		&.active,
		&:active {
			color: #0046a3;
		}

		@include hover() {
			text-decoration: underline;
		}

		&:focus-visible {
			text-decoration: underline;
		}
	}
</style>
