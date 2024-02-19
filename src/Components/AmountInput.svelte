<script>
    import axios from "axios";
    import ErrorMessage from "./ErrorMessage.svelte";
    import { apiBase } from "../lib/utilities";

    export let value = null;
    export let placeholder = "";
    export let Job = "";
    export let Code = "";
    export let Active;
    let lastValue = "";

    const setLastValue = async () => {
        lastValue = value;
    };

    const updateAmount = async () => {
        if (value) {
            const response = await axios.post(apiBase + "/inventories/movements/updateamount", { RealAmount: value, Job, Code, lastValue, Active });
            if (response.data.error) return new ErrorMessage({ target: document.body, props: { message: response.data.error } });
        } else {
            value = lastValue;
        }
    };
</script>

<input type="number" class="input input-xs w-20 input-bordered" inputmode="numeric" name="" id="" bind:value {placeholder}  on:blur={updateAmount} on:focus={setLastValue} />

