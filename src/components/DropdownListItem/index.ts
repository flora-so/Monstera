import { App } from "vue";

import DropdownListItem from "./DropdownListItem.vue";

DropdownListItem.install = (Vue: App) => {
  Vue.component(DropdownListItem.name, DropdownListItem);
}

export default DropdownListItem;