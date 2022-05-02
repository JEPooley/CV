<script>
  // Props
  export let rgb = [10, 10, 10];
</script>

<p style="--border-color: rgba({rgb.join(",")},0.1); --background: rgba({rgb.join(",")},0.04)">
  <slot />
</p>

<style>
  p {
    padding: 20px 35px 20px 20px;
    background: var(--background);
    border-left: 4px solid var(--border-color);
    border-radius:  0 3px 3px 0;
  }
</style>
