<template>
  <div class="msr-list-view">
    <ul>
      <li class="msr-list-view__item" v-for="(data, index) of dataframe.data" :key="index">
        <div class="msr-list-view__image" :image="image">
          <list-view-image :src="(data[image] as string)" :value="data" v-model="_selected"></list-view-image>
        </div>
        <div class="msr-list-view__content">
          <h4>{{ data[title] }}</h4>
          <span :subtitle="subtitle">{{ data[subtitle] }}</span>
          <p :description="description">{{ data[description] }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type DataFrame, Colours } from "../../types";
import ListViewImage from "./ListViewImage.vue";

export default defineComponent({
  name: "ListView",
  components: {
    ListViewImage,
  },
  props: {
    dataframe: {
      type: Object as PropType<DataFrame>,
      required: true,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    checkbox: Boolean,
  },
  data() {
    return {
      _selected: {} as { [key: number]: object },
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
        return `rgba(var(--${this.colour}), 0.13)`;
      } else {
        return `${this.colour}21`;
      }
    },
  },
});
</script>

<style scoped>
.msr-list-view {
  width: 100%;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content h4 {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.msr-list-view ul .msr-list-view__item {
  display: flex;
  align-items: center;

  padding: 8px 13px;
  margin: 8px 0px;
  cursor: pointer;
}

.msr-list-view ul .msr-list-view__item:hover {
  border-radius: 13px;
  /* background-color: v-bind(_backgroundColour); */
  background-color: #7d7d7d21;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__image {
  margin-right: 8px;
  border-radius: 55px;
  overflow: hidden;
}

/* .msr-list-view ul .msr-list-view__item .msr-list-view__image img {
  width: 55px;
  height: 55px;
} */

.msr-list-view ul .msr-list-view__item .msr-list-view__image[image=""] {
  display: none;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content span {
  font-size: 1rem;
  line-height: 1.25rem;
  color: #7d7d7d;
}
</style>