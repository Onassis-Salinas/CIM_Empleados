<!-- <script>
    import axios from "axios";

    export let data;
    export let url;
    export let inputs;

    function submmit() {
        axios
            .post(url, data)
            .then((res) => console.log(res.data))
            .catch((res) => console.log(res.data));
        console.log(data);
    }
</script>

<form action="">
    {#each inputs as input}
        <div class="input-container">
            <p>{input.title}:</p>
            {#if input.value.includes("Date")}
                <input type="date" bind:value={data[input.value]} />
            {:else}
                <input type="text" bind:value={data[input.value]} />
            {/if}
        </div>
    {/each}

    <button on:click|preventDefault={submmit}>Subir</button>
</form>

<style>
    form {
        width: 90%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }
    .input-container{
        width: clamp(100px, 95%, 200px)
        
    }

    input {
        width: 100%;
    }
    p{
        width: 100%;
        margin: 0;
    }
    button {
        width: clamp(100px, 95%, 200px)
    }
</style> -->
