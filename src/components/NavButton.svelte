<script>
    // Imports
    import Hint from "./Hint.svelte";

    // Props
    export let icon;
    export let hint;
</script>

<div class="button-container">
    <button>
        <span class="material-symbols-outlined"> {icon} </span>
    </button>
    <div class="marker"></div>
    <Hint>
        {hint}
    </Hint>
</div>

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        background: transparent;
        border: none;
        border-radius: 100%;
        padding: 10px;
        color: rgba(255, 255, 255, 0.4);
        transition: color .4s ease-out;
    }

    button:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
    }

    button:hover + :global(.hint-container) {
        display: flex
    }

    .button-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    .marker {
        position: absolute;
        left: -4px;
        width: 4px;
        border-radius: 0 100% 100% 0;
        height: 80%;
        background: rgba(255, 255, 255, 0.08);
        display: none;
        transition: background-color .4s ease-out;
    }

    button:hover + .marker {
        display: block;
    }
</style>
