<script lang="ts">
	import Scales from 'phosphor-svelte/lib/Scales/Scales.svelte';
	import FilmStrip from 'phosphor-svelte/lib/FilmStrip/FilmStrip.svelte';
	import Clock from 'phosphor-svelte/lib/Clock/Clock.svelte';
	import { duration, filesize } from './converter';
	import Button from '$lib/atoms/Button/Button.svelte';
	import TextButton from '$lib/atoms/TextButton/TextButton.svelte';

	export let filename: string;
	export let fileSize: number;
	export let videoDuration: number;

	export let downloadHandler: () => void;
	export let discardHandler: () => void;
</script>

<div class="info">
	<div class="info__item" title="File size">
		<div>
			<Scales />
		</div>
		<div class="item--fileSize">{filesize(fileSize)}</div>
	</div>
	<div class="info__item" title="File name">
		<div>
			<FilmStrip />
		</div>
		<div class="item--filename" title={filename}>{filename}</div>
	</div>
	<div class="info__item" title="Video length">
		<div>
			<Clock />
		</div>
		<div class="item--videoDuration">{duration(videoDuration)}</div>
	</div>
	<div class="info__action">
		<Button adaptive={false} on:click={downloadHandler}>Download</Button>
		<div class="action--discard">
			<TextButton on:click={discardHandler}>Discard</TextButton>
		</div>
	</div>
</div>

<style lang="scss">
	@use './shared.scss' as shared;

	.info {
		max-width: 18.75rem;
		width: calc(100% - 1rem);
		position: absolute;
		right: 0.5rem;
		bottom: 3.75rem;
		padding: 2rem 1rem 1rem;

		@include shared.accent();

		color: black;

		.info__item {
			display: flex;
			gap: 1rem;

			& :global(svg) {
				font-size: 1.5rem;
			}

			// .item--fileSize {
			// }

			.item--filename {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			// .item--videoDuration {
			// }
		}
		.info__action {
			margin: 1.5rem -0.5rem -0.5rem;

			padding: 0.5rem;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 10px;
			.action--discard {
				text-align: center;
			}
		}
	}
</style>
