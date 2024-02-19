<script>
    import RegisterUser from "../Components/Forms/RegisterUser.svelte";
    import UsersTable from "../Components/Forms/UsersTable.svelte";
    let show = false;
</script>

<button class="btn btn-sm" on:click={() => (show = true)}>Registar usuario</button>
<h2>Usuarios</h2>
<UsersTable></UsersTable>
<RegisterUser bind:show></RegisterUser>
