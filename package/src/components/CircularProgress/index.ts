import { App } from "vue";

import CircularProgress from "./CircularProgress.vue";

CircularProgress.install = (Vue: App) => {
  Vue.component(CircularProgress.name, CircularProgress);
}

export default CircularProgress;