<script>
    import { differenceInYears, parse } from "date-fns";
    import QuitForm from "./QuitForm.svelte";
    import EditEmployeeForm from "./EditEmployeeForm.svelte";
    import Table from "../Table.svelte";

    export let APIFetch;
    export let filter = { NoEmpleado: "", Area: "", Position: "" };
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

    function handleQuit(i) {
        show = true;
        quitId = filteredRows[i]["Id"];
    }

    function getVacationsPerYear(years) {
        let result = 0;

        for (let i = 1; i < years + 1; i++) {
            if (i === 1) {
                result += 12;
            } else if (i === 2) {
                result += 14;
            } else if (i === 3) {
                result += 16;
            } else if (i === 4) {
                result += 18;
            } else if (i === 5) {
                result += 20;
            } else if (i >= 6 && i <= 10) {
                result += 22;
            } else if (i >= 11 && i <= 15) {
                result += 24;
            } else if (i >= 16 && i <= 20) {
                result += 26;
            } else if (i >= 21 && i <= 25) {
                result += 28;
            }
        }

        return result;
    }
</script>

{#if !filteredRows}
    loading...
{:else}
    <Table>
        <tr>
            <th colspan={keys.length + 2}>Empleados</th>
        </tr>
        <tr>
            {#each keys as key}
                <th>{key === "vacaciones pagadas" ? "vacaciones" : key}</th>
            {/each}
            <th>Antiguedad</th>
            <th>Acciones</th>
        </tr>

        {#each filteredRows as employee, i}
            <tr>
                {#each keys as key}
                    {#if key === "vacaciones pagadas"}
                        <td>{getVacationsPerYear(differenceInYears(new Date(), new Date(employee["Fecha de ingreso"]))) - parseInt(employee["vacaciones pagadas"]) - parseInt(employee["vacaciones sin pagar"]) || ""}</td>
                    {:else}
                        <td>{employee[key] ? employee[key] : ""}</td>
                    {/if}
                {/each}

                <td>{differenceInYears(new Date(), new Date(employee["Fecha de ingreso"]))}</td>

                <td>
                    <div class="button-container">
                        <button class="edit" on:click={() => edit(i)} />
                        <button class="delete" on:click={() => handleQuit(i)} />
                    </div>
                </td>
            </tr>
        {/each}
    </Table>
{/if}

<EditEmployeeForm bind:show={show1} data={dataToEdit} />
<QuitForm bind:show bind:quitId />

<style>
    .button-container {
        display: flex;
        gap: 5px;
    }
    button {
        width: 20px;
        border-radius: 50%;
        aspect-ratio: 1;
    }
    .edit {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E");
        background-color: var(--color2);
        background-size: 80%;
        background-position: center;
    }

    .delete {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E");
        background-color: var(--color1);
        background-size: 80%;
        background-position: center;
    }
</style>
