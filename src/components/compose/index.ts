import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import MonsetraForm from "./MonsetraForm.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, MonsetraForm);
  }
}

export default Plugin;

export { MonsetraForm };