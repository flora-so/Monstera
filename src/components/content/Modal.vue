<template>
  <div class="msr-modal__wrapper" :show="_isShown" @click="e => $_checkHide(e)">
    <div class="msr-modal" ref="dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TextButton from "../button/TextButton.vue";
import { type InformativeContext, Theme } from "../../types";

export default defineComponent({
  name: "Modal",
  inject: ["theme"],
  emits: {
    context(ctx: InformativeContext) {
      return ctx;
    }
  },
  components: {
    TextButton
  },
  data() {
    return {
      _isShown: false,
    }
  },
  computed: {
    _backgroundColour() {
      return (this as any)['theme'] == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    }
  },
  methods: {
    show() {
      this._isShown = true;
    },
    hide() {
      this._isShown = false;
    },
    $_checkHide(e: MouseEvent) {
      let dialog = this.$refs.dialog as HTMLElement;

      if (e.target == dialog || e.composedPath().includes(dialog)) {
        return;
      }

      this._isShown = false;
    }
  },
  mounted() {
    let ctx: InformativeContext = {
      show: this.show,
      hide: this.hide,
    }

    this.$emit("context", ctx);
  }
});
</script>

<style scoped>
.msr-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 7px;
}

.msr-modal__wrapper[show="false"] {
  visibility: hidden;
  backdrop-filter: blur(0px) brightness(1);
  transition: all ease-out 100ms;
}

.msr-modal__wrapper[show="false"] .msr-modal {
  visibility: hidden;
  opacity: 0;
  transform: scale(0.55, 0.55);
  transition: all linear 100ms;
}

.msr-modal__wrapper[show="true"] {
  visibility: visible;
  backdrop-filter: blur(13px) brightness(0.5);
  transition: all ease-out 300ms;
}

.msr-modal__wrapper[show="true"] .msr-modal {
  visibility: visible;
  opacity: 1;
  transform: scale(1, 1);
  transition: all ease-out 100ms;
}

.msr-modal {
  display: flex;
  flex-direction: column;

  border-radius: 13px;
  background-color: v-bind(_backgroundColour);

  min-width: 377px;
  min-height: 210px;
}
</style>