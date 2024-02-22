import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const materials = writable([]);

export const alerts = writable([]);

export const logged = writable(!!Cookies.get("perms"));
