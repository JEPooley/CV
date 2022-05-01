<script>
  // Imports
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
    <img class="headshot" src="./images/josh-3.png" alt="">
  </aside>

  <div id="main-text">
    <h1>Dr Josh Pooley</h1>
    <p id="subtitle">Data Scientist | Developer | Prototyper</p>
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
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }

  main {
    width: 100%;
    max-width: 740px;
    background: white;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.205);
    border-radius: 5px;
    display: flex;
  }

  aside {
    width: 220px;
    height: 100%;
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
</style>
