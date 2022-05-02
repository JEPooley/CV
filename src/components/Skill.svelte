<script>
  // Imports
  import RatingBar from "./RatingBar.svelte";

  // Props
  export let name;
  export let rating;

</script>

<div>
  <h4>{name}</h4>
  <RatingBar {rating} />
</div>
<div >
    <slot></slot>
</div>

<style>
    p {
        margin-top: 0;
        margin-bottom: 8px;
        display: none;
    }

    h4 {
        margin-bottom: 5px;
    }
</style>