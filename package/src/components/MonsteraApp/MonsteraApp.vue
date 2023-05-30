<template>
  <div ref="msrApp" class="msr-app" v-bind="$attrs" @scroll="(e) => onScroll(e)">
    <slot></slot>
    <progress-indicator v-if="loading" infinite></progress-indicator>
    <monstera-snackbar :content="snackbar.content" :background-colour="snackbar.colour"
      @context="(ctx) => snackbar.context = ctx"></monstera-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

import ProgressIndicator from "../ProgressIndicator/ProgressIndicator.vue";
import MonsteraSnackbar from "../MonsteraSnackbar/MonsteraSnackbar.vue";

import { Colours, Theme, type OverlayContext } from "../../types";

export default defineComponent({
  name: "MonsteraApp",
  components: {
    ProgressIndicator,
    MonsteraSnackbar
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
        context: null as OverlayContext | null,
      },
      scroll: {
        x: 0,
        y: 0
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
      msr__theme: computed(() => this.theme),
      msr__loading: this.setLoading,
      msr__snackbar: this.showSnackbar,
      msr__scroll: computed(() => this.scroll),
      msr__context: computed(() => this.$refs.msrApp)
    }
  },
  methods: {
    setLoading(loading: boolean) {
      if (loading === undefined || loading === null) {
        return this.loading;
      }
      this.loading = loading;
    },
    showSnackbar(content: string, colour: Colours = Colours.primary) {
      this.snackbar.content = content;
      this.snackbar.colour = colour;

      (this.snackbar.context! as OverlayContext).show();
    },
    onScroll(e: UIEvent) {
      this.scroll = {
        x: (e.target as HTMLElement).scrollLeft,
        y: (e.target as HTMLElement).scrollTop
      }
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

  font-family: v-bind(bodyFamily);

  transition: all 500ms ease-in-out;

  height: 100vh;
  width: 100vw;

  overflow: auto;
}

.msr-heading {
  font-family: v-bind(headingFamily);
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #7f7f7f1a;
}

::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #7f7f7f7f;
}
</style>