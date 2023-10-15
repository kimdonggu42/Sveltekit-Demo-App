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


export const editName = writable('');
export const editPhone = writable('');
export const editGuests = writable(0);
export const editTables = writable([]);
export const editNote = writable('');

export const editDate = writable('');
export const editHour = writable(1);
export const editMinute = writable(0);
export const editMeridiem = writable('AM');