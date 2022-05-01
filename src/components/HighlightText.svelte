<script>
  // Props
  export let rgb = [10, 10, 10];
</script>

<p style="--border-color: rgb({rgb.join(",")}); --background: rgba({rgb.join(",")},0.04)">
  <slot />
</p>

<style>
  p {
    padding: 20px 35px 20px 20px;
    background: var(--background);
    border-left: 4px solid var(--border-color);
  }
</style>
