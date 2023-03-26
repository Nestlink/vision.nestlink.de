<script>
	import Accordion from '$lib/atoms/Accordion/Accordion.svelte';
</script>

<section id="faq">
	<div class="container">
		<h1>Frequently asked questions.</h1>
		<div class="questions">
			<Accordion open>
				<svelte:fragment slot="title">
					How long will the module run with my power bank?
				</svelte:fragment>
				<svelte:fragment slot="content">
					This depends on the power bank you use. The Nestlink module was designed with low energy
					efficiency and low power consumption. When testing, we experienced that a fully charged 20
					Ah power bank would last about three days of streaming or one month of stand-by usage.
				</svelte:fragment>
			</Accordion>
			<Accordion>
				<svelte:fragment slot="title">
					Will the people I share a link with have to sign up?
				</svelte:fragment>
				<svelte:fragment slot="content">
					No, they can watch the stream without creating an account. However, if a password protects
					your stream, it might be easier to access it if you grant them access.
				</svelte:fragment>
			</Accordion>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$scss/restrictions.scss' as restrictions;

	section {
		padding: 150px 0;
		background-color: #fbf8f6;

		.container {
			@include restrictions.default;

			max-width: 800px;

			h1 {
				font-size: 50px;
				font-weight: 800;
				margin: 0 0 75px;
				text-align: center;

				@media screen and (max-width: 1100px) {
					font-size: 35px;
					margin: 0 0 50px;
				}
			}

			.questions {
				display: grid;
				grid-template-columns: 1fr;
				gap: 2rem;
			}
		}
	}
</style>
