<template>
  <div class="parent">
      Hello, Parent!
      <div class="child">
          Hello, Child!
      </div>
  </div>
  <div>
    <p>Times clicked: {{ _getCount() }} | 2x: {{ _getDoubleCount() }}</p>
    <button class="h-10 bg-slate-300 px-3 rounded-lg" @click="_increment">increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCounterStore } from '../stores/counter';

export default defineComponent({
  setup() {
    const counterStore = useCounterStore();
    return { counterStore };
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    _getCount() {
      return this.counterStore.counter;
    },
    _getDoubleCount() {
      return this.counterStore.doubleCount;
    },
    _increment() {
      this.counterStore.increment();
    }
  }
})
</script>

<style scoped lang="scss">
  .parent {
    background: #f0f0f0;
    padding: 10px;
    
    &:hover {
      background: #e0e0e0;
    }
    
    .child {
      background: #b8b8b8;
      height: 100px;
      
      &:hover {
        background: #a8a8a8;
      }
    }
  }
</style>