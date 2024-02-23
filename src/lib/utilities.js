import { alerts } from "./storage";

let alertsList = [];

const unsubscribe = alerts.subscribe((value) => (alertsList = value));

export const showError = (err) => {
    console.log(err);
    if (typeof err === "string") {
        err = { message: err, code: 500 };
    } else {
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

export const formatDate = (dateStr) => {
    const values = dateStr.split("-");
    const result = `${values[2]}/${values[1]}/${values[0].slice(-2)}`;
    return result;
};
