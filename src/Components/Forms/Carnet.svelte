<script>
    import Form from "../Form.svelte";

    export let show;
    export let data = null;
    let keys = [];

    $: if (data)
        keys = Object.keys(data).filter(
            (e) => e !== "Id" && e !== "vacaciones" && e !== "NSS" && e !== "CURP" && e !== "RFC" && e !== "Nombre" && e !== "Apellido materno" && e !== "Apellido paterno" && e !== "Posicion" && e !== "Area" && e !== "vacaciones pagadas" && e !== "vacaciones sin pagar" && e !== "No. Empleado"
        );
</script>

<Form bind:show>
    {#if data}
        <img alt="" src={`${import.meta.env.VITE_IMAGES_LINK}/${data["No. Empleado"]}.png`} />
        <h3 class="w-full text-center text-xl">{data["No. Empleado"]}- {`${data["Apellido paterno"] || ""}  ${data["Apellido materno"] || ""} ${data["Nombre"]}`}</h3>
        <div class="flex flex-col gap-8">
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Area:</small> {data["Area"] || "n/a"}</p>
                <p><small>Posicion:</small> {data["Posicion"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Telefono:</small> {data["Numero de telefono"] || "n/a"}</p>
                <p><small>Email:</small> {data["Email"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>NSS:</small> {data["NSS"] || "n/a"}</p>
                <p><small>CURP:</small> {data["CURP"] || "n/a"}</p>
                <p><small>RFC:</small> {data["RFC"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Lugar de nacimiento:</small> {data["Lugar de nacimiento"] || "n/a"}</p>
                <p><small>Sangre:</small> {data["Sangre"] || "n/a"}</p>
                <p><small>Estudios:</small> {data["Estudios"] || "n/a"}</p>
                <p><small>Estado civil:</small> {data["Estado civil"] || "n/a"}</p>
                <p><small>Nacionalidad:</small> {data["Nacionalidad"] || "n/a"}</p>
                <p><small>FDNAC:</small> {data["FDNAC"] || "n/a"}</p>
                <p><small>Direccion:</small> {data["Direccion:"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Fecha de ingreso:</small> {data["Fecha de ingreso"] || "n/a"}</p>
                <p><small>Tipo de posicion:</small> {data["Tipo de posicion"] || "n/a"}</p>
                <p><small>Cambio de CIM:</small> {data["Cambio de CIM"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Banco:</small> {data["Banco"] || "n/a"}</p>
                <p><small>No. Cuenta:</small> {data["Cuenta"] || "n/a"}</p>
                <p><small>Numero de infonavit:</small> {data["Numero de infonavit"] || "n/a"}</p>
                <p><small>Descuento de infonavit:</small> {data["Descuento de infonavit"] || "n/a"}</p>
                <p><small>Numero de clinica:</small> {data["Numero de clinica"] || "n/a"}</p>
                <p><small>Salario integrado IMMS:</small> {data["Salario integrado IMMS"] || "n/a"}</p>
                <p><small>Salario de nomina:</small> {data["Salario de nomina"] || "n/a"}</p>
                <p><small>Cuota fija de infonavit:</small> {data["Cuota fija de infonavit"] || "n/a"}</p>
            </div>
            <div class="w-full flex justify-evenly border-b flex-wrap gap-1">
                <p><small>Contacto de emergencia:</small> {data["Contacto de emergencia"] || "n/a"}</p>
                <p><small>Numero de emergencia:</small> {data["Numero de emergencia"] || "n/a"}</p>
            </div>
        </div>
    {/if}
</Form>

<style>
    img {
        width: 100%;
        height: 200px;
        object-fit: contain;
    }
    .container {
        width: max(30%, 100px);
    }
</style>
