<script>
    import axios from "axios";
    import Table from "../Components/Forms/AssistanceTable.svelte";
    import { onMount } from "svelte";
    import { apiBase } from "../lib/utilities";

    let date = new Date().toISOString().substr(0, 10);
    let APIFetch;

    function getData() {
        APIFetch = axios.post(apiBase + "/employees/assistance/week", {
            Date: date,
        });
    }
    function createWeek() {
        axios
            .post(apiBase + "/employees/assistance/createweek", {
                Date: date,
            })
            .then(getData);
    }

    onMount(getData);
</script>

<input type="date" class="input input-sm input-bordered" name="" id="" bind:value={date} on:change={getData} />
<button class="btn btn-sm" on:click={createWeek}>Iniciar Semana</button>
<Table {APIFetch} />
