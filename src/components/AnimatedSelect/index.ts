import { App } from "vue";

import AnimatedSelect from "./AnimatedSelect.vue";

AnimatedSelect.install = (Vue: App) => {
  Vue.component(AnimatedSelect.name, AnimatedSelect);
}

export default AnimatedSelect;