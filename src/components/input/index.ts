import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AnimatedInput from "./AnimatedInput.vue";
import MonsetraCheckbox from "./MonsetraCheckbox.vue";
import ChoiceChips from "./ChoiceChips.vue";
import DropdownList from "./DropdownList.vue";
import DropdownListItem from "./DropdownListItem.vue";
import StaticInput from "./StaticInput.vue";
import ToggleSwitch from "./ToggleSwitch.vue";
import StaticSelect from "./StaticSelect.vue";
import AnimatedSelect from "./AnimatedSelect.vue";
import StaticTextarea from "./StaticTextarea.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AnimatedInput);
    registerComponent(app, MonsetraCheckbox);
    registerComponent(app, ChoiceChips);
    registerComponent(app, DropdownList);
    registerComponent(app, DropdownListItem);
    registerComponent(app, StaticSelect);
    registerComponent(app, ToggleSwitch);
    registerComponent(app, StaticInput);
    registerComponent(app, AnimatedSelect);
    registerComponent(app, StaticTextarea);
  }
}

export default Plugin;

export { AnimatedInput, MonsetraCheckbox, ChoiceChips, DropdownList, DropdownListItem, StaticSelect, StaticInput, StaticTextarea, AnimatedSelect, ToggleSwitch };