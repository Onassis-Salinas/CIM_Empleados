<script>
    import { Link, Router } from "svelte-routing";
</script>

<header>
    <Router>
        <Link to="/">Inicio</Link>
        <Link to="/data">Empleados</Link>
        <Link to="/assistance">Asistencia</Link>
        <Link to="/productivity">Productividad</Link>
    </Router>
</header>

