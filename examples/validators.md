# Validators examples

The examples use the Bootstrap CSS classes and the default options.

>:bulb:It is recommended to always use the `required` validator together with any other.

## Table of contents

- [Default validators](#default-validators)
  - [Required](#required)
  - [Length](#length)
  - [Numbers](#numbers)
  - [Letters](#letters)
  - [Alphanumeric](#alphanumeric)
  - [Regex](#regex)
  - [Telephone](#telephone)
  - [Color](#color)
- [Date validators](#date-validators)
  - [Date](#date)
  - [Time](#time)
- [Net validators](#net-validators)
  - [IPV4](#ipv4)
  - [IPV6](#ipv6)
  - [Domain](#domain)
  - [Email](#email)
  - [URL](#url)
- [File validators](#file-validators)
  - [File size](#file-size)
  - [File type](#file-type)
  - [File extension](#file-extension)
  - [Image dimensions](#image-dimensions)
  - [Image height](#image-height)
  - [Image width](#image-width)
- [Security validators](#security-validators)
  - [Password](#password)
  - [Confirmation](#confirmation)
  - [Credit card](#credit-card)
  - [CVV](#cvv)

## Default validators

### Required

Read more about the validator [here](/docs/validators.md#required).

```html
<div class="fv-group">
  <label for="t">Input</label>
  <input type="text" name="t" class="form-control" data-fv-validators="required">
</div>
<div class="fv-group">
  <h3>Grouped Checkboxes</h3>
  <label class="form-check-label">Checkbox 1</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="required">
    <label class="form-check-label">Checkbox 2</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="required">
    <label class="form-check-label">Checkbox 3</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="required">
</div>
<div class="fv-group">
  <label class="form-check-label">Radiobutton 1</label>
  <input type="radio" name="c" class="form-check-input" data-fv-validators="required">
  <label class="form-check-label">Radiobutton 2</label>
  <input type="radio" name="c" class="form-check-input" data-fv-validators="required">
  <label class="form-check-label">Radiobutton 3</label>
  <input type="radio" name="c" class="form-check-input" data-fv-validators="required">
</div>
<div class="fv-group">
  <label>Select</label>
  <select name="s" class="form-select" data-fv-validators="required">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>
```

### Length

Read more about the validator [here](/docs/validators.md#length).

```html
<div class="fv-group">
  <label for="t">Input</label>
  <input type="text" name="t" class="form-control" data-fv-validators="length" data-fv-length="3::4">
</div>
<div class="fv-group">
  <h3>Grouped Checkboxes</h3>
  <label class="form-check-label">Checkbox 1</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="length" data-fv-length="2">
    <label class="form-check-label">Checkbox 2</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="length" data-fv-length="2">
    <label class="form-check-label">Checkbox 3</label>
  <input type="checkbox" name="c" class="form-check-input" data-fv-validators="length" data-fv-length="2">
</div>
<div class="fv-group">
  <label>Select</label>
  <select name="s" class="form-select" data-fv-validators="length" data-fv-length="1::2" multiple>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>
<div class="fv-group">
  <label class="form-label">File</label>
  <input type="file" name="f" class="form-control" data-fv-validators="length" data-fv-length="max2" multiple>
</div>
```

### Numbers

Read more about the validator [here](/docs/validators.md#numbers).

```html
<div class="fv-group">
  <label class="form-label">Numbers</label>
  <input type="text" name="n" class="form-control" data-fv-validators="numbers" data-fv-numbers_allow="negative decimal">
</div>
<div class="fv-group">
  <label class="form-label">Only negative</label>
  <input type="text" name="on" class="form-control" data-fv-validators="numbers" data-fv-numbers_allow="decimal noPositive">
</div>
<div class="fv-group">
  <label class="form-label">Range</label>
  <input type="text" name="r" class="form-control" data-fv-validators="numbers" data-fv-numbers_allow="negative decimal range" data-fv-numbers_range="-10.5::10.5">
</div>
<div class="fv-group">
  <label class="form-label">Step</label>
  <input type="text" name="s" class="form-control" data-fv-validators="numbers" data-fv-numbers_allow="negative decimal step" data-fv-numbers_step="-2.5">
</div>
<div class="fv-group">
  <label class="form-label">Range and Step</label>
  <input type="text" name="rs" class="form-control" data-fv-validators="numbers" data-fv-numbers_allow="decimal range step" data-fv-numbers_range="0::1"
  data-fv-numbers_step="0.1">
</div>
```

### Letters

Read more about the validator [here](/docs/validators.md#letters).

```html
<div class="fv-group">
  <label class="form-label">Letters</label>
  <input type="text" name="l1" class="form-control" data-fv-validators="letters">
</div>
<div class="fv-group">
  <label class="form-label">Additional spanish letters</label>
  <input type="text" name="l2" class="form-control" data-fv-validators="letters" data-fv-letters_allow="ñáéíóúü">
</div>
<div class="fv-group">
  <label class="form-label">Allowing spaces</label>
  <input type="text" name="l3" class="form-control" data-fv-validators="letters" data-fv-letters_allow=" ">
</div>
```

### Alphanumeric

Read more about the validator [here](/docs/validators.md#alphanumeric).

```html
<div class="fv-group">
  <label class="form-label" for="an1">Alphanumeric</label>
  <input type="text" name="a1" class="form-control" data-fv-validators="required alphanumeric">
</div>
<div class="fv-group">
  <label class="form-label">Additional spanish letters</label>
  <input type="text" name="a2" class="form-control" data-fv-validators="alphanumeric" data-fv-letters_allow="ñáéíóúü">
</div>
<div class="fv-group">
  <label class="form-label">Allowing spaces</label>
  <input type="text" name="a3" class="form-control" data-fv-validators="alphanumeric" data-fv-letters_allow=" ">
</div>
```

### Regex

Read more about the validator [here](/docs/validators.md#regex).

```html
<div class="fv-group">
  <label class="form-label">Regex (must start with a)</label>
  <input type="text" name="r1" class="form-control" data-fv-validators="regex" data-fv-regex="^a[a-z]+$">
</div>
<div class="fv-group">
  <label class="form-label">Regex with flag i (must start with a)</label>
  <input type="text" name="r2" class="form-control" data-fv-validators="regex" data-fv-regex="^a[a-z]+$" data-fv-flags="i">
</div>
```

### Telephone

Read more about the validator [here](/docs/validators.md#telephone).

```html
<div class="fv-group">
  <label class="form-label">Telephone</label>
  <input type="text" name="tl" class="form-control" data-fv-validators="telephone" data-fv-telephone_format="EC">
</div>
```

### Color

Read more about the validator [here](/docs/validators.md#color).

```html
<div class="fv-group">
  <label class="form-label">Color</label>
  <input type="text" name="cl" class="form-control" data-fv-validators="color" data-fv-colors="RGB,RGBA">
</div>
```

## Date validators

### Date

Read more about the validator [here](/docs/validators.md#date).

```html
<div class="fv-group">
  <label class="form-label">Date</label>
  <input type="text" name="dt" class="form-control" data-fv-validators="date" data-fv-date_format="DD-MM-YYYY">
</div>
```

### Time

Read more about the validator [here](/docs/validators.md#time).

```html
<div class="fv-group">
  <label class="form-label">Time</label>
  <input type="text" name="tm" class="form-control" data-fv-validators="time" data-fv-time_format="HH:mm:ss.ssss A">
</div>
```

## Net validators

### IPV4

Read more about the validator [here](/docs/validators.md#ipv4).

```html
<div class="fv-group">
  <label class="form-label">IPV4</label>
  <input type="text" name="ipv4" class="form-control" data-fv-validators="ipv4">
</div>
```

### IPV6

Read more about the validator [here](/docs/validators.md#ipv6).

```html
<div class="fv-group">
  <label class="form-label">IPV6</label>
  <input type="text" name="ipv6" class="form-control" data-fv-validators="ipv6" data-fv-ipv6_zeros="true">
</div>
```

### Domain

Read more about the validator [here](/docs/validators.md#domain).

```html
<div class="fv-group">
  <label class="form-label">Domain</label>
  <input type="text" name="dm" class="form-control" data-fv-validators="domain">
</div>
```

### Email

Read more about the validator [here](/docs/validators.md#email).

```html
<div class="fv-group">
  <label class="form-label">Email</label>
  <input type="text" name="em" class="form-control" data-fv-validators="email">
</div>
```

### URL

Read more about the validator [here](/docs/validators.md#url).

```html
<div class="fv-group">
  <label class="form-label">URL</label>
  <input type="text" name="url" class="form-control" data-fv-validators="url">
</div>
```

## File validators

### File size

Read more about the validator [here](/docs/validators.md#file-size).

```html
<div class="fv-group">
  <label class="form-label">File size</label>
  <input type="file" name="flz" class="form-control" data-fv-validators="file_size" data-fv-file_max_size="2mb" multiple>
</div>
```

### File type

Read more about the validator [here](/docs/validators.md#file-type).

```html
<div class="fv-group">
  <label class="form-label">File type</label>
  <input type="file" name="flt" class="form-control" data-fv-validators="file_type" data-fv-file_type="image/jpeg,image/png" multiple>
</div>
```

>:memo:These are all the MIME types listed by the [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

### File extension

Read more about the validator [here](/docs/validators.md#file-extension).

```html
<div class="fv-group">
  <label class="form-label">File extension</label>
  <input type="file" name="fle" class="form-control" data-fv-validators="file_extension" data-fv-file_extension="jpg,png" multiple>
</div>
```

### Image dimensions

Read more about the validator [here](/docs/validators.md#image-dimensions).

```html
<div class="fv-group">
  <label class="form-label">Image dimensions</label>
  <input type="file" name="imd" class="form-control" data-fv-validators="image_dimension" data-fv-image_dimension="64x64" multiple>
</div>
```

### Image height

Read more about the validator [here](/docs/validators.md#image-height).

```html
<div class="fv-group">
  <label class="form-label">Image height</label>
  <input type="file" name="imh" class="form-control" data-fv-validators="image_height" data-fv-image_height="64" multiple>
</div>
```

### Image width

Read more about the validator [here](/docs/validators.md#image-width).

```html
<div class="fv-group">
  <label class="form-label">Image width</label>
  <input type="file" name="imw" class="form-control" data-fv-validators="image_width" data-fv-image_width="64" multiple>
</div>
```

## Security validators

### Password

Read more about the validator [here](/docs/validators.md#password).

```html
<div class="fv-group">
  <label class="form-label">Password strength</label>
  <input type="text" name="pss" class="form-control" data-fv-validators="password" data-fv-min_strength="5">
</div>
```

By default, the password info is displayed for all password type inputs, you can change this by setting the `addPasswordInfo` option to `false`.

### Confirmation

Read more about the validator [here](/docs/validators.md#confirmation).

```html
<div class="fv-group">
  <label class="form-label">Confirmation</label>
  <input type="text" name="co" class="form-control" data-fv-validators="confirmation" data-fv-target="#pss" data-fv-custom_value_message="passwords">
</div>
```

The invalid message will be: `The passwords do not match.`.

### Credit card

Read more about the validator [here](/docs/validators.md#credit-card).

```html
<div class="fv-group">
  <label class="form-label">Credit card</label>
  <input type="text" name="cc" class="form-control" data-fv-validators="credit_card" data-fv-allowed_cards="MAST,VISA">
</div>
```

### CVV

Read more about the validator [here](/docs/validators.md#cvv).

```html
<div class="fv-group">
  <label class="form-label">CVV</label>
  <input type="text" name="cvv" class="form-control" data-fv-validators="cvv" data-fv-target="#cc">
</div>
```
