<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";
    import { navigate } from "svelte-routing";

    let username;
    let password;

    const loginUser = async () => {
        try {
            let promise;
            promise = await axios.post(apiBase + "/general/users/login", {
                UserName: username,
                Password: password,
            });

            promise = await axios.get(apiBase + "/employees/info/employeetemplate");

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
</script>

<form on:submit|preventDefault={loginUser}>
    <h2>Iniciar Sesion</h2>
    <input type="text" bind:value={username} placeholder="Usuario" />
    <input type="text" name="" id="" bind:value={password} placeholder="Contrasena" />
    <button>Login</button>
</form>
