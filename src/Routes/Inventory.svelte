<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Table from "../Components/Table1.svelte";
    import ExportButton from "../Components/ExportButton.svelte";
    import { apiBase } from "../lib/utilities";
    let InvArray = [];

    onMount(async () => {
        InvArray = (await axios.get(apiBase + "/inventories/inventory")).data;
    });
</script>

    <ExportButton/>

    {#if InvArray.length > 0}
        <Table values={InvArray} headers={["Codigo", "Descripcion", "Cantidad", "Medida"]} />
    {/if}
