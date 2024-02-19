<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";
    import Label from "./Label.svelte";
    import ErrorMessage from "./ErrorMessage.svelte";
    import Form from "./Form.svelte";
    import { apiBase } from "../lib/utilities";

    const dispatch = createEventDispatcher();

    export let example;
    export let names;
    export let url;
    let values;
    let keys;
    let show;

    $: {
        if (example) reset(); //no checha nada, solo genera la dependencia a example
    }

    const reset = () => {
        values = { ...example };
        keys = Object.keys(values);
        keys.forEach((key) => {
            values[key] = "";
        });
    };

    const handleSubmit = async () => {
        const response = await axios.post(apiBase + url, values);
        if (response.data.error) new ErrorMessage({ target: document.body, props: { message: response.data.error } });

        dispatch("reload", { url: url });
    };
</script>

<button class="btn btn-sm" on:click={() => (show = true)}>Registrar material</button>
<Form bind:show>
    <form>
        <h3>Crear nuevo dato</h3>
        {#if keys}
            {#each keys as key, i}
                <div class="group">
                    <Label>{names[i]}</Label>
                    <input class="input input-sm input-bordered" type="text" bind:value={values[key]} />
                </div>
            {/each}
        {/if}
        <button class="btn btn-sm" on:click={handleSubmit}>Crear</button>
    </form>
</Form>

<style>
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .group {
        width: 250px;
    }
    form h3 {
        width: 100%;
    }
</style>
