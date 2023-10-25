<script>
    import axios from "axios";
    import { apiBase } from "../utilities";
    let areas;
    let positions;

    export let filter = {
        NoEmpleado: "",
        Area: "",
        Position: "",
    };

    axios.get(apiBase + "/employees/various/areas").then((res) => (areas = res.data));
    axios.get(apiBase + "/employees/various/positions").then((res) => (positions = res.data));
</script>

<div>
    <b>Filtros:</b>

    <select name="" id="" bind:value={filter.Area}>
        <option value="">Area:</option>
        {#if areas}
            {#each areas as area}
                <option value={area.Name}>{area.Name}</option>
            {/each}
        {/if}
    </select>

    <select name="" id="" bind:value={filter.Position}>
        <option value="">Posicion:</option>
        {#if positions}
            {#each positions as position}
                <option value={position.Name}>{position.Name}</option>
            {/each}
        {/if}
    </select>

    <input type="number" placeholder="No. empleado" bind:value={filter.NoEmpleado} />
</div>

<style>
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
