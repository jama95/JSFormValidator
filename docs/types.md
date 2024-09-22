# Types

These are all the types used in the library.

## Table of contents

- [Options](#options)
- [Lang](#lang)
- [Validator](#validator)
- [AsyncValidator](#asyncvalidator)
- [Modifier](#modifier)
- [MessageCallback](#messagecallback)
- [ValidatorEvent](#validatorevent)
- [Suggestions](#suggestion)
- [Countries](#countries)
- [JSONConfig](#jsonconfig)
- [Others](#others)

## Options

These are all the available properties to customize the normal library functionality.

>:memo: By default some classes are form [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `ignoredFieldsNames`

List of fields names that will not be validated.
**Accepts:**  `string[]` or `string`
**Default Value:** `[]` (empty array)

To list the names you must separate each one by any combination of: , | - or spaces.

### `validMessageClass`

Valid class for the inline messages.
**Accepts:** `string`
**Default Value:** `valid-feedback`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `invalidMessageClass`

Invalid class for the inline messages.
**Accepts:** `string`
**Default Value:** `invalid-feedback`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `validClass`

Valid class for the field.
**Accepts:** `string`
**Default Value:** `is-valid`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `invalidClass`

Invalid class for the field.
**Accepts:** `string`
**Default Value:** `is-invalid`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `validLabelClass`

Valid class for the label of the field.
**Accepts:** `string`
**Default Value:** `text-success`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `invalidLabelClass`

Invalid class for the label of the  field.
**Accepts:** `string`
**Default Value:** `text-danger`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `inlineMessageClass`

Class for the inline messages.
**Accepts:** `string`
**Default Value:** `fv-msg`
*It has no style rules.*

### `topMessagesClass`

Class for the top messages.
**Accepts:** `string`
**Default Value:** `alert`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `validMessagesClass`

Valid class for the top  messages.
**Accepts:** `string`
**Default Value:** `alert-success`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `invalidMessagesClass`

Invalid class for the top messages.
**Accepts:** `string`
**Default Value:** `alert-danger`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

### `validMessagesPosition`

Position for the valid messages.
**Accepts:** `string`(inline or top)
**Default Value:** `inline`

### `invalidMessagesPosition`

Position for the invalid messages.
**Accepts:** `string` (inline or top)
**Default Value:** `inline`

### `topMessagesTemplate`

Top messages HTML template.
**Accepts:** `string`
**Default Value:** `<div class="{topMessagesClass} {iv-MessageClass}" target="#{formID}" data-fv-top-{vi}><h4>{title}</h4><ul>{fields&messagesList}</ul></div>`
*All the values between `{}` are mandatory.*

>:warning:The attribute `data-fv-top-{vi}` is mandatory, if is not present, top messages wil not work properly.

### `scrollToTopOnInvalid`

Scrolls the page up to the top messages position on submit event.
**Accepts:** `boolean`
**Default Value:** `false`

### `addValidClassOnAll`

Adds a valid class on all fields even if they are not validated.
**Accepts:** `boolean`
**Default Value:** `false`

### `validateHiddenFields`

Validates hidden type fields.
**Accepts:** `boolean`
**Default Value:** `false`

### `validMessageCallback`

Function triggered when valid messages are shown.
**Accepts:** [`MessageCallback`](#messagecallback) | `undefined`
**Default Value:** `undefined`

### `invalidMessageCallback`

Function triggered when invalid messages are shown.
**Accepts:** [`MessageCallback`](#messagecallback) | `undefined`
**Default Value:** `undefined`

### `form`

List of forms css selectors.
**Accepts:** `string`
**Default Value:** `form`

To list the css selectors you must separate each one by any combination of: , | - or spaces.

### `parentField`

Parent selector for all form fields.
**Accepts:** `string`
**Default Value:** `.fv-group`
*It has no style rules.*

### `fieldModifyAttribute`

Attribute of the field to list modifiers.
**Accepts:** `string`
**Default Value:** `data-fv-modifiers`

### `fieldValidateAttribute`

Attribute of the field to list validators.
**Accepts:** `string`
**Default Value:** `data-fv-validators`

### `fieldInvalidMessageAttribute`

Attribute of the field to overwrite invalid messages.
**Accepts:** `string`
**Default Value:** `data-fv-invalid-msg`

### `fieldValidMessageAttribute`

Attribute of the field to overwrite valid messages.
**Accepts:** `string`
**Default Value:** `data-fv-valid-msg`

### `fieldHelpMessageAttribute`

Attribute of the field to set help messages.
**Accepts:** `string`
**Default Value:** `data-fv-help-msg`

### `modifyOnInput`

Triggers modifiers on field input event.
**Accepts:** `boolean`
**Default Value:** `true`

### `validateOnInput`

Triggers validations on field input event.
**Accepts:** `boolean`
**Default Value:** `false`

### `validateOnBlur`

Triggers validation on field blur event.
**Accepts:** `boolean`
**Default Value:** `true`

### `validateCheckboxRadioOnClick`

Triggers validation on checkbox or radio button click event
**Accepts:** `boolean`
**Default Value:** `true`

### `showHelpMessagesOnFocus`

Shows help messages on field focus event.
**Accepts:** `boolean`
**Default Value:** `true`

### `addSuggestions`

Shows the suggestions of the input.
**Accepts:** `boolean`
**Default Value:** `true`

### `suggestionConfig`

Style options of the datalist.
**Accepts:** [`Suggestion`](#suggestion)

### `suggestionAttribute`

Attribute of the input to list the words to be suggested.
**Accepts:** `string`
**Default Value:** `data-fv-suggestions`

### `lengthRestrictAttribute`

Attribute of the textArea to set the max number of characters allowed.
**Accepts:** integer as `string`
**Default Value:** `data-fv-text-length`

### `lengthRestrictInfo`

Length restriction info to show.
**Accepts:** `string` (both, count, remaining)
**Default Value:** `count`

### `passwordSpecialChars`

Regex for admitted password special characters.
**Accepts:** `RegExp`
**Default Value:** `/[\x21\x40\x23\x24\x25\x5E\x26\x2A\x5F\x2D\x2B\x3D]/`

### `addPasswordInfo`

Shows password info on inputs type password.
**Accepts:** `boolean`
**Default Value:** `true`

### `passwordInfoClass`

Additional class for the password info container.
**Accepts:** `string`
**Default Value:** `card`

The default class is from [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation/).

## Lang

These are all the available properties, the invalid messages from the available validators and some other language related options.

### `locale`

Language and region code.
*For more information see "[BCP 47 language tags](https://www.w3.org/International/articles/language-tags/)".*

### `currencyCode`

Currency code.
*For more information see "[ISO 4217 standard](https://www.iso.org/iso-4217-currency-codes.html)"*.

### `dateFormat`

Default date format.

### `timeFormat`

Default time format.

### `validTitle`

Title for top valid messages.

### `invalidTitle`

Title for top invalid messages.

### `notConfirmed`

Value not confirmed.

### `inv_required`

Required field message.

### `inv_date`

Invalid date message.

### `inv_time`

Invalid time message.

### `inv_telephone`

Invalid telephone number message.

### `inv_ipv4`

Invalid IPv4 address.

### `inv_ipv6`

Invalid IPv6 address.

### `inv_domain`

Invalid domain message.

### `inv_email`

Invalid email message.

### `inv_url`

Invalid url message.

### `inv_numbers`

Invalid number message.

### `inv_numberMax`

Invalid number, max value exceeded message.

### `inv_numberMin`

Invalid number, min value exceeded message.

### `inv_numberRange`

Invalid number, out of range message.

### `inv_numberEqual`

Invalid number, not equal message.

### `inv_numberStep`

Invalid number, out of step message.

### `inv_lengthMax`

Invalid length, too long value message.
*Applies to: text, files and options.*

### `inv_lengthMin`

Invalid length, too short value message .
*Applies to: text, files and options.*

### `inv_lengthRange`

Invalid length, too long or too short value message.
*Applies to : text, files and options.*

### `inv_lengthEqual`

Invalid length, not equal value message.
*Applies to: text, files and options.*

### `inv_letters`

Invalid letters and/or allowed values message.

### `inv_regexp`

Invalid custom value message.

### `inv_alphanumeric`

Invalid alphanumeric value message.

### `inv_color`

Invalid color.

### `inv_file_size`

Invalid file size message.

### `inv_file_type`

Invalid file type message.

### `inv_file_extension`

Invalid file extension message.

### `inv_image_dimension`

Invalid image dimensions message.

### `inv_image_heigh`

Invalid image height message.

### `inv_image_width`

Invalid image width message.

### `inv_image_ratio`

Invalid image ratio message.

### `inv_credit_card`

Invalid credit card number message.

### `inv_cvv`

Invalid credit card cvv number message.

### `inv_confirmation`

Invalid confirmation value message.

### `inv_security_answer`

Invalid security answer message.

### `inv_strength`

Insecure password message.

### `passwordConditionsTitle`

Title for secure password conditions.

### `passwordConditionUppercase`

Password requires upper case letters.

### `passwordConditionLowercase`

Password requires lower case letters.

### `passwordConditionSpecialChars`

Password requires special characters.

### `passwordConditionNumericChars`

Password requires numbers.

### `passwordConditionLength`

Password requires min and max length.

### `passwordStrengthVeryWeak`

Password strength very weak.

### `passwordStrengthWeak`

Password strength weak.

### `passwordStrengthNormal`

Password strength normal.

### `passwordStrengthStrong`

Password strength strong.

### `passwordStrengthVeryStrong`

Password strength very strong.

## Validator

These are all the available properties of the validators.

### `name` {Validator.name}

Validator name.
**Accepts:** `string`

### `validatorFunction` {Validator.validatorFunction}

The validator function.
**Accepts:** `fn: (value: string, form: HTMLFormElement, field: ValidationField, options: Options, lang: Lang)`

- `value`: the value of the field.
- `form`:  the form element (parent of the field).
- `field`: the field element.
- `options`: the local options of the validator.
- `lang`: the validator language.

**Returns:** `boolean`

Returns true if the field pass the validation.

### `invalidMessage` {Validator.invalidMessage}

Default message on invalid validation.
**Accepts:** `string`

### `messageKey` {Validator.messageKey}

Message attribute key to set custom messages.
**Accepts:** `string`

### `validMessage` {Validator.validMessage}

Default message on valid validation.
**Accepts:** `string`
*This property is optional.*

### `validateOnInput` {Validator.validateOnInput}

Indicates whether validation is triggered on each Input event.
**Accepts:** `boolean`
**Default Value:** false
*This property is optional.*

## AsyncValidator

These are all the available properties of the async validators.

### `name` {AsyncValidator.name}

Validator name.
**Accepts:** `string`

### `validatorFunction` {AsyncValidator.validatorFunction}

The validator function.
**Accepts:** `fn: (value: string, form: HTMLFormElement, field: ValidationField, options: Options, lang: Lang)`

- `value`: the value of the field.
- `form`:  the form element (parent of the field).
- `field`: the field element.
- `options`: the local options of the validator.
- `lang`: the validator language.

**Returns:** `Promise<boolean>`

Returns a true promise if the field pass the validation.

### `invalidMessage` {AsyncValidator.invalidMessage}

Default message on invalid validation.
**Accepts:** `string`

### `messageKey` {AsyncValidator.messageKey}

Message attribute key to set custom messages.
**Accepts:** `string`

### `validMessage` {AsyncValidator.validMessage}

Default message on valid validation.
**Accepts:** `string`
*This property is optional.*

### `validateOnInput` {AsyncValidator.validateOnInput}

Indicates whether validation is triggered on each Input event.
**Accepts:** `boolean`
**Default Value:** false
*This property is optional.*

## Modifier

These are all the available properties of the modifiers.

### `name` {Modifier.name}

Validator name.
**Accepts:** `string`

### `modifierFunction` {Modifier.modifierFunction}

The modifier function.
**Accepts:** `fn: (value: string, form: HTMLFormElement, field: HTMLInputElement | HTMLTextAreaElement, options: Options, lang: Lang)`

- `value`: the value of the field.
- `form`:  the form element (parent of the field).
- `field`: the field element.
- `options`: the local options of the validator.
- `lang`: the validator language.

**Returns:** `string`
The modified field value.

### `modifyOnInput` {Modifier.modifyOnInput}

Indicates whether modifier is triggered on each Input event.
**Accepts:** `boolean`
**Default Value:** false
*This property is optional.*

## MessageCallback

The message callback function.

**Accepts:** `fn: (form: HTMLFormElement, field: ValidationField, message: string, options: Options)`

- `form`:  the form element (parent of the field).
- `field`: the field element.
- `message` the validation message.
- `options`: the local options of the validator.

**Returns:** `void`

## ValidatorEvent

The validator event function.

**Accepts:** `fn:(form: HTMLFormElement, field: ValidationField, state: boolean, options: Options)`

- `form`:  the form element (parent of the field).
- `field`: the field element.
- `state` the validation state (false: invalid, true: valid)
- `options`: the local options of the validator.

Returns: `void`

## Suggestion

These are all the available properties to customize the visual aspect of the datalist.

### `maxHeight`

Maximum height of Datalist element.
**Accepts:** `string`
**Default Value:** `150px`

### `containerClass`

Custom class for Datalist element.
**Accepts:** `string`
**Default Value:** `fv-suggestion_container`

### `optionClass`

Custom class for the options of the Datalist element.
**Accepts:** `string`
**Default Value:** `fv-suggestion_option`

## Countries

>:memo: In the code this type is called iso3166.

These are all the available properties of the country list info.
>**This list in based on the ISO 3166 standard and no other countries or territories will be added.**

### `CTname`

ISO 3166 Country/Territory name.
**Accepts:** `string`

### `Capital`

Capital name.
**Accepts:** `string`

### `Continent`

Continent name.
**Accepts:** `string`

### `ONU`

ONU affiliation.
**Accepts:** `string`

### `3166-1a2`

ISO 3166-1 alpha 2 tag.
**Accepts:** `string`

### `3166-2a3`

ISO 3166-2 alpha3 tag.
**Accepts:** `string`

### `3166-3`

ISO 3166-3 tag.
**Accepts:** `string`

### `Flag`

Unicode flag code as HTML entity.
**Accepts:** `string`
**Example**
The Ecuador Flag: &#x1F1EA;&#x1F1E8;
`U+1F1EA U+1F1E8` &rarr; `&#x1F1EA;&#x1F1E8;`

### `Currency`

ISO 4217 currency name.
**Accepts:** `string`

### `ISO4217`

ISO 4217 currency tag.
**Accepts:** `string`

## JSONConfig

This is a single-property `object`, where the key is a CSS selector of the form and its value is a multi-property `object`, where the keys are CSS selectors of the fields and its values are an `object` with the properties:

- `validators`: the validators list.
**Accepts:** `string`
*This property is optional.*
- `modifiers`: the modifiers list.
**Accepts:** `string`
*This property is optional.*
- `dataFV`: additional attributes.
**Accepts:**  `object`
*This property is optional.*
  >:memo:All the keys in this object must be the attribute name.

If no one validator, modifier or additional attribute is added, the field wil be ignored.

### Example {JSONconfig.example}

```json
const myConfig = {
  "#MyForm": {
    "#input1": {
      validators: "required ...",
      modifiers: "...",
      dataFV: {
        "something": "something",
        "data-fv-something_else": "somethingElse",
        ...
      }
    },
    "#input2": {
      ...
    },
    ...,
    "#inputN": {
      ...
    }
  }
}
```

>:bulb:All additional attributes in dataFV have`"data-fv-"`added at the beginning of them, but it is not necessary to write it, because it will be added automatically anyway if it is not present.

## Others

### `ValidatorField`

This type refers to the 3 form fields:

- Input: `HTMLInputElement`
- Select: `HTMLTextAreaElement`
- TextArea: `HTMLSelectElement`

Its value can be one, two or all three fields.

### `CardInfo`

This is an `object` with multiple properties, where the key is a card brand name without spaces and its value is an `object` with the properties:

- `first`: the first fixed numbers of the card.
**Accepts:** `number[]`
- `length`: the card number length.
**Accepts:** `Object`
  - `min`: the card number min length.
  **Accepts:** `number`
  - `max`: the card number max length.
  **Accepts:** `number`
- `cvv`: the card CVV code length.
**Accepts:** `number`

### Example {CardInfo.example}

```javascript
const cardInfo = {
  "credit_card1": { first: [3], length: { min: 15, max: 15 }, cvv: 4 }
}
```

The first fixed numbers of the credit card is an array, because some credit cards have different first fixed numbers for each type of card with the same length.

### `TelephoneFormats`

This is an `object` where the key is an country tag (ISO 3166-1 alpha 2) in uppercase and its value is an array of regular expressions with all the telephone formats.

### Example {TelephoneFormats.example}

```javascript
const telephoneFormats = {
/* mobile and landline telephone formats */
  EC: [
    /^(?:0|\x2B593\s?)(?:\d{2}(?:\s|-)?)\d{3}(?:\s|-)?\d{4}$/,
    /^(?:[?:0|\x2B593\s?](2-7)\s?)?\d{7}$/,
  ],
  ...,
  US: [...]
};
```
