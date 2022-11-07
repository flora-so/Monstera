import { App } from "vue";

import DropdownList from "./DropdownList.vue";

DropdownList.install = (Vue: App) => {
  Vue.component(DropdownList.name, DropdownList);
}

export default DropdownList;