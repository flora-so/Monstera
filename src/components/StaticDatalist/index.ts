import { App } from "vue";

import StaticDatalist from "./StaticDatalist.vue";

StaticDatalist.install = (Vue: App) => {
  Vue.component(StaticDatalist.name, StaticDatalist);
}

export default StaticDatalist;