import type { App } from "vue";

import AnimatedDatalist from "./components/AnimatedDatalist";
import AnimatedDateInput from "./components/AnimatedDateInput";
import AnimatedInput from "./components/AnimatedInput";
import AnimatedSelect from "./components/AnimatedSelect";
import AnimatedTextarea from "./components/AnimatedTextarea";
import BigButton from "./components/BigButton";
import BottomSheet from "./components/BottomSheet";
import ChoiceChips from "./components/ChoiceChips";
import CircularProgress from "./components/CircularProgress";
import DataTable from "./components/DataTable";
import DropdownList from "./components/DropdownList";
import DropdownListItem from "./components/DropdownListItem";
import FloatingCard from "./components/FloatingCard";
import IconButton from "./components/IconButton";
import LinkButton from "./components/LinkButton";
import ListView from "./components/ListView";
import MonsetraApp from "./components/MonsetraApp";
import MonsetraBanner from "./components/MonsetraBanner";
import MonsetraCheckbox from "./components/MonsetraCheckbox";
import MonsetraDialog from "./components/MonsetraDialog";
import MonsetraForm from "./components/MonsetraForm";
import MonsetraSnackbar from "./components/MonsetraSnackbar";
import MonsetraTag from "./components/MonsetraTag";
import OutlinedButton from "./components/OutlinedButton";
import OutlinedCard from "./components/OutlinedCard";
import ProgressIndicator from "./components/ProgressIndicator";
import RadioButton from "./components/RadioButton";
import SmallButton from "./components/SmallButton";
import StaticDatalist from "./components/StaticDatalist";
import StaticDateInput from "./components/StaticDateInput";
import StaticInput from "./components/StaticInput";
import StaticSelect from "./components/StaticSelect";
import TabButton from "./components/TabButton";
import TextButton from "./components/TextButton";
import ToggleSwitch from "./components/ToggleSwitch";

const components = {
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
  DropdownList,
  DropdownListItem,
  FloatingCard,
  IconButton,
  LinkButton,
  ListView,
  MonsetraApp,
  MonsetraBanner,
  MonsetraCheckbox,
  MonsetraDialog,
  MonsetraForm,
  MonsetraSnackbar,
  MonsetraTag,
  OutlinedButton,
  OutlinedCard,
  ProgressIndicator,
  RadioButton,
  SmallButton,
  StaticDatalist,
  StaticDateInput,
  StaticInput,
  StaticSelect,
  TabButton,
  TextButton,
  ToggleSwitch,
}

const install = (Vue: App) => {
  for (const key in components) {
    Vue.component((components as any)[key].name, (components as any)[key]);
  }
}

export default { install };

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
export { default as DropdownList } from "./components/DropdownList";
export { default as DropdownListItem } from "./components/DropdownListItem";
export { default as FloatingCard } from "./components/FloatingCard";
export { default as IconButton } from "./components/IconButton";
export { default as LinkButton } from "./components/LinkButton";
export { default as ListView } from "./components/ListView";
export { default as MonsetraApp } from "./components/MonsetraApp";
export { default as MonsetraBanner } from "./components/MonsetraBanner";
export { default as MonsetraCheckbox } from "./components/MonsetraCheckbox";
export { default as MonsetraDialog } from "./components/MonsetraDialog";
export { default as MonsetraForm } from "./components/MonsetraForm";
export { default as MonsetraSnackbar } from "./components/MonsetraSnackbar";
export { default as MonsetraTag } from "./components/MonsetraTag";
export { default as OutlinedButton } from "./components/OutlinedButton";
export { default as OutlinedCard } from "./components/OutlinedCard";
export { default as ProgressIndicator } from "./components/ProgressIndicator";
export { default as RadioButton } from "./components/RadioButton";
export { default as SmallButton } from "./components/SmallButton";
export { default as StaticDatalist } from "./components/StaticDatalist";
export { default as StaticDateInput } from "./components/StaticDateInput";
export { default as StaticInput } from "./components/StaticInput";
export { default as StaticSelect } from "./components/StaticSelect";
export { default as TabButton } from "./components/TabButton";
export { default as TextButton } from "./components/TextButton";
export { default as ToggleSwitch } from "./components/ToggleSwitch";

export * from "./types";