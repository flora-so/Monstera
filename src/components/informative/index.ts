import type { App } from "vue";

import { registerComponent } from "../../utils/plugins";

import AlertDialog from "./AlertDialog.vue";
import Banner from "./Banner.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import CircularProgress from "./CircularProgress.vue";
import Snackbar from "./Snackbar.vue";

const Plugin = {
  install(app: App) {
    registerComponent(app, AlertDialog);
    registerComponent(app, Banner);
    registerComponent(app, ProgressIndicator);
    registerComponent(app, CircularProgress);
    registerComponent(app, Snackbar);
  }
}

export default Plugin;

export { AlertDialog, Banner, ProgressIndicator, CircularProgress, Snackbar };