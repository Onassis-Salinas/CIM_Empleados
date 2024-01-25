<script>
    import { fade, scale } from "svelte/transition";

    export let show;
</script>

{#if show}
    <div class="shadow" transition:fade on:click={() => (show = false)} />
    <form action="" class="form1" transition:scale>
        <img class="close-button" src="" alt="" on:click={() => (show = false)} />
        <slot />
    </form>
{/if}

<style>
    .shadow {
        position: fixed;
        top: 0;
        left: 0;
        width: 110vw;
        height: 110vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .form1 {
        position: fixed;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        width: clamp(200px, 90%, 600px);
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        background-color: var(--bc);
        padding: 20px;
        border: 1px solid var(--border);
        z-index: 100;
        border-radius: 10px;
    }

    form .close-button {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 15px;
        aspect-ratio: 1;
    }
</style>
