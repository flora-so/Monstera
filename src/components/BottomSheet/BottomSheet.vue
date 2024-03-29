<template>
  <div class="msr-bottom-sheet__wrapper" :show="_isShown" @click="e => $_checkHide(e)">
    <div ref="sheet" class="msr-bottom-sheet">
      <div class="msr-bottom-sheet__overflow">
        <div class="msr-bottom-sheet__content">
          <div class="msr-bottom-sheet__handle"></div>
          <div class="msr-bottom-sheet__title msr-heading">
            <slot name="heading">
              <h4>{{ title }}</h4>
            </slot>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Theme, type OverlayContext, InjectedKeys } from "../../types";

export default defineComponent({
  name: "BottomSheet",
  inject: {
    theme: {
      from: InjectedKeys.theme
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 377
    },
    dismissible: {
      type: Boolean
    }
  },
  emits: {
    context(ctx: OverlayContext) {
      return ctx;
    }
  },
  data() {
    return {
      _isShown: false,
    }
  },
  computed: {
    _height() {
      return this.height + "px";
    },
    _backdropColour() {
      return (this as any)['theme'] == Theme.dark ? "#ffffff21" : "#00000036";
    },
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
      if (this.dismissible) {
        let sheet = this.$refs.sheet as HTMLElement;

        if (e.target == sheet || e.composedPath().includes(sheet)) {
          return;
        }

        this._isShown = false;
      }
    }
  },
  mounted() {
    let ctx: OverlayContext = {
      show: this.show,
      hide: this.hide,
    }

    this.$emit("context", ctx);
  }
})
</script>

<style scoped>
.msr-bottom-sheet__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 888;

  transition: all 300ms ease-in-out;
}

.msr-bottom-sheet__wrapper[show="false"] {
  visibility: hidden;
  background-color: transparent;
}

.msr-bottom-sheet__wrapper[show="true"] {
  background-color: v-bind(_backdropColour);
}

.msr-bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  max-width: 640px;
  margin: 0px auto;

  background-color: v-bind(_backgroundColour);
  box-shadow: 0px -5px 34px 0px v-bind(_backdropColour);

  border-radius: 21px 21px 0px 0px;
  transition: all 150ms ease-out;
}

.msr-bottom-sheet__wrapper[show="false"] .msr-bottom-sheet {
  height: 0px;
}

.msr-bottom-sheet__wrapper[show="true"] .msr-bottom-sheet {
  max-height: 89vh;
  height: v-bind(_height);
  overflow: hidden;
}

.msr-bottom-sheet .msr-bottom-sheet__handle {
  width: 48px;
  height: 7px;
  border-radius: 5px;

  margin: 13px auto;

  background-color: #7d7d7d;
}

.msr-bottom-sheet .msr-bottom-sheet__title {
  font-weight: bold;
  font-size: 1.313rem;
  line-height: 1.75rem;

  margin-bottom: 13px;
}

.msr-bottom-sheet .msr-bottom-sheet__overflow {
  max-height: 89vh;
  overflow-y: auto;
  height: v-bind(_height);
}

.msr-bottom-sheet .msr-bottom-sheet__content {
  display: flex;
  flex-direction: column;
  padding: 0px 21px;

  height: v-bind(_height);
}
</style>