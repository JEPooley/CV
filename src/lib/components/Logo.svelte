<script>
	import { mode } from '../stores/mode';

	const toggleMode = () => {
		$mode = $mode === 'light' ? 'dark' : 'light';
	};
</script>

<button class:off={$mode == 'light'} on:click={toggleMode}>
	<div class="handle">
		<div class="shadow" />
	</div>
	<div class="circle" />
</button>

<style lang="scss">
	button {
		border: none;
		padding: 0;
		margin: 0;

		background-color: $green-bright;
		height: 9.4rem;
		width: 4.2rem;
		border-radius: 5em;
		position: relative;
		display: flex;
		justify-content: center;
		box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2) inset;
		transition: background-color 200ms ease-in-out;
		cursor: pointer;
	}

	.handle {
		width: 3.4rem;
		height: 3.4rem;
		background: linear-gradient(to right, rgb(255, 255, 255), rgb(240, 240, 240));
		margin-top: 0.4rem;
		border-radius: 50%;
		box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.2);
		transition: margin 200ms ease-in-out;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shadow,
	.circle {
		width: 2.6rem;
		height: 2.6rem;
		border-radius: 50%;
	}

	.shadow {
		background: linear-gradient(to right, rgb(240, 240, 240), rgb(255, 255, 255));
	}

	.circle {
		position: absolute;
		background: rgba(255, 255, 255, 0.15);
		top: 6rem;
	}

	.off {
		.handle {
			margin-top: 5.52rem;
		}

		background-color: $green-medium;
	}
</style>
