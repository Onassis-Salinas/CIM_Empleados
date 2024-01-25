<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";
    import SingleData from "../Components/SingleData.svelte";

    let promise;
    let fires = 0;
    let hires = 0;
    let activeEmployees = 0;
    let incidences = new Array();
    let employeeRotation;
    let employeeTemplate;

    async function makeAPIRequests() {
        promise = await axios.post(apiBase + "/employees/info/weeklyfires", {
            Date: new Date(),
        });
        fires = promise.data[0].count;

        promise = await axios.post(apiBase + "/employees/info/weeklyhires", {
            Date: new Date(),
        });
        hires = promise.data[0].count;

        promise = await axios.post(apiBase + "/employees/info/assistanceinfo", {
            Date: new Date(),
        });
        incidences = promise.data;

        promise = await axios.post(apiBase + "/employees/info/employeerotation", {
            Date: new Date(),
        });
        employeeRotation = promise.data.result.toFixed(2);

        promise = await axios.get(apiBase + "/employees/info/activeemployees");
        activeEmployees = promise.data[0].count;

        promise = await axios.get(apiBase + "/employees/info/employeetemplate");
        employeeTemplate = promise.data[0].value;
        employeeTemplate = ((activeEmployees / employeeTemplate) * 100).toFixed(2);
    }
    makeAPIRequests();
</script>

<div>
    <SingleData text="Contrataciones semanales" amount={hires} />
    <SingleData text="Bajas semanales" amount={fires} />
    <SingleData text="Empleados activos" amount={activeEmployees} />
    <SingleData text="Rotacion ultimas 4 semanas" amount={`${employeeRotation}%`} />
    <SingleData text="Cumplimiento de plantilla" amount={`${employeeTemplate}%`} />
</div>

<style>
    div {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-grow: 1;
        gap: 10px;
        margin-bottom: 10px;
    }
</style>
