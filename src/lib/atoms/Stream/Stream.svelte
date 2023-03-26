<script lang="ts">
	import { controls as VideoControls } from './Stream';

	import Record from 'phosphor-svelte/lib/Record';
	import PictureInPicture from 'phosphor-svelte/lib/PictureInPicture';
	import Airplay from 'phosphor-svelte/lib/Airplay';
	import Play from 'phosphor-svelte/lib/Play';
	import CornersIn from 'phosphor-svelte/lib/CornersIn';
	import CornersOut from 'phosphor-svelte/lib/CornersOut';
	import Aperture from 'phosphor-svelte/lib/Aperture';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
	import Bug from 'phosphor-svelte/lib/Bug';

	import VideoButton from './lib/StreamButton.svelte';
	import { onMount } from 'svelte';
	import { duration } from './lib/converter';
	import DownloadInfo from './lib/DownloadInfo.svelte';

	export let muted: boolean = true;
	export let loop: boolean = true;
	export let autoplay: boolean = true;
	export let playsinline: boolean = true;
	export let filename: string;
	export let src: string | null = null;
	export let poster: string | null = null;
	export let controls: VideoControls = VideoControls.CUSTOM;
	export let canCapture: boolean = false;

	// Video state
	export let loading: boolean = true;
	export let error: boolean = false;

	let content: HTMLDivElement;

	export let video: HTMLVideoElement | null = null;
	let capturing_video = false;

	let picture_in_picture = false;

	let airplay = false;
	let fullscreen: boolean | any = false;
	let is_fullscreen = false;
	let recording = false;
	let recorded = 0;
	let recorded_interval: NodeJS.Timeout;
	let mediarecorder: MediaRecorder | null;

	let chunks: any[] = [];
	let file: Blob | null;

	function set_canvas_height() {
		if (!video || !canvas) return;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
	}

	async function video_record() {
		recording = !recording;

		if (recording) {
			let recordingOptions = {
				audio: false,
				video: true,
				videoBitsPerSecond: 3500000
			};

			if ((video as any).captureStream) {
				capturing_video = true;
				mediarecorder = new MediaRecorder((video as any).captureStream(20), recordingOptions);
			} else if ((video as any).mozCaptureStream) {
				capturing_video = true;
				mediarecorder = new MediaRecorder((video as any).mozCaptureStream(20), recordingOptions);
			} else mediarecorder = new MediaRecorder(canvas!.captureStream(20), recordingOptions);

			mediarecorder.ondataavailable = function (e) {
				if (e.data.size > 0) {
					chunks.push(e.data);
				}
			};

			if (!capturing_video) draw_on_canvas();

			set_canvas_height();
			mediarecorder.start(500);
			recorded = 0;
			recorded_interval = setInterval(() => {
				recorded += 1;
			}, 1000);
		} else {
			if (!mediarecorder) return;
			mediarecorder.stop();
			if (chunks.length > 0)
				file = new Blob([...new Set(chunks)], { type: mediarecorder.mimeType });
			clearInterval(recorded_interval);
			mediarecorder = null;

			let extension: string;

			let filetype = (await import('magic-bytes.js')).default;
			let types = filetype(new Uint8Array(await file!.arrayBuffer()));

			for (let type of types) {
				if (type.extension) {
					extension = type.extension;
					break;
				}
			}

			recordingFilename =
				'Nestlink_' + filename + '_' + new Date().valueOf() + (extension! ? '.' + extension : '');
		}
	}

	function airplay_handle_event(e: any) {
		if (e.availability === 'available') {
			airplay = true;
		} else {
			airplay = false;
		}
	}

	function airplay_open() {
		(video as any).webkitShowPlaybackTargetPicker();
	}

	function video_fullscreen() {
		if (!is_fullscreen) {
			let _content: any = content;
			if (content.requestFullscreen) {
				content.requestFullscreen();
			} else if (_content.webkitRequestFullscreen) {
				_content.webkitRequestFullscreen();
			} else if (_content.msRequestFullScreen) {
				_content.msRequestFullScreen();
			} else if (_content.mozCancelFullScreen) {
				_content.mozCancelFullScreen();
			}
		} else {
			let _document: any = document;
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (_document.webkitExitFullscreen) {
				_document.webkitExitFullscreen();
			} else if (_document.msExitFullscreen) {
				_document.msExitFullscreen();
			} else if (_document.mozCancelFullScreen) {
				_document.mozCancelFullScreen();
			}
		}
	}

	function check_fullscreen() {
		is_fullscreen = Boolean(
			document.fullscreenElement || (document as any).webkitFullscreenElement
		);
	}

	let canvas: HTMLCanvasElement | null;
	let context: CanvasRenderingContext2D | null;

	function video_event_waiting() {
		loading = true;
	}

	function video_event_canplaythrough() {
		loading = false;
	}

	function video_event_error() {
		error = true;
	}

	function video_event_progress() {
		error = false;
	}

	onMount(() => {
		if ((window as any).WebKitPlaybackTargetAvailabilityEvent) {
			video!.addEventListener(
				'webkitplaybacktargetavailabilitychanged',
				airplay_handle_event,
				true
			);
		}

		if (autoplay) video!.play();

		video!.addEventListener('waiting', video_event_waiting, true);
		video!.addEventListener('canplay', video_event_canplaythrough, true);
		video!.addEventListener('canplaythrough', video_event_canplaythrough, true);
		video!.addEventListener('error', video_event_error, true);
		video!.addEventListener('progress', video_event_progress, true);

		picture_in_picture = document.pictureInPictureEnabled;

		context = canvas!.getContext('2d');
		context!.fillStyle = '#fff';
		context!.fillRect(0, 0, canvas!.width, canvas!.height);

		canCapture = Boolean(MediaRecorder);

		fullscreen =
			content.requestFullscreen ||
			(content as any).webkitRequestFullscreen ||
			(content as any).msRequestFullScreen;

		content.addEventListener('fullscreenchange', check_fullscreen, true);
		content.addEventListener('webkitfullscreenchange', check_fullscreen, true);
		content.addEventListener('mozfullscreenchange', check_fullscreen, true);

		return function () {
			content.removeEventListener('fullscreenchange', check_fullscreen, true);
			content.removeEventListener('webkitfullscreenchange', check_fullscreen, true);
			content.removeEventListener('mozfullscreenchange', check_fullscreen, true);

			video!.removeEventListener('waiting', video_event_waiting, true);
			video!.removeEventListener('canplay', video_event_canplaythrough, true);
			video!.removeEventListener('canplaythrough', video_event_canplaythrough, true);
			video!.removeEventListener('error', video_event_error, true);
			video!.removeEventListener('progress', video_event_progress, true);

			if ((window as any).WebKitPlaybackTargetAvailabilityEvent) {
				video!.removeEventListener(
					'webkitplaybacktargetavailabilitychanged',
					airplay_handle_event,
					true
				);
			}
		};
	});

	function draw_on_canvas() {
		if (!recording) return;

		if (video && !video.paused && !video.ended) {
			context!.drawImage(video, 0, 0, canvas!.width, canvas!.height);
			setTimeout(draw_on_canvas, 1000 / 20);
		}
	}

	let recordingDownloadLink: HTMLAnchorElement | null;
	let recordingBlobURL: string | null;
	let recordingFilename: string;

	async function downloadRecording() {
		recordingDownloadLink = document.createElement('a');
		recordingBlobURL = URL.createObjectURL(file!);
		recordingDownloadLink.href = recordingBlobURL;

		recordingDownloadLink.download = recordingFilename;
		recordingDownloadLink.target = '_blank';
		recordingDownloadLink.classList.add('sr-only');
		document.body.appendChild(recordingDownloadLink);

		recordingDownloadLink.focus();
		recordingDownloadLink.click();

		discardRecording();
	}

	function discardRecording() {
		if (recordingDownloadLink) {
			document.body.removeChild(recordingDownloadLink);
			recordingDownloadLink = null;
		}

		if (recordingBlobURL) {
			window.URL.revokeObjectURL(recordingBlobURL);
			recordingBlobURL = null;
		}

		file = null;
		chunks.splice(0, chunks.length);
	}

	let paused = true;

	let lightning = false;
	let lightning_timeout: NodeJS.Timeout;

	function take_image() {
		if (!recording) {
			set_canvas_height();
			context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
		}

		clearTimeout(lightning_timeout);
		lightning = false;
		lightning = true;

		lightning_timeout = setTimeout(() => {
			lightning = false;
		}, 500);

		let link: HTMLAnchorElement | null = document.createElement('a');
		link.download = 'Nestlink_' + filename + '_' + new Date().valueOf();
		link.target = '_blank';
		document.body.appendChild(link);
		let url;

		canvas!.toBlob(function (blob) {
			if (blob) {
				url = window.URL.createObjectURL(blob);
			} else {
				url = canvas!.toDataURL('image/jpeg', 1);
			}

			link!.href = url;
			link!.focus();
			link!.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link!);
			link = null;
		}, 'image/jpeg');
	}
