import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import BigButton from "./BigButton.vue";
import LinkButton from "./LinkButton.vue";
import OutlinedButton from "./OutlinedButton.vue";
import SmallButton from "./SmallButton.vue";
import TextButton from "./TextButton.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, BigButton);
    registerComponent(app, LinkButton);
    registerComponent(app, OutlinedButton);
    registerComponent(app, SmallButton);
    registerComponent(app, TextButton);
  }
}

export default Plugin;

export { BigButton, LinkButton, OutlinedButton, SmallButton, TextButton };