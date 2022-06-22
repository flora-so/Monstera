# Content

## Data Table

### Import

```jsx
import { DataTable } from "monsetra-vue/dist/content";
```

### Usage

```html
<data-table
  :dataframe="data"
  :colour="Colours.primary"
  checkbox
  row-check
  @change="value => fn(value)"
></data-table>
```

### Parameters

### `dataframe`

* Type: `Object` as `DataFrame`
* **Required**

Sets the data to be shown in the data table

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `Colours.primary`

Sets the colour of the checkbox of the data table

### `checkbox`

* Type: `Boolean`
* **Optional**

Sets if the data table contains checkboxes

### `row-check`

* Type: `Boolean`
* **Optional**

Sets if clicking the row will check the row itself

### Slots

### `#column-name`

* Customise the appearance of the data under a column
* **Implementation**
  ```html
  <data-table :dataframe="tableData">
    <template #column-3="{ data }">
      <span>${{ data }}</span>
    </template>
  </data-table>
  ```

### Emits

### `@change`

* Returns the data of the selected rows

Emitted when a user checks a row in the data table

## Floating Card

### Import

```jsx
import { FloatingCard } from "monsetra-vue/dist/content";
```

### Usage

```html
<floating-card
  colour="unset"
  hover
  tight-fit
></floating-card>
```

### Parameters

### `hover`

* Type: `Boolean`
* **Optional**

Sets if the floating card has a hover effect

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `"unset"`

Sets the colour of the floating card

### `tight-fit`

* Type: `Boolean`
* **Optional**

Sets if the floating card has a tight fit around the content

### Slots

### `default`

* Wrap the content round the floating card
* **Implementation**
  ```html
  <floating-card>
    <h1><b>Floating Card</b></h1>
    <p>Hey, I am inside an floating card!</p>
  </floating-card>
  ```

## Outlined Card

### Import

```jsx
import { OutlinedCard } from "monsetra-vue/dist/content";
```

### Usage

```html
<outlined-card
  colour="unset"
  hover
  tight-fit
></outlined-card>
```

### Parameters

### `hover`

* Type: `Boolean`
* **Optional**

Sets if the outlined card has a hover effect

### `border-colour`

* Type: `String` (hex code or `Colours`)
* Default: `#7f7f7f36`

Sets the colour of the boder of the outlined card

### `colour`

* Type: `String` (hex code or `Colours`)
* Default: `"unset"`

Sets the colour of the outlined card

### `tight-fit`

* Type: `Boolean`
* **Optional**

Sets if the outlined card has a tight fit around the content

### Slots

### `default`

* Wrap the content around the outlined card
* **Implementation**
  ```html
  <outlined-card>
    <h1><b>Outlined Card</b></h1>
    <p>Hey, I am inside an outlined card!</p>
  </outlined-card>
  ```
