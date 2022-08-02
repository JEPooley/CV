<script>
  // Props
  export let name;
  export let icon;
  export let href;
</script>

<div>
  <h4><i class={icon} /> {name}</h4>
  {#if href}
    <a target="_blank" {href} class="text">
      <slot />
    </a>
  {:else}
    <p class="text">
      <slot />
    </p>
  {/if}
</div>

<style>
    h4 {
        margin: 10px 0 2px 0;

    }
    .text {
        margin: 0;
    }
</style>