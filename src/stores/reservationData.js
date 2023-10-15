import { writable } from "svelte/store";

export const name = writable('');
export const phone = writable('');
export const guests = writable(0);
export const tables = writable([]);
export const note = writable('');

export const date = writable('');
export const hour = writable(1);
export const minute = writable(0);
export const meridiem = writable('AM');