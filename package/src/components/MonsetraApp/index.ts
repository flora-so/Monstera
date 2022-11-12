import { App } from "vue";

import MonsetraApp from "./MonsetraApp.vue";

MonsetraApp.install = (Vue: App) => {
  Vue.component(MonsetraApp.name, MonsetraApp);
}

export default MonsetraApp;