<script>
    import axios from "axios";
    import { apiBase } from "../../lib/utilities";
    import EditEmployeeForm from "./EditEmployeeForm.svelte";
    let show = false;

    let areas;
    let positions;

    export let filter = {
        NoEmpleado: "",
        Area: "",
        Position: "",
        Active: 1,
    };

    axios.get(apiBase + "/employees/various/areas").then((res) => (areas = res.data));
    axios.get(apiBase + "/employees/various/positions").then((res) => (positions = res.data));
</script>

<div>
    <b>Filtros:</b>

    <select class="select select-sm select-bordered w-full max-w-xs" name="" id="" bind:value={filter.Active}>
        <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
    </select>

    <select class="select select-sm select-bordered w-full max-w-xs" name="" id="" bind:value={filter.Area}>
        <option value="">Area:</option>
        {#if areas}
            {#each areas as area}
                <option value={area.Name}>{area.Name}</option>
            {/each}
        {/if}
    </select>

    <select class="select select-sm select-bordered w-full max-w-xs" name="" id="" bind:value={filter.Position}>
        <option value="">Posicion:</option>
        {#if positions}
            {#each positions as position}
                <option value={position.Name}>{position.Name}</option>
            {/each}
        {/if}
    </select>

    <input class="input input-sm input-bordered w-full max-w-xs" type="number" placeholder="No. empleado" bind:value={filter.NoEmpleado} />
    <button class="btn btn-sm" on:click={() => (show = true)}>Registrar</button>
</div>

<EditEmployeeForm bind:show editing={false} />

<style>
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
