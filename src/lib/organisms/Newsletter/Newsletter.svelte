<script lang="ts">
	import Checkbox from '$lib/atoms/Form/Checkbox/Checkbox.svelte';

	let newsletter: boolean = true;
	let waitlist: boolean = true;
	let policy: boolean = false;
	let value: string = '';

	let success: boolean = false;
	let error: boolean = false;

	function submit() {
		if (disabled) return;

		fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ email: value, newsletter, waitlist, policy })
		}).then((res) => {
			success = res.status === 200;
			error = res.status !== 200;
		});
	}

	let disabled: boolean = false;

	let regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	function checkenable() {
		disabled = !(regex.test(value) && policy);
	}

	$: policy, checkenable();
	$: value, checkenable();
</script>

<section>
	<div class="container">
		<h1>Ready to join us at Nestlink?</h1>
		{#if success}
			<p>Great to have you on board! We will be keeping you up to date.</p>
		{:else}
			<p class="info">Let's keep in touch! No spam. Promise.</p>
			<form on:submit|preventDefault={submit}>
				<div class="newsletter">
					<input type="email" placeholder="peep@nestlink.de" bind:value />
					<div class="submit">
						<input type="submit" value="Subscribe" {disabled} />
					</div>
				</div>

				<div class="checkboxes">
					<div class="group">
						<Checkbox name="newsletter__checkbox--newsletter" bind:checked={newsletter}>
							Newsletter
						</Checkbox>
						<Checkbox name="newsletter__checkbox--waitlist" bind:checked={waitlist}>
							Waitlist (non-binding)
						</Checkbox>
					</div>
					<Checkbox name="newsletter__checkbox--privacy-policy" bind:checked={policy}>
						I have read and agree to the <a href="/legal" target="_blank">privacy policy</a>.*
					</Checkbox>
				</div>
			</form>
		{/if}
		{#if error}
			<p>
				Please excuse the inconvenience; we could not process your request. Please check your input.
			</p>
		{/if}
	</div>
</section>

<style lang="scss">
	@use '$scss/restrictions.scss' as restrictions;
	@use '$scss/hover.scss' as h;
	section {
		@include restrictions.default;
		padding: 150px 1rem;

		.container {
			max-width: 800px;
			width: 100%;
			border-radius: 35px;
			background-color: black;
			margin: 0 auto;
			color: white;

			padding: 55px 35px;

			@media screen and (max-width: 1100px) {
				padding: 50px 25px;
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

			p.info {
				color: #979797;
			}

			form {
				display: grid;
				grid-template-columns: 1fr;
				gap: 2rem;

				.newsletter {
					width: 100%;
					background-color: white;
					height: 60px;
					border-radius: 15px;
					display: grid;
					grid-template-columns: auto max-content;

					input {
						display: block;
						height: 100%;
						width: 100%;
						border-radius: 15px 0 0 15px;
						outline: none;
						border: none;
					}

					input[type='email'] {
						padding: 0 25px;
					}

					input[type='submit'] {
						border-radius: 10px;
						background-color: black;
						color: white;
						width: calc(100% - 10px);
						height: calc(100% - 10px);
						margin: 5px;
						cursor: pointer;
						padding: 0 15px;

						transition: transform 0.1s ease-in-out;

						@include h.hover {
							&:not(:disabled) {
								transform: scale(0.97);
							}
						}

						&:disabled {
							cursor: not-allowed;
							background-color: rgb(52, 52, 52);
						}
					}
				}

				.checkboxes {
					@mixin layout {
						display: flex;
						flex-wrap: wrap;
						gap: 15px;
					}

					@include layout();
					flex-direction: column;

					.group {
						@include layout();
					}

					a {
						color: #fff;

						text-decoration-color: rgb(168, 168, 168);
						text-decoration-thickness: 2px;
						text-underline-offset: 2px;

						@include h.hover {
							text-decoration-color: #fff;
						}
					}
				}
			}
		}
	}
</style>
