<script>
    import axios from "axios";
    import { apiBase } from "../Components/utilities";

    let vacationReq = {
        EmployeeNo: null,
        Days: null,
        StartDate: new Date(),
        EndDate: new Date(),
    };

    const uploadReq = async () => {
        try {
            await axios.post(apiBase + "/employees/data/vacation", vacationReq);
            alert("completed");
        } catch (err) {
            alert("error");
        }
    };
</script>

<div>
    <input type="text" name="" id="" placeholder="Numero de empleado" bind:value={vacationReq.EmployeeNo} />
    <input type="number" name="" id="" placeholder="Cantidad de dias" bind:value={vacationReq.Days} />
    <label for="">Inicio</label>
    <input type="date" name="" id="" bind:value={vacationReq.StartDate} />
    <label for="">Final</label>
    <input type="date" name="" id="" bind:value={vacationReq.EndDate} />

    <button on:click={uploadReq}>Hacer requisicion </button>
</div>
