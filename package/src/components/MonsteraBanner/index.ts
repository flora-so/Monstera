import { App } from "vue";

import MonsteraBanner from "./MonsteraBanner.vue";

MonsteraBanner.install = (Vue: App) => {
  Vue.component(MonsteraBanner.name, MonsteraBanner);
}

export default MonsteraBanner;