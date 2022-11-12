import { App } from "vue";

import BottomSheet from "./BottomSheet.vue";

BottomSheet.install = (Vue: App) => {
  Vue.component(BottomSheet.name, BottomSheet);
}

export default BottomSheet;