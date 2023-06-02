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

export { default as AnimatedDatalist } from "./components/AnimatedDatalist";
export { default as AnimatedDateInput } from "./components/AnimatedDateInput";
export { default as AnimatedInput } from "./components/AnimatedInput";
export { default as AnimatedSelect } from "./components/AnimatedSelect";
export { default as AnimatedTextarea } from "./components/AnimatedTextarea";
export { default as BigButton } from "./components/BigButton";
export { default as BottomSheet } from "./components/BottomSheet";
export { default as ChoiceChips } from "./components/ChoiceChips";
export { default as CircularProgress } from "./components/CircularProgress";
export { default as DataTable } from "./components/DataTable";
export { default as DateInputWrapper } from "./components/DateInputWrapper";
export { default as DropdownList } from "./components/DropdownList";
export { default as DropdownListItem } from "./components/DropdownListItem";
export { default as FileInputWrapper } from "./components/FileInputWrapper";
export { default as FloatingCard } from "./components/FloatingCard";
export { default as IconButton } from "./components/IconButton";
export { default as LinkButton } from "./components/LinkButton";
export { default as ListView } from "./components/ListView";
export { default as MonsteraApp } from "./components/MonsteraApp";
export { default as MonsteraBanner } from "./components/MonsteraBanner";
export { default as MonsteraCheckbox } from "./components/MonsteraCheckbox";
export { default as MonsteraDialog } from "./components/MonsteraDialog";
export { default as MonsteraForm } from "./components/MonsteraForm";
export { default as MonsteraSnackbar } from "./components/MonsteraSnackbar";
export { default as MonsteraTag } from "./components/MonsteraTag";
export { default as OutlinedButton } from "./components/OutlinedButton";
export { default as OutlinedCard } from "./components/OutlinedCard";
export { default as ProgressIndicator } from "./components/ProgressIndicator";
export { default as RadioButton } from "./components/RadioButton";
export { default as SmallButton } from "./components/SmallButton";
export { default as StaticDatalist } from "./components/StaticDatalist";
export { default as StaticDateInput } from "./components/StaticDateInput";
export { default as StaticInput } from "./components/StaticInput";
export { default as StaticSelect } from "./components/StaticSelect";
export { default as StaticTextarea } from "./components/StaticTextarea";
export { default as TabButton } from "./components/TabButton";
export { default as TextButton } from "./components/TextButton";
export { default as ToggleSwitch } from "./components/ToggleSwitch";

export * from "./types"