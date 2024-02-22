<script>
    import axios from "axios";
    import Table from "../Components/Forms/AssistanceTable.svelte";
    import { onMount } from "svelte";
    import { apiBase, showError } from "../lib/utilities";
    import ExportAssistanceButton from "../Components/ExportAssistanceButton.svelte";

    let date = new Date().toISOString().substr(0, 10);
    let APIFetch;
    let data;

    function getData() {
        APIFetch = axios
            .post(apiBase + "/employees/assistance/week", {
                Date: date,
            })
            .then((res) => (data = res.data))
            .catch((err) => showError(err));
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

<div>
    <input type="date" class="input input-sm input-bordered" name="" id="" bind:value={date} on:change={getData} />
    <ExportAssistanceButton {data} />
</div>
<Table {data} />
