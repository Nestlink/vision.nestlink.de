<script lang="ts">
	import Share from '$assets/images/share.svg';
</script>

<div>
	<div class="container">
		<div class="shade">
			<h1>Sharing your experience with others made simple.</h1>
		</div>
		<div class="window__container">
			<div class="window">
				<img src={Share} alt="Sharing widget" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		.shade {
			padding: 55px 35px 35px;
			position: relative;
			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
				background-color: #004cff;
				opacity: 0.12;
				border-radius: 35px 35px 0 0;
				top: 0;
				left: 0;
			}
		}

		h1 {
			font-size: 50px;
			font-weight: 800;
			margin: 0;
			color: #004cff;

			@media screen and (max-width: 1100px) {
				font-size: 35px;
			}
		}

		.window__container {
			position: relative;
			padding: 0 1rem;
			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 50%;
				z-index: -1;
				background-color: #004cff;
				opacity: 0.12;
				border-radius: 0 0 35px 35px;
				top: 0;
				left: 0;
			}
		}

		.window {
			margin: 0 auto;
			max-width: 500px;
			width: 100%;
			margin: 0 auto;
			box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1);

			border-radius: 20px;
			background-color: white;
			img {
				width: 100%;
				height: auto;
			}
		}
	}
</style>
