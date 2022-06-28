# Input

## Animated Select Field

### Import

```jsx
import { AnimatedSelectField } from "monsetra-vue/dist/input";
```

### Usage

```html
<animated-select-field
  label="Animated Select Field"
  :items="dropdownItems"
  :colour="Colours.primary"
  v-model="value"
  @change="item => fn(item)"
></animated-select-field>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the select field

### `items`

* Type: `Array` of `DropdownItem`
* **Required**

Sets the list of items to be selected

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the dropdown list items

### `v-model`

* Returns the value of the selected field

Emitted when a user clicks a dropdown item

### Slots

### `#item.value`

* Customise the dropdown list item of a particular value
* **Implementation**
  ```html
  <animated-select-field :items="dropdownItems">
    <template #item-3="{item,click}">
      <hr>
      <dropdown-list-item
        :item="item"
        :colour="Colours.danger"
        @click="click"
       ></dropdown-list-item>
    </template>
  </animated-select-field>
  ```

### Emits

### `@change`

* Returns the value of the selected field

Emitted when a user clicks a dropdown item

## Animated Text Field

### Import

```jsx
import { AnimatedTextField } from "monsetra-vue/dist/input";
```

### Usage

```html
<animated-text-field
  label="Animated Text Field"
  :colour="Colours.primary"
  :type="TextFieldType.email"
  :validator="emailValidator"
  value="me@example.com"
  :disabled="false"
  helper-text="Input your email"
  v-model="value"
  @blur="value => fn(value)"
  @context="ctx => ctx_animatedTextField = ctx"
></animated-text-field>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the text field

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the text field

### `type`

* Type: `String` as `TextFieldType`
* Default: `TextFieldType.text`

Sets the type of text input

### `validator`

* Type: `Function` as `TextFieldValidator`
* **Optional**

Create a custom input validator

### `value`

* Type: `String`
* **Optional**

Sets the value of the input

### `disabled`

* Type: `Boolean`
* **Optional**

Sets if users can interact with the input text field

### `helper-text`

* Type: `String`
* **Optional**

Creates a small helper text to guide the user about the input

### `v-model`

* Returns the value of the text field

Emitted when a user is typing on the input text field

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

### `@blur`

* Returns the value of the text field

Emitted when a user exits focus from the text field

### `@context`

* Returns an object of functions that can be used for the text field component
  * `getValue`: Gets the value of the text field
  * `forceFocus`: Forcibly focus on the text field
  * `validate`: Validates the value of the text field
  * `setError`: Sets the message for the error

Emitted during the mounted hook cycle

## Checkbox

### Import

```jsx
import { checkbox } from "monsetra-vue/dist/input";
```

### Usage

```html
<checkbox
  :colour="Colours.primary"
  size="18"
  value="checked"
  :checked="false"
  :intermediate="false"
  v-model="value"
  @change="state => fn(state)"
></checkbox>
```

### Parameters

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the checkbox

### `size`

* Type: `Number`
* Default: `18`

Sets the size of the checkbox in `px`

### `value`

* Type: `String`
* **Optional**

Sets the value of the checkbox

### `checked`

* Type: `Boolean`
* **Optional**

Sets if the checkbox is checked by default

### `intermediate`

* Type: `Boolean`
* **Optional**

Sets the checkbox to the indeterminate state (`[-]`)

### `v-model`

* Returns the value of the checkbox

Emitted when a user clicks the checkbox

### Emits

### `@change`

* Returns the value of the checkbox

Emitted when a user clicks the checkbox

## Choice Chips

### Import

```jsx
import { ChoiceChips } from "monsetra-vue/dist/input";
```

### Usage

```html
<choice-chips
  label="Chips"
  group="chips"
  :colour="Colours.primary"
  :multiselect="false"
  v-model="value"
  @change="item => fn(item)"
></choice-chips>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label and value of the chips

### `group`

* Type: `String`
* Default: `"chips"`

Sets the name of the input group of the chips

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the chips

### `multiselect`

