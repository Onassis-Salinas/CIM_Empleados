<script>
    export let message;

    setTimeout(() => {
        document.querySelector(".error").remove();
    }, 2000);
</script>

<h1 class="error">
    {message}
</h1>

<style>
    h1 {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        background-color: rgb(187, 27, 27);
        border-radius: 3px;
        padding: 5px 20px;
    }
</style>
