import { App } from "vue";

import RadioButton from "./RadioButton.vue";

RadioButton.install = (Vue: App) => {
  Vue.component(RadioButton.name, RadioButton);
}

export default RadioButton;