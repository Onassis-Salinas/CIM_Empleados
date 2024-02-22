<script>
    import Form from "../Form.svelte";

    export let show;
    export let data = null;
    let keys = [];

    $: if (data) keys = Object.keys(data).filter((e) => e !== "Id" && e !== "vacaciones");
</script>

<Form bind:show>
    {#if data}
        <img alt="" src={`${import.meta.env.VITE_IMAGES_LINK}/${data["No. Empleado"]}.png`} />
        {#each keys as key}
            <div class="container">
                <small>{key}:</small>
                <p class="overflow-auto">{data[key] === null ? "" : data[key]}</p>
            </div>
        {/each}
    {/if}
</Form>

<style>
    img {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        object-fit: contain;
    }
    .container {
        width: max(30%, 100px);
    }
</style>
