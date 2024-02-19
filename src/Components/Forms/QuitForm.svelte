<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../../lib/utilities";

    export let show;
    export let quitId;

    let quitData = {
        Id: quitId,
    };

    const quitEmployee = async () => {
        try {
            await axios.put(apiBase + "/employees/data/quitemployee", quitData);
            show = false;
        } catch (err) {
            showError(err);
        }
    };
    $: if (quitId) quitData = { Id: quitId };
</script>

<Form bind:show>
    <form class="w-full flex flex-wrap justify-between" on:submit|preventDefault={quitEmployee}>
        <b>DAR DE BAJA</b>
        <div class="container">
            <p>Recontratabilidad</p>
            <select class="select select-sm select-bordered w-full" bind:value={quitData.quitStatus} required>
                <option value=""></option>
                <option value="Recontratable">Recontratable</option>
                <option value="No Recontratable">No Recontratable</option>
            </select>
        </div>
        <div class="container">
            <p>Fecha de baja</p>
            <input class="input input-sm input-bordered w-full" type="date" bind:value={quitData.quitDate} required />
        </div>
        <div class="container">
            <p>Motivo de baja</p>
            <input class="input input-sm input-bordered w-full" bind:value={quitData.quitReason} required />
        </div>
        <div class="container">
            <p>Nota</p>
            <input class="input input-sm input-bordered w-full" bind:value={quitData.quitNote} />
        </div>
        <div class="w-full flex justify-center">
            <button class="btn btn-sm btn-error">Dar de baja</button>
        </div>
    </form>
</Form>

<style>
    .container {
        width: max(30%, 100px);
    }
    b {
        color: var(--color1);
        width: 100%;
        text-align: center;
    }
</style>
