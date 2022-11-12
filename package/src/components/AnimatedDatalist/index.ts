import { App } from "vue";

import AnimatedDatalist from "./AnimatedDatalist.vue";

AnimatedDatalist.install = (Vue: App) => {
  Vue.component(AnimatedDatalist.name, AnimatedDatalist);
}

export default AnimatedDatalist;