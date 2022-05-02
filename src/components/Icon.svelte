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
