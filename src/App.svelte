<script>
  // Imports
  import ExperienceTag from "./components/ExperienceTag.svelte";
  import HighlightText from "./components/HighlightText.svelte";

  // Props
  export let themeColor;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,100,0,200"
  />
</svelte:head>

<main>
  <aside>
    <img class="headshot" src="./images/josh-3.png" alt="" />
  </aside>

  <div id="main-text">
    <h1>Dr Josh Pooley</h1>
    <p id="subtitle">Data Scientist | Developer | Prototyper</p>
    <p>
      I'm a data scientist and prototyper based in the UK, currently
      specialising in geospatial analysis. I love learning about new
      technologies, being creative and getting stuck in to a new project!
    </p>

    <h2>Experience</h2>
    <div id="experience">
      <ExperienceTag
        title="Data Scientist (Rapid Prototyping)"
        company="Ordnance Survey"
        date="January 2020 – Present"
        src="./images/josh-3.png"
      />
      <HighlightText>
        I have been a part of Ordnance Survey's Rapid Prototyping Team sinces its
        inception in 2020. This role is hugely diverse and I have developed a wide
        range of skills including Python development, data science, web
        development, human-centered design, agile development and much more!
      </HighlightText>
      <h4>Key Responsibilities</h4>
      <ul>
        <li>Python development of prototypes</li>
        <li>Data science and prototype ML model training</li>
        <li>Building web apps and interactive demonstrators for prototypes</li>
        <li>Scrum mastering and technical leadership</li>
        <li>Geospatial data manipulation and analysis</li>
        <li>Demonstrating and promoting a culture of innovation</li>
      </ul>
      <h4>Acheivements</h4>
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
      <h4>Written Work</h4>
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
      </ul>
      <br>
      <ExperienceTag
        title="Post-Graduate Researcher"
        company="University of Southampton"
        date="September 2015 – December 2019"
        src="./images/josh-3.png"
      />
      <HighlightText>
        My post-graduate research was focussed on the development of high-speed
        sensors for deployment in harsh envionments. The work was a mixture of
        practical lab-based experimentation, computer modelling and writing
        research papers.
      </HighlightText>
      <h4>Key Responsibilities</h4>
      <ul>
        <li>Designing and testing fibre optic sensor systems</li>
        <li>Fabricating fibre Bragg gratings</li>
        <li>Demonstrating experimental physics to undergraduate students</li>
        <li>Writing research papers</li>
      </ul>
      <h4>Acheivements</h4>
      <ul>
        <li>Awarded doctorate for work on fibre optic sensing</li>
        <li>Successfully published three research papers</li>
      </ul>
      <h4>Written Work</h4>
      <ul>
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
    </div>
  </div>
</main>

<style>
  :global(body),
  :global(html) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgb(49, 49, 49);
  }

  :global(body) {
    justify-content: center;
    padding: 40px 0;
    height: fit-content;
  }

  main {
    width: 100%;
    max-width: 740px;
    background: white;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    display: flex;
    margin: 0 auto;
  }

  aside {
    width: 220px;
    background-color: rgba(0, 0, 0, 0.082);
    border-radius: 5px 0 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headshot {
    width: 155px;
    border-radius: 10px;
    box-sizing: border-box;
    margin: 30px;
  }

  #main-text {
    padding: 30px;
  }

  h1 {
    margin: 0;
  }

  #subtitle {
    margin: 0;
  }

  #experience {
    padding-left: 20px;
  }
</style>
