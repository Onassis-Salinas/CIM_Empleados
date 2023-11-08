<script>
    import axios from "axios";
    import { apiBase, showError } from "../utilities";
    import QuitForm from "./QuitForm.svelte";
    import EditEmployeeForm from "./EditEmployeeForm.svelte";

    export let APIFetch;
    export let filter;
    let show = false;
    let show1 = false;
    let quitId = 0;

    let keys;
    let rows;
    let filteredRows;
    let dataToEdit;

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

    $: if (APIFetch) initializeTable();

    function initializeTable() {
        APIFetch.then((e) => {
            rows = e.data;
            keys = Object.keys(rows[0]).filter((e) => e != "Id");
            filterTables();
        });
    }

    function edit(i) {
        dataToEdit = filteredRows[i];
        show1 = true;
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
                    <td>{employee[key] ? employee[key] : ""}</td>
                {/each}

                <td>
                    <button on:click={() => edit(i)}>Editar</button>
                    <button
                        on:click={() => {
                            show = true;
                            quitId = employee["Id"];
                        }}>Baja</button
                    >
                </td>
            </tr>
        {/each}
    </table>
{/if}

<EditEmployeeForm bind:show={show1} data={dataToEdit} />
<QuitForm bind:show bind:quitId />
