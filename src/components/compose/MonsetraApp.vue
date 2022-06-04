<template>
  <div class="msr-app" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

import { Theme } from "../../types";

export default defineComponent({
  name: "MonsetraApp",
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: () => Theme.light
    },
    fontFamily: {
      type: String,
      default: () => "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
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
      default: () => "62,238,145",
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
      theme: computed(() => this.theme)
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

  font-family: v-bind(fontFamily);

  transition: all 500ms ease-in-out;
}
</style>