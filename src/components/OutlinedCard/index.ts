import { App } from "vue";

import OutlinedCard from "./OutlinedCard.vue";

OutlinedCard.install = (Vue: App) => {
  Vue.component(OutlinedCard.name, OutlinedCard);
}

export default OutlinedCard;