<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";
    import SingleData from "../Components/SingleData.svelte";

    let misses = 0;
    let assistance = 0;
    let permissions = 0;
    let fires = 0;
    let hires = 0;
    let activeEmployees = 0;

    axios
        .post(apiBase + "/employees/info/dailyincidence", {
            Date: new Date(),
            Code: "F",
        })
        .then((res) => {
            misses = res.data[0].count;
        });
    axios
        .post(apiBase + "/employees/info/dailyincidence", {
            Date: new Date(),
            Code: ".",
        })
        .then((res) => {
            assistance = res.data[0].count;
        });
    axios
        .post(apiBase + "/employees/info/dailyincidence", {
            Date: new Date(),
            Code: "P",
        })
        .then((res) => {
            permissions = res.data[0].count;
        });
    axios
        .post(apiBase + "/employees/info/weeklyfires", {
            Date: new Date(),
        })
        .then((res) => {
            fires = res.data[0].count;
        });
    axios
        .post(apiBase + "/employees/info/weeklyhires", {
            Date: new Date(),
        })
        .then((res) => {
            hires = res.data[0].count;
        });
    axios.get(apiBase + "/employees/info/activeemployees").then((res) => {
        activeEmployees = res.data[0].count;
    });
</script>

<div>
    <SingleData text="Faltas" amount={misses} />
    <SingleData text="Asistencia" amount={assistance} />
    <SingleData text="Permisos" amount={permissions} />
    <SingleData text="Contrataciones" amount={hires} />
    <SingleData text="Bajas" amount={fires} />
    <SingleData text="Empleados" amount={activeEmployees} />
</div>

<style>
    div{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-grow: 1;
    }
</style>