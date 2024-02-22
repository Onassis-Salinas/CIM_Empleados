<script>
    import { Link, Router } from "svelte-routing";
    import DarkModeToggle from "../Components/DarkModeToggle.svelte";
    import Cookies from "js-cookie";
    import { logged } from "../lib/storage";
    let user;

    logged.subscribe((value) => {
        if (value) user = JSON.parse(Cookies.get("perms").substring(2));
    });
</script>

<header class="navbar bg-neutral text-neutral-content">
    {#if user}
        <Router>
            {#if user.Perm_employees === "w" || user.Perm_employees === "r"}
                <Link to="/dashboard">Inicio</Link>
                <Link to="/employees">Empleados</Link>
            {/if}
            {#if user.Perm_assistance === "w" || user.Perm_assistance === "r"}
                <Link to="/assistance">Asistencia</Link>
            {/if}
            <!-- <Link to="/productivity">Productividad</Link> -->
            {#if user.Perm_users === "w" || user.Perm_users === "r"}
                <Link to="/users">Usuarios</Link>
            {/if}
            <!-- <Link to="/vacations">vacaciones</Link> -->
            <!-- <Link to="/DataEntry" class="ref">Materiales</Link> -->
            <!-- <Link to="/Inventory" class="ref">Inventario</Link> -->
            <!-- <Link to="/Movements" class="ref">Movimientos</Link> -->
            
        </Router>
        {/if}
        <DarkModeToggle />
    </header>

<style>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        position: fixed;
        width: 100%;
        height: var(--headerheight);
        right: 0;
        z-index: 100;
    }
</style>