* Type: `Boolean`
* **Optional**

Sets if the type of chips allowed for multiselection

### `v-model`

* Returns the value of the chips

Emitted when a user clicks the chips

### Emits

### `@change`

* Returns the value of the chips

Emitted when a user clicks the chips

## Dropdown List

### Import

```jsx
import { DropdownList } from "monsetra-vue/dist/input";
```

### Usage

```html
<dropdown-list
  :alignment="DropdownAlignment.left"
  :position="DropdownPosition.bottom"
  :items="dropdownItems"
  :colour="Colours.primary"
  @change="item => fn(item)"
></dropdown-list>
```

### Parameters

### `alignment`

* Type: `String` as `DropdownAlignment`
* Default: `DropdownAlignment.left`

Sets the alignment of text in the dropdown list

### `position`

* Type: `String` as `DropdownPosition`
* Default: `DropdownPosition.bottom`

Sets the position of the dropdown list relative to the activator (e.g. button)

### `items`

* Type: `Array` of `DropdownItem`
* **Required**

Sets the list of items to be selected

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the dropdown list items

### Slots

### `default`

* Places an activator (i.e. button) to toggle the dropdown list
* **Implementation**
  ```html
  <dropdown-list :items="dropdownItems">
    <outlined-button label="Dropdown"></outlined-button>
  </dropdown-list>
  ```

### `#item.value`

* Customise the dropdown list item of a particular value
* **Implementation**
  ```html
  <dropdown-list :items="dropdownItems">
    ...
    <template #item-3="{item,click}">
      <hr>
      <dropdown-list-item
        :item="item"
        :colour="Colours.danger"
        @click="click"
       ></dropdown-list-item>
    </template>
  </dropdown-list>
  ```

### Emits

### `@change`

* Returns the value of the selected dropdown list item

Emitted when a user clicks a dropdown list item

## Dropdown List Item

### Import

```jsx
import { DropdownListItem } from "monsetra-vue/dist/input";
```

### Usage

```html
<dropdown-list-item
  :item="dropdownItem"
  :colour="Colours.primary"
></dropdown-list-item>
```

### Parameters

### `item`

* Type: `Object` of `DropdownItem`
* **Required**

Sets the label, value, and colour of the item

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the dropdown list item

### Slots

### `default`

* Customise the dropdown list item
* **Implementation**
  ```html
  ...
  <dropdown-list-item :item="item" :colour="Colours.danger" @click="click">
    <span>User: {{ User }}</span>
  </dropdown-list-item>
  ...
  ```

## Static Select Field

### Import

```jsx
import { StaticSelectField } from "monsetra-vue/dist/input";
```

### Usage

```html
<static-select-field
  label="Static Select Field"
  :items="dropdownItems"
  :colour="Colours.primary"
  v-model="value"
  @change="item => fn(item)"
></static-select-field>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the select field

### `items`

* Type: `Array` of `DropdownItem`
* **Required**

Sets the list of items to be selected

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the dropdown list items

### `v-model`

* Returns the value of the selected field

Emitted when a user clicks a dropdown item

### Slots

### `#item.value`

* Customise the dropdown list item of a particular value
* **Implementation**
  ```html
  <static-select-field :items="dropdownItems">
    <template #item-3="{item,click}">
      <hr>
      <dropdown-list-item
        :item="item"
        :colour="Colours.danger"
        @click="click"
       ></dropdown-list-item>
    </template>
  </static-select-field>
  ```

### Emits

### `@change`

* Returns the value of the selected field

Emitted when a user clicks a dropdown item

## Static Textarea Field

### Import

```jsx
import { StaticTextareaField } from "monsetra-vue/dist/input";
```

### Usage

```html
<static-textarea-field
  label="Static Textarea Field"
  :colour="Colours.primary"
  :validator="textareaValidator"
  value="I am a textarea!"
  :rows="3"
  :cols="25"
  :disabled="false"
  helper-text="Input your email"
  v-model="value"
  @blur="value => fn(value)"
  @context="ctx => ctx_staticTextareaField = ctx"
></static-textarea-field>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the textarea field

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the textarea field

### `validator`

* Type: `Function` as `TextFieldValidator`
* **Optional**

Create a custom input validator

### `value`

* Type: `String`
* **Optional**

Sets the value of the input

### `rows`

* Type: `Number`
* **Optional**

Sets the default number of rows of the textarea

### `cols`

* Type: `Number`
* **Optional**

Sets the default number of columns of the textarea

### `disabled`

* Type: `Boolean`
* **Optional**

Sets if users can interact with the input textarea field

### `helper-text`

* Type: `String`
* **Optional**

Creates a small helper text to guide the user about the input

### `v-model`

* Returns the value of the textarea field

Emitted when a user is typing on the input textarea field

### Emits

### `@blur`

* Returns the value of the textarea field

Emitted when a user exits focus from the textarea field

### `@context`

* Returns an object of functions that can be used for the textarea field component
  * `getValue`: Gets the value of the textarea field
  * `forceFocus`: Forcibly focus on the textarea  field
  * `validate`: Validates the value of the textarea field
  * `setError`: Sets the message for the error

Emitted during the mounted hook cycle

## Static Text Field

### Import

```jsx
import { StaticTextField } from "monsetra-vue/dist/input";
```

### Usage

```html
<static-text-field
  label="Static Text Field"
  :colour="Colours.primary"
  :type="TextFieldType.email"
  :validator="emailValidator"
  value="me@example.com"
  :disabled="false"
  helper-text="Input your email"
  v-model="value"
  @blur="value => fn(value)"
  @context="ctx => ctx_staticTextField = ctx"
></static-text-field>
```

### Parameters

### `label`

* Type: `String`
* **Required**

Sets the label of the text field

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the text field

### `type`

* Type: `String` as `TextFieldType`
* Default: `TextFieldType.text`

Sets the type of text input

### `validator`

* Type: `Function` as `TextFieldValidator`
* **Optional**

Create a custom input validator

### `value`

* Type: `String`
* **Optional**

Sets the value of the input

### `disabled`

* Type: `Boolean`
* **Optional**

Sets if users can interact with the input text field

### `helper-text`

* Type: `String`
* **Optional**

Creates a small helper text to guide the user about the input

### `v-model`

* Returns the value of the text field

Emitted when a user is typing on the input text field

### Slots

### `#leading`

* Places an icon to the left of the label
* **SVG Implementation**
  ```html
  <template #leading="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #leading="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### `#trailing`

* Places an icon to the right of the label
* **SVG Implementation**
  ```html
  <template #trailing="{ width, height, colour }">
    <svg :width="width" :height="height" :fillColour="colour">
    </svg>
  </template>
  ```
* **Tailwind Implementation**
  ```html
  <template #trailing="{ tailwind }">
    <svg :class="tailwind"></svg>
  </template>
  ```

### Emits

### `@blur`

* Returns the value of the text field

Emitted when a user exits focus from the text field

### `@context`

* Returns an object of functions that can be used for the text field component
  * `getValue`: Gets the value of the text field
  * `forceFocus`: Forcibly focus on the text field
  * `validate`: Validates the value of the text field
  * `setError`: Sets the message for the error

Emitted during the mounted hook cycle

## Toggle Switch

### Import

```jsx
import { ToggleSwitch } from "monsetra-vue/dist/input";
```

### Usage

```html
<toggle-switch
  label="Switch"
  :colour="Colours.primary"
  :checked="false"
  v-model="value"
  @change="state => fn(state)"
></toggle-switch>
```

### Parameters

### `label`

* Type: `String`
* **Optional**

Sets the label of the switch

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the switch

### `checked`

* Type: `Boolean`
* **Optional**

Sets if the switch is checked by default

### `v-model`

* Returns the value of the switch

Emitted when a user clicks the switch

### Emits

### `@change`

* Returns the value of the switch

Emitted when a user clicks the switch
