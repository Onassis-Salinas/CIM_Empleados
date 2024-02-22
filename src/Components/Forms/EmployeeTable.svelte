<script>
    import { differenceInYears } from "date-fns";
    import QuitForm from "./QuitForm.svelte";
    import EditEmployeeForm from "./EditEmployeeForm.svelte";
    import Table from "../Table.svelte";
    import axios from "axios";
    import { apiBase } from "../../lib/utilities";
    import Carnet from "./Carnet.svelte";

    export let filter = {};
    let show = false;
    let show1 = false;
    let show2 = false;
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

    $: if (filter.Active === 0) {
        getInactiveEmployees();
    } else {
        getActiveEmployees();
    }

    function getActiveEmployees() {
        axios.get(apiBase + "/employees/data").then((e) => {
            rows = e.data;
            keys = Object.keys(rows[0]).filter((e) => e != "Id");
            filterTables();
        });
    }
    function getInactiveEmployees() {
        axios.get(apiBase + "/employees/data/inactive").then((e) => {
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

    const viewCarnet = (i) => {
        dataToEdit = filteredRows[i];
        show2 = true;
    };

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
    <span class="loading loading-spinner loading-lg" />
{:else}
    <Table>
        <thead class="bg-primary-500 text-white">
            <tr style="z-index: 110;">
                <th class="sticky" style="position: sticky; left:0; z-index:1;"></th>
                {#each keys as key, i}
                    {#if key === "No. Empleado"}
                        <th class="sticky" style="position: sticky; left:36px; z-index:1;">{key}</th>
                    {:else if key === "vacaciones pagadas"}
                        <th class="">{key}</th>
                    {:else}
                        <th>{key}</th>
                    {/if}
                {/each}
                {#if filter.Active === 1}
                    <th>Antiguedad</th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each filteredRows as employee, i}
                <tr>
                    <th style="z-index: 9; padding-top:0;padding-bottom:0;">
                        <div class="dropdown dropdown-right w-5">
                            {#if filter.Active === 1}
                                <img src="/dots.svg" alt="" tabindex="0" role="button" style="z-index: 999; " />
                                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 374.89 z-3">
                                    <li><button class="btn btn-xs btn-outline btn-info" on:click={() => viewCarnet(i)}>Ver</button></li>
                                    <li><button class="btn btn-xs btn-outline btn-info text-white" on:click={() => edit(i)}>editar</button></li>
                                    <li><button class="btn btn-xs btn-outline btn-error" on:click={() => handleQuit(i)}>Baja</button></li>
                                </ul>
                            {/if}
                        </div>
                    </th>
                    {#each keys as key}
                        {#if key === "No. Empleado"}
                            <th style="position: sticky!important; left:36px;"> {employee[key] ? employee[key] : ""}</th>
                        {:else if key === "Acciones"}
                            <th>{employee[key] ? employee[key] : ""}</th>
                        {:else if key === "vacaciones pagadas"}
                            <td>{getVacationsPerYear(differenceInYears(new Date(), new Date(employee["Fecha de ingreso"]))) - parseInt(employee["vacaciones pagadas"]) - parseInt(employee["vacaciones sin pagar"]) || ""}</td>
                        {:else}
                            <td>{employee[key] ? employee[key] : ""}</td>
                        {/if}
                    {/each}

                    {#if filter.Active === 1}
                        <td>{differenceInYears(new Date(), new Date(employee["Fecha de ingreso"]))}</td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </Table>
{/if}

<EditEmployeeForm bind:show={show1} data={dataToEdit} />
<QuitForm bind:show bind:quitId />
<Carnet bind:show={show2} data={dataToEdit} />

<style>
    td,
    tbody th {
        white-space: nowrap;
    }
</style>
