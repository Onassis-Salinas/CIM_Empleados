<script>
    import Table from "../Components/Table1.svelte";
    import AddForm from "../Components/AddForm.svelte";
    import axios from "axios";
    import { apiBase } from "../lib/utilities";

    let values;
    let headers;
    let material = "";
    let expo = "";
    const searchExpo = async () => {
        headers = ["Fecha", "Job", "Codigo", "Descripcion", "Cantidad", "Cantidad real", "U. Medida", "Surtido"];
        values = (await axios.post(apiBase + "/inventories/movements/expo", { expo })).data;
    };
    const searchMaterial = async () => {
        headers = ["Fecha", "Exportacion", "Job", "Cantidad", "Cantidad real", "Surtido", "Balance"];
        values = (await axios.post(apiBase + "/inventories/movements/Material", { material })).data;
        let acumulated = 0;
        for (let i = values.length - 1; i >= 0; i--) {
            acumulated += values[i].RealAmount;
            values[i].Balance = acumulated;
        }
    };
</script>

<AddForm />
<div class="inputs-container">
    <form on:submit|preventDefault={searchExpo}>
        <p>Exportacion:</p>
        <input class="input input-sm input-bordered" bind:value={expo} placeholder="" />
        <button class="btn btn-sm">Buscar</button>
    </form>
    <form on:submit|preventDefault={searchMaterial}>
        <p>Material:</p>
        <input class="input input-sm input-bordered" bind:value={material} placeholder="" />
        <button class="btn btn-sm">Buscar</button>
    </form>
</div>
<Table {headers} {values} {material} />

<style>
    .inputs-container {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;

        padding: 20px;
        width: clamp(280px, 90%, 800px);
    }
</style>
