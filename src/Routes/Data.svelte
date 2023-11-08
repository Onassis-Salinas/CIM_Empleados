<script>
    import axios from "axios";
    import Table from "../Components/Forms/EmployeeTable.svelte";
    import EmployeeForm from "../Components/Forms/EmployeeForm.svelte";
    import DataFilter from "../Components/Forms/DataFilter.svelte";
    import { apiBase } from "../Components/utilities";
    import QuitForm from "../Components/Forms/QuitForm.svelte";
    import EditEmployeeForm from "../Components/Forms/EditEmployeeForm.svelte";

    let APIFetch = axios.get(apiBase + "/employees/data");
    let show = false;
    let filter;
</script>

<DataFilter bind:filter />
<button on:click={() => (show = true)}>Registrar</button>
<Table {APIFetch} bind:filter />
<EditEmployeeForm bind:show editing={false}/>
