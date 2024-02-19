<script>
    import { Link, Router } from "svelte-routing";
    import DarkModeToggle from "../Components/DarkModeToggle.svelte";
</script>

<header class="navbar bg-neutral text-neutral-content">
    <Router>
        <Link to="/">Inicio</Link>
        <Link to="/employees">Empleados</Link>
        <Link to="/assistance">Asistencia</Link>
        <Link to="/productivity">Productividad</Link>
        <Link to="/users">Usuarios</Link>
        <Link to="/vacations">vacaciones</Link>
        <Link to="/DataEntry" class="ref">Materiales</Link>
        <Link to="/Inventory" class="ref">Inventario</Link>
        <Link to="/Movements" class="ref">Movimientos</Link>

        <DarkModeToggle/>
    </Router>
</header>

<style >
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