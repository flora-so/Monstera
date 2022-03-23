<script setup lang="ts">
import type { SnackbarContext } from "./components/informative";
import Component from "./components/informative/Snackbar.vue";
import Button from "./components/button/SmallButton.vue";

function show(val: any) {
  console.log(val)
}

let context: SnackbarContext;

// const df = new DataFrame(
//   ["Id", "Name", "Age"],
//   [
//     {
//       Id: 1,
//       Name: "John",
//       Age: 20,
//     },
//     {
//       Id: 2,
//       Name: "Jane",
//       Age: 21,
//     }
//   ]
// )
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div>
      <Component message="This is a snackbar" @context="ctx => context = ctx" />

      <Button label="Show" @click="() => context.show()"></Button>

      <!-- <Component :dataframe="df">
        <template #Age="{ data }">
        </template>
      </Component>-->
    </div>
  </div>
</template>

<style>
:root {
  --primary: 23, 105, 255;
  --accent: 131, 72, 255;
  --success: 62, 238, 145;
  --warning: 255, 192, 0;
  --danger: 255, 89, 89;
}
</style>