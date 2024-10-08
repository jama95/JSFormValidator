# Modifiers

These are all the available modifiers of the library.

> :bulb: The modifiers name is the value you must use in the attribute [`fieldModifyAttribute`](./types.md#fieldmodifyattribute).

## Table of contents

- [Default modifiers](#default-modifiers)
  - [Lower case](#lower-case)
  - [Upper case](#upper-case)
  - [Capital case](#capital-case)
  - [Sentence case](#sentence-case)
  - [Camel case](#camel-case)
  - [Pascal case](#pascal-case)
  - [Currency format](#currency-format)
  - [Trim](#trim)
  - [Left trim](#left-trim)
  - [Right trim](#right-trim)

## Default Modifiers

### Lower case

Converts the text to lowercase.

**Modifier name**: `lower`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#lower-case).

### Upper case

Converts the text to uppercase.

**Modifier name**: `upper`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#upper-case).

### Capital case

Converts the first letter of each word in the text to uppercase.

**Modifier name**: `capital`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#capital-case).

### Sentence case

Converts the first letter of the text to uppercase

**Modifier name**: `sentence`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#sentence-case).

### Camel case

Converts the first letter of each word in the text to uppercase and removes all the spaces.

**Modifier name**: `camel`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#camel-case).

### Pascal case

Converts the first letter of each word(except for the first) in the text to uppercase and removes all the spaces.

**Modifier name**: `pascal`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#pascal-case).

### Currency format

Convert a number to currency format.

**Validator name**: `currency`
**Works on**: text fields.
**Additional attributes**:

- `data-fv-decimals`: the number of fixed decimal places.
  *This attribute is optional; if omitted, no decimal numbers will fixed.*
- `data-fv-locale`: the list of language and region codes ([BCP 47 language tags](https://www.w3.org/International/articles/language-tags/)).
  *This attribute is optional; if omitted, the locale option of the used language wil be used instead.*
- `data-fv-currency`: the currency code ([ISO 4217 standard](https://www.iso.org/iso-4217-currency-codes.html)).
  *This attribute is optional; if omitted, the currencyCode option of the used language wil be used instead.*

>:warning:The maximum number of fixed decimals is 100.
>:memo:By default, the number of decimal places can be 2 or 0, depending of  the selected currency.

Examples are available [here](./examples/validators.md#length).

### Trim

Removes the leading and trailing white space and line terminator characters from a string.

**Modifier name**: `trim`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#pascal-case).

### Left trim

Removes the leading white space and line terminator characters from a string.

**Modifier name**: `trim_left`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#pascal-case).

### Right trim

Removes the trailing white space and line terminator characters from a string.

**Modifier name**: `trim_right`
**Works on**: text fields.

Examples are available [here](./examples/modifiers.md#pascal-case).
