import { App } from "vue";

import MonsetraForm from "./MonsetraForm.vue";

MonsetraForm.install = (Vue: App) => {
  Vue.component(MonsetraForm.name, MonsetraForm);
}

export default MonsetraForm;