import { App } from "vue";

import DateInputWrapper from "./DateInputWrapper.vue";

DateInputWrapper.install = (Vue: App) => {
  Vue.component(DateInputWrapper.name, DateInputWrapper);
}

export default DateInputWrapper;