<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../../lib/utilities";
    import AreasPermissionMenu from "./AreasPermissionMenu.svelte";

    export let show;
    let areaPermission;
    export let userToEdit = {
        UserName: "",
        Password: "",
        Perm_assistance: "",
        Perm_users: "",
        Perm_employees: "",
        Perm_productivity: "",
        Perm_assistance_areas: "",
    };

    let user = {
        UserName: "",
        Password: "",
        Perm_assistance: "",
        Perm_users: "",
        Perm_employees: "",
        Perm_productivity: "",
        Perm_assistance_areas: "",
    };

    $: if (userToEdit) setUser();
    const setUser = () => {
        user = { ...userToEdit };
    };

    const registerUser = async () => {
        try {
            const result = await axios.post(apiBase + "/general/users/register", user);
            show = false;
        } catch (err) {
            showError(err);
        }
    };

    const editUser = async () => {
        try {
            console.log(user);
            const result = await axios.post(apiBase + "/general/users/edit", { ...user, LastUserName: userToEdit.UserName });
            console.log({ ...user, LastUserName: userToEdit.UserName });
            show = false;
        } catch (err) {
            showError(err);
        }
    };
</script>

<Form bind:show>
    <div class="container">
        <p>Nombre de usuario:</p>
        <input class="input input-sm input-bordered w-full" type="text" bind:value={user.UserName} />
    </div>

    <div class="container">
        <p>Contraseña:</p>
        <input class="input input-sm input-bordered w-full" type="text" bind:value={user.Password} />
    </div>

    <div class="container">
        <p>Permiso: asistencia</p>
        <select class="select select-sm select-bordered w-full" name="" id="" bind:value={user.Perm_assistance}>
            <option value=""></option>
            <option value="r">Leer</option>
            <option value="w">Modificar</option>
        </select>
    </div>

    <div class="container">
        <p>Permiso: empleados</p>
        <select class="select select-sm select-bordered w-full" name="" id="" bind:value={user.Perm_employees}>
            <option value=""></option>
            <option value="r">Leer</option>
            <option value="w">Modificar</option>
        </select>
    </div>

    <div class="container">
        <p>Permiso: productividad</p>
        <select class="select select-sm select-bordered w-full" name="" id="" bind:value={user.Perm_productivity}>
            <option value=""></option>
            <option value="r">Leer</option>
            <option value="w">Modificar</option>
        </select>
    </div>

    <div class="container">
        <p>Permiso: usuarios</p>
        <select class="select select-sm select-bordered w-full" name="" id="" bind:value={user.Perm_users}>
            <option value=""></option>
            <option value="r">Leer</option>
            <option value="w">Modificar</option>
        </select>
    </div>

    <div class="container">
        <AreasPermissionMenu bind:areaPermission={user.Perm_assistance_areas} />
    </div>

    {#if userToEdit.UserName}
        <button class="btn btn-sm" on:click|preventDefault={editUser}>Guardar</button>
    {:else}
        <button class="btn btn-sm" on:click|preventDefault={registerUser}>Registar</button>
    {/if}
</Form>

<style>
    .container {
        width: max(30%, 100px);
        height: fit-content;
    }
</style>
