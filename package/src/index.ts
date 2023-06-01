import type { App } from "vue";

import {
  AnimatedDatalist,
  AnimatedDateInput,
  AnimatedInput,
  AnimatedSelect,
  AnimatedTextarea,
  BigButton,
  BottomSheet,
  ChoiceChips,
  CircularProgress,
  DataTable,
  DateInputWrapper,
  DropdownList,
  DropdownListItem,
  FileInputWrapper,
  FloatingCard,
  IconButton,
  LinkButton,
  ListView,
  MonsteraApp,
  MonsteraBanner,
  MonsteraCheckbox,
  MonsteraDialog,
  MonsteraForm,
  MonsteraSnackbar,
  MonsteraTag,
  OutlinedButton,
  OutlinedCard,
  ProgressIndicator,
  RadioButton,
  SmallButton,
  StaticDatalist,
  StaticDateInput,
  StaticInput,
  StaticSelect,
  StaticTextarea,
  TabButton,
  TextButton,
  ToggleSwitch,
} from "./components"


// const install = (Vue: App) => {
//   for (const key in components) {
//     Vue.component((components as any)[key].name, (components as any)[key]);
//   }
// }

export default {
  install: (Vue: App) => {
    Vue.component(AnimatedDatalist.name, AnimatedDatalist);
    Vue.component(AnimatedDateInput.name, AnimatedDateInput);
    Vue.component(AnimatedInput.name, AnimatedInput);
    Vue.component(AnimatedSelect.name, AnimatedSelect);
    Vue.component(AnimatedTextarea.name, AnimatedTextarea);
    Vue.component(BigButton.name, BigButton);
    Vue.component(BottomSheet.name, BottomSheet);
    Vue.component(ChoiceChips.name, ChoiceChips);
    Vue.component(CircularProgress.name, CircularProgress);
    Vue.component(DataTable.name, DataTable);
    Vue.component(DateInputWrapper.name, DateInputWrapper);
    Vue.component(DropdownList.name, DropdownList);
    Vue.component(DropdownListItem.name, DropdownListItem);
    Vue.component(FileInputWrapper.name, FileInputWrapper);
    Vue.component(FloatingCard.name, FloatingCard);
    Vue.component(IconButton.name, IconButton);
    Vue.component(LinkButton.name, LinkButton);
    Vue.component(ListView.name, ListView);
    Vue.component(MonsteraApp.name, MonsteraApp);
    Vue.component(MonsteraBanner.name, MonsteraBanner);
    Vue.component(MonsteraCheckbox.name, MonsteraCheckbox);
    Vue.component(MonsteraDialog.name, MonsteraDialog);
    Vue.component(MonsteraForm.name, MonsteraForm);
    Vue.component(MonsteraSnackbar.name, MonsteraSnackbar);
    Vue.component(MonsteraTag.name, MonsteraTag);
    Vue.component(OutlinedButton.name, OutlinedButton);
    Vue.component(OutlinedCard.name, OutlinedCard);
    Vue.component(ProgressIndicator.name, ProgressIndicator);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(SmallButton.name, SmallButton);
    Vue.component(StaticDatalist.name, StaticDatalist);
    Vue.component(StaticDateInput.name, StaticDateInput);
    Vue.component(StaticInput.name, StaticInput);
    Vue.component(StaticSelect.name, StaticSelect);
    Vue.component(StaticTextarea.name, StaticTextarea);
    Vue.component(TabButton.name, TabButton);
    Vue.component(TextButton.name, TextButton);
    Vue.component(ToggleSwitch.name, ToggleSwitch);

  }
};

export {
  AnimatedDatalist,
  AnimatedDateInput,
  AnimatedInput,
  AnimatedSelect,
  AnimatedTextarea,
  BigButton,
  BottomSheet,
  ChoiceChips,
  CircularProgress,
  DataTable,
  DateInputWrapper,
  DropdownList,
  DropdownListItem,
  FileInputWrapper,
  FloatingCard,
  IconButton,
  LinkButton,
  ListView,
  MonsteraApp,
  MonsteraBanner,
  MonsteraCheckbox,
  MonsteraDialog,
  MonsteraForm,
  MonsteraSnackbar,
  MonsteraTag,
  OutlinedButton,
  OutlinedCard,
  ProgressIndicator,
  RadioButton,
  SmallButton,
  StaticDatalist,
  StaticDateInput,
  StaticInput,
  StaticSelect,
  StaticTextarea,
  TabButton,
  TextButton,
  ToggleSwitch,
}

export * from "./types";