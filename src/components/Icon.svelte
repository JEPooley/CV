<script>
  // Props
  export let href = "";
  export let mailto = false;
  export let className = "";

  if (mailto) {href=`mailto:${href}`}
</script>

{#if href}
  <a {href}>
    <i class={className} />
  </a>
{:else}
  <i class={className} />
{/if}

<style>
  i {
    color: rgb(42, 42, 42);
    font-size: 28px;
    margin: 0 4px;
    transition: color .3s ease-out;
  }

  i:hover {
    color: rgb(58, 58, 58);
  }
</style>