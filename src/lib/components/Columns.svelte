<script lang="ts">

	export let leftWidth: number = 40;
	export let rightWidth: number = 60;

	let width: number;

	function convertRemToPixels(rem: number) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	const breakPoint = 50; //rem
    const breakPointPx = convertRemToPixels(breakPoint)
</script>

<main>
	{#if width > breakPointPx}
		<div class="left" style="width: {leftWidth}%">
			<slot name="left" />
		</div>

		<div class="right" style="width: {rightWidth}%">
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
	div {
		display: flex;
		flex-direction: column;
		gap: $gap-m;
	}

	.center {
		width: 100%;
	}
</style>
