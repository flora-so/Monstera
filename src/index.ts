import type { App, Component } from "vue";

const components: Record<string, Component> = import.meta.glob("./components/*.vue", { eager: true });

export default {
  install: (app: App) => {
    for (const path in components) {
      const name = path.match(/\.\/components\/(.*)\.vue$/)![1];
      app.component(name, components[path]);
    }
  }
}

export { default as AnimatedDatalist } from "./components/AnimatedDatalist/AnimatedDatalist.vue";
export { default as AnimatedDateInput } from "./components/AnimatedDateInput/AnimatedDateInput.vue";
export { default as AnimatedInput } from "./components/AnimatedInput/AnimatedInput.vue";
export { default as AnimatedSelect } from "./components/AnimatedSelect/AnimatedSelect.vue";
export { default as AnimatedTextarea } from "./components/AnimatedTextarea/AnimatedTextarea.vue";
export { default as BigButton } from "./components/BigButton/BigButton.vue";
export { default as BottomSheet } from "./components/BottomSheet/BottomSheet.vue";
export { default as ChoiceChips } from "./components/ChoiceChips/ChoiceChips.vue";
export { default as CircularProgress } from "./components/CircularProgress/CircularProgress.vue";
export { default as DataTable } from "./components/DataTable/DataTable.vue";
export { default as DateInputWrapper } from "./components/DateInputWrapper/DateInputWrapper.vue";
export { default as DropdownList } from "./components/DropdownList/DropdownList.vue";
export { default as DropdownListItem } from "./components/DropdownListItem/DropdownListItem.vue";
export { default as FileInputWrapper } from "./components/FileInputWrapper/FileInputWrapper.vue";
export { default as FloatingCard } from "./components/FloatingCard/FloatingCard.vue";
export { default as IconButton } from "./components/IconButton/IconButton.vue";
export { default as LinkButton } from "./components/LinkButton/LinkButton.vue";
export { default as ListView } from "./components/ListView/ListView.vue";
export { default as MonsteraApp } from "./components/MonsteraApp/MonsteraApp.vue";
export { default as MonsteraBanner } from "./components/MonsteraBanner/MonsteraBanner.vue";
export { default as MonsteraCheckbox } from "./components/MonsteraCheckbox/MonsteraCheckbox.vue";
export { default as MonsteraDialog } from "./components/MonsteraDialog/MonsteraDialog.vue";
export { default as MonsteraForm } from "./components/MonsteraForm/MonsteraForm.vue";
export { default as MonsteraSnackbar } from "./components/MonsteraSnackbar/MonsteraSnackbar.vue";
export { default as MonsteraTag } from "./components/MonsteraTag/MonsteraTag.vue";
export { default as OutlinedButton } from "./components/OutlinedButton/OutlinedButton.vue";
export { default as OutlinedCard } from "./components/OutlinedCard/OutlinedCard.vue";
export { default as ProgressIndicator } from "./components/ProgressIndicator/ProgressIndicator.vue";
export { default as RadioButton } from "./components/RadioButton/RadioButton.vue";
export { default as SmallButton } from "./components/SmallButton/SmallButton.vue";
export { default as StaticDatalist } from "./components/StaticDatalist/StaticDatalist.vue";
export { default as StaticDateInput } from "./components/StaticDateInput/StaticDateInput.vue";
export { default as StaticInput } from "./components/StaticInput/StaticInput.vue";
export { default as StaticSelect } from "./components/StaticSelect/StaticSelect.vue";
export { default as StaticTextarea } from "./components/StaticTextarea/StaticTextarea.vue";
export { default as TabButton } from "./components/TabButton/TabButton.vue";
export { default as TextButton } from "./components/TextButton/TextButton.vue";
export { default as ToggleSwitch } from "./components/ToggleSwitch/ToggleSwitch.vue";

export * from "./types"