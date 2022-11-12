<script lang="ts" setup>
import { inject } from "vue";
import { SmallButton } from "../package/src/index";
import { InjectedKeys } from "../package/src/types";

const loading: Function = inject(InjectedKeys.loading)!;
</script>

<template>
  <div>
    <h1>Loading: {{ loading() }}</h1>
    <small-button label="Toggle Loading" @click="() => loading(!loading())"></small-button>
  </div>
</template>