import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import MonsetraDialog from "./MonsetraDialog.vue";
import MonsetraBanner from "./MonsetraBanner.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import CircularProgress from "./CircularProgress.vue";
import MonsetraSnackbar from "./MonsetraSnackbar.vue";
import BottomSheet from "./BottomSheet.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, MonsetraDialog);
    registerComponent(app, MonsetraBanner);
    registerComponent(app, ProgressIndicator);
    registerComponent(app, CircularProgress);
    registerComponent(app, MonsetraSnackbar);
    registerComponent(app, BottomSheet);
  }
}

export default Plugin;

export { MonsetraDialog, MonsetraBanner, ProgressIndicator, CircularProgress, MonsetraSnackbar, BottomSheet };