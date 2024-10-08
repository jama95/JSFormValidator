# Validators

These are all the available validators of the library.

> :bulb: The validator name is the value you must use in the attribute [`fieldValidateAttribute`](./types.md#fieldvalidateattribute).

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

These validators are based on HTML input types and validations.

### Required

Checks if the field has a value.
**Validator name**: `required`
**Works on**: all the fields.

Grouped checkboxes are supported.

>:bulb:To group checkboxes each one must have the same name.

Examples are available [here](./examples/validators.md#required).

### Length

Checks if the field value has the correct length.

**Validator name**: `length`
**Works on**: all the fields.
**Additional attributes**:

- `data-fv-length`: the min and max number of characters. ***Is required***

Use `max#` to set only the max numbers of characters, `min#` to set only the min numbers of characters and `#::#` to the max and min numbers of characters, where `#` is any integer.
Grouped checkboxes and multiple selects fields are supported.

>:bulb:To group checkboxes each one must have the same name.

Examples are available [here](./examples/validators.md#length).

### Numbers

Checks if the field value contains only numbers and if it matches with the conditions.
**Validator name**: `numbers`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-numbers_allow`: the list of numbers to accept: negative, decimal, noPositive.

  - `negative`: accepts negative.
  - `decimal`: accepts decimal.
  - `noPositive`: does not accept positive.

  *This attribute is optional; if omitted, accepts positive integers by default.*
- `data-fv-numbers_range`: the range of numbers to accept.
  *This attribute is optional; if omitted, no range will set.*
- `data-fv-numbers_step`: the number of steps to take by the number.
  *This attribute is optional; if omitted, no step will set.*

Use `max#` to set only the max range of numbers, `min#` to set only the min range of numbers and use `#::#` to the max and min range of numbers, where `#` is any number.
The `decimal` option accepts positive and/or negative numbers, depending on whether is used with `negative` or `noPositive`.
The value of `data-fv-numbers_range` and `data-fv-numbers_step` can be a decimal and/or integer positive and/or negative, *depending on the numbers allowed*.

>:bulb:To list the allowed numbers you must separate each one by any combination of: , | - or spaces.

Examples are available [here](./examples/validators.md#numbers).

### Letters

Checks if the field value contains only letters and/or the allowed characters.
**Validator name**: `letters`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-letters_allow`: the list of additional allowed characters.
  *This attribute is optional; if omitted, no additional characters will be allowed.*

>:warning:To list the allowed characters it is not necessary to separate each one.

Examples are available [here](./examples/validators.md#letters).

### Alphanumeric

Checks if the field value contains only numbers and/or letters and/or the allowed characters.
**Validator name**: `alphanumeric`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-letters_allow`: the list of additional allowed characters.
  *This attribute is optional; if omitted, no additional characters will be allowed.*

>:warning:To list the allowed characters it is not necessary to separate each one.

Examples are available [here](./examples/validators.md#alphanumeric).

### Regex

Checks if the field value matches with the specified regular expression.
**Validator name**: `regex`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-regex`: the regular expression. (*As string*) ***Is required***
- `data-fv-flags`: the flags of the regular expression.
  *This attribute is optional; if omitted, no flags will be used.*

Examples are available [here](./examples/validators.md#regex).

### Telephone

Checks if the field value matches with the specified time format.
**Validator name**: `telephone`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-telephone_format`: the telephone format name. ***Is required***
  *This attribute is optional; if omitted, will use the EC format by default.*

The available telephone format names are:

- `EC`: landline and mobile. (*1800 phone numbers are not included*)

Examples are available [here](./examples/validators.md#telephone).

### Color

Checks if the field value matches with the specified color formats.
**Validator name**: `color`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-colors`: the list of allowed colors (case insensitive).
  *This attribute is optional; if omitted, all the available color formats will be allowed.*

The available color format names are: RGB, RGBA, HSL, HSLA, CMYK, HEX.

>:bulb:To list the allowed colors you must separate each one by any combination of: , | - or spaces.

Examples are available [here](./examples/validators.md#color).

## Date validators

These validators are simple and do not follow any standard.
For implementations of internationalized date and time formats you should use the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) objects of Javascript.

### Date

Checks if the field value matches with the specified date format.
**Validator name**: `date`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-date_format`: the date format. ***Is required***

The date format must use: DD for day, MM for month, YYYY for year and any separator.

The year is mandatory, and a format cannot be just day and year.

Examples are available [here](./examples/validators.md#date).

### Time

Checks if the field value matches with the specified time format.
**Validator name**: `time`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-time_format`: the time format. ***Is required***

The time format must use: HH for Hours, mm for minutes, ss for seconds, sss for milliseconds, and A for AM/PM.

To separate HH, mm and ss, you must use `:`, to separate ss from sss, you must use `.`, and it is not necessary to use a separator for A.

If seconds are not present, a format cannot include milliseconds.

Examples are available [here](./examples/validators.md#time).

## Net validators

These validators use some RFCs for reference.

### IPV4

Checks if the field value has the correct format of an ipv4.
**Validator name**: `ipv4`
**Works on**: text fields.

Accepts ipv4 with or without a prefix.

>:memo:This validator uses RFC791 and RFC4632 as references.

Examples are available [here](./examples/validators.md#ipv4).

### IPV6

Checks if the field value has the correct format of an ipv6.
**Validator name**: `ipv6`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-ipv6_zeros`: a boolean value to check the zeros rule. (As lowercase string)
  *This attribute is optional; if omitted, will use `false` by default.*

Accepts ipv6 with or without a zone and/or prefix, mapped ips with or without a prefix and local ips with or without a zone.

The rules of the zeros are to improve the understanding and reading of the ip, it is not mandatory to comply with them. The rules are:

- A segment can not have only consecutive zeros.
- A segment can not start with zero.
- The consecutive segments with only one zero must be grouped.
- There must be only one group of segments.
- If there are multiple consecutive segments with a single zero, the longest one must be grouped.
- If all the consecutive segments with only one zero have the same number of segments, the first one from right to left must be grouped.
- A group of consecutive segments with only one zero must be represented as `::`.

>:memo:This validator uses RFC4291, RFC4007 and RFC5952 as references.

Examples are available [here](./examples/validators.md#ipv6).

### Domain

Checks if the field value has the correct format of a domain name.
**Validator name**: `domain`
**Works on**: text fields.

It is possible that the validator does not work correctly with internationalized domain names.

>:memo:This validator uses RFC1034, RFC1035 and RFC3696 as references.

Examples are available [here](./examples/validators.md#domain).

### Email

Checks is the field value has the correct format of an e-mail address.
**Validator name**: `email`
**Works on**: text fields.

Accepts ipv4 and ipv6 instead of a domain name.

>:memo:This validator uses RFC5321, RFC5322 and RFC3696 as references.

Examples are available [here](./examples/validators.md#email).

### URL

Checks if the field value is has the correct format of an URL.
**Validator name**: `url`
**Works on**: text fields.

Only accepts https and http schemas.

>:memo:This validator uses RFC1738, RFC3986 and RFC6874 as references.

Examples are available [here](./examples/validators.md#url).

## File validators

These validators use the file management options of JavaScript.

### File size

Checks if the size of the selected files is correct.
**Validator name**: `file_size`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-file_max_size`: the maximum file size allowed.
  *This attribute is optional; if omitted, will use `5MB` by default.*

A data size type must be appended to the end of the string, the available ones are the following (case insensitive): `b` for bytes, `kb` for kilobytes, `mb` for megabytes, `gb` for gigabytes.

Examples are available [here](./examples/validators.md#file-size).

### File type

Checks if the selected files are of the correct MIME type.
**Validator name**: `file_type`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-file_type`: the list of allowed MIME types. ***Is required***

To list the MIME types you must separate each one by any combination of: , | - or spaces.

>:memo:These are all the MIME types listed by the [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

Examples are available [here](./examples/validators.md#file-type).

### File extension

Checks if the selected files has the correct extension.
**Validator name**: `file_extension`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-file_extension`: the list of allowed file extensions. ***Is required***

It is not necessary to add a dot, must be in lowercase and to list the file extensions you must separate each one by any combination of: , | - or spaces.

Examples are available [here](./examples/validators.md#file-extension).

### Image dimensions

Checks if the selected images have the correct dimensions.
**Validator name**: `image_dimension`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-image_dimension`: the allowed image dimension. ***Is required***

The height and width of the image dimension must be separated by an `x`.

Examples are available [here](./examples/validators.md#image-dimensions).

### Image height

Checks if the selected images have the correct height.
**Validator name**: `image_height`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-image_height`: the allowed image height. ***Is required***

Examples are available [here](./examples/validators.md#image-height).

### Image width

Checks if the selected images have the correct width.
**Validator name**: `image_width`
**Works on**: file type fields.
**Additional attributes**:

- `data-fv-image_width`: the allowed image width. ***Is required***

Examples are available [here](./examples/validators.md#image-width).

## Security validators

These validators are not absolute and may need fixes and/or improvements.

>:memo:Credit Card and CVV validators use [CapitalOne](https://www.capitalone.com/learn-grow/money-management/what-is-a-credit-card-number/), [Forbes](https://www.forbes.com/advisor/credit-cards/what-does-your-credit-card-number-mean/) and [Lloyds Bank](https://www.lloydsbank.com/credit-cards/help-and-guidance/credit-card-numbers-explained.html) as references.

### Password

Checks if the field has a strong password.
**Validator name**: `password`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-min_strength`: the minimum password strength level admitted.
  *This attribute is optional; if omitted, will use 5 by default.*

The minimum password security level is 0 and the maximum is 5, which is calculated by checking the fulfillment of some conditions:

- At least one uppercase.
- At least one lowercase.
- At least one number.
- At least one special character (from [passwordSpecialChars](/docs/types.md#passwordspecialchars) option).
- Length greater than 12.

>:bulb: It is not required, but `password info` is a perfect complement.

Examples are available [here](./examples/validators.md#password).

### Confirmation

Checks if the field value matches the target value.
**Validator name**: `confirmation`
**Works on**: all the fields.
**Additional attributes**:

- `data-fv-target`: the CSS selector of the target field. ***Is required***
- `data-fv-custom_value_message`: the name of the values to match.
  *This attribute is optional; if omitted, will use the default value of the message.*

>:warning: Invalid if the target is not found.

Examples are available [here](./examples/validators.md#confirmation).

### Credit card

Checks if the field value has a valid credit/debit card number.
**Validator name**: `credit_card`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-allowed_cards`: the list of the allowed card brands names.
  *This attribute is optional; if omitted, will use all the available card brands by default.*

The available card brand names are:

- `AMEX`: American Express.
- `VISA`: Visa.
- `MAST`: Mastercard.
- `DISC`: Discover.

To list the card brands you must separate each one by any combination of: , | - or spaces.

>:bulb: The validator will add the `data-fv-card` attribute to the field with the name of the matched card brand name.

Examples are available [here](./examples/validators.md#credit-card).

### CVV

Checks if the field value has a valid CVV number.
**Validator name**: `cvv`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-target`: the CSS selector of the target field. ***Is required***

>:warning: Invalid if the target is not found, if the target is invalid, or if the target is not validated.

Examples are available [here](./examples/validators.md#cvv).
