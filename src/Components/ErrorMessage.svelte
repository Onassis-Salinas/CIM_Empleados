<script>
    export let message

    setTimeout(()=>{
        document.querySelector(".error").remove();
    }, 2000)
</script>

<div class="error">
    <h1>{message}</h1>
</div>

<style>
    div {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f00;
    }
</style>
