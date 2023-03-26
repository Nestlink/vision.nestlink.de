<script>
	import Cross from '$assets/images/cross.svg';
</script>

<div class="container">
	<h1>Prioritising bird welfare.</h1>
	<p>
		Unfortunately, this is not for granted. The module was designed in a way not to bother any
		birds.
	</p>
	<p class="info">A keen reminder that we have to adapt to their world.</p>
	<img src={Cross} class="cross" alt="Cross (symbolic)" />
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
			background-color: #00a99f;
			opacity: 0.12;
			border-radius: 35px;
			top: 0;
			left: 0;
		}

		.cross {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: -1;
		}

		h1 {
			font-size: 50px;
			font-weight: 800;
			margin: 0;
			color: #00a99f;

			@media screen and (max-width: 1100px) {
				font-size: 35px;
			}
		}

		p {
			margin: 35px 0 0;
			font-size: 20px;
			color: #0b0b0b;
			&.info {
				color: rgb(87, 87, 87);
			}
		}
	}
</style>
