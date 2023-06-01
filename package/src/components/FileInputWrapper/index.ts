import { App } from "vue";

import FileInputWrapper from "./FileInputWrapper.vue";

FileInputWrapper.install = (Vue: App) => {
  Vue.component(FileInputWrapper.name, FileInputWrapper);
}

export default FileInputWrapper;