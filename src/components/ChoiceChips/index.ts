import { App } from "vue";

import ChoiceChips from "./ChoiceChips.vue";

ChoiceChips.install = (Vue: App) => {
  Vue.component(ChoiceChips.name, ChoiceChips);
}

export default ChoiceChips;