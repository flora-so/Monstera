import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AnimatedInput from "./AnimatedInput.vue";
import AnimatedSelect from "./AnimatedSelect.vue";
import AnimatedTextarea from "./AnimatedTextarea.vue";
import AnimatedDatalist from "./AnimatedDatalist.vue";
import StaticInput from "./StaticInput.vue";
import StaticDateInput from "./StaticDateInput.vue";
import StaticSelect from "./StaticSelect.vue";
import StaticTextarea from "./StaticTextarea.vue";
import StaticDatalist from "./StaticDatalist.vue";
import MonsetraCheckbox from "./MonsetraCheckbox.vue";
import ChoiceChips from "./ChoiceChips.vue";
import DropdownList from "./DropdownList.vue";
import DropdownListItem from "./DropdownListItem.vue";
import ToggleSwitch from "./ToggleSwitch.vue";
import RadioButton from "./RadioButton.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AnimatedInput);
    registerComponent(app, AnimatedSelect);
    registerComponent(app, AnimatedTextarea);
    registerComponent(app, AnimatedDatalist);
    registerComponent(app, StaticInput);
    registerComponent(app, StaticDateInput);
    registerComponent(app, StaticSelect);
    registerComponent(app, StaticTextarea);
    registerComponent(app, StaticDatalist);
    registerComponent(app, ChoiceChips);
    registerComponent(app, ToggleSwitch);
    registerComponent(app, RadioButton);
    registerComponent(app, MonsetraCheckbox);
    registerComponent(app, DropdownList);
    registerComponent(app, DropdownListItem);
  }
}

export default Plugin;

export {
  AnimatedInput,
  AnimatedSelect,
  AnimatedDatalist,
  AnimatedTextarea,
  StaticSelect,
  StaticInput,
  StaticDateInput,
  StaticTextarea,
  StaticDatalist,
  MonsetraCheckbox,
  ChoiceChips,
  DropdownList,
  DropdownListItem,
  ToggleSwitch,
  RadioButton,
};