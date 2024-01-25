<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../utilities";

    export let show;
    export let userToEdit = {
        UserName: "",
        Password: "",
        Perm_assistance: "",
        Perm_users: "",
        Perm_employees: "",
        Perm_productivity: "",
    };

    let user = {
        UserName: "",
        Password: "",
        Perm_assistance: "",
        Perm_users: "",
        Perm_employees: "",
        Perm_productivity: "",
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
            const result = await axios.post(apiBase + "/general/users/edit", { ...user, LastUserName: userToEdit.UserName });
            console.log({ ...user, LastUserName: userToEdit.UserName });
            show = false;
        } catch (err) {
            showError(err);
        }
    };
</script>

<Form bind:show>
    <p>Nombre de usuario:</p>
    <input type="text" bind:value={user.UserName} />

    <p>Contraseña:</p>
    <input type="text" bind:value={user.Password} />

    <p>Permiso: asistencia</p>
    <select name="" id="" bind:value={user.Perm_assistance}>
        <option value=""></option>
        <option value="r">Leer</option>
        <option value="w">Modificar</option>
    </select>

    <p>Permiso: empleados</p>
    <select name="" id="" bind:value={user.Perm_employees}>
        <option value=""></option>
        <option value="r">Leer</option>
        <option value="w">Modificar</option>
    </select>

    <p>Permiso: productividad</p>
    <select name="" id="" bind:value={user.Perm_productivity}>
        <option value=""></option>
        <option value="r">Leer</option>
        <option value="w">Modificar</option>
    </select>

    <p>Permiso: usuarios</p>
    <select name="" id="" bind:value={user.Perm_users}>
        <option value=""></option>
        <option value="r">Leer</option>
        <option value="w">Modificar</option>
    </select>

    {#if userToEdit.UserName}
        <button on:click|preventDefault={editUser}>Guardar</button>
    {:else}
        <button on:click|preventDefault={registerUser}>Registar</button>
    {/if}
</Form>
