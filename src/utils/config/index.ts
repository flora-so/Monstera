import type { App } from "vue";

const config = {};

export let VueInstance: App;

export { config as default };

export const setVueInstance = (instance: App) => {
  VueInstance = instance;
};