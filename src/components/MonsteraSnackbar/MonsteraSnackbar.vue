<template>
  <div class="msr-snackbar" :show="_isShown" ref="snackbar"
    @touchstart="event => _startY = event.changedTouches[0].clientY" @mousedown="event => _startY = event.clientY"
    @touchend="event => _handleDismiss(event.changedTouches[0].clientY)"
    @mouseleave="event => _handleDismiss(event.clientY)">
    <h4 class="msr-snackbar__content">{{ content }}</h4>

    <div class="msr-snackbar__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Colours, type OverlayContext } from "../../types";

export default defineComponent({
  name: "Snackbar",
  props: {
    content: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      default: () => "#ffffff",
      validator: (value: string) => new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    duration: {
      type: Number,
      default: () => 4000
    },
    backgroundColour: {
      type: String,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
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
      _timer: null as ReturnType<typeof setTimeout> | null,
      _startY: 0
    }
  },
  computed: {
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.backgroundColour)) {
        return `rgb(var(--${this.backgroundColour}))`;
      } else {
        return this.backgroundColour;
      }
    },
    _shadowColour() {
      if (Object.keys(Colours).includes(this.backgroundColour)) {
        return `rgba(var(--${this.backgroundColour}), 0.34)`;
      } else {
        return `${this.backgroundColour}57`;
      }
    },
  },
  methods: {
    _show() {
      this._isShown = true;

      if (this._timer == null) {
        this._timer = setTimeout(this._hide, this.duration);
      }
    },
    _hide() {
      this._isShown = false;
      this._timer = null;
    },
    _handleDismiss(endY: number) {
      if (endY > this._startY && window.innerWidth <= 768) {
        this._hide();
      }

      if (endY < this._startY && window.innerWidth > 768) {
        this._hide();
      }

      this._startY = 0;
    }
  },
  mounted() {
    let ctx: OverlayContext = {
      show: this._show,
      hide: this._hide,
    }

    this.$emit("context", ctx);
  }
});
</script>

<style scoped>
.msr-snackbar {
  position: fixed;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 8px;
  width: 100%;
  max-width: 377px;
  padding: 8px 8px 8px 16px;
  margin: 13px auto;

  color: v-bind(colour);
  font-size: 1.125rem;
  line-height: 1.5rem;

  background-color: v-bind(_backgroundColour);
  box-shadow: 0px 2px 13px v-bind(_shadowColour);

  transition: all ease-out 300ms;
}

.msr-snackbar[show="false"] {
  bottom: -13%;
}

.msr-snackbar[show="true"] {
  bottom: 0;
}

@media (min-width: 768px) {
  .msr-snackbar {
    bottom: unset !important;
    left: unset;
    margin: 13px;
  }

  .msr-snackbar[show="false"] {
    top: -13%;
  }

  .msr-snackbar[show="true"] {
    top: 0;
  }
}

.msr-snackbar .msr-snackbar__action {
  min-height: 34px;
  min-width: 34px;
}
</style>