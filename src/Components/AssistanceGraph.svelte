<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";

    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    let promise;
    let incidences = new Array();
    let activeEmployees = 0;

    async function makeAPIRequests() {
        promise = await axios.post(apiBase + "/employees/info/assistanceinfo", {
            Date: new Date(),
        });
        incidences = promise.data;

        incidences.forEach((e) => (activeEmployees += e.quantity));
    }

    onMount(async () => {
        await makeAPIRequests();

        const ctx = document.getElementById("chart");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: incidences.map((e) => (e.incidence === "" ? "ASISTENCIA" : e.incidence) + ` ${Math.round((e.quantity / activeEmployees) * 100)}%`),
                datasets: [
                    {
                        data: incidences.map((e) => e.quantity),
                        borderWidth: 1,
                    },
                ],
            },
        });
    });
</script>

<div class="chart-container">
    <h3>Asistencia del dia</h3>
    <canvas id="chart" />
</div>

<style>
    .chart-container {
        width: min(90%, 400px);
        aspect-ratio: 1;
        background-color: var(--fg);
        border-radius: var(--br);
        border: 1px solid var(--border);
        padding-bottom: 10px;
    }
    h3 {
        text-align: center;
        font-size: var(--font3);
    }
</style>
