<script setup lang="ts">
import type { InformativeContext } from "./types";
import Component from "./components/informative/Banner.vue";
import Button from "./components/button/TextButton.vue";

function show(val: any) {
  console.log(val)
}
let context: InformativeContext;
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
  <div>
    <!-- <Component content="This is a alert dialog" @context="ctx => context = ctx">
      <template #actions>
        <Button label="Cancel"></Button>
        <Button label="Ok"></Button>
      </template>
    </Component>
    <Button label="Show" @click="() => context.show()"></Button>-->
    <!-- <AlertDialog content="This is a alert dialog" @context="ctx => context = ctx"></AlertDialog>
    <BigButton label="Show" @click="context.show()"></BigButton>-->
    <div>
      <!-- <Component :dataframe="df">
        <template #Age="{ data }">
        </template>
      </Component>-->
    </div>
  </div>
</template>

<style>
@import "./styles/reset.css";

:root {
  --primary: 23, 105, 255;
  --accent: 131, 72, 255;
  --success: 62, 238, 145;
  --warning: 255, 192, 0;
  --danger: 255, 89, 89;
}
</style>