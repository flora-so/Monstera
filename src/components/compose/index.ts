import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import MonsetraForm from "./MonsetraForm.vue";
import MonsetraApp from "./MonsetraApp.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, MonsetraForm);
    registerComponent(app, MonsetraApp);
  }
}

export default Plugin;

export { MonsetraForm, MonsetraApp };