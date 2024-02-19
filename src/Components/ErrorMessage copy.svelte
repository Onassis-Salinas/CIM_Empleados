<script>
    export let message;

    setTimeout(() => {
        document.querySelector(".error").remove();
    }, 3000);
</script>

<div class="error">
    <h4>
        {message}
    </h4>
</div>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--primary);
        color: white;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
