<script>
    export let text;
    export let amount;
</script>

<div>
    <p>{text}:</p>
    <b>{amount}</b>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--fg);
        width: 200px;
        aspect-ratio: 8/3;
        margin: 10px;
        border-radius: var(--br);
        border: 1px solid var(--border);
    }
    p {
        font-size: 20px;
        margin: 0;
    }
    b {
        font-size: 30px;
        color: var(--color1);
    }
</style>
