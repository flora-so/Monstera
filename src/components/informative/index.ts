import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import MonsetraDialog from "./MonsetraDialog.vue";
import MonsetraBanner from "./MonsetraBanner.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import CircularProgress from "./CircularProgress.vue";
import MonsetraSnackbar from "./MonsetraSnackbar.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, MonsetraDialog);
    registerComponent(app, MonsetraBanner);
    registerComponent(app, ProgressIndicator);
    registerComponent(app, CircularProgress);
    registerComponent(app, MonsetraSnackbar);
  }
}

export default Plugin;

export { MonsetraDialog, MonsetraBanner, ProgressIndicator, CircularProgress, MonsetraSnackbar };