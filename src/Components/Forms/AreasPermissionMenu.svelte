<script>
    import axios from "axios";
    import { apiBase } from "../../lib/utilities";

    export let areaPermission = "";
    let areas;
    let all;
    axios.get(apiBase + "/employees/various/areas").then((res) => (areas = res.data));

    $: if (areas || all) generatePermission();
    $: console.log(areaPermission);
    const generatePermission = () => {
        if (!areas) return;
        if (all) return (areaPermission = "all");

        areaPermission = "";
        for (const area of areas) {
            if (area.perm) {
                areaPermission += area.Name + ",";
            }
        }
    };
</script>

<div class="dropdown dropdown-right">
    <div tabindex="0" role="button" class="btn btn-sm m-1">Acceso a areas</div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {#if areas}
            <div class="form-control">
                <label class="label cursor-pointer">
                    <input type="checkbox" class="checkbox checkbox-sm" bind:checked={all} />
                    <span class="label-text">Todas</span>
                </label>
            </div>
            {#each areas as area, i}
                <!-- <li> -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <input type="checkbox" class="checkbox checkbox-sm" bind:checked={areas[i].perm} />
                        <span class="label-text">{area.Name}</span>
                    </label>
                </div>
                <!-- </li> -->
            {/each}
        {/if}
    </ul>
</div>

<style>
    .dropdown {
        z-index: 700;
    }
</style>
