import { App } from "vue";

import FloatingCard from "./FloatingCard.vue";

FloatingCard.install = (Vue: App) => {
  Vue.component(FloatingCard.name, FloatingCard);
}

export default FloatingCard;