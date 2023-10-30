<script>
    export let show = false;

    import axios from "axios";
    import { apiBase } from "../utilities";
    import Form from "../Form.svelte";

    let data;

    $: searchInfo = {
        Date: dayDate,
        NoEmpleado: NoEmpleado,
        Name: Name,
        Area: Area,
    };

    let dayDate = new Date().toISOString().split("T")[0];
    let NoEmpleado = "";
    let Name = "";
    let Area = "";

    let employees = [];

    let weekDay;

    function searchByNoEmpleado() {
        if (dayDate && NoEmpleado) {
            axios.post(apiBase + "/employees/productivity/getsingle", searchInfo).then((res) => {
                data = res.data[0];

                Area = data.Area;
                Name = data.Empleado;
                setWeekDay(dayDate);
            });
        }
    }

    function searchByName() {
        if (Name && Area && dayDate) {
            NoEmpleado = "";

            axios.post(apiBase + "/employees/productivity/getsingle", searchInfo).then((res) => {
                data = res.data[0];

                Name = data.Empleado;
                setWeekDay(dayDate);
            });
        }
    }

    $: if (Area) getEmployees();
    $: if (Area) console.log("dfasdasd");
    function getEmployees() {
        axios.post(apiBase + "/employees/various/employeesnamebyarea", searchInfo).then((res) => {
            employees = res.data;
        });
    }

    function setWeekDay(dateStr) {
        weekDay = new Date(dateStr).getDay();
    }

    function submmit() {
        axios.put(apiBase + "/employees/productivity", data).then((res) => console.log(res));
    }
</script>

<Form bind:show>
    <input type="date" name="" id="" bind:value={dayDate} on:blur={searchByNoEmpleado} />

    <p>No. Empleado:</p>
    <input type="number" name="" id="" bind:value={NoEmpleado} on:change={searchByNoEmpleado} />

    <p>Area:</p>
    <select name="" id="" bind:value={Area} on:change={searchByName}>
        {#await axios.get(apiBase + "/employees/various/capturedareas") then res}
            {#each res.data as area}
                <option value={area.Name}>{area.Name}</option>
            {/each}
        {/await}
    </select>

    <p>Nombre:</p>
    <select name="" id="" bind:value={Name} on:change={searchByName}>
        <option value="">Elegir empleado</option>
        {#each employees as employee}
            <option value={employee.Name}>{employee.Name}</option>
        {/each}
    </select>

    {#if data}
        <fieldset>
            <legend>Actividad 1</legend>
            <input type="text" placeholder="Operacion" bind:value={data[`${weekDay}Code0`]} />
            <input type="number" placeholder="Meta" bind:value={data[`${weekDay}Goal0`]} />
            <input type="number" placeholder="Producido" bind:value={data[`${weekDay}Produced0`]} />
        </fieldset>
        <fieldset>
            <legend>Actividad 2</legend>
            <input type="text" placeholder="Operacion" bind:value={data[`${weekDay}Code1`]} />
            <input type="number" placeholder="Meta" bind:value={data[`${weekDay}Goal1`]} />
            <input type="number" placeholder="Producido" bind:value={data[`${weekDay}Produced1`]} />
        </fieldset>
        <fieldset>
            <legend>Actividad 3</legend>
            <input type="text" placeholder="Operacion" bind:value={data[`${weekDay}Code2`]} />
            <input type="number" placeholder="Meta" bind:value={data[`${weekDay}Goal2`]} />
            <input type="number" placeholder="Producido" bind:value={data[`${weekDay}Produced2`]} />
        </fieldset>
        <input type="text" placeholder="Comentario" bind:value={data[`${weekDay}Comment`]} />
    {/if}
    <button on:click|preventDefault={submmit}>Subir</button>
</Form>
