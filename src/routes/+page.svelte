<script lang="ts">
	import Columns from '../lib/components/Columns.svelte';
	import Heading from '../lib/components/Heading.svelte';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Dr Josh Pooley | CV</title>
	<meta name="description" content="CV of Josh Pooley; Developer and Data Scientist." />
</svelte:head>

<Columns>
	<svelte:fragment slot="left">
		<header style="order: 0">
			<Heading />
		</header>

		<div class="row-wrapper" style="order: 2">
			<section style="order: 2" class="contact">
				<ul>
					<li class="img-li">
						<span
							><img
								class="svg"
								src="{base}/icons/location-dot-solid.svg"
								alt="Location Pin"
							/></span
						>Winchester, UK
					</li>
					<li class="img-li">
						<span><img class="svg" src="{base}/icons/github.svg" alt="GitHub Logo" /></span><a
							target="_blank"
							href="https://github.com/JEPooley">github.com/JEPooley</a
						>
					</li>
					<li class="img-li">
						<span><img class="svg" src="{base}/icons/linkedin.svg" alt="LinkedIn Logo" /></span><a
							target="_blank"
							href="https://linkedin.com/in/josh-pooley">linkedin.com/in/josh-pooley</a
						>
					</li>
					<li class="img-li">
						<span><img class="svg" src="{base}/icons/codepen-logo.svg" alt="Codepen Logo" /></span
						><a target="_blank" href="https://codepen.io/jepooley">codepen.io/jepooley</a>
					</li>
				</ul>
			</section>

			<section style="order: 3" class="qualifications">
				<h3>Qualifications</h3>
				<ul>
					<li>
						<b>PhD Optoelectronics</b> — <br /> Zepler Institute, University of Southampton
					</li>
					<li>
						<b>Master of Physics (First Class)</b> — <br /> University of Southampton
					</li>
				</ul>
			</section>
		</div>

		<section style="order: 7" class="projects">
			<h3>Projects</h3>
			<ul>
				<li>
					<h4>
						osdatahub <a target="_blank" href="https://github.com/OrdnanceSurvey/osdatahub"
							><img class="svg" src="{base}/icons/link-solid.svg" alt="Link Icon" /></a
						>
					</h4>
					<p>
						Inventor and technical lead for the osdatahub Python package, which offers customers a
						simplified interface for querying Ordnance Survey's data.
					</p>
				</li>
				<li>
					<h4>
						Data Hub Explorer <a
							target="_blank"
							href="https://labs.os.uk/prototyping/data-hub-explorer/"
							><img class="svg" src="{base}/icons/link-solid.svg" alt="Link Icon" /></a
						>
					</h4>
					<p>
						Inventor and technical lead for the data hub explorer web app (written with Svelte).
						Offers customers a view of available open-source and premium data sets; no sign-up
						required!
					</p>
				</li>
				<li>
					<h4>
						mobtimer.dev <a target="_blank" href="https://mobtimer.dev/"
							><img class="svg" src="{base}/icons/link-solid.svg" alt="Link Icon" /></a
						>
					</h4>
					<p>
						Inventor and developer of the "Mobsters vs Lobsters" themed collaboration tool, written
						with SvelteKit.
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 8" class="publications">
			<h3>Publications</h3>
			<ul>
				<li>
					<p>
						<b>Pooley, J., Price, E., Ferguson, J.W. and Ibsen, M.</b>, 2019.
						<em>Optimised chirped fibre Bragg gratings for detonation velocity measurements</em>.
						Sensors, 19(15), p.3333.
					</p>
				</li>
				<li>
					<p>
						<b>Pooley, J., Price, E., Ferguson, J.W. and Ibsen, M.</b>, 2019.
						<em>Detonation velocity measurements using rare-earth doped fibres</em>. Sensors, 19(7),
						p.1697.
					</p>
				</li>
				<li>
					<p>
						<b>Pooley, J., Price, E., Ferguson, J.W. and Ibsen, M.</b>, 2019.
						<em>Detonation velocity measurements with uniform fibre Bragg gratings</em>. Optics
						Express, 27(16), pp.23464-23475.
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 9" class="interests">
			<h3>Interests</h3>
			<ul>
				<li>
					<div class="img-title">
						<span
							><img class="svg" src="{base}/icons/kitchen-set-solid.svg" alt="Kitchen Icon" /></span
						>
						<h4>Cooking</h4>
					</div>
					<p>Passionate home cook and keen advocate of pineapple on pizza.</p>
				</li>
				<li>
					<div class="img-title">
						<span><img class="svg" src="{base}/icons/guitar-solid.svg" alt="Guitar Icon" /></span>
						<h4>Music</h4>
					</div>
					<p>
						A very amateurish guitar player and drummer. Also enjoy playing around in Logic Pro X.
					</p>
				</li>
				<li>
					<div class="img-title">
						<span
							><img
								class="svg"
								src="{base}/icons/shoe-prints-solid.svg"
								alt="Footprints Icon"
							/></span
						>
						<h4>Walking</h4>
					</div>
					<p>
						Extremely fond of being outside in nature — this is something I try and do every day of
						the year!
					</p>
				</li>
			</ul>
		</section>

		<div class="row-wrapper" style="order: 10">
			<section style="order: 10" class="extras">
				<div class="img-title">
					<span><img class="svg" src="{base}/icons/lock-solid.svg" alt="Lock Icon" /></span>
					<h4>Security Clearence (SC level)</h4>
				</div>
			</section>

			<a
				href="{base}/downloads/Josh-Pooley-CV-Print.pdf"
				class="button-main"
				style="order: 11"
				download="Josh-Pooley-CV-Print.pdf"
			>
				Download (Print Version)<img src="{base}/icons/download-solid.svg" alt="Download Icon" />
			</a>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="right">
		<section style="order: 1" class="summary">
			<p>
				I'm a data scientist, developer and prototyper based in the UK, currently working in the
				geospatial industry. I love learning about new technologies, being creative and getting
				stuck in to a new project!
			</p>
		</section>

		<section style="order: 4" class="experience">
			<h3>Experience</h3>
			<ul>
				<li>
					<div class="job-title">
						<div>
							<span
								><img
									class="svg"
									src="{base}/icons/ordnance-survey-logo.svg"
									alt="Ordnance Survey Logo"
								/></span
							>
							<div>
								<h4>Data Scientist</h4>
								<p>Jan 2020 – Present</p>
							</div>
						</div>

						<p>Ordnance Survey</p>
					</div>
					<p>
						As a prototyping specialist within Ordnance Survey's Innovation Team, I have worked on
						over 30 projects in the last three years! These have included open-source Python and
						Node.js releases, full stack web development, COVID SIR modelling, natural language
						processing and computer vision, as well as extensive manipulation and analysis of
						geospatial data.
					</p>
				</li>
				<li>
					<div class="job-title">
						<div>
							<span
								><img
									class="svg"
									src="{base}/icons/soton-logo.svg"
									alt="University of Southampton Logo"
								/></span
							>
							<div>
								<h4>Post-Graduate</h4>
								<p>Sep 2015 – Dec 2019</p>
							</div>
						</div>
						<p>Uni. of Southampton</p>
					</div>
					<p>
						During my post-graduate research at the University of Southampton, I focused on the
						development of high-speed sensors for deployment in harsh environments. This role
						involved a combination of practical lab-based experimentation, computer modelling, data
						analysis, and technical writing.
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 5" class="technical-skills">
			<h3>Technical Skills</h3>
			<ul>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/python-logo.png" alt="Python Logo" /></span>
						<h4>Python Developer</h4>
					</div>
					<p>
						with a diverse skill set, including API development (<b>Flask</b>, <b>FastAPI</b>), data
						analysis and manipulation (<b>Numpy</b>, <b>Pandas</b>), object-oriented programming (<b
							>SOLID code</b
						>) and environment management (<b>Poetry</b>,
						<b>Conda</b>, <b>Docker</b>).
					</p>
				</li>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/svelte-logo.png" alt="Svelte Logo" /></span>
						<h4>Frontend Developer</h4>
					</div>
					<p>
						with professional experience making prototype web apps and open-source Node packages.
						Familiar with contemporary tech stacks such as <b>SvelteKit</b>, <b>SCSS</b>,
						<b>Node.js</b>, <b>Jest</b> and
						<b>Typescript</b>.
					</p>
				</li>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/azure-logo.png" alt="MS Azure Logo" /></span>
						<h4>Cloud Developer</h4>
					</div>
					<p>
						experienced at using the Azure cloud platform to create microservices (<b
							>Function Apps</b
						>), set up databases (<b>Azure SQL</b>), manage software packages (<b>Azure Artifacts</b
						>), deploy applications (<b>Azure App Service</b>) and create build pipelines (<b
							>Azure Pipelines</b
						>).
					</p>
				</li>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/git-logo.png" alt="Git Logo" /></span>
						<h4>Software Engineer</h4>
					</div>
					<p>
						familiar with modern best practices such as test-driven development (<b>TDD</b>),
						trunk-based development and version control (<b>Git</b>), particularly within an Azure
						DevOps framework.
					</p>
				</li>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/azureml-logo.png" alt="AzureML Logo" /></span>
						<h4>Data Scientist</h4>
					</div>
					<p>
						skilled in using Python's comprehensive data analysis and modelling toolset, including
						<b>NetworkX</b>, <b>Sci-Kit Learn</b>, <b>SciPy</b> and <b>PyTorch</b>, as well as the
						<b>Azure ML Suite</b> and its Python SDK.
					</p>
				</li>
				<li>
					<div class="img-title">
						<span><img src="{base}/icons/geopandas-logo.png" alt="Geopandas Logo" /></span>
						<h4>Geospatial Specialist</h4>
					</div>
					<p>
						proficient in utilising industry-standard GIS tools (<b>QGIS</b>, <b>ArcGIS</b>), as
						well as Python's geospatial suite (<b>GeoPandas</b>, <b>Shapely</b>, <b>Rasterio</b>),
						to draw meaningful insights from vector and raster data.
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 6" class="professional-skills">
			<h3>Professional Skills</h3>
			<ul>
				<li>
					<h4>Pragmatic Prototyper</h4>
					<p>
						skilled at rapidly transforming ideas into tangible solutions. Capable of combining
						creative thinking and problem-solving abilities, to deliver practical and efficient
						prototypes with a strong attention to detail.
					</p>
				</li>
				<li>
					<h4>Technical Leader</h4>
					<p>
						with a proven track record of guiding teams towards successful project outcomes, using
						strong decision-making and problem-solving abilities to address challenges and drive
						innovation.
					</p>
				</li>
				<li>
					<h4>Enthusiastic Learner</h4>
					<p>
						always seeking new learning opportunities to expand my knowledge and skills, with an
						adaptable mindset and a quick grasp of new concepts.
					</p>
				</li>
				<li>
					<h4>Agile Developer</h4>
					<p>
						familiar with the Scrum framework, having served as both a developer and a Scrum Master
						within technical and multi-disciplinary teams.
					</p>
				</li>
				<li>
					<h4>Team Player & Trained Mentor</h4>
					<p>
						who's worked with a high number of junior developers, graduates and secondees in a
						highly collaborative environment. Proactively organising pair and mob programming
						sessions to foster knowledge exchange and skill development amongst team members.
					</p>
				</li>
			</ul>
		</section>
	</svelte:fragment>
</Columns>
