<template>
  <div class="msr-banner" :show="_isShown">
    <div class="msr-banner__content">
      <slot name="leading"></slot>
      <div>
        <h4 class="msr-banner__title">{{ title }}</h4>
        <p class="msr-banner__content">{{ content }}</p>
      </div>
    </div>

    <div class="msr-banner__action">
      <slot name="action">
        <text-button :colour="colour" @click="_hide" label="Ok"></text-button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type InformativeContext, Colours } from "../../types";
import TextButton from "../button/TextButton.vue";

export default defineComponent({
  name: "Banner",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
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
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.colour)) {
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
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  padding: 13px;
  margin: 13px;
  color: v-bind(_colour);

  transform-origin: top;

  border-radius: 8px;
  background-color: v-bind(_backgroundColour);

  transition: all ease-out 300ms;
}

.msr-banner[show="false"] {
  display: flex;

  max-height: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0px;

  border: 0px solid transparent;
}

.msr-banner[show="true"] {
  display: flex;

  max-height: 233px;

  border: 1px solid v-bind(_colour);
}

.msr-banner .msr-banner__content {
  display: flex;
  align-items: center;
}

.msr-banner .msr-banner__content .msr-banner__title {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>