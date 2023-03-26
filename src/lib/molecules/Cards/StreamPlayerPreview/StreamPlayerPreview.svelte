<script lang="ts">
	import Cell from '$assets/bezels/apple/iPhone/14ProMax/SpaceBlack.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import Cell_Placeholder from '$assets/bezels/apple/iPhone/14ProMax/SpaceBlack.png?width=100&format=jpg&metadata';
	import { controls } from '$lib/atoms/Stream/Stream';
	import Stream from '$lib/atoms/Stream/Stream.svelte';
	import Video from '$assets/videos/birdhouse/beta/preview--xl.mp4';
</script>

<div>
	<div class="container">
		<h1>Keep your<br />subtenants at glance.</h1>
		<div>
			<div class="cell">
				<picture>
					{#each Cell as cell}
						<source
							srcset={cell.src}
							type={'image/' + cell.format}
							media={'(min-width: ' + cell.width + 'px)'}
						/>
					{/each}
					<img
						fetchpriority="high"
						src={Cell_Placeholder.src}
						width={Cell_Placeholder.width}
						height={Cell_Placeholder.height}
						alt="Cell"
					/>
				</picture>
				<div class="stream__container">
					<div class="stream">
						<Stream filename="preview" controls={controls.CUSTOM} src={Video} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		padding: 55px 35px 0;
		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 70%;
			z-index: -1;
			background-color: #00ff1b;
			opacity: 0.12;
			border-radius: 35px;
			top: 0;
			left: 0;
		}

		display: flex;
		gap: 25px;
		justify-content: flex-end;

		h1 {
			font-size: 35px;
			height: 80%;
			font-weight: 800;
			margin: 0;
			color: #116c00;
			height: auto;
			writing-mode: vertical-rl;
			transform: rotate(180deg);
		}

		@media screen and (max-width: 1100px) {
			h1 {
				writing-mode: unset;
				transform: none;
				height: 100%;
			}

			.cell {
				margin: 0 auto;
			}

			display: grid;
			grid-template-columns: 1fr;
			gap: 35px;
		}

		.cell {
			position: relative;
			max-width: 20rem;
			img {
				height: 100%;
				width: 100%;
				height: auto;
			}
			&::before {
				content: '';
				position: absolute;
				background-color: #000;
				width: 95%;
				border-radius: 13%;
				height: 98%;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: -1;
				box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);
			}
			.stream__container {
				position: absolute;
				top: 10%;
				left: calc(11% / 2);
				width: 89%;
				height: 80%;

				.stream {
					transform-origin: 0 0;
					transform: scale(0.85);
					width: calc(100% / 0.85);
					height: calc(100% / 0.85);

					@media screen and (min-width: 400px) {
						transform: scale(0.9);
						width: calc(100% / 0.9);
						height: calc(100% / 0.9);
					}

					@media screen and (max-width: 400px) {
						transform: scale(0.8);
						width: calc(100% / 0.8);
						height: calc(100% / 0.8);
					}

					@media screen and (max-width: 350px) {
						transform: scale(0.7);
						width: calc(100% / 0.7);
						height: calc(100% / 0.7);
					}
				}
			}
		}
	}
</style>
