import { App } from "vue";

import ListView from "./ListView.vue";

ListView.install = (Vue: App) => {
  Vue.component(ListView.name, ListView);
}

export default ListView;