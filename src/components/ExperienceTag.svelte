<script>
  // Props
  export let title;
  export let company;
  export let date;
  export let src;
  export let href = "";
  export let alt = "";
</script>

<h3>{title}</h3>
<div class="container">
  {#if src}
    <img {src} {alt} />
  {/if}
  <div class="text-container">
    <a target="_blank" {href}>{company}</a>
    {date}
  </div>
</div>

<style>
  .container, .text-container {
    display: flex;
  }

  .container {
    align-items: center;
  }

  .text-container {
      flex-direction: column;
  }

  img {
    max-width: 60px;
    max-height: 40px;
    margin-right: 10px;
  }
</style>
