<template>
  <div class="msr-app" v-bind="$attrs">
    <slot></slot>
    <progress-indicator v-if="loading" infinite></progress-indicator>
    <monsetra-snackbar :content="snackbar.content" :background-colour="snackbar.colour" 
      @context="(ctx) => snackbar.context = ctx"></monsetra-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

import ProgressIndicator from "../overlay/ProgressIndicator.vue";
import MonsetraSnackbar from "../overlay/MonsetraSnackbar.vue";

import { Colours, Theme, type OverlayContext } from "../../types";

export default defineComponent({
  name: "MonsetraApp",
  components: {
    ProgressIndicator,
    MonsetraSnackbar
  },
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: () => Theme.light
    },
    headingFamily: {
      type: String,
      default: () => "Verdana, Geneva, Tahoma, sans-serif",
    },
    bodyFamily: {
      type: String,
      default: () => "Arial, Helvetica, sans-serif",
    },
    primary: {
      type: String,
      default: () => "23,105,255",
      validator: (value: string) => /(\d{1,3}),(\d{1,3}),(\d{1,3})/.test(value)
    },
    accent: {
      type: String,
      default: () => "131,72,255",
      validator: (value: string) => /(\d{1,3}),(\d{1,3}),(\d{1,3})/.test(value)
    },
    success: {
      type: String,
      default: () => "0,219,170",
      validator: (value: string) => /(\d{1,3}),(\d{1,3}),(\d{1,3})/.test(value)
    },
    warning: {
      type: String,
      default: () => "255,192,0",
      validator: (value: string) => /(\d{1,3}),(\d{1,3}),(\d{1,3})/.test(value)
    },
    danger: {
      type: String,
      default: () => "255,89,89",
      validator: (value: string) => /(\d{1,3}),(\d{1,3}),(\d{1,3})/.test(value)
    }
  },
  data() {
    return {
      loading: false,
      snackbar: {
        content: "",
        colour: Colours.primary,
        context: null,
      }
    }
  },
  computed: {
    colour() {
      return this.theme == Theme.dark ? "#ffffff" : "#000000";
    },
    backgroundColour() {
      return this.theme == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    }
  },
  watch: {
    theme(newTheme: Theme) {
      if (newTheme == Theme.dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  },
  provide() {
    return {
      theme: computed(() => this.theme),
      loading: this.setLoading,
      snackbar: this.showSnackbar,
    }
  },
  methods: {
    setLoading(loading: boolean) {
      if (loading === undefined || loading === null) {
        return this.loading;
      }
      this.loading = loading;
    },
    showSnackbar(content: string, colour: Colours) {
      this.snackbar.content = content;
      this.snackbar.colour = colour;

      (this.snackbar.context! as OverlayContext).show();
    }
  },
  created() {
    if (this.theme == Theme.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
});
</script>

<style>
.msr-app {
  --primary: v-bind(primary);
  --accent: v-bind(accent);
  --success: v-bind(success);
  --warning: v-bind(warning);
  --danger: v-bind(danger);

  --light-background: #ffffff;
  --dark-background: #131313;

  color: v-bind(colour);
  background-color: v-bind(backgroundColour);
  height: 100vh;
  width: 100vw;
  overflow: auto;

  font-family: v-bind(bodyFamily);

  transition: all 500ms ease-in-out;
}

.msr-heading {
  font-family: v-bind(headingFamily);
}
</style>