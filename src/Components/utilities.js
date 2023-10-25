import ErrorMessage from "./ErrorMessage.svelte";

export function showError(err) {
    new ErrorMessage({ target: document.body, props: { message: err.response.data.error } });
}

export const apiBase = "http://192.168.0.42:3000";
