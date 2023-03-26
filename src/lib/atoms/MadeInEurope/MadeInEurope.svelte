<script lang="ts">
	import EUStars from '$assets/images/european_stars.svg';
</script>

<div class="container" aria-hidden="true">
	<span>MADE IN</span>
	<img src={EUStars} alt="European flag" />
</div>

<style lang="scss">
	.container {
		position: fixed;
		bottom: 2rem;
		left: 0;
		width: auto;
		height: 3.5rem;
		background-color: #003399;
		border-radius: 0 5rem 5rem 0;
		padding: 5px;
		display: flex;
		gap: 5px;

		z-index: 100;
		span {
			writing-mode: vertical-rl;
			transform: rotate(180deg);
			color: white;
			font-size: 7px;
			text-align: center;
		}
		img {
			height: 100%;
			width: auto;
		}
	}
</style>
