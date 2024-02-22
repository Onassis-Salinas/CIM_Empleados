<script>
    import jsPDF from "jspdf";
    import autoTable from "jspdf-autotable";

    export let data;
    const exportAssistance = async () => {
        const pdf = new jsPDF({
            unit: "mm",
            format: [215.9, 279.4],
        });

        data.forEach((area, index) => {
            if (index > 0) {
                pdf.addPage();
            }
            pdf.text(area.Name, 10, 10);
            pdf.autoTable({
                theme: "grid",
                head: [["Nombre", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]],
                body: generateRows(area.Rows),
            });
        });

        pdf.save("Lista de asistencia.pdf");
    };

    // const generateRows = (obj) => [["Onassis", "f", "f", "f", "f", "f"]];
    const generateRows = (obj) => {
        const rowsArray = [];

        for (const employee of obj) {
            rowsArray.push([employee.Nombre, employee.Lunes, employee.Martes, employee.Miercoles, employee.Jueves, employee.Viernes]);
        }

        return rowsArray;
    };
</script>

<button class="btn btn-sm" on:click={exportAssistance}>Exportar</button>
