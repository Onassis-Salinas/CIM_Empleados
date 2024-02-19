<script>
    import EmployeeTable from "../Components/Forms/EmployeeTable.svelte";
    import DataFilter from "../Components/Forms/DataFilter.svelte";

    let filter;
</script>

<DataFilter bind:filter />

<EmployeeTable bind:filter />
