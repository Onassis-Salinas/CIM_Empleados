<script>
    export let show = false;

    import axios from "axios";
    import ErrorMessage from "../ErrorMessage.svelte";
    import { apiBase } from "../utilities";
    import Form from "../Form.svelte";

    let data = {
        Id: "",
        NoEmpleado: "",
        Name: "",
        Position: "",
        Area: "",
        NSS: "",
        CURP: "",
        RFC: "",
        Blood: "",
        Account: "",
        EmmergencyContact: "",
        EmmergencyNumber: "",
        AdmmisionDate: "",
        Active: 1,
    };

    let inputs = [
        { title: "No. Empleado", value: "NoEmpleado" },
        { title: "Nombre", value: "Name" },
        { title: "Posicion", value: "Position" },
        { title: "Area", value: "Area" },
        { title: "NSS", value: "NSS" },
        { title: "CURP", value: "CURP" },
        { title: "RFC", value: "RFC" },
        { title: "Cuenta", value: "Account" },
        { title: "Contacto de emergencia", value: "EmmergencyNumber" },
        { title: "Numero de emergencia", value: "EmmergencyContact" },
        { title: "Fecha de ingreso", value: "AdmissionDate" },
        { title: "TIpo de Sangre", value: "Blood" },
    ];

    function sendData() {
        axios
            .post(apiBase + "/employees/data", data)
            .then((res) => console.log(res))
            .catch((err) => new ErrorMessage({ target: document.body, props: { message: err.response.data.error } }));
    }
</script>

<Form bind:show>
    <div class="form-wrapper">
        <p>No. Empleado</p>
        <input type="number" name="" id="" bind:value={data.NoEmpleado} />
    </div>

    <div class="form-wrapper">
        <p>Nombre</p>
        <input type="text" name="" id="" bind:value={data.Name} />
    </div>

    <div class="form-wrapper">
        <p>Posicion</p>
        <select name="" id="" bind:value={data.Position}>
            <option value="">Selecciona una posicion</option>
            {#await axios.get(apiBase + "/employees/various/positions") then areas}
                {#each areas.data as area}
                    <option value={area.Name}>{area.Name}</option>
                {/each}
            {/await}
        </select>
    </div>

    <div class="form-wrapper">
        <p>Area</p>
        <select name="" id="" bind:value={data.Area}>
            <option value="">Selecciona un area</option>
            {#await axios.get(apiBase + "/employees/various/areas") then areas}
                {#each areas.data as area}
                    <option value={area.Name}>{area.Name}</option>
                {/each}
            {/await}
        </select>
    </div>

    <div class="form-wrapper">
        <p>NSS</p>
        <input type="text" name="" id="" bind:value={data.NSS} />
    </div>
    <div class="form-wrapper">
        <p>CURP</p>
        <input type="text" name="" id="" bind:value={data.CURP} />
    </div>
    <div class="form-wrapper">
        <p>RFC</p>
        <input type="text" name="" id="" bind:value={data.RFC} />
    </div>
    <div class="form-wrapper">
        <p>Sangre</p>
        <input type="text" name="" id="" bind:value={data.Blood} />
    </div>
    <div class="form-wrapper">
        <p>Contacto de emergencia</p>
        <input type="text" name="" id="" bind:value={data.EmmergencyContact} />
    </div>
    <div class="form-wrapper">
        <p>Numero de emergencia</p>
        <input type="text" name="" id="" bind:value={data.EmmergencyNumber} />
    </div>
    <div class="form-wrapper">
        <p>Fecha de ingreso</p>
        <input type="date" name="" id="" bind:value={data.AdmissionDate} />
    </div>
    <div class="spacer" />
    <button on:click|preventDefault={sendData}>Agregar</button>
</Form>

<!-- <PostForm {data} {url} {inputs} /> -->
