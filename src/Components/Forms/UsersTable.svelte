<script>
    import axios from "axios";
    import { apiBase } from "../../lib/utilities";
    import RegisterUser from "./RegisterUser.svelte";
    import Table from "../Table.svelte";

    let users;
    let show;
    let selected;

    const fetchData = async () => {
        try {
            const result = await axios.get(apiBase + "/general/users");
            users = result.data;
        } catch (err) {
            users = [
                {
                    UserName: "No hay datos",
                },
            ];
        }
    };

    const editUser = (i) => {
        selected = i;
        show = true;
    };

    fetchData();
</script>

{#if users}
    <Table>
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Perm: asistencia</th>
                <th>Perm: empleados</th>
                <th>Perm: productividad</th>
                <th>Perm: usuarios</th>
                <th>Perm: areas</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user, i}
                <tr>
                    <td>{user.UserName}</td>
                    <td>{user.Perm_assistance}</td>
                    <td>{user.Perm_employees}</td>
                    <td>{user.Perm_productivity}</td>
                    <td>{user.Perm_users}</td>
                    <td>{user.Perm_assistance_areas}</td>
                    <button class="btn btn-xs btn-info btn-outline" on:click|preventDefault={() => editUser(i)}>Editar</button>
                </tr>
            {/each}
        </tbody>
    </Table>
    <RegisterUser bind:show bind:userToEdit={users[selected]} />
{/if}
