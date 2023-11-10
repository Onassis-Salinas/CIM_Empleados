<script>
    import Table from "../Table.svelte";

    export let APIFetch;
    let keys;
    let tables;
    let weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

    $: if (APIFetch) initializeTable();

    function initializeTable() {
        APIFetch.then((e) => {
            tables = e.data;
            keys = getKeys(tables[0].Rows[0]);
        });
    }

    function filterResults() {
        if (keys.length > 20) {
            keys = keys.filter((e) => !e.includes("Comment") && !e.includes("Code") && !e.includes("Goal") && !e.includes("Produced"));
        } else {
            keys = getKeys(tables[0].Rows[0]);
        }
    }

    function getKeys(array) {
        array = Object.keys(array).filter((e) => e != "Id" && e != "Area" && e != "Fecha");

        for (let i = 0; i < array.length; i++) {
            if (array[i].includes("Comment")) array.splice(i + 1, 0, "Promedio");
        }

        return array;
    }

    function getAverage(columnNo, row, table) {
        let dayNumber = (columnNo - 1) / ((keys.length - 2) / 5) - 1;

        const averages = [];
        for (let i = 0; i < 3; i++) {
            const codeValue = tables[table].Rows[row][`${dayNumber}Code${i}`];

            if (codeValue) {
                averages.push(tables[table].Rows[row][`${dayNumber}Produced${i}`] / tables[table].Rows[row][`${dayNumber}Goal${i}`]);
            }
        }

        let totalSum = 0;
        averages.forEach((e) => {
            totalSum += e;
        });

        const result = ((totalSum / averages.length) * 100).toFixed(1);

        return isNaN(result) ? 0 : result;
    }
</script>

<button on:click={filterResults}>Results</button>

{#if !tables}
    loading...
{:else if tables.length !== 0}
    {#each tables as table, k}
        <Table>
            <tr>
                <th colspan={keys.length}>{table.Name}</th>
            </tr>

            <tr>
                <th colspan="2">Info</th>
                {#each weekDays as day}
                    <th colspan={(keys.length - 2) / 5}>{day}</th>
                {/each}
            </tr>

            <tr>
                {#each keys as key}
                    <th>{key.includes("Code") || key.includes("Goal") || key.includes("Produced") ? key.substring(1, key.length - 1) : key}</th>
                {/each}
            </tr>

            {#each table.Rows as row, j}
                <tr>
                    {#each keys as key, i}
                        {#if key === "Promedio"}
                            <td>{getAverage(i, j, k)} %</td>
                        {:else}
                            <td>{row[key] ? row[key] : ""}</td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </Table>
    {/each}
{/if}
