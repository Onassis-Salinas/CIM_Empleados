<script>
    import axios from "axios";
    import Form from "../Form.svelte";
    import { apiBase, showError } from "../utilities";

    export let show;
    export let quitId;

    const quitEmployee = () => {
        axios
            .put(apiBase + "/employees/data/quitemployee", {
                Date: new Date(),
                EmployeeId: quitId,
            })
            .catch((err) => {
                showError(err);
            });
        show = false;
    };
</script>

<Form bind:show>
    <b>Seguro que quieres dar de baja a este empleado?</b>
    <button on:click|preventDefault={quitEmployee}>Dar de baja</button>
</Form>

<style>
    b {
        color: var(--color1);
        width: 100%;
        text-align: center;
    }
</style>
