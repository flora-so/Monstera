import { App } from "vue";

import AnimatedDateInput from "./AnimatedDateInput.vue";

AnimatedDateInput.install = (Vue: App) => {
  Vue.component(AnimatedDateInput.name, AnimatedDateInput);
}

export default AnimatedDateInput;