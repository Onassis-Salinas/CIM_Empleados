<script>
    import { Link, Router } from "svelte-routing";
</script>

<header>
    <Router>
        <Link to="/">Inicio</Link>
        <Link to="/data">Empleados</Link>
        <Link to="/assistance">Asistencia</Link>
        <Link to="/productivity">Productividad</Link>
        <Link to="/users">Usuarios</Link>
        <Link to="/vacations">vacaciones</Link>
    </Router>
</header>
