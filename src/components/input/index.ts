import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AnimatedTextField from "./AnimatedTextField.vue";
import Checkbox from "./Checkbox.vue";
import Chips from "./Chips.vue";
import DropdownList from "./DropdownList.vue";
import DropdownListItem from "./DropdownListItem.vue";
import StaticTextField from "./StaticTextField.vue";
import Switch from "./Switch.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AnimatedTextField);
    registerComponent(app, Checkbox);
    registerComponent(app, Chips);
    registerComponent(app, DropdownList);
    registerComponent(app, DropdownListItem);
    registerComponent(app, StaticTextField);
    registerComponent(app, Switch);
  }
}

export default Plugin;

export { AnimatedTextField, Checkbox, Chips, DropdownList, DropdownListItem, StaticTextField, Switch };