<script>
    import axios from "axios";
    import { apiBase } from "../lib/utilities";

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
    <input class="input input-sm input-bordered" type="text" name="" id="" placeholder="Numero de empleado" bind:value={vacationReq.EmployeeNo} />
    <input class="input input-sm input-bordered" type="number" name="" id="" placeholder="Cantidad de dias" bind:value={vacationReq.Days} />
    <label for="">Inicio</label>
    <input class="input input-sm input-bordered" type="date" name="" id="" bind:value={vacationReq.StartDate} />
    <label for="">Final</label>
    <input class="input input-sm input-bordered" type="date" name="" id="" bind:value={vacationReq.EndDate} />

    <button class="btn btn-sm" on:click={uploadReq}>Hacer requisicion </button>
</div>
