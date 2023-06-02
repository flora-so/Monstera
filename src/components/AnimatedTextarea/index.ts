import { App } from "vue";

import AnimatedTextarea from "./AnimatedTextarea.vue";

AnimatedTextarea.install = (Vue: App) => {
  Vue.component(AnimatedTextarea.name, AnimatedTextarea);
}

export default AnimatedTextarea;