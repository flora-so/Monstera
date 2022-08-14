import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AnimatedTextField from "./AnimatedTextField.vue";
import MonsetraCheckbox from "./MonsetraCheckbox.vue";
import ChoiceChips from "./ChoiceChips.vue";
import DropdownList from "./DropdownList.vue";
import DropdownListItem from "./DropdownListItem.vue";
import StaticTextField from "./StaticTextField.vue";
import ToggleSwitch from "./ToggleSwitch.vue";
import StaticSelectField from "./StaticSelectField.vue";
import AnimatedSelectField from "./AnimatedSelectField.vue";
import StaticTextareaField from "./StaticTextareaField.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AnimatedTextField);
    registerComponent(app, MonsetraCheckbox);
    registerComponent(app, ChoiceChips);
    registerComponent(app, DropdownList);
    registerComponent(app, DropdownListItem);
    registerComponent(app, StaticSelectField);
    registerComponent(app, ToggleSwitch);
    registerComponent(app, StaticTextField);
    registerComponent(app, AnimatedSelectField);
    registerComponent(app, StaticTextareaField);
  }
}

export default Plugin;

export { AnimatedTextField, MonsetraCheckbox, ChoiceChips, DropdownList, DropdownListItem, StaticSelectField, StaticTextField, StaticTextareaField, AnimatedSelectField, ToggleSwitch };