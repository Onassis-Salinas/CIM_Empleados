import ErrorMessage from "./ErrorMessage.svelte";

export function showError(err) {
    if (typeof err === "string") return new ErrorMessage({ target: document.body, props: { message: err } });
    new ErrorMessage({ target: document.body, props: { message: err.response.data.error } });
}

export const apiBase = "http://localhost:3000";
