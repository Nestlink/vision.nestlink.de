<script lang="ts">
	let blurred = false;
</script>

<div class="container" class:blurred on:click={() => (blurred = !blurred)}>
	<h1>Built with privacy and security in mind.</h1>
	<p>No microphone. Host your own streaming server or use our german based infrastructure.</p>
</div>

<style lang="scss">
	@use '$scss/hover.scss' as h;
	.container {
		position: relative;
		padding: 55px 35px;
		background-color: #000;
		border-radius: 35px;
		color: #fff;

		&::after {
			content: '';
			position: absolute;
			width: calc(100% - 10px);
			height: calc(100% - 10px);
			top: 5px;
			left: 5px;
			border-radius: 35px;
			backdrop-filter: blur(0.3rem);
			transition: backdrop-filter 0.1s ease-in-out;
		}

		@media (hover: none) {
			&.blurred {
				&::after {
					backdrop-filter: blur(0);
				}
			}
		}

		@include h.hover() {
			&::after {
				backdrop-filter: blur(0);
			}
		}

		h1 {
			font-size: 50px;
			font-weight: 800;
			margin: 0;

			@media screen and (max-width: 1100px) {
				font-size: 35px;
			}
		}
	}
</style>
