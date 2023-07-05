import { writable, type Writable } from 'svelte/store';

const storedMode = (localStorage.getItem('mode') as 'light' | 'dark') || 'dark';
export const mode: Writable<'light' | 'dark'> = writable(storedMode);

mode.subscribe((value) => {
	localStorage.setItem('mode', value);
});
