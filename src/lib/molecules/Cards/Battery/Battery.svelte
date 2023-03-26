<script lang="ts">
	import PowerBank_Placeholder from '$assets/images/PowerBank.png?width=100&format=jpg&metadata';
	import PowerBankComposition_Placeholder from '$assets/images/PowerBankComposition.png?width=100&format=jpg&metadata';
	import PowerBankComposition from '$assets/images/PowerBankComposition.png?width=1500;800;600;300&format=avif;webp;png&metadata';
	import Base from '$lib/molecules/Cards/Base/Base.svelte';
</script>

<Base backgroundColor="#FF0069" titleColor="#FF0069">
	<svelte:fragment slot="title">Battery operated. WiFi driven.</svelte:fragment>
	<svelte:fragment slot="description">
		Don't worry. You have the choice. Battery or grid power. WiFi or LAN.
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="battery">
			<img
				fetchpriority="high"
				loading="lazy"
				src={PowerBank_Placeholder.src}
				width={PowerBank_Placeholder.width}
				height={PowerBank_Placeholder.height}
				class="fake"
				alt="Power bank"
				aria-hidden="true"
			/>
			<picture>
				{#each PowerBankComposition as powerbankcomposition}
					<source
						srcset={powerbankcomposition.src}
						type={'image/' + powerbankcomposition.format}
						media={'(min-width: ' + powerbankcomposition.width + 'px)'}
					/>
				{/each}
				<img
					fetchpriority="low"
					loading="lazy"
					class="actual"
					src={PowerBankComposition_Placeholder.src}
					width={PowerBankComposition_Placeholder.width}
					height={PowerBankComposition_Placeholder.height}
					alt="Power bank"
				/>
			</picture>
		</div>
	</svelte:fragment>
</Base>

<style lang="scss">
	.battery {
		position: relative;
		img {
			width: 100%;
			height: auto;
		}

		.fake {
			visibility: hidden;
		}

		.actual {
			position: absolute;
			top: 0;
			height: 100%;
			width: auto;
		}
	}
</style>
