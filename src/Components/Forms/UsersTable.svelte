<script>
    import Table from "../Table.svelte";
    import axios from "axios";
    import { apiBase } from "../utilities";
    import RegisterUser from "./RegisterUser.svelte";

    let users;
    let show;
    let selected;

    const fetchData = async () => {
        try {
            const result = await axios.get(apiBase + "/general/users");
            users = result.data;
        } catch (err) {
            users = [{ UserName: "No hay datos" }];
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
        <tr>
            <th>Usuario</th>
            <th>Permisos: asistencia</th>
            <th>Permisos: empleados</th>
            <th>Permisos: productividad</th>
            <th>Permisos: usuarios</th>
        </tr>
        {#each users as user, i}
            <tr>
                <td>{user.UserName}</td>
                <td>{user.Perm_assistance}</td>
                <td>{user.Perm_employees}</td>
                <td>{user.Perm_productivity}</td>
                <td>{user.Perm_users}</td>
                <button on:click|preventDefault={() => editUser(i)}></button>
            </tr>
        {/each}
    </Table>
    <RegisterUser bind:show bind:userToEdit={users[selected]}></RegisterUser>
{/if}

<style>
    .button-container {
        display: flex;
        gap: 5px;
    }
    button {
        width: 20px;
        border-radius: 50%;
        aspect-ratio: 1;
    }
    .edit {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E");
        background-color: var(--color2);
        background-size: 80%;
        background-position: center;
    }

    .delete {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z' fill='rgba(255,255,255,1)'%3E%3C/path%3E%3C/svg%3E");
        background-color: var(--color1);
        background-size: 80%;
        background-position: center;
    }
</style>
