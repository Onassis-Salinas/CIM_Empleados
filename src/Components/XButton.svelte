<script>
    export let click;
</script>

<button on:click|preventDefault={click}>X</button>

<style>
    button {
        text-align: center;
        color: var(--text);
        cursor: pointer;
        background-color: var(--primary);
        color: var(--background);
        font-weight: 700;
        border-radius: 6px;
        border: none;
        transition: 0.5s;
        font-size: 13px;
        width: 50px;
        border-radius: 5px;
        height: 100%;
        padding: 3px;
        margin: 0 3px 0 3px;
    }
</style>
