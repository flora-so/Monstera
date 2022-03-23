<template>
  <div class="msr-banner" :show="_isShown">
    <div class="msr-banner__content">
      <slot name="leading"></slot>
      <h4>{{ content }}</h4>
    </div>

    <div class="msr-banner__action">
      <slot name="action">
        <TextButton :colour="colour" @click="_hide" label="Ok" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { InformativeContext } from "./index";
import TextButton from "../button/TextButton.vue";

export default defineComponent({
  name: "Banner",
  props: {
    content: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent', 'success', 'danger', 'warning']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    duration: Number,
  },
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
      _timer: null as number | null
    }
  },
  computed: {
    _colour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
  },
  methods: {
    _show() {
      this._isShown = true;

      if (this.duration) {
        if (this._timer == null) {
          this._timer = setTimeout(this._hide, this.duration);
        }
      }
    },
    _hide() {
      this._isShown = false;
      this._timer = null;
    }
  },
  mounted() {
    let ctx: InformativeContext = {
      show: this._show,
      hide: this._hide,
    }

    this.$emit("context", ctx);
  }
});
</script>

<style>
.msr-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 13px;
  margin: 13px;
  color: v-bind(_colour);

  transform-origin: top;

  border-radius: 8px;
  border: 1px solid v-bind(_colour);
  background-color: v-bind(_backgroundColour);

  transition: all ease-out 300ms;
}

.msr-banner[show="false"] {
  transform: scaleY(0);
}

.msr-banner[show="true"] {
  transform: scaleY(1);
}

.msr-banner .msr-banner__content {
  display: flex;
  align-items: center;
}
</style>