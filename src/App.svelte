<script>
  // Imports
  import NavBar from "./components/NavBar.svelte";
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
  <NavBar />
</main>

<style>
  main {
    width: 800px;
    height: 500px;
    background-color: rgb(83, 83, 83);
    box-shadow: 0 40px 60px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    box-sizing: border-box;
  }

  :global(body),
  :global(html) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgb(44, 44, 44);
  }

  :global(body) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", sans-serif;
    color: rgb(218, 218, 218);
  }

  :global(h1),
  :global(h2) {
    margin: 0;
  }
</style>
