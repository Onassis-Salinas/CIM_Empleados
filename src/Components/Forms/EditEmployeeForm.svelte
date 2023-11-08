<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../utilities";
    import { onMount } from "svelte";

    export let show;
    export let data = null;
    export let editing = true;
    let areas = [];
    let positions = [];
    let result;

    if (!data)
        data = {
            Nombre: null,
            Posicion: null,
            "No. Empleado": null,
            Area: null,
            NSS: null,
            CURP: null,
            RFC: null,
            Sangre: null,
            Cuenta: null,
            "Contacto de emergencia": null,
            "Numero de emergencia": null,
            "Fecha de ingreso": null,
            Vacaciones: null,
            "Lugar de nacimiento": null,
            Genero: null,
            Hijos: null,
            "Numero de clinica": null,
            Email: null,
            "Numero de telefono": null,
            Direccion: null,
            Banco: null,
            "Numero de infonavit": null,
            "Cuota fija de infonavit": null,
            "Descuento de infonavit": null,
            "Tipo de posicion": null,
            "Cambio de HYR": null,
            "Cambio de CIM": null,
            Turno: null,
            "Salario de nomina": null,
            "Salario integrado IMMS": null,
        };

    let keys = [];

    $: if (data) keys = Object.keys(data).filter((e) => e !== "Id");

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
            <p>{key}:</p>

            {#if key.includes("Fecha") || key.includes("HYR") || key.includes("CIM")}
                <input type="date" bind:value={data[key]} />
            {:else if key === "Area"}
                <select>
                    <option value="" />
                    {#each areas as area}
                        <option value={area.Name}>{area.Name}</option>
                    {/each}
                </select>
            {:else if key === "Posicion"}
                <select>
                    <option value="" />
                    {#each positions as position}
                        <option value={position.Name}>{position.Name}</option>
                    {/each}
                </select>
            {:else}
                <input type="text" bind:value={data[key]} />
            {/if}
        </div>
    {/each}

    {#if editing}
        <button on:click|preventDefault={sendEdit}>Editar</button>
    {:else}
        <button on:click|preventDefault={sendUpload}>Subir</button>
    {/if}
</Form>

<style>
    .container {
        width: max(30%, 100px);
    }
</style>
