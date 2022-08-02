<script>
  // Imports
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";

  // Props
  export let rating; // 0-100
  export let delay = 500;

  // Init
  let ready = false;
  onMount(() => (ready = true));

  // Transition
  function slideBounce(node, { duration, delay }) {
    return {
      duration,
      delay,
      css: (t) => {
        const eased = cubicOut(t);
        return `transform: scaleX(${eased});`;
      },
    };
  }
</script>

<div class="container">
  {#if ready}
    <div
      in:slideBounce={{ duration: 1500, delay: delay }}
      class="rating"
      style="--width:{rating}%"
    />
  {/if}
</div>

<style>
  .container {
    width: 100%;
    height: 12px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 3px #0000005e inset;
  }

  .rating {
    width: var(--width);
    height: 100%;
    background: rgb(117, 117, 117);
    transform-origin: center left;
    border-radius: 4px;
    box-shadow: 2px 0 2px #0000003b;
  }
</style>
