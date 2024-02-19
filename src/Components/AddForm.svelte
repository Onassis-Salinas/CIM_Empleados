<script>
    import axios from "axios";
    import Label from "./Label.svelte";
    import ErrorMessage from "./ErrorMessage.svelte";
    import Toggle from "./Toggle.svelte";
    import DateInput from "./DateInput.svelte";
    import MaterialInput from "./MaterialInput.svelte";
    import FileInput from "./FileInput.svelte";
    import XButton from "./XButton.svelte";
    import Form from "./Form.svelte";
    import { apiBase } from "../lib/utilities";

    let jobData = { textboxes: [{ Material: "", Amount: 0, jobAmount: 0, Measurement: "." }], job: "", date: "", export: "" };
    let isChanging;
    let entry = true;
    let show;
    let inputData = { Material: "", Amount: "", Date: "", Measurement: "" };
    $: outputData = { Job: jobData.job, Export: jobData.export, Date: jobData.date };

    const addTextbox = () => {
        jobData.textboxes = [...jobData.textboxes, { Material: "", Amount: 0, jobAmount: 0, Measurement: "." }];
    };
    const deleteTextbox = (index) => {
        if (jobData.textboxes.length > 1) {
            jobData.textboxes.splice(index, 1);
            jobData.textboxes = jobData.textboxes;
        }
    };

    const submitOutput = async () => {
        if (!outputData.Export) return new ErrorMessage({ target: document.body, props: { message: "Exportacion vacia" } });
        jobData.textboxes = jobData.textboxes.map((item) => ({ Material: item.Material, Amount: -item.Amount, jobAmount: item.jobAmount, Measurement: item.Measurement, jobMeasurement: item.jobMeasurement }));
        let response = await axios.post(apiBase + "/inventories/movements/output", { data: outputData, textboxes: jobData.textboxes });
        if (response.data.error) {
            console.log(jobData.textboxes.map((item) => ({ Material: item.Material, Amount: -item.Amount, jobAmount: item.jobAmount, Measurement: item.Measurement, jobMeasurement: item.jobMeasurement })));
            jobData.textboxes = jobData.textboxes.map((item) => ({ Material: item.Material, Amount: -item.Amount, jobAmount: item.jobAmount, Measurement: item.Measurement, jobMeasurement: item.jobMeasurement }));
            return new ErrorMessage({ target: document.body, props: { message: response.data.error } });
        }
        jobData.textboxes = [{ Material: "", Amount: 0, jobAmount: 0, Measurement: ".", jobMeasurement: "." }];
    };

    const submitInput = async () => {
        if (!inputData.Date) return new ErrorMessage({ target: document.body, props: { message: "Introduce una fecha" } });
        if (!inputData.Amount) return new ErrorMessage({ target: document.body, props: { message: "Introduce una cantidad" } });

        let response = await axios.post(apiBase + "/movements/input", { ...inputData, Active: 1 });
        if (response.data.error) return new ErrorMessage({ target: document.body, props: { message: response.data.error } });
        inputData = { Material: "", Amount: "", Date: "", Measurement: "" };
    };
</script>

<button class="btn btn-sm" on:click={() => (show = true)}>Registrar movimiento</button>

<Form bind:show>
    <form on:submit|preventDefault>
        <div class="checkbox-container">
            {#if entry}
                <Label>Salida</Label>
            {:else}
                <Label>Entrada</Label>
            {/if}
            <Toggle bind:value={entry} />
        </div>
        {#if entry}
            <FileInput bind:result={jobData} bind:changed={isChanging} />
            <Label>Job</Label>
            <input class="input input-sm input-bordered" bind:value={jobData.job} />
            <Label>Export</Label>
            <input class="input input-sm input-bordered" bind:value={jobData.export} />
            <Label>Fecha</Label>
            <DateInput bind:value={jobData.date} />
            <div class="material-table">
                <div class="table-header">
                    <p>Material</p>
                    <p>Cantidad</p>
                </div>
                {#each jobData.textboxes as textbox, i}
                    <div class="textbox-container">
                        <MaterialInput bind:value={jobData.textboxes[i].Material} bind:measurement={jobData.textboxes[i].Measurement} data={isChanging} size="big" rows={jobData.textboxes.length} />
                        <input class="input input-sm input-bordered" bind:value={jobData.textboxes[i].Amount} size="small" />
                        <p>{jobData.textboxes[i].Measurement}</p>
                        <XButton click={() => deleteTextbox(i)} />
                    </div>
                {/each}
            </div>
            <div class="buttons-container">
                <button class="btn btn-sm" on:click={addTextbox}>Agregar</button>
            </div>
            <button class="btn btn-sm" on:click={submitOutput}>Submit</button>
        {:else}
            <p>Fecha</p>
            <DateInput bind:value={inputData.Date} />
            <p>Material</p>
            <MaterialInput bind:value={inputData.Material} bind:measurement={inputData.Measurement} />
            <p>Cantidad</p>
            <input class="input input-sm input-bordered" bind:value={inputData.Amount} />
            <p>{inputData.Measurement}</p>
            <button class="btn btn-sm" on:click={submitInput}>Submit</button>
        {/if}
    </form>
</Form>

<style>
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .material-table {
        width: clamp(200px, 90%, 700px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    p {
        margin: 0;
        /* margin-left: 10px; */
    }
    .table-header {
        display: flex;
        justify-content: left;
        width: clamp(280px, 90%, 500px);
    }
    .textbox-container {
        display: flex;
        justify-content: center;
        width: clamp(280px, 90%, 500px);
    }
    .textbox-container p {
        width: 10%;
        margin: 0;
    }
    .table-header p {
        text-align: left;
        width: 15%;
    }
    .table-header p:first-child {
        width: 65%;
    }
    .checkbox-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
