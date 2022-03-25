import type { App, Component } from "vue";

export const registerComponent = (instance: App, component: Component) => {
  if (component) {
    instance.component(component.name || "", component);
  }
};