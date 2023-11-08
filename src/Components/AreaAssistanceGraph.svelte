<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";

    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    let promise;
    let incidences = new Array();
    let activeEmployees = 0;
    let areas = [];
    let area = "Calidad general";
    let myChart;

    async function makeAPIRequests() {
        promise = await axios.post(apiBase + "/employees/info/areaassistanceinfo", {
            Date: new Date(),
            Area: area,
        });
        incidences = promise.data;

        promise = await axios.get(apiBase + "/employees/various/areas");
        areas = promise.data;
    }

    const renderGraph = async () => {
        if (myChart) myChart.destroy();

        await makeAPIRequests();

        activeEmployees = 0;
        incidences.forEach((e) => (activeEmployees += e.quantity));

        const ctx = document.getElementById("chart1");

        myChart = new Chart(ctx, {
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
    };

    onMount(renderGraph);
</script>

<div class="container">
    <h3>Asistencia por area</h3>

    <select name="" id="" bind:value={area} on:change={renderGraph}>
        {#each areas as areas}
            <option value={areas.Name}>{areas.Name}</option>
        {/each}
    </select>

    <div class="chart-container">
        <canvas id="chart1" />
    </div>
</div>

<style>
    .container {
        background-color: var(--fg);
        border-radius: var(--br);
        border: 1px solid var(--border);
        width: min(90%, 400px);
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        align-items: center;
    }
    .chart-container {
        width: 100%;
        aspect-ratio: 1;
    }
    h3 {
        text-align: center;
        font-size: var(--font3);
    }
    select {
        width: 90%;
    }
</style>
