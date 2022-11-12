import { App } from "vue";

import AnimatedInput from "./AnimatedInput.vue";

AnimatedInput.install = (Vue: App) => {
  Vue.component(AnimatedInput.name, AnimatedInput);
}

export default AnimatedInput;