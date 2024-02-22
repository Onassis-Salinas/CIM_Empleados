<script>
    import axios from "axios";
    import { apiBase, showError } from "../../lib/utilities";
    import Table from "../Table.svelte";
    export let data;

    let keys;
    let res;
    let incidences = [];
    let areas;
    let selectedArea;

    $: if (data) initializeTable();

    function initializeTable() {
        res = data;
        keys = Object.keys(res[0].Rows[0]).filter((e) => e != "Id" && e != "Area");
    }

    function send(table, row) {
        axios
            .put(apiBase + "/employees/assistance", res[table].Rows[row])
            .then((result) => {
                res[table].Rows[row] = result.data[0];
            })
            .catch((err) => {
                axios.post(apiBase + "/employees/assistance/single", res[table].Rows[row]).then((result) => {
                    res[table].Rows[row] = result.data[0];
                    showError(err);
                });
            });
    }

    axios.get(apiBase + "/employees/various/incidences").then((res) => (incidences = res.data));
    axios.get(apiBase + "/employees/various/filteredareas").then((res) => (areas = res.data));
</script>

{#if !res}
    <span class="loading loading-spinner loading-lg" />
{:else if res.length !== 0 && res.length}
    <div class="flex flex-col gap-10">
        <select class="select select-sm select-bordered w-full max-w-xs" name="" id="" bind:value={selectedArea}>
            <option value="">Area:</option>
            {#if areas}
                {#each areas as area}
                    <option value={area.Name}>{area.Name}</option>
                {/each}
            {/if}
        </select>

        {#each res as table, j}
            {#if table.Name === selectedArea}
                <Table>
                    <thead>
                        <tr>
                            <th colspan={keys.length}>{table.Name}</th>
                        </tr>
                        <tr>
                            {#each keys as key}
                                <th>{key}</th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each table.Rows as employee, i}
                            <tr>
                                {#each keys as key}
                                    {#if key === "Nombre" || key === "Puesto"}
                                        <td>{employee[key]}</td>
                                    {:else}
                                        <td>
                                            <select class="select select-bordered select-xs w-full max-w-xs" name="" id="" bind:value={res[j].Rows[i][key]} on:blur={() => send(j, i)}>
                                                {#each incidences as incidence}
                                                    <option value={incidence.Code}>{incidence.Name}</option>
                                                {/each}
                                            </select>
                                        </td>
                                    {/if}
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </Table>
            {/if}
        {/each}
    </div>
{/if}
