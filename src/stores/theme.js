import { writable } from 'svelte/store';


let theme = {
    color: "rgb(33, 33, 33)"
}

export const count = writable(0);