<script>
    import axios from "axios";
    import { apiBase, showError } from "../utilities";
    import Table from "../Table.svelte";
    export let APIFetch;

    let keys;
    let res;
    let tables = [];
    let incidences = [];

    $: if (APIFetch) initializeTable();

    function initializeTable() {
        APIFetch.then((e) => {
            console.log(e.data);
            res = e.data;
            keys = Object.keys(res[0].Rows[0]).filter((e) => e != "Id" && e != "Area");
            console.log(keys);
        });
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

    $: console.log(incidences);
</script>

{#if !res}
    loading...
{:else if res.length !== 0 && res.length}
    {#each res as table, j}
        <Table>
            <tr>
                <th colspan={keys.length}>{table.Name}</th>
            </tr>
            <tr>
                {#each keys as key}
                    <th>{key}</th>
                {/each}
            </tr>
            {#each table.Rows as employee, i}
                <tr>
                    {#each keys as key}
                        {#if key === "Nombre" || key === "Puesto"}
                            <td>{employee[key]}</td>
                        {:else}
                            <td>
                                <select name="" id="" bind:value={res[j].Rows[i][key]} on:blur={() => send(j, i)}>
                                    {#each incidences as incidence}
                                        <option value={incidence.Code}>{incidence.Name}</option>
                                    {/each}
                                </select>
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </Table>
    {/each}
{/if}

<style>
    select {
        font-size: var(--font1);
        background: none;
        border: none;
        margin: 0;
        height: 100%;
        width: 100%;
        padding: 8px 0;
    }
</style>
