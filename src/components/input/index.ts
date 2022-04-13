import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AnimatedTextField from "./AnimatedTextField.vue";
import Checkbox from "./Checkbox.vue";
import ChoiceChips from "./ChoiceChips.vue";
import DropdownList from "./DropdownList.vue";
import DropdownListItem from "./DropdownListItem.vue";
import StaticTextField from "./StaticTextField.vue";
import ToggleSwitch from "./ToggleSwitch.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AnimatedTextField);
    registerComponent(app, Checkbox);
    registerComponent(app, ChoiceChips);
    registerComponent(app, DropdownList);
    registerComponent(app, DropdownListItem);
    registerComponent(app, StaticTextField);
    registerComponent(app, ToggleSwitch);
  }
}

export default Plugin;

export { AnimatedTextField, Checkbox, ChoiceChips, DropdownList, DropdownListItem, StaticTextField, ToggleSwitch };