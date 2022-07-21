import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import DataTable from "./DataTable.vue";
import FloatingCard from "./FloatingCard.vue";
import OutlinedCard from "./OutlinedCard.vue";
import Modal from "./Modal.vue";
import BottomSheet from "./BottomSheet.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, DataTable);
    registerComponent(app, FloatingCard);
    registerComponent(app, OutlinedCard);
    registerComponent(app, Modal);
    registerComponent(app, BottomSheet);
  }
}

export default Plugin;

export { DataTable, FloatingCard, OutlinedCard, Modal, BottomSheet };