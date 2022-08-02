<script>
  // Imports
  import ExperienceTag from "./components/ExperienceTag.svelte";
  import HighlightText from "./components/HighlightText.svelte";
  import ContactSet from "./components/ContactSet.svelte";
  import SkillSet from "./components/SkillSet.svelte";
  import SubHeading from "./components/SubHeading.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
  <script
    src="https://kit.fontawesome.com/f5272181b3.js"
    crossorigin="anonymous"></script>
</svelte:head>

<main>
  <aside>
    <img class="headshot" src="./images/josh-3.png" alt="" />
    <ContactSet />
    <section>
      <SubHeading>Core Skills</SubHeading>
      <SkillSet />
      <SubHeading>Some Experience with</SubHeading>
      <ul>
        <li>MS Azure (Web Apps, Serverless Functions)</li>
        <li>Docker</li>
        <li>Poetry</li>
      </ul>
    </section>
  </aside>

  <div id="main-text">
    <h1>Dr Josh Pooley</h1>
    <p id="subtitle">Data Scientist | Developer | Prototyper</p>
    <p>
      I'm a data scientist, developer and prototyper based in the UK, currently
      working in the geospatial industry. I love learning about new
      technologies, being creative and getting stuck in to a new project!
    </p>

    <section>
      <SubHeading>Experience</SubHeading>
      <ExperienceTag
        title="Data Scientist (Rapid Prototyping)"
        company="Ordnance Survey"
        date="January 2020 – Present"
        src="./images/os-logo.png"
      />
      <HighlightText>
        I have been a part of Ordnance Survey's Rapid Prototyping Team since
        its inception in 2020. This role is hugely diverse and I have developed
        a wide range of skills including Python development, data science, web
        development, human-centered design, agile development and much more!
      </HighlightText>
      <ExperienceTag
        title="Post-Graduate Researcher"
        company="University of Southampton"
        date="September 2015 – December 2019"
        src="./images/soton-logo.jpg"
      />
      <HighlightText>
        My post-graduate research was focussed on the development of high-speed
        sensors for deployment in harsh envionments. The work was a mixture of
        practical lab-based experimentation, computer modelling and writing
        research papers.
      </HighlightText>
    </section>

    <section>
      <SubHeading>Education</SubHeading>
      <ul>
        <li>
          <b>PhD in Optoelectronics</b> -
          <a target="_blank" href="https://www.zeplerinstitute.ac.uk/"
            >Zepler Institute, University of Southampton</a
          >
        </li>
        <li>
          <b>Masters Degree in Physics</b> - First Class Honours -
          <a target="_blank" href="https://www.southampton.ac.uk/"
            >University of Southampton</a
          >
        </li>
        <li>
          <b>A-Levels</b> - Maths (A*), Physics (A), P.E. (A), English Lit. AS
          (B) -
          <a target="_blank" href="https://www.thekings.devon.sch.uk/"
            >The King's School, Ottery St Mary</a
          >
        </li>
      </ul>
    </section>
    <section>
      <SubHeading>Projects</SubHeading>
      <ul>
        <li>
          Technical lead for the
          <a target="_blank" href="https://pypi.org/project/osdatahub/"
            >osdatahub</a
          >
          project
        </li>
        <li>
          Technical lead for the
          <a target="_blank" href="https://labs.os.uk/public/data-hub-explorer/"
            >OS Data Hub Explorer</a
          >
        </li>
        <li>
          Technical lead for the
          <a
            target="_blank"
            href="https://lively-beach-0877f1c03.azurestaticapps.net/"
            >OS Heat Data prototype</a
          >
        </li>
        <li>
          Presented COVID-19 infection model to the Newton Institute, Cambridge
        </li>
      </ul>
    </section>
    <section>
      <SubHeading>Written Work</SubHeading>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.ordnancesurvey.co.uk/newsroom/blog/driveways-ev-hackathon"
            >Rapid prototyping: at-home electric vehicle charging</a
          >
        </li>
        <li>
          <a
            target="_blank"
            href="https://python.plainenglish.io/graphic-design-in-python-using-geospatial-data-813e513dc393"
            >Graphic Design in Python Using Geospatial Data</a
          >
        </li>
        <li>
          <a target="_blank" href="https://eprints.soton.ac.uk/438653/"
            >Fibre optic methods for measuring detonation velocity</a
          >
        </li>
        <li>
          <a
            target="_blank"
            href="https://opg.optica.org/oe/fulltext.cfm?uri=oe-27-16-23464&amp;id=416379"
            >Detonation velocity measurements with uniform fibre Bragg gratings</a
          >
        </li>
        <li>
          <a target="_blank" href="https://www.mdpi.com/1424-8220/19/7/1697"
            >Detonation velocity measurements using rare-earth doped fibres</a
          >
        </li>
        <li>
          <a target="_blank" href="https://www.mdpi.com/1424-8220/19/15/3333"
            >Optimised chirped fibre Bragg gratings for detonation velocity
            measurements</a
          >
        </li>
      </ul>
    </section>
  </div>
</main>
<footer>
  Design by Josh Pooley 2022
</footer>

<style>
  :global(body),
  :global(html) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgb(49, 49, 49);

    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }

  :global(h1) {
    font-weight: 700;
    font-size: 3rem;
  }

  :global(SubHeading),
  :global(h3),
  :global(h4) {
    font-weight: 600;
  }

  :global(body) {
    justify-content: center;
    padding: 40px 0 0 0;
    height: fit-content;
  }

  :global(ul) {
    padding-left: 20px;
  }

  footer {
    color: rgba(255, 255, 255, 0.2);
    width: 100%;
    text-align: center;
    padding: 40px 0;
    transition: .6s ease-out;
  }

  footer:hover {
    color: white;
  }

  main {
    width: 100%;
    max-width: 960px;
    background: white;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    display: flex;
    margin: 0 auto;
  }

  aside {
    width: 500px;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 5px 0 0 5px;
    padding: 70px 40px 40px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  :global(section) {
    margin-top: 45px;
  }

  .headshot {
    width: 200px;
    border-radius: 10px;
    box-sizing: border-box;
  }

  #main-text {
    padding: 75px 50px 40px 30px;
    width: 100%;
  }

  h1 {
    margin: 0;
  }

  #subtitle {
    margin: 0;
  }

  ul {
    list-style: none;
  }

  ul li::before {
    content: "\2022";
    color: rgb(122, 122, 122);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
</style>
