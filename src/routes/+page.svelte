<script lang="ts">
	import Menu from '$lib/organisms/Manu/Menu.svelte';
	import Teasers from '$lib/organisms/Teasers/Teasers.svelte';
	import FAQ from '$lib/organisms/FAQ/FAQ.svelte';
	import Newsletter from '$lib/organisms/Newsletter/Newsletter.svelte';
	import MadeInEurope from '$lib/atoms/MadeInEurope/MadeInEurope.svelte';
	import Footer from '$lib/organisms/Footer/Footer.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
	title="Nestlink"
	description="We embrace the nest box market by onboarding different communities through innovation and accessibility."
/>

<Menu />

<Teasers />

<FAQ />

<Newsletter />

<MadeInEurope />

<Footer />
