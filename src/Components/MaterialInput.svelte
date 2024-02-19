<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import ErrorMessage from "./ErrorMessage.svelte";
    import { apiBase } from "../lib/utilities";

    export let value = null;
    export let placeholder = "";
    export let size = "";
    export let measurement = "";
    export let data = 0;
    export let rows = 0;
    let correct = true;

    const checkMaterial = async () => {
        correct = false;
        const response = await axios.post(apiBase + "/inventories/materials/unique", { Material: value });
        if (response.data.error) return new ErrorMessage({ target: document.body, props: { message: response.data.error } });
        if (response.data.length === 0) return (measurement = "");
        measurement = response.data[0].Measurement;
        correct = true;
    };

    onMount(() => {
        checkMaterial();
    });

    $: if (data || rows) checkMaterial();
</script>


<input type="text"  bind:value {placeholder} class=" input input-sm input-bordered {size} {!correct?"input-error":null}" on:blur={checkMaterial} />
