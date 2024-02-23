<script>
    import jsPDF from "jspdf";
    import autoTable from "jspdf-autotable";
    import { formatDate } from "../lib/utilities";

    export let data;
    export let date;

    const exportAssistance = async () => {
        const pdf = new jsPDF({
            unit: "mm",
            format: [215.9, 279.4],
        });

        data.forEach((area, index) => {
            if (index > 0) {
                pdf.addPage();
            }

            pdf.autoTable({
                theme: "plain",
                columnStyles: { 0: { fontStyle: "bold", fontSize: 16 }, 1: { fontStyle: "bold", fontSize: 12, halign: "right" } },
                body: [[area.Name, `Del ${formatDate(date)} al ${formatDate(sum5days(date))}`]],
            });

            pdf.autoTable({
                styles: {
                    lineColor: [45, 45, 45],
                    cellPadding: 2,
                },
                headStyles: { textColor: [255, 255, 255], fillColor: [45, 45, 45], lineColor: [45, 45, 45] },
                theme: "grid",
                head: [["No. Empleado", "Nombre", "Puesto", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]],
                body: generateRows(area),
            });
        });

        pdf.save("Lista de asistencia.pdf");
    };

    const generateRows = (area) => {
        const obj = area.Rows;
        const objNormalized = obj.map((employee) => {
            return { ...employee, Puesto: employee.Puesto.includes("Costurero") ? "Costurero" : employee.Puesto };
        });
        const rowsArray = [];

        rowsArray.push([{ content: objNormalized[0].Puesto, colSpan: 8, styles: { fillColor: [81, 120, 113], textColor: [255, 255, 255], fontStyle: "bold" } }]);

        for (const [i, employee] of obj.entries()) {
            rowsArray.push([employee["No. Empleado"], employee.Nombre, employee.Puesto, employee.Lunes, employee.Martes, employee.Miercoles, employee.Jueves, employee.Viernes]);

            if (i + 1 === objNormalized.length) continue;
            if (area.Name !== "Staff" && area.Name !== "Varios" && objNormalized[i].Puesto !== objNormalized[i + 1].Puesto) {
                rowsArray.push([{ content: objNormalized[i + 1].Puesto, colSpan: 8, styles: { fillColor: [81, 120, 113], textColor: [255, 255, 255], fontStyle: "bold" } }]);
            }
        }
        return rowsArray;
    };

    const sum5days = (dateStr) => {
        const initialDate = new Date(dateStr);
        initialDate.setDate(initialDate.getDate() + 5);
        return initialDate.toISOString().split("T")[0];
    };

    sum5days(date);
</script>

<button class="btn btn-sm" on:click={exportAssistance}>Exportar</button>
