<script lang="ts">
	import Base from '$lib/molecules/Cards/Base/Base.svelte';
	import PiCover from '$assets/images/module/pi_cover.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import PiCover_Placeholder from '$assets/images/module/pi_cover.png?width=100&format=jpg&metadata';
	import PiZero from '$assets/images/module/pi.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import PiZero_Placeholder from '$assets/images/module/pi.png?width=100&format=jpg&metadata';
	import PCB from '$assets/images/module/pcb.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import PCB_Placeholder from '$assets/images/module/pcb.png?width=100&format=jpg&metadata';
	import CasingCover from '$assets/images/module/casing_base--cover.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import CasingCover_Placeholder from '$assets/images/module/casing_base--cover.png?width=100&format=jpg&metadata';
	import CasingBase from '$assets/images/module/casing_base.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import CasingBase_Placeholder from '$assets/images/module/casing_base.png?width=100&format=jpg&metadata';

	import { onMount } from 'svelte';
	// import Thread from '$assets/images/module/gewinde.png';

	let module__cover: HTMLImageElement;
	let casing__cover: HTMLImageElement;
	let compute__module: HTMLImageElement;
	let casing__base: HTMLImageElement;
	let pcb: HTMLImageElement;

	let casing__cover_margin: number = 0;
	let compute__module_margin: number = 0;
	let casing__base_margin: number = 0;
	let pcb_margin: number = 0;

	let module_translateY: number = 0;

	let module: HTMLDivElement;

	function scroll() {
		let dimensions = module.getBoundingClientRect();
		let center = window.innerHeight / 2;
		let done = window.innerHeight / 4;
		let from_bottom = window.innerHeight - dimensions.top;

		let progress = Math.min(1, Math.max((from_bottom - center) / done, 0));

		casing__cover_margin = progress * casing__cover.offsetHeight;
		compute__module_margin =
			-progress * (compute__module.offsetHeight + casing__cover.offsetHeight);
		casing__base_margin = -progress * (compute__module.offsetHeight + casing__cover.offsetHeight);
		pcb_margin =
			-progress *
			(compute__module.offsetHeight + casing__cover.offsetHeight + pcb.offsetHeight * 0.7);

		module_translateY =
			progress *
			((module.clientHeight -
				(compute__module.offsetHeight + casing__cover.offsetHeight + pcb.offsetHeight * 0.7)) /
				2);
	}

	onMount(() => {
		scroll();
	});
</script>

<svelte:window on:scroll={scroll} on:resize={scroll} />

<Base backgroundColor="#A93100" titleColor="#A93100">
	<svelte:fragment slot="title">Repair, extend and recycle your module yourself.</svelte:fragment>
	<svelte:fragment slot="description">
		Find some of our source code on GitHub. Feel free to make suggestions for improvements or modify
		the code yourself.
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="module" bind:this={module} style="transform: translateY({module_translateY}px);">
			<div class="part module__cover">
				<picture>
					{#each PiCover as picover}
						<source
							srcset={picover.src}
							type={'image/' + picover.format}
							media={'(min-width: ' + picover.width + 'px)'}
						/>
					{/each}
					<img
						fetchpriority="low"
						loading="lazy"
						bind:this={module__cover}
						style="z-index: 5;"
						src={PiCover_Placeholder.src}
						width={PiCover_Placeholder.width}
						height={PiCover_Placeholder.height}
						alt="Module cover"
					/>
				</picture>
			</div>
			<div class="part casing__cover">
				<picture>
					{#each CasingCover as casingcover}
						<source
							srcset={casingcover.src}
							type={'image/' + casingcover.format}
							media={'(min-width: ' + casingcover.width + 'px)'}
						/>
					{/each}
					<img
						fetchpriority="low"
						loading="lazy"
						bind:this={casing__cover}
						style="transform: translateY({casing__cover_margin}px);"
						src={CasingCover_Placeholder.src}
						width={CasingCover_Placeholder.width}
						height={CasingCover_Placeholder.height}
						alt="Casing cover"
					/>
				</picture>
			</div>
			<div class="part compute__module">
				<picture>
					{#each PiZero as pizero}
						<source
							srcset={pizero.src}
							type={'image/' + pizero.format}
							media={'(min-width: ' + pizero.width + 'px)'}
						/>
					{/each}
					<img
						fetchpriority="low"
						loading="lazy"
						bind:this={compute__module}
						style="transform: translateY({compute__module_margin}px);"
						src={PiZero_Placeholder.src}
						width={PiZero_Placeholder.width}
						height={PiZero_Placeholder.height}
						alt="Compute module"
					/>
				</picture>
			</div>
			<div class="part casing__base">
				<picture>
					{#each CasingBase as casingbase}
						<source
							srcset={casingbase.src}
							type={'image/' + casingbase.format}
							media={'(min-width: ' + casingbase.width + 'px)'}
						/>
					{/each}
					<img
						fetchpriority="low"
						loading="lazy"
						bind:this={casing__base}
						style="transform: translateY({casing__base_margin}px);"
						src={CasingBase_Placeholder.src}
						width={CasingBase_Placeholder.width}
						height={CasingBase_Placeholder.height}
						alt="Casing base"
					/>
				</picture>
			</div>
			<div class="part pcb">
				<picture>
					{#each PCB as pcb}
						<source
							srcset={pcb.src}
							type={'image/' + pcb.format}
							media={'(min-width: ' + pcb.width + 'px)'}
						/>
					{/each}
					<img
						bind:this={pcb}
						fetchpriority="low"
						loading="lazy"
						style="transform: translateY({pcb_margin}px);"
						src={PCB_Placeholder.src}
						width={PCB_Placeholder.width}
						height={PCB_Placeholder.height}
						alt="PCB"
					/>
				</picture>
			</div>
		</div>
	</svelte:fragment>
</Base>

<style lang="scss">
	.module {
		position: relative;
		opacity: 0.999;
		max-width: 300px;
		margin: 0 auto 0;
		width: 100%;
		.part {
			position: relative;
			opacity: 0.999;
			transform-style: preserve-3d;
			&.module__cover {
				transform: translateZ(-1em);
				z-index: 4;
			}
			&.casing__cover {
				transform: translateZ(-2em);
				z-index: 3;
			}
			&.compute__module {
				transform: translateZ(-3em);
				z-index: 1;
				img {
					max-width: 70%;
					margin: 0 auto;
				}
			}
			&.casing__base {
				transform: translateZ(-1em);
				z-index: 4;
			}
			&.pcb {
				transform: translateZ(-3em);
				z-index: 1;
				img {
					max-width: 85%;
					margin: 0 auto;
				}
			}
			img {
				width: 100%;
				height: auto;
			}
		}
	}
</style>
