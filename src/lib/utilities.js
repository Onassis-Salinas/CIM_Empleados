import { alerts } from "./storage";

let alertsList = [];

const unsubscribe = alerts.subscribe((value) => (alertsList = value));

export const showError = (err) => {
    console.log(err);
    if (typeof err !== "string") {
        err = err.response.data;
    }

    const id = new Date().getTime();

    alerts.update((value) => [...value, { ...err, id }]);

    setTimeout(() => {
        const indexToDelete = alertsList.findIndex((obj) => obj.id === id);
        if (indexToDelete === -1) return;
        alertsList.splice(indexToDelete, 1);
        alerts.set(alertsList);
    }, 4000);
};

export const showAlert = () => {};

export const apiBase = import.meta.env.VITE_APIBASE;
