<template>
  <div class="msr-snackbar" :show="_isShown">
    <h4 class="msr-snackbar__message">{{ message }}</h4>

    <div class="msr-snackbar__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { InformativeContext } from "./index";

export default defineComponent({
  name: "Snackbar",
  props: {
    message: {
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
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent', 'success', 'danger', 'warning']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  emits: {
    context(ctx: InformativeContext) {
      return ctx;
    }
  },
  data() {
    return {
      _isShown: false,
      _timer: null as number | null
    }
  },
  computed: {
    _backgroundColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.backgroundColour)) {
        return `rgb(var(--${this.backgroundColour}))`;
      } else {
        return this.backgroundColour;
      }
    },
    _shadowColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.backgroundColour)) {
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