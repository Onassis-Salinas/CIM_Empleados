<script>
    import axios from "axios";
    import { apiBase } from "../lib/utilities";
    import SingleData from "../Components/SingleData.svelte";

    let promise;
    let fires = 0;
    let hires = 0;
    let activeEmployees = 0;
    let incidences = new Array();
    let employeeRotation;
    let employeeTemplate;

    async function makeAPIRequests() {
        try {
            const currentDate = new Date();
            const requests = [
                axios.post(apiBase + "/employees/info/weeklyfires", { Date: currentDate }),
                axios.post(apiBase + "/employees/info/weeklyhires", { Date: currentDate }),
                axios.post(apiBase + "/employees/info/assistanceinfo", { Date: currentDate }),
                axios.get(apiBase + "/employees/info/activeemployees"),
                axios.get(apiBase + "/employees/info/employeetemplate"),
                axios.post(apiBase + "/employees/info/employeerotation", { Date: currentDate }),
            ];

            const responses = await Promise.all(requests);

            const [firesResponse, hiresResponse, incidencesResponse, activeEmployeesResponse, employeeTemplateResponse, employeeRotationResponse] = responses;

            fires = firesResponse.data[0].count;
            hires = hiresResponse.data[0].count;
            incidences = incidencesResponse.data;
            activeEmployees = activeEmployeesResponse.data[0].count;
            employeeTemplate = employeeTemplateResponse.data[0].value;
            employeeTemplate = ((activeEmployees / employeeTemplate) * 100).toFixed(2);
            employeeRotation = employeeRotationResponse.data.result.toFixed(2);
        } catch (err) {
            console.log(err);
        }
    }
    makeAPIRequests();
</script>

<div class="stats shadow">
    <SingleData text="Contrataciones semanales" amount={hires} />
    <SingleData text="Bajas semanales" amount={fires} />
    <SingleData text="Empleados activos" amount={activeEmployees} />
    <SingleData text="Rotacion ultimas 4 semanas" amount={`${employeeRotation}%`} />
    <SingleData text="Cumplimiento de plantilla" amount={`${employeeTemplate}%`} mainClass={employeeTemplate < 100 ? "text-error" : ""} />
</div>
