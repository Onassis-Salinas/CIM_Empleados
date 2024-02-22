<script>
    import { logged } from "../lib/storage";

    logged.subscribe((value) => {
        if (!value) return (window.location.href = "/login");
    });
</script>

<p>Bienvenido</p>
