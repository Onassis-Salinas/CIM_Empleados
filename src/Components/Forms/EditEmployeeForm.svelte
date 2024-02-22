<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../../lib/utilities";

    export let show;
    export let data = null;
    export let editing = true;
    let areas = [];
    let positions = [];
    let result;

    if (!data) axios.get(apiBase + "/employees/data/model").then((res) => (data = res.data));

    const inputsMaxLength = {
        "No. Empleado": 5,
        NSS: 11,
        CURP: 18,
        RFC: 13,
        Sangre: 3,
        Cuenta: 11,
        "Numero de emergencia": 10,
        Hijos: 2,
        "Numero de clinica": 2,
        "Numero de telefono": 10,
        Turno: 10,
    };

    let keys = [];

    $: if (data) keys = Object.keys(data).filter((e) => e !== "Id" && e !== "vacaciones");

    const sendEdit = (i) => {
        axios
            .put(apiBase + "/employees/data", data)
            .then(() => (show = false))
            .catch((err) => showError(err));
    };

    const sendUpload = () => {
        axios
            .post(apiBase + "/employees/data", data)
            .then(() => (show = false))
            .catch((err) => showError(err));
    };

    const fetchValues = async () => {
        result = await axios.get(apiBase + "/employees/various/areas");
        areas = result.data;
        result = await axios.get(apiBase + "/employees/various/positions");
        positions = result.data;
    };

    fetchValues();
</script>

<Form bind:show>
    {#each keys as key}
        <div class="container">
            {#if !key.includes("vacaciones")}
                <p>{key}</p>
            {/if}

            {#if key.includes("Fecha") || key.includes("CIM") || key.includes("FDNAC")}
                <input class="input input-sm input-bordered w-full w-full" type="date" bind:value={data[key]} />
            {:else if key === "Area"}
                <select class="select select-sm select-bordered w-full" bind:value={data[key]}>
                    <option value="" />
                    {#each areas as area}
                        <option value={area.Name}>{area.Name}</option>
                    {/each}
                </select>
            {:else if key === "Posicion"}
                <select class="select select-sm select-bordered w-full" bind:value={data[key]}>
                    <option value="" />
                    {#each positions as position}
                        <option value={position.Name}>{position.Name}</option>
                    {/each}
                </select>
            {:else if key === "Genero"}
                <select class="select select-sm select-bordered w-full" name="" id="" bind:value={data[key]}>
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                </select>
            {:else if key === "Banco"}
                <select class="select select-sm select-bordered w-full" name="" id="" bind:value={data[key]}>
                    <option value="Santander">Santander</option>
                    <option value="Bancomer">Bancomer</option>
                    <option value="Scotiabank">Scotiabank</option>
                </select>
            {:else if key.includes("vacaciones")}{:else}
                <input class="input input-sm input-bordered w-full" maxlength={inputsMaxLength[key]} type="text" bind:value={data[key]} />
            {/if}
        </div>
    {/each}

    <div class="button-container">
        {#if editing}
            <button class="btn btn-sm" on:click|preventDefault={sendEdit}>Listo</button>
        {:else}
            <button class="btn btn-sm" on:click|preventDefault={sendUpload}>Agregar</button>
        {/if}
    </div>
</Form>

<style>
    .container {
        width: max(30%, 100px);
    }
    .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
