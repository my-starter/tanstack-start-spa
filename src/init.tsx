import { createDb } from "./rxdb";
import { setDocsDb } from "./store";

let isInit = false;

export const init = async () => {
    if (isInit) return;
    isInit = true;

    createDb('docs').then(setDocsDb);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js', { scope: '/' });
        });
    }
}
