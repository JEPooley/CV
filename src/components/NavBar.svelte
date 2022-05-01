<script>
    // Imports
    import NavButton from "./NavButton.svelte";
</script>

<nav>
    <NavButton icon="home" hint="Home"></NavButton>
    <NavButton icon="work" hint="Career"></NavButton>
    <NavButton icon="school" hint="Education"></NavButton>
    <NavButton icon="grade" hint="Skills"></NavButton>
</nav>

<style>
    nav {
        width: 80px;
        height: 100%;
        background: transparent;
        /* background: linear-gradient(90deg, rgba(50, 50, 50, 0.1) 0%, rgba(50, 50, 50, 0.3) 100%); */
        border-radius: 8px 0 0 8px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding-top: 30px;
        box-sizing: border-box;
    }
</style>