<script>
    import axios from "axios";
    import { apiBase, showError } from "../lib/utilities";
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

            navigate("/");
        } catch (err) {
            console.log(err);
            showError(err);
        }
    };
</script>

<div class="w-full p-6 m-auto lg:max-w-lg">
    <h1 class="text-3xl font-semibold text-center text-gray-700">Iniciar Sesion</h1>
    <form class="space-y-4" on:submit|preventDefault={loginUser}>
        <div>
            <label class="label">
                <span class="text-base label-text">Usuario:</span>
            </label>
            <input type="text" class=" input-sm w-full input input-bordered" bind:value={username} />
        </div>
        <div>
            <label class="label">
                <span class="text-base label-text">Contraseña:</span>
            </label>
            <input type="password" class="w-full input input-bordered input-sm" bind:value={password} />
        </div>
        <div>
            <button class="btn btn-sm btn-block">Iniciar sesion</button>
        </div>
    </form>
</div>
