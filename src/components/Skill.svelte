<script>
  // Imports
  import RatingBar from "./RatingBar.svelte";

  // Props
  export let name;
  export let rating;
  export let delay;

</script>

<div>
  <h4>{name}</h4>
  <RatingBar {rating} {delay}/>
</div>
<div >
    <slot></slot>
</div>

<style>
    h4 {
        margin-bottom: 5px;
    }
</style>