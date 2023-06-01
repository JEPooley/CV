<main>
	<header class="left">
		<h1>
			Josh <br /> Pooley
		</h1>
		<h2>Data Scientist | Developer</h2>
	</header>

	<section class="summary right">
		I'm a data scientist, developer and prototyper based in the UK, currently working in the
		geospatial industry. I love learning about new technologies, being creative and getting stuck in
		to a new project!
	</section>

	<section class="contact left">
		<ul>Winchester, UK</ul>
	</section>

	<section class="experience right">
		<h3>Experience</h3>
	</section>

	<section class="qualifications left">
		<h3>Qualifications</h3>
	</section>

	<section class="technical-skills right">
		<h3>Technical Skills</h3>
	</section>

	<section class="projects left">
		<h3>Projects</h3>
	</section>

	<section class="professional-skills right">
		<h3>Professional Skills</h3>
	</section>

	<section class="publications left">
		<h3>Publications</h3>
	</section>

	<div class="spacer right" />

	<section class="interests left">
		<h3>Interests</h3>
	</section>
</main>

<style lang="scss">
	main {
		width: 100%;
		height: 100%;
		max-width: 80rem;
		background: $base-color;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	header {
		background: yellow;
		order: 0;
	}

	section,
	header {
		padding: 2rem;
		box-sizing: border-box;
	}

	.contact {
		background: blue;
		order: 2;
	}

	.summary {
		background: red;
		order: 1;
	}

	.experience {
		order: 3;
	}

	.qualifications {
		order: 4;
	}

	.technical-skills {
		order: 5;
	}

	.projects {
		order: 6;
	}

	.professional-skills {
		order: 7;
	}

	.publications {
		order: 8;
	}

    .spacer {
        order: 9
    }

	.interests {
		order: 10;
	}

	.left {
		width: 40%;
	}

	.right {
		width: 60%;
	}
</style>
