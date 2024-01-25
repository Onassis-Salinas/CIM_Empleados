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
        const inputsMaxLength ={
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
        }

    let keys = [];

    $: if (data) keys = Object.keys(data).filter((e) => e !== "Id" && e!== "vacaciones" && e!== "Fecha de ingreso");

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
                <select bind:value={data[key]}>
                    <option value="" />
                    {#each areas as area}
                        <option value={area.Name}>{area.Name}</option>
                    {/each}
                </select>
            {:else if key === "Posicion"}
                <select bind:value={data[key]}>
                    <option value="" />
                    {#each positions as position}
                        <option value={position.Name}>{position.Name}</option>
                    {/each}
                </select>
            {:else if key === "Genero"}
                <select name="" id="" bind:value={data[key]}>
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                </select>
            {:else if key === "Banco"}
            <select name="" id="" bind:value={data[key]}>
                <option value="Santander">Santander</option>
                <option value="Bancomer">Bancomer</option>
            </select>
            {:else}
                <input maxlength={inputsMaxLength[key]} type="text" bind:value={data[key]} />
            {/if}
        </div>
    {/each}

    <div class="button-container">
        {#if editing}
            <button on:click|preventDefault={sendEdit}>Listo</button>
        {:else}
            <button on:click|preventDefault={sendUpload}>Agregar</button>
        {/if}
    </div>
</Form>

<style>
    .container {
        width: max(30%, 100px);
    }
    .button-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
