<script>
    export let headers = ["Sin datos"];
    export let values = [
        {
            key: "No se encontraron datos",
        },
    ];
    export let material = "";
    import axios from "axios";
    import ErrorMessage from "./ErrorMessage.svelte";
    import AmountInput from "./AmountInput.svelte";
    import { apiBase } from "../lib/utilities";
    import Table from "./Table.svelte";

    let response;
    let ischecked = [];
    let keys;

    $: {
        if (values[0] != null) {
            keys = Object.keys(values[0]);
            if (values[0].Due && !/^\d{2}\/\d{2}\/\d{4}$/.test(values[0].Due)) {
                values.forEach((value) => {
                    value.Due = new Date(value.Due).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });
                });
            }
        }
    }

    $: if (values && headers) marckChecks();
    const marckChecks = () => {
        console.log(values);
        console.log(headers);
        ischecked = values.map((item) => {
            return Boolean(item.Active);
        });
    };

    const handleInput = async (index) => {
        let value = ischecked[index] ? 0 : 1;
        if (values[index].Code) {
            response = await axios.put(apiBase + "/inventories/movements/checked", {
                Active: value,
                Job: values[index].Job,
                Code: values[index].Code,
                Amount: values[index].RealAmount,
            });
        } else {
            response = await axios.put(apiBase + "/inventories/movements/checked", {
                Active: value,
                Job: values[index].Job,
                Code: material,
                Amount: values[index].RealAmount,
            });
        }
        values[index].Active = value;
        if (response.data.error)
            return new ErrorMessage({
                target: document.body,
                props: {
                    message: response.data.error,
                },
            });
    };
</script>

<Table>
    <thead class="bg-primary">
        <tr>
            {#each headers as header}
                <th class=" bg-green-500">{header}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each values as row, index}
            <tr>
                {#each keys as keyw}
                    {#if keyw === "Active"}
                        <td><input type="checkbox" on:click={() => handleInput(index)} bind:checked={ischecked[index]} /></td>
                    {:else if keyw === "Amount"}
                        {#if row[keyw] > 0}
                            <td class="green">{row[keyw]}</td>
                        {:else}
                            <td class="red">{row[keyw]}</td>
                        {/if}
                    {:else if keyw === "RealAmount"}
                        {#if row["Code"]}
                            <AmountInput bind:value={values[index][keyw]} Job={row["Job"]} Code={row["Code"]} Active={ischecked[index]} />
                        {:else}
                            <AmountInput bind:value={values[index][keyw]} Job={row["Job"]} Code={material} Active={ischecked[index]} />
                        {/if}
                    {:else if keyw === "Balance"}
                        <td class="bold">{row[keyw]}</td>
                    {:else}
                        <td>{row[keyw]}</td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</Table>
