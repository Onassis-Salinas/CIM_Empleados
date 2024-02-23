<script>
    import axios from "axios";
    import Table from "../Components/Forms/AssistanceTable.svelte";
    import { onMount } from "svelte";
    import { apiBase, showError } from "../lib/utilities";
    import ExportAssistanceButton from "../Components/ExportAssistanceButton.svelte";
    import { logged } from "../lib/storage";
    import Cookies from "js-cookie";

    let date = new Date().toISOString().substr(0, 10);
    let APIFetch;
    let data;
    let user;

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

    logged.subscribe((value) => {
        if (value) user = JSON.parse(Cookies.get("perms").substring(2));
    });
</script>

<div>
    <input type="date" class="input input-sm input-bordered" name="" id="" bind:value={date} on:change={getData} />

    {#if user.Perm_assistance_areas === "all"}
        <button on:click={createWeek} class="btn btn-sm">Iniciar Semana</button>
        <ExportAssistanceButton {data} {date} />
    {/if}
</div>
<Table {data} />
