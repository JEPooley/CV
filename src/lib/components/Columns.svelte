<script lang="ts">
	let width: number;

	const mobileBreak = 600;
</script>

<main>
	{#if width > mobileBreak}
		<div class="left">
			<slot name="left" />
		</div>

		<div class="right">
			<slot name="right" />
		</div>
	{:else}
		<div class="center">
			<slot name="left" />
			<slot name="right" />
		</div>
	{/if}
</main>

<svelte:window bind:innerWidth={width} />

<style lang="scss">
	main {
		width: 100%;
		max-width: 80rem;
		background: $base-color;

		display: flex;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	.left {
		width: 40%;
	}

	.right {
		width: 60%;
	}

	.center {
		width: 100%;
	}
</style>
