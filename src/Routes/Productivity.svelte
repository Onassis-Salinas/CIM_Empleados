<script>
    import axios from "axios";
    import Table from "../Components/Forms/ProductivityTable.svelte";
    import ProductivityForm from "../Components/Forms/ProductivityForm.svelte";
    import { onMount } from "svelte";
    import { apiBase } from "../lib/utilities";

    let date = new Date().toISOString().split("T")[0];
    let APIFetch;
    let show = false;

    function getData() {
        APIFetch = axios.post(apiBase + "/employees/productivity/week", {
            Date: date,
        });
    }

    onMount(getData);
</script>

<input type="date" class="input input-sm input-bordered" id="" bind:value={date} on:change={getData} />
<button class="btn btn-sm" on:click={() => (show = true)}>Registrar</button>
<Table {APIFetch} />
<ProductivityForm bind:show />

