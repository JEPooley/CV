<script>
	import Logo from './Logo.svelte';
</script>

<div class="heading">
	<h1>
		<div>J<span class="o">o</span>sh</div>
		<div>P<span class="o">o</span>oley</div>
	</h1>
	<h2>Data Scientist | Developer</h2>
	<div class="logo">
		<Logo />
	</div>
</div>

<style lang="scss">
	h1 {
		line-height: 1;
		font-size: 5rem;

		div:first-child {
			padding: 0 0 0 0.2em;
		}
	}

	h2 {
		font-weight: 200;
        transition: 400ms 100ms ease-in-out;
	}

	.o {
		padding: 0 0.2em;
		opacity: 0;
	}

	.heading {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
	}

	.logo {
		position: absolute;
		top: 5%;
		left: 18%;
	}

	:global(.dark) {
		h2 {
			color: $green-bright;
		}
	}

	:global(.light) {
		h2 {
			color: $green-dark;
		}
	}
</style>
