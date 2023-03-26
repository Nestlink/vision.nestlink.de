<script lang="ts">
	import Logo from '$assets/logo/logo-winking.svg';
	import GitHub from '$assets/brands/github/favicon.svg';
</script>

<div class="container">
	<div class="restricted">
		<div class="navigation">
			<div class="logo">
				<img src={Logo} alt="Nestlink Logo" />
				<div class="title">Nestlink</div>
			</div>
			<nav>
				<ul>
					<li><a href="#faq">FAQ</a></li>
					<li class="github">
						<a href="https://github.com/Nestlink" target="_blank">
							<img src={GitHub} alt="GitHub Logo" />
							<span>GitHub profile</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$scss/restrictions.scss' as restrictions;
	@use '$scss/hover.scss' as h;

	.container {
		position: sticky;
		top: 0;

		backdrop-filter: blur(1rem);

		padding: 25px 0;

		z-index: 100;

		&::before {
			top: 0;
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.6);
			z-index: -1;
		}

		.restricted {
			@include restrictions.default;

			.navigation {
				display: flex;
				justify-content: space-between;

				.logo {
					display: grid;
					grid-template-columns: max-content auto;
					gap: 1.5rem;
					text-transform: uppercase;
					letter-spacing: 5px;
					img {
						place-self: center start;
						width: 40px;
						height: 40px;
					}
					.title {
						place-self: center start;
					}
				}

				nav {
					ul {
						list-style-type: none;
						padding: 0;
						margin: 0;
						height: 100%;
						display: flex;
						gap: 1rem;
						li {
							height: 100%;
							display: flex;
							a {
								display: block;
								place-self: center;
								text-decoration: none;
								text-decoration-thickness: 2px;
								color: black;
								@include h.hover() {
									text-decoration: underline;
								}
							}
							&.github {
								a {
									display: block;
									border-radius: 100%;
									span {
										position: absolute;
										width: 0;
										height: 0;
										overflow: hidden;
									}
									img {
										width: 30px;
										height: 30px;
										transition: transform 0.1s ease-in-out;
									}
									@include h.hover() {
										img {
											transform: scale(0.9);
										}
									}
									&:active {
										img {
											transform: scale(1);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
