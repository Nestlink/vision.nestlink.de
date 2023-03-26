<script>
	import {
		PUBLIC_LEGAL_ADDRESS_CITY,
		PUBLIC_LEGAL_ADDRESS_COUNTRY,
		PUBLIC_LEGAL_ADDRESS_STREET,
		PUBLIC_LEGAL_ENITIY,
		PUBLIC_LEGAL_MAIL
	} from '$env/static/public';
</script>

<footer>
	<div class="container">
		<div class="imprint">
			<h1>Imprint (§5 TMG)</h1>
			<div class="content">
				<p>
					{PUBLIC_LEGAL_ENITIY}<br />
					{PUBLIC_LEGAL_ADDRESS_STREET}<br />
					{PUBLIC_LEGAL_ADDRESS_CITY}<br />
					{PUBLIC_LEGAL_ADDRESS_COUNTRY}
				</p>
				<p>
					<a href="mailto:{PUBLIC_LEGAL_MAIL}">{PUBLIC_LEGAL_MAIL}</a>
				</p>
			</div>
		</div>
		<div class="privacy">
			<h1>Privacy policy</h1>
			<div class="content">
				<a href="/legal">Privacy policy</a>
				<p class="info">
					We respect your privacy. We will not share your data with any 3rd party unless required by
					law.
				</p>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$scss/restrictions.scss' as restrictions;
	@use '$scss/hover.scss' as h;

	footer {
		background-color: #fbf8f6;
		padding: 75px 0 100px;

		.container {
			@include restrictions.default;

			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 2rem;

			@media screen and (max-width: 850px) {
				grid-template-columns: 1fr 1fr;
			}

			@media screen and (max-width: 650px) {
				grid-template-columns: 1fr;
			}

			h1 {
				font-size: 30px;
				font-weight: 800;
				margin: 0 0 35px;

				@media screen and (max-width: 1100px) {
					font-size: 24px;
					margin: 0 0 50px;
				}
			}

			.content {
				a {
					color: #0b0b0b;

					text-decoration-color: rgb(168, 168, 168);
					text-decoration-thickness: 2px;
					text-underline-offset: 2px;

					@include h.hover {
						text-decoration-color: #0b0b0b;
					}
				}
				p {
					color: #0b0b0b;
					line-height: 25px;
					&.info {
						color: #464646;
					}
				}
			}
		}
	}
</style>
