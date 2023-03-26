<script lang="ts">
	import Battery from '$lib/molecules/Cards/Battery/Battery.svelte';
	import BirdWelfare from '$lib/molecules/Cards/BirdWelfare/BirdWelfare.svelte';
	import Main from '$lib/molecules/Cards/Main/Main.svelte';
	import Modular from '$lib/molecules/Cards/Modular/Modular.svelte';
	import Privacy from '$lib/molecules/Cards/Privacy/Privacy.svelte';
	import Sharing from '$lib/molecules/Cards/Sharing/Sharing.svelte';
	import StreamPlayerPreview from '$lib/molecules/Cards/StreamPlayerPreview/StreamPlayerPreview.svelte';
	import { onMount } from 'svelte';

	let mobile: boolean = false;

	function isMobile() {
		mobile = window.matchMedia('(max-width: 68.75rem)').matches;
	}

	onMount(() => {
		isMobile();
	});
</script>

<svelte:window on:resize={isMobile} />

<section>
	{#if !mobile}
		<div class="column">
			<div class="main">
				<Main />
			</div>
			<div class="battery">
				<Battery />
			</div>
			<div class="privacy">
				<Privacy />
			</div>
			<div class="welfare">
				<BirdWelfare />
			</div>
		</div>
		<div class="column">
			<div class="player">
				<StreamPlayerPreview />
			</div>
			<div class="sharing">
				<Sharing />
			</div>
			<div class="modular">
				<Modular />
			</div>
		</div>
	{:else}
		<Main />
		<StreamPlayerPreview />
		<Sharing />
		<Battery />
		<Privacy />
		<Modular />
		<BirdWelfare />
	{/if}
</section>

<style lang="scss">
	@use '$scss/restrictions.scss' as restrictions;

	section {
		@include restrictions.default;

		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 50px;

		margin: 0 auto 150px;

		@media screen and (max-width: 1100px) {
			grid-template-columns: 1fr;
		}

		.column {
			display: flex;
			flex-direction: column;
			gap: 50px;
		}

		// ORDER FIRST COLUMN
		.main {
			order: 1;
		}
		.battery {
			order: 3;
		}
		.privacy {
			order: 5;
		}
		.welfare {
			order: 7;
		}

		// ORDER SECOND COLUMN
		.player {
			order: 2;
		}

		.sharing {
			order: 4;
		}

		.modular {
			order: 6;
		}
	}
</style>
