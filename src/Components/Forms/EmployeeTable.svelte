<script>
    import axios from "axios";
    import { apiBase, showError } from "../utilities";
    import QuitForm from "./QuitForm.svelte";

    export let APIFetch;
    export let filter;
    let show = false;
    let quitId = 0;

    let keys;
    let rows;
    let filteredRows;

    $: if (filter) filterTables();

    function filterTables() {
        if (!rows) return;
        filteredRows = rows
            .filter((row) => {
                if (filter.Area === "") return true;
                return row.Area === filter.Area;
            })
            .filter((row) => {
                if (filter.Position === "") return true;
                return row.Posicion === filter.Position;
            });

        if (filter.NoEmpleado) filteredRows = rows.filter((row) => filter.NoEmpleado == row["No. Empleado"]);
    }

    let isEditing = false;
    let idBeingEdited = "";

    $: if (APIFetch) initializeTable();

    function initializeTable() {
        APIFetch.then((e) => {
            rows = e.data;
            keys = Object.keys(rows[0]).filter((e) => e != "Id");
            filterTables();
        });
    }

    function edit(id) {
        isEditing = true;
        idBeingEdited = id;
    }
    function send(i) {
        console.log(filteredRows);
        axios
            .put(apiBase + "/employees/data", filteredRows[i])
            .then((result) => {
                isEditing = false;
                idBeingEdited = "";
                filteredRows[i] = result.data[0];
            })
            .catch((err) => {
                console.log(err);
                showError(err);
            });
    }
</script>

{#if !filteredRows}
    loading...
{:else}
    <table class="table1">
        <tr>
            <th colspan={keys.length + 1}>Empleados</th>
        </tr>
        <tr>
            {#each keys as key}
                <th>{key}</th>
            {/each}
            <th>Acciones</th>
        </tr>

        {#each filteredRows as employee, i}
            <tr>
                {#each keys as key}
                    {#if isEditing && idBeingEdited === employee["No. Empleado"]}
                        {#if key === "Fecha de ingreso"}
                            <td><input type="date" bind:value={filteredRows[i][key]} /></td>
                        {:else}
                            <td><input type="text" bind:value={filteredRows[i][key]} /></td>
                        {/if}
                    {:else}
                        <td>{employee[key]}</td>
                    {/if}
                {/each}

                {#if isEditing && idBeingEdited === employee["No. Empleado"]}
                    <td><button on:click={() => send(i)}>Subir</button></td>
                {:else}
                    <td>
                        <button on:click={() => edit(employee["No. Empleado"])}>Editar</button>
                        <button
                            on:click={() => {
                                show = true;
                                quitId = employee["Id"];
                            }}>Baja</button
                        >
                    </td>
                {/if}
            </tr>
        {/each}
    </table>
{/if}

<QuitForm bind:show bind:quitId />
