<script setup lang="ts">
import { reactive, inject } from "vue";

import Example from "./Example.vue";

import {
  type OverlayContext,
  DataFrame,
  type DropdownItem,
  DropdownAlignment,
  Colours,
  InputType,
  Theme,
  DropdownPosition,
  type InputValidator,
  type ActionItem,
} from "../package/src/types/index";

// Buttons
import {
  BigButton,
  LinkButton,
  OutlinedButton,
  SmallButton,
  TextButton,
  IconButton,
  TabButton
} from "../package/src/index";

// Content
import {
  DataTable,
  FloatingCard,
  OutlinedCard,
  MonsetraTag,
  ListView,
} from "../package/src/index";

// Informative
import {
  MonsetraDialog,
  MonsetraBanner,
  ProgressIndicator,
  MonsetraSnackbar,
  BottomSheet,
  CircularProgress
} from "../package/src/index";

// Inputs
import {
  MonsetraApp,
  AnimatedInput,
  AnimatedDateInput,
  MonsetraCheckbox,
  ChoiceChips,
  DropdownList,
  DropdownListItem,
  StaticInput,
  ToggleSwitch,
  StaticSelect,
  AnimatedSelect,
  StaticTextarea,
  StaticDatalist,
  StaticDateInput,
  AnimatedDatalist,
  AnimatedTextarea,
  RadioButton,
} from "../package/src/index";

let state = reactive({
  isDark: false
});

let data = reactive({
  value: "test",
  select: "item-1"
});


const tableData = new DataFrame(
  ["column1", "column-2", "column_3"],
  [
    { "id": "1", "column1": "Row 1", "column-2": "Row 1", "column_3": "Row 1", "image": "https://avatars.dicebear.com/api/micah/row-1.svg" },
    { "id": "2", "column1": "Row 2", "column-2": "Row 2", "column_3": "Row 2", "image": "https://avatars.dicebear.com/api/micah/row-2.svg" },
    { "id": "3", "column1": "Row 3", "column-2": "Row 3", "column_3": "Row 3", "image": "https://avatars.dicebear.com/api/micah/row-3.svg" },
  ]
);

const selected = reactive({ items: [] });

const dropdownItems = [
  { label: "Item 1", value: "item-1" },
  { label: "Item 2", value: "item-2" },
  { label: "Item 3", value: "item-3" }
] as DropdownItem[];

const actionItems = [
  { label: "Action 1", method: (data) => console.log(data, "one") },
  { label: "Action 2", method: (data) => console.log(data, "two") },
  { label: "Action 3", method: (data) => console.log(data, "three") }
] as ActionItem[];

let ctx_alertDialog: OverlayContext;
let ctx_banner: OverlayContext;
let ctx_snackbar: OverlayContext;
let ctx_modal: OverlayContext;
let ctx_bottomSheet: OverlayContext;

let emailValidator: InputValidator = (value: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return ""
  } else {
    return "Invalid email address"
  }
}

let showMsg = () => {
  console.log("hello");
}

let log = (value: any) => {
  console.log(value);
}
</script>

<template>
  <monsetra-app :theme="state.isDark ? Theme.dark : Theme.light">


    <header>
      <progress-indicator :colour="Colours.primary" :value="0.1"></progress-indicator>

      <toggle-switch class="cpt-margin" label="Dark Theme" :colour="Colours.primary" v-model="state.isDark">
      </toggle-switch>
    </header>

    <div id="main">
      <div class="container">
        <example></example>
        <!-- ===== Buttons ===== -->

        <big-button label="Big Button" colour="#ffffff" :backgroundColour="Colours.primary">
        </big-button>

        <div class="flex cpt-space-x cpt-margin">
          <icon-button :colour="Colours.primary" filled>
            <template #icon="{ width, height, colour }">
              <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </template>
          </icon-button>

          <icon-button :colour="Colours.primary">
            <template #icon="{ width, height, colour }">
              <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </template>
          </icon-button>

          <icon-button :colour="Colours.primary" filled>
            <template #icon="{ width, height, colour }">
              <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clip-rule="evenodd" />
              </svg>
            </template>
          </icon-button>

        </div>
        <div class="flex">
          <tab-button label="Tab 1"></tab-button>
          <tab-button label="Tab 2"></tab-button>
        </div>

        <link-button class="cpt-margin" label="Link Button" :colour="Colours.primary"></link-button>

        <outlined-button class="cpt-margin" label="Outlined Button" :colour="Colours.primary" @click="showMsg">
        </outlined-button>

        <small-button class="cpt-margin" label="Small Button" colour="#ffffff" :background="Colours.primary">
        </small-button>

        <text-button class="cpt-margin" label="Text Button" :colour="Colours.primary"></text-button>

        <hr class="divider" />

        <!-- ===== Content ===== -->

        {{ selected.items }}
        <small-button label="Reset" @click="selected.items = []"></small-button>

        <data-table class="cpt-margin" :dataframe="tableData" :colour="Colours.primary" :focus-col="0"
          :actions="actionItems" v-model="selected.items" checkbox full-width pagination :row-count="1"
          @change="value => log(`@change: ${value}`)" @row="value => log(`@row: ${value}`)">
          <template #column_3="{ data, row }">
            <span>${{ data }} - {{ row.column1 }}</span>
          </template>
        </data-table>


        <list-view :dataframe="tableData" title="column1" subtitle="column-2" description="column_3" image="image"
          :actions="actionItems" v-model="selected.items" checkbox divider>
        </list-view>

        <floating-card class="cpt-margin" hover>
          <h1>
            <b>Floating Card</b>
          </h1>
          <p>Hey, I am inside an floating card!</p>
        </floating-card>

        <outlined-card class="cpt-margin" hover>
          <h1>
            <b>Outlined Card</b>
          </h1>
          <p>Hey, I am inside an outlined card!</p>
        </outlined-card>

        <monsetra-tag label="Tag"></monsetra-tag>

        <outlined-button @click="ctx_bottomSheet.show()" class="cpt-margin" label="Bottom Sheet" />

        <hr class="divider" />

        <!-- ===== Inputs ===== -->

        <animated-input class="cpt-margin" label="Animated Text Field" :colour="Colours.primary" :type="InputType.email"
          :validator="emailValidator" v-model="data.value">
          <template #leading="{ width, height, colour }">
            <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                clip-rule="evenodd"></path>
            </svg>
          </template>
          <template #trailing="{ width, height, colour }">
            <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"></path>
            </svg>
          </template>
        </animated-input>

        <static-input class="cpt-margin" label="Static Text Field" :colour="Colours.primary" :type="InputType.email"
          :validator="emailValidator" v-model="data.value">
        </static-input>

        <animated-date-input label="Animated Date Input"></animated-date-input>
        <static-date-input label="Static Date Input"></static-date-input>

        <!-- <div> -->
        <monsetra-checkbox class="cpt-margin" :colour="Colours.primary" :size="18" checked></monsetra-checkbox>
        <!-- </div> -->

        <choice-chips class="cpt-margin" label="Chips" group="chips" :colour="Colours.primary"></choice-chips>

        <dropdown-list :alignment="DropdownAlignment.left" :position="DropdownPosition.left" :items="dropdownItems"
          :colour="Colours.primary" @change="item => log(item)">
          <outlined-button label="Dropdown" :colour="Colours.primary"></outlined-button>

          <template #item-3="{ item, click }">
            <hr>
            <dropdown-list-item :item="item" :colour="Colours.danger" @click="click"></dropdown-list-item>
          </template>
        </dropdown-list>

        <toggle-switch class="cpt-margin" label="Switch" :colour="Colours.primary" checked></toggle-switch>

        <static-select class="cpt-margin" label="Static Select Field" :items="dropdownItems" v-model="data.select">
        </static-select>

        <animated-select label="Animated Select Field" :items="dropdownItems" v-model="data.select">
        </animated-select>

        <animated-textarea label="Animated Textarea">
        </animated-textarea>
        <static-textarea label="Static Textarea" resizable></static-textarea>

        <animated-datalist label="Animated Datalist" :items="dropdownItems" v-model="data.select"></animated-datalist>

        <static-datalist label="Static Datalist" :items="dropdownItems" v-model="data.select">
        </static-datalist>

        <radio-button label="One"></radio-button>
        <radio-button label="Two"></radio-button>

        {{ data.select }}

        <hr class="divider" />

        <!-- ===== Informative ===== -->

        <outlined-button @click="ctx_alertDialog.show()" class="cpt-margin" label="Alert Dialog" />

        <outlined-button @click="ctx_banner.show()" class="cpt-margin" label="Banner" />
        <monsetra-banner title="Banner" content="This is a banner." :colour="Colours.primary" :duration="5000"
          @context="ctx => ctx_banner = ctx"></monsetra-banner>

        <circular-progress></circular-progress>

        <outlined-button @click="ctx_snackbar.show()" class="cpt-margin" label="Snackbar" />
      </div>
    </div>

    <monsetra-dialog title="Alert Dialog" content="This is an alert dialog." @context="ctx => ctx_alertDialog = ctx">
    </monsetra-dialog>

    <bottom-sheet title="Bottom Sheet" @context="ctx => ctx_bottomSheet = ctx" dismissible :height="677">
      <p>Hello world</p>
    </bottom-sheet>

    <monsetra-snackbar class="cpt-margin" content="This is a snackbar." colour="#ffffff"
      :backgroundColour="Colours.primary" :duration="5000" @context="ctx => ctx_snackbar = ctx"></monsetra-snackbar>
  </monsetra-app>
</template>

<style>
@import "./styles/reset.css";

#main>.container {
  max-width: 677px;
  margin: 0px auto;

  /* display: flex;
  flex-direction: column; */
}

#main>.container>* {
  margin: 34px 0px;
}

.flex {
  display: flex;
}

/* .cpt-margin {
  margin: 2rem 0;
}

.divider {
  width: 50%;
  color: grey;
}


.cpt-space-x {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cpt-space-x>*+* {
  margin-left: 1rem;
} */

header {
  position: fixed;
  top: 0;
  right: 0;

  margin: 13px;
}
</style>