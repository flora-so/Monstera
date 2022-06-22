# Informative

## Alert Dialog

### Import

```jsx
import { AlertDialog } from "monsetra-vue/dist/informative";
```

### Usage

```html
<alert-dialog
  title="Alert Dialog"
  content="This is an alert dialog!"
  @context="ctx => ctx_alertDialog = ctx"
></alert-dialog>
```

### Parameters

### `title`

* Type: `String`
* Default: `""`

Sets the title of the alert dialog

### `content`

* Type: `String`
* Default: `""`

Sets the content of the alert dialog

### Slots

### `#content`

* Customise the content of the alert dialog
* **Implementation**
  ```html
  <alert-dialog title="Alert Dialog" content="This is an alert dialog.">
  	<template #content>
  		<span>Hey, I am a customised content!</span>
    </template>
  </alert-dialog>
  ```

### `#action`

* Customise the action of the alert dialog
* **Implementation**
  ```html
  <alert-dialog title="Alert Dialog" content="This is an alert dialog.">
  	<template #action>
  		<text-button @click="ctx_alertDialog.hide()" label="X"></text-button>
    </template>
  </alert-dialog>
  ```

### Emits

### **`@context`**

* Returns an object of functions that can be used for the alert dialog component
  * `show`: Show the alert dialog
  * `hide`: Hide the alert dialog

Emitted during the mounted hook cycle

## Banner

### Import

```jsx
import { Banner } from "monsetra-vue/dist/informative";
```

### Usage

```html
<banner
  title="Banner"
  content="This is a banner!"
  :duration="5000"
  @context="ctx => ctx_banner = ctx"
></banner>
```

### Parameters

### `title`

* Type: `String`
* Default: `""`

Sets the title of the banner

### `content`

* Type: `String`
* **Required**

Sets the content of the banner

### **`colour`**

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the banner

### `duration`

* Type: `Number`
* **Optional**

Sets the duration that the banner is displayed in `ms`

### Slots

### `#leading`

* Add elements to be displayed at the left side of the banner
* **Implementation**
  ```html
  <banner title="Banner" content="This is a Banner!">
  	<template #leading>
  		<warning-icon></warning-icon>
    </template>
  </banner>
  ```

### `#action`

* Customise the action of the banner
* **Implementation**
  ```html
  <banner title="Banner" content="This is a Banner!">
  	<template #action>
  		<text-button @click="ctx_banner.hide()" label="X"></text-button>
    </template>
  </banner>
  ```

### Emits

### **`@context`**

* Returns an object of functions that can be used for the banner component
  * `show`: Show the banner
  * `hide`: Hide the banner

Emitted during the mounted hook cycle

## Circle Progress

### Import

```jsx
import { CircleProgress } from "monsetra-vue/dist/informative";
```

### Usage

```html
<circle-progress
  :colour="Colours.primary"
  :size="64"
  :thickness="6"
></circle-progress>
```

### Parameters

### **`colour`**

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the circle progress

### `size`

* Type: `Number`
* Default: `64`

Sets the size of the circle progress in `px`

### `thickness`

* Type: `Number`
* Default: `6`

Sets the thickness of the circle progress in `px`

## Progress Indicator

### Import

```jsx
import { ProgressIndicator } from "monsetra-vue/dist/informative";
```

### Usage

```html
<progress-indicator
  :colour="Colours.primary"
  :value="0.75"
  :infinite="false"
></progress-indicator>
```

### Parameters

### **`colour`**

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the progress indicator

### `value`

* Type: `Number`
* Default: `0`

Sets the progress of the progress indicator (`0 <= value <= 1`)

### `infinite`

* Type: `Boolean`
* **Optional**

Sets if the progress indicators acts as a linear loader

## Snackbar

### Import

```jsx
import { Snackbar } from "monsetra-vue/dist/informative";
```

### Usage

```html
<snackbar
  content="This is a snackbar!"
  colour="#ffffff"
  :duration="4000"
  :background-colour="Colours.primary"
></snackbar>
```

### Parameters

### `content`

* Type: `String`
* **Required**

Sets the content of the snackbar

### **`colour`**

* Type: `String` (hex code)
* Default: `#ffffff`

Sets the colour of the snackbar

### `duration`

* Type: `Number`
* Default: `4000`

Sets the duration that the snackbar is displayed in `ms`

### **`background-colour`**

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the background colour of the snackbar
