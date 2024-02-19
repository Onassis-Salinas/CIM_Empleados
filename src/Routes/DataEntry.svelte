<script>
    import Table from "../Components/Table1.svelte";
    import EntryForm from "../Components/MaterialEntryForm.svelte";
    import ErrorMessage from "../Components/ErrorMessage.svelte";

    import axios from "axios";
    import {  materials } from "../lib/storage";
    import { onMount } from "svelte";
    import { apiBase } from "../lib/utilities";

    let values;
    let headers;

    onMount(async (event) => {
        reload();
    });

    const reload = async (event) => {
        headers = ["Codigo", "Descripcion", "Unidad de medida"];
        let response = await axios.get(apiBase + "/inventories/materials");
        if (response.data.error) new ErrorMessage({ target: document.body, props: { message: response.data.error } });
        values = response.data;
        console.log(values);
        materials.set(response.data);
    };
</script>

    {#if headers && values}
        <EntryForm example={values[0]} names={headers} url={"/inventories/materials"} on:reload={reload} />
        <Table {values} {headers} />
    {/if}
