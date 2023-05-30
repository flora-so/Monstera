import { App } from "vue";

import MonsteraForm from "./MonsteraForm.vue";

MonsteraForm.install = (Vue: App) => {
  Vue.component(MonsteraForm.name, MonsteraForm);
}

export default MonsteraForm;