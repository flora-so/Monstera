<script lang="ts" setup>
/* Imports */
import { computed, provide } from "vue";

// import ProgressIndicator from "../ProgressIndicator/ProgressIndicator.vue";
// import MonsteraSnackbar from "../MonsteraSnackbar/MonsteraSnackbar.vue";

import { Theme, ThemeMode, ThemeData, Colour, InjectedKeys, FontWeight } from "../../types";



/* States */
const props = withDefaults(defineProps<{
  themeMode?: ThemeMode,
  themeData?: ThemeData,
  darkThemeData?: ThemeData,
}>(), {
  themeMode: ThemeMode.system
});

// const state = reactive({
//   loading: false,
// });



/* Computed */
const theme = computed(() => {
  if (props.themeMode == ThemeMode.light) {
    return Theme.light;
  } else if (props.themeMode == ThemeMode.dark) {
    return Theme.dark;
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.dark;
    } else {
      return Theme.light
    }
  }
});

const _ptd = computed(() => ({
  [Theme.light]: props.themeData,
  [Theme.dark]: props.darkThemeData
}));

const _td = computed<ThemeData>(() => ({
  theme: theme.value,
  colourScheme: {
    primary: _ptd.value[theme.value]?.colourScheme?.primary ?? new Colour("#1769FF"),
    secondary: _ptd.value[theme.value]?.colourScheme?.secondary ?? new Colour("#8348FF"),
    tertiary: _ptd.value[theme.value]?.colourScheme?.tertiary ?? new Colour("#3EEE91"),
    info: _ptd.value[theme.value]?.colourScheme?.info ?? new Colour("#1769FF"),
    success: _ptd.value[theme.value]?.colourScheme?.success ?? new Colour("#3EEE91"),
    warning: _ptd.value[theme.value]?.colourScheme?.warning ?? new Colour("#FFC000"),
    danger: _ptd.value[theme.value]?.colourScheme?.danger ?? new Colour("#FF5959"),
    background: _ptd.value[theme.value]?.colourScheme?.background ??
      (theme.value == Theme.light ? new Colour("#ffffff") : new Colour("#131313")),
  },
  typography: {
    title: {
      fontFamily: _ptd.value[theme.value]?.typography?.title?.fontFamily ?? ["Verdana", "Geneva", "Tahoma", "sans-serief"],
      fontSize: _ptd.value[theme.value]?.typography?.title?.fontSize ?? "1.5rem",
      fontWeight: _ptd.value[theme.value]?.typography?.title?.fontWeight ?? FontWeight.bold,
      letterSpacing: _ptd.value[theme.value]?.typography?.title?.letterSpacing ?? "normal",
      lineHeight: _ptd.value[theme.value]?.typography?.title?.lineHeight ?? "2rem",
      colour: _ptd.value[theme.value]?.typography?.title?.colour ??
        (theme.value == Theme.light ? new Colour("#000000") : new Colour("#ffffff")),
    },
    heading: {
      fontFamily: _ptd.value[theme.value]?.typography?.heading?.fontFamily ?? ["Verdana", "Geneva", "Tahoma", "sans-serief"],
      fontSize: _ptd.value[theme.value]?.typography?.heading?.fontSize ?? "1.125rem",
      fontWeight: _ptd.value[theme.value]?.typography?.heading?.fontWeight ?? FontWeight.medium,
      letterSpacing: _ptd.value[theme.value]?.typography?.heading?.letterSpacing ?? "normal",
      lineHeight: _ptd.value[theme.value]?.typography?.heading?.lineHeight ?? "1.75rem",
      colour: _ptd.value[theme.value]?.typography?.heading?.colour ?? new Colour("#1769FF"),
    },
    body: {
      fontFamily: _ptd.value[theme.value]?.typography?.body?.fontFamily ?? ["Arial", "Helvetica", "sans-serief"],
      fontSize: _ptd.value[theme.value]?.typography?.body?.fontSize ?? "1rem",
      fontWeight: _ptd.value[theme.value]?.typography?.body?.fontWeight ?? FontWeight.normal,
      letterSpacing: _ptd.value[theme.value]?.typography?.body?.letterSpacing ?? "normal",
      lineHeight: _ptd.value[theme.value]?.typography?.body?.lineHeight ?? "1.5rem",
      colour: _ptd.value[theme.value]?.typography?.body?.colour ??
        (theme.value == Theme.light ? new Colour("#000000") : new Colour("#ffffff")),
    },
    label: {
      fontFamily: _ptd.value[theme.value]?.typography?.label?.fontFamily ?? ["Arial", "Helvetica", "sans-serief"],
      fontSize: _ptd.value[theme.value]?.typography?.label?.fontSize ?? "1rem",
      fontWeight: _ptd.value[theme.value]?.typography?.label?.fontWeight ?? FontWeight.medium,
      letterSpacing: _ptd.value[theme.value]?.typography?.label?.letterSpacing ?? "normal",
      lineHeight: _ptd.value[theme.value]?.typography?.label?.lineHeight ?? "1.5rem",
      colour: _ptd.value[theme.value]?.typography?.label?.colour ?? new Colour("#ffffff"),
    }
  }
}));




provide(InjectedKeys.theme, theme);
</script>

<template>
  <main class="msr-app" v-bind="$attrs">
    <slot></slot>
    <!-- <progress-indicator v-if="loading" infinite></progress-indicator>
    <monstera-snackbar :content="snackbar.content" :background-colour="snackbar.colour"
      @context="(ctx) => snackbar.context = ctx"></monstera-snackbar> -->
  </main>
</template>

<style>
.msr-app {
  --primary: v-bind("_td.colourScheme?.primary?.value");
  --secondary: v-bind("_td.colourScheme?.secondary?.value");
  --tertiary: v-bind("_td.colourScheme?.tertiary?.value");
  --info: v-bind("_td.colourScheme?.info?.value");
  --success: v-bind("_td.colourScheme?.success?.value");
  --warning: v-bind("_td.colourScheme?.warning?.value");
  --danger: v-bind("_td.colourScheme?.danger?.value");
  --background: v-bind("_td.colourScheme?.background?.value");

  font-family: v-bind("_td.typography?.body?.fontFamily?.join(',')");
  font-weight: v-bind("_td.typography?.body?.fontWeight");
  font-size: v-bind("_td.typography?.body?.fontSize");

  color: v-bind("_td.typography?.body?.colour?.value");
  background-color: var(--background);

  line-height: v-bind("_td.typography?.body?.lineHeight");
  letter-spacing: v-bind("_td.typography?.body?.letterSpacing");

  transition: all 500ms ease-in-out;

  height: 100vh;
  width: 100vw;

  overflow: auto;
}

.msr-title {
  font-family: v-bind("_td.typography?.title?.fontFamily?.join(',')");
  font-weight: v-bind("_td.typography?.title?.fontWeight");
  font-size: v-bind("_td.typography?.title?.fontSize");

  color: v-bind("_td.typography?.title?.colour?.value");

  line-height: v-bind("_td.typography?.title?.lineHeight");
  letter-spacing: v-bind("_td.typography?.title?.letterSpacing");
}

.msr-heading {
  font-family: v-bind("_td.typography?.heading?.fontFamily?.join(',')");
  font-weight: v-bind("_td.typography?.heading?.fontWeight");
  font-size: v-bind("_td.typography?.heading?.fontSize");

  color: v-bind("_td.typography?.heading?.colour?.value");

  line-height: v-bind("_td.typography?.heading?.lineHeight");
  letter-spacing: v-bind("_td.typography?.heading?.letterSpacing");
}

.msr-label {
  font-family: v-bind("_td.typography?.label?.fontFamily?.join(',')");
  font-weight: v-bind("_td.typography?.label?.fontWeight");
  font-size: v-bind("_td.typography?.label?.fontSize");

  color: v-bind("_td.typography?.label?.colour?.value");

  line-height: v-bind("_td.typography?.label?.lineHeight");
  letter-spacing: v-bind("_td.typography?.label?.letterSpacing");
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #7f7f7f1a;
}

::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #7f7f7f7f;
}



/* Reset CSS */
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
}

::before,
::after {
  --tw-content: "";
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
*/
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/
body {
  margin: 0;
  line-height: inherit;
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/
b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font family by default.
2. Correct the odd `em` font sizing in all browsers.
*/
code,
kbd,
samp,
pre {
  font-family: ui-monospace, monospace;
  font-size: 1em;
}

/*
Add the correct font size in all browsers.
*/
small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/
button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

/*
Use the modern Firefox focus style for all focusable elements.
*/
:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/
:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

/*
Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/
textarea {
  resize: vertical;
}

/*
Set the default cursor for buttons.
*/
button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
img,
video {
  max-width: 100%;
  height: auto;
}

/*
Ensure the default browser behavior of the `hidden` attribute.
*/
[hidden] {
  display: none;
}
</style>