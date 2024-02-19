<script>
    import axios from "axios";
    import ErrorMessage from "./ErrorMessage.svelte";
    import { apiBase } from "../lib/utilities";
    export let result = { textboxes: [{ Material: "", Amount: 0, jobAmount: 0, Measurement: "X" }], job: "", date: "", export: "" };
    export let changed = 0;

    async function handleFileInput(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append("pdfFile", selectedFile);

            const response = await axios.post(apiBase + "/inventories/functions/pdf", formData);
            console.log(response.data)
            if (response.data.error) return new ErrorMessage({ target: document.body, props: { message: response.data.error } });
            response.data.materials.forEach((element, i) => {
                response.data.materials[i] = { Material: element.material, Amount: element.amount, Measurement: "" };
            });

            changed += 1;
            result.textboxes = response.data.materials;
            result.job = response.data.job;
            result.date = response.data.date;
            return;
        }
    }
</script>

<label for="input">Selecciona un JOB</label>
<input class="file-input file-input-sm file-input-bordered  max-w-xs" type="file" name="input" id="input" accept=".pdf" on:change={handleFileInput} />

