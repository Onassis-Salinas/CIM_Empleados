<script>
    import axios from "axios";
    import { apiBase } from "../lib/utilities";


    const exportInventory = async () => {
    try {
        const response = await axios.get(apiBase + "/inventories/exports", {
            responseType: 'blob', 
        });

        // Crea un enlace para la descarga
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mi_archivo.xlsx';
        document.body.appendChild(a);
        a.click();

        // Limpia el enlace después de la descarga
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar el archivo', error);
    }
};
</script>

<button class="btn btn-sm" on:click={exportInventory}>Exportar</button>