</script>

<div class="container">
	<canvas bind:this={canvas} />
	<div class="content" bind:this={content}>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			{src}
			title={filename}
			controls={controls === VideoControls.NATIVE ? true : false}
			crossorigin="anonymous"
			preload="auto"
			{loop}
			{muted}
			{autoplay}
			bind:paused
			on:click={() => video?.play()}
			{playsinline}
			{poster}
			bind:this={video}
		>
			<slot name="sources" />
		</video>
		<div class="state_lightning" class:lightning />
		{#if file}
			<DownloadInfo
				filename={recordingFilename}
				fileSize={file.size}
				videoDuration={recorded}
				downloadHandler={downloadRecording}
				discardHandler={discardRecording}
			/>
		{/if}
		<div class="taskbar">
			<div class="state">
				{#if error}
					<div class="icon">
						<Bug />
					</div>
					<span>Error</span>
				{:else if loading}
					<div class="loading icon">
						<CircleNotch />
					</div>
					<span>Loading</span>
				{:else if !paused}
					<span class="indicator" />
					<span>Live</span>
				{:else}
					<VideoButton title={'Play'} on:click={() => video?.play()}>
						<svelte:fragment slot="icon">
							<Play weight="fill" />
						</svelte:fragment>
					</VideoButton>
				{/if}
			</div>
			<div class="controls">
				<VideoButton on:click={take_image} title="Take image">
					<svelte:fragment slot="icon">
						<Aperture />
					</svelte:fragment>
				</VideoButton>

				{#if canCapture}
					<VideoButton
						on:click={video_record}
						{recording}
						title={recording ? 'Stop recording' : 'Start recording'}
						recorder
					>
						<svelte:fragment slot="icon">
							<Record />
						</svelte:fragment>
						<svelte:fragment slot="title">
							{duration(recorded)}
						</svelte:fragment>
					</VideoButton>
				{/if}

				{#if airplay}
					<VideoButton on:click={airplay_open} title="AirPlay">
						<svelte:fragment slot="icon">
							<Airplay />
						</svelte:fragment>
					</VideoButton>
				{/if}
				{#if picture_in_picture}
					<VideoButton on:click={() => video?.requestPictureInPicture()} title="Picture in picture">
						<svelte:fragment slot="icon">
							<PictureInPicture />
						</svelte:fragment>
					</VideoButton>
				{/if}
				{#if fullscreen}
					<VideoButton
						on:click={video_fullscreen}
						title={is_fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
					>
						<svelte:fragment slot="icon">
							{#if is_fullscreen}
								<CornersIn />
							{:else}
								<CornersOut />
							{/if}
						</svelte:fragment>
					</VideoButton>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use './lib/shared.scss' as shared;

	div.state_lightning {
		display: none;

		&.lightning {
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: white;
			animation: 0.2s ease-in-out flash;
			opacity: 0;
		}

		@keyframes flash {
			0% {
				opacity: 0;
			}
			25% {
				opacity: 1;
			}
			50% {
				opacity: 1;
			}
			75% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}

	canvas {
		position: absolute;
		opacity: 0;
		z-index: -1;
		pointer-events: none;
	}

	.container {
		position: relative;
		display: flex;
		place-content: center center;
		max-height: 100%;
		max-width: 100%;

		width: 100%;
		height: 100%;

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			max-height: inherit;
			max-width: inherit;
			height: inherit;
			width: inherit;
		}

		.taskbar {
			position: absolute;
			margin: 0 0.5rem 0.5rem;
			padding: 0 1rem;
			height: 2.75rem;
			bottom: 0;
			width: calc(100% - 1rem);

			@include shared.accent();

			display: flex;
			place-content: center start;
			justify-content: space-between;
			gap: 3rem;
			color: black;

			overflow-x: auto;

			.controls {
				display: flex;
				gap: 1rem;
				width: max-content;
			}

			.state {
				display: flex;
				gap: 1rem;
				width: max-content;
				span {
					display: block;
					width: max-content;
				}
				.icon {
					display: flex;
					width: max-content;
					& :global(svg) {
						place-self: center center;
						font-size: 1.5rem;
					}
				}

				.loading {
					& :global(svg) {
						animation: 1s ease-out infinite spin;
					}

					@keyframes spin {
						from {
							transform: rotate(0deg);
						}
						to {
							transform: rotate(360deg);
						}
					}
				}

				.indicator {
					position: relative;
					display: block;
					width: 0.75rem;
					height: 0.75rem;
					&::before {
						position: absolute;
						content: '';
						top: 50%;
						left: 50%;
						transform: translate3d(-50%, -50%, 0);
						height: 100%;
						width: 100%;
						border-radius: 1rem;
						background-color: #ff0000;
						animation: 1s ease-in-out infinite pulse;
					}
				}

				span {
					place-self: center start;
				}
			}
		}

		video {
			display: block;
			max-width: 100%;
			max-height: 100%;
			height: 100%;
			width: 100%;
			background-color: black;
		}
	}

	@keyframes pulse {
		0% {
			height: 75%;
			width: 75%;
		}

		50% {
			height: 100%;
			width: 100%;
		}

		100% {
			height: 75%;
			width: 75%;
		}
	}
</style>
