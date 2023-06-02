<script>
	import Columns from '../lib/components/Columns.svelte';
</script>

<Columns>
	<svelte:fragment slot="left">
		<header style="order: 0">
			<h1>
				Josh <br /> Pooley
			</h1>
			<h2>Data Scientist | Developer</h2>
		</header>

		<section style="order: 2" class="contact">
			<ul>
				<li class="img-li">
					<img class="white-svg" src="icons/location-dot-solid.svg" alt="Location Pin" />Winchester,
					UK
				</li>
				<li class="img-li">
					<img
						class="white-svg"
						src="icons/envelope-solid.svg"
						alt="Envelope"
					/>joshpooley93@gmail.com
				</li>
				<li class="img-li">
					<img class="white-svg" src="icons/github.svg" alt="GitHub Logo" />github.com/JEPooley
				</li>
				<li class="img-li">
					<img
						class="white-svg"
						src="icons/linkedin.svg"
						alt="LinkedIn Logo"
					/>linkedin.com/in/josh-pooley
				</li>
				<li class="img-li">
					<img class="white-svg" src="icons/link-solid.svg" alt="Link Icon" />jepooley.github.io/cv/
				</li>
			</ul>
		</section>

		<section style="order: 3" class="qualifications">
			<h3>Qualifications</h3>
			<ul>
				<li>
					<b>PhD Optoelectronics</b> — Zepler Institute, University of Southampton
				</li>
				<li>
					<b>Master of Physics (First Class)</b> — Zepler Institute, University of Southampton
				</li>
			</ul>
		</section>

		<section style="order: 7" class="projects">
			<h3>Projects</h3>
			<ul>
				<li>
					<h4>osdatahub</h4>
					<p>
						Inventor and technical lead for the osdatahub Python package, which enables customers a
						simple solution for querying Ordnance Survey's data.
					</p>
				</li>
				<li>
					<h4>Data Hub Explorer</h4>
					<p>
						Inventor and technical lead for the data hub explorer web app (written with Svelte).
						Offers customers a view of available open-source and premium data sets; no sign-up
						required!
					</p>
				</li>
				<li>
					<h4>mobtimer.dev</h4>
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
						<img class="white-svg" src="icons/kitchen-set-solid.svg" alt="Kitchen Icon" />
						<h4>Cooking</h4>
					</div>
					<p>Passionate home cook and keen advocate of pineapple on pizza.</p>
				</li>
				<li>
					<div class="img-title">
						<img class="white-svg" src="icons/guitar-solid.svg" alt="Guitar Icon" />
						<h4>Music</h4>
					</div>
					<p>
						A very amateurish guitar player and drummer. Also enjoy playing around in Logic Pro.
					</p>
				</li>
				<li>
					<div class="img-title">
						<img class="white-svg" src="icons/shoe-prints-solid.svg" alt="Footprints Icon" />
						<h4>Walking</h4>
					</div>
					<p>
						Extremely fond of being outside in nature — this is something I try and do every day of
						the year!
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 10" class="extras">
			<div class="img-title">
				<img class="white-svg" src="icons/lock-solid.svg" alt="Lock Icon" />
				<h4>Security Clearence (SC level)</h4>
			</div>
		</section>
	</svelte:fragment>

	<svelte:fragment slot="right">
		<section style="order: 1" class="summary">
			I'm a data scientist, developer and prototyper based in the UK, currently working in the
			geospatial industry. I love learning about new technologies, being creative and getting stuck
			in to a new project!
		</section>

		<section style="order: 4" class="experience">
			<h3>Experience</h3>
			<ul>
				<li>
					<div class="job-title">
						<img src="icons/ordnance-survey-logo.svg" alt="Ordnance Survey Logo" />
						<div>
							<h4>Data Scientist</h4>
							<p>Jan 2020 – Present</p>
						</div>
					</div>
					<p>[Ordnance Survey]</p>
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
						<img src="icons/soton-logo.svg" alt="University of Southampton Logo" />
						<div>
							<h4>Post-Graduate</h4>
							<p>Sep 2015 – Dec 2019</p>
						</div>
					</div>
					<p>[Uni. of Southampton]</p>
					<p>
						During my post-graduate research at the University of Southampton, I focused on the
						development of high-speed sensors for deployment in harsh environments. This role
						involved a combination of practical lab-based experimentation, computer modelling, and
						extensive research paper writing.
					</p>
				</li>
			</ul>
		</section>

		<section style="order: 5" class="technical-skills">
			<h3>Technical Skills</h3>
			<ul>
				<li>
					<div class="img-title">
						<img src="icons/python-logo.png" alt="Python Logo" />
						<h4>Python Developer</h4>
					</div>
					<p>
						with a diverse skill set, including API development (Flask, FastAPI), data analysis and
						manipulation (Numpy, Pandas), object-oriented programming (SOLID code) and environment
						management (Poetry, Conda, Docker).
					</p>
				</li>
				<li>
					<div class="img-title">
						<img src="icons/svelte-logo.png" alt="Svelte Logo" />
						<h4>Frontend Developer</h4>
					</div>
					<p>
						with professional experience making prototype web apps and open-source Node packages.
						Familiar with contemporary tech stacks such as SvelteKit, SCSS, Node.js, Jest and
						Typescript.
					</p>
				</li>
				<li>
					<div class="img-title">
						<img src="icons/azure-logo.png" alt="MS Azure Logo" />
						<h4>Cloud Developer</h4>
					</div>
					<p>
						experienced in using the Azure cloud platform to create microservices (Function Apps),
						set up databases (Azure SQL), manage software packages (Azure Artifacts), deploy
						applications (Azure App Service) and create build pipelines (Azure Pipelines).
					</p>
				</li>
				<li>
					<div class="img-title">
						<img src="icons/git-logo.png" alt="Git Logo" />
						<h4>Software Engineer</h4>
					</div>
					<p>
						familiar with modern best practices such as test-driven development (TDD), trunk-based
						development and version control (Git), particularly within an Azure DevOps framework.
					</p>
				</li>
				<li>
					<div class="img-title">
						<img src="icons/azureml-logo.png" alt="AzureML Logo" />
						<h4>Data Scientist</h4>
					</div>
					<p>
						skilled in using Python's comprehensive data analysis and modelling toolset, including
						NetworkX, Sci-Kit Learn, SciPy and PyTorch, as well as the Azure ML Suite and its Python
						SDK.
					</p>
				</li>
				<li>
					<div class="img-title">
						<img src="icons/geopandas-logo.png" alt="Geopandas Logo" />
						<h4>Geospatial Specialist</h4>
					</div>
					<p>
						proficient in utilising industry-standard GIS tools (QGIS, ArcGIS), as well as Python's
						geospatial suite (GeoPandas, Shapely, Rasterio), to draw meaningful insights from vector
						and raster data.
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
						that's worked with a high number of junior developers, graduates and secondees in a
						highly collaborative environment. Proactively organising pair and mob programming
						sessions to foster knowledge exchange and skill development amongst team members.
					</p>
				</li>
			</ul>
		</section>
	</svelte:fragment>
</Columns>

<style lang="scss">
	section,
	header {
		padding: 2rem;
		box-sizing: border-box;
	}
</style>
