import { App } from "vue";

import TextButton from "./TextButton.vue";

TextButton.install = (Vue: App) => {
  Vue.component(TextButton.name, TextButton);
}

export default TextButton;