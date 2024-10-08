# Functions

These are all the public functions of the library.
Read more about the types present in the functions, [here](./types.md).

## Table of contents

- [FormValidator](#form-validator)
- [validate](#validate)
- [fromJSON](#from-json)
- [restrict](#restrict)
- [addValidator](#add-validator)
- [addAsyncValidator](#add-async-validator)
- [addModifier](#add-modifier)
- [addFormValidationEvent](#add-form-validation-event)
- [setPasswordInfo](#set-password-info)
- [setTextAreaLengthRestriction](#set-textarea-length-restriction)
- [setSuggestions](#set-suggestions)

## `FormValidator(options?: Options, lang?: Lang)` {#form-validator}

`options`: the validation options (global options).
Global options expand or overwrite the default options and serve as the basis for the options in all of the features.

`lang`: the language messages.
Language options expand or overwrite the default language.
*The default language is english.*

>:memo:If no options or lang are specified, the defaults will be used instead.

Examples are available [here](/examples/functions.md#formvalidator).

## `validate(form?: string, options?: Options)` {#validate}

Validates the specified fields of the specified forms.

`form`: the form id or list of the form ids to be validated.

>:memo:If no form is specified, all forms are validated if the fields have the required attributes.

`options`: the validation options (local options).
*Local options are an independent copy of the global options.*

>:memo:If no options are specified, a global options copy will be used instead.

Examples are available [here](/examples/functions.md#validate).

## `fromJSON(json: JSONConfig, options?: Options)` {#from-json}

Sets the validation attributes on the fields of the form and validates.

`json`: the Validation configuration of the form.
Options to setup the validation and/or modification attributes in the fields of the form.

`options`: the validation options (local options).
*Local options are an independent copy of the global options.*

>:memo:If no options are specified, a global options copy will be used instead.

Examples are available [here](/examples/functions.md#fromjson).

## `restrict(input: string | HTMLInputElement, type: string, reject?: string, accept?: string)` {#restrict}

Restricts typed characters of the input.

`input`: the input element or input id to restrict.

`type`: the accepted types of characters (numbers, letters, text, all, none).

- **numbers:** accepts only numbers.
- **letters:** accepts only letters.
- **text:** accepts only numbers, letters, spaces and the signs `.`, `;` and `,`.
- **none:** do not accept characters.
- **all:** no restriction (usefully to set custom restrictions).

*Should choose only one type.*

`reject`: the additional rejected characters.

`accept`: the additional accepted characters.

Examples are available [here](/examples/functions.md#restrict).

## `addValidator(validator: Validator)` {#add-validator}

Adds a validator to the global config.

`validator`: the validator config.

Examples are available [here](/examples/functions.md#addvalidator).

>:warning:All validators must be added before a validation function is called.

## `addAsyncValidator(validator: AsyncValidator)` {#add-async-validator}

Adds an async validator to the global config.

`validator`: the validator config.

Examples are available [here](/examples/functions.md#addasyncvalidator).

>:warning:All async validators must be added before a validation function is called.

## `addModifier(modifier: Modifier)` {#add-modifier}

Adds a modifier to the global config.

`modifier`: the modifier config.

Examples are available [here](/examples/functions.md#addmodifier).

>:warning:All modifiers must be added before a validation function is called.

## `addFormValidationEvent(event: string, field: string, eventFunction: ValidatorEvent)` {#add-form-validation-event}

Adds an Form Validator event to the field.

`event`: the event name.
**Available events:** beforeValidate, valid, invalid, afterValidate.

`field`: the field id.

`eventFunction`: the event function.

Examples are available [here](/examples/functions.md#addformvalidationevent).

>:warning:All validator events must be added before a validation function is called.

## `setPasswordInfo(input: string | HTMLInputElement)` {#set-password-info}

Set the password info to the input type password.

`input`: the input element or input name.

>:memo:By default, the function uses the global options.

Examples are available [here](/examples/functions.md#setpasswordinfo).

## `setTextAreaLengthRestriction(TextArea: string | HTMLTextAreaElement, max: number, info?: string)` {#set-textarea-length-restriction}

Set the text length restriction to the specified textarea.

`TextArea`: the textarea element or textarea name.

`max`: the text max length.

`info`: the type of info to show (count, both, remaining).

- **count:** shows how many characters there are *(default value)*.
- **remaining:** shows the remaining available characters.
- **both:** shows the two options, count and then remaining.
*All the options show the limit of characters.*

*Should choose only one type.*

>:memo:By default, the function uses the global options.

Examples are available [here](/examples/functions.md#settextarealengthrestriction).

## `setSuggestions(input: string | HTMLInputElement, words: string[], config?: Suggestion)` {#set-suggestions}

Set suggestions to the specified input.

`input`: the input element or input name.

`words`: the array of words to suggest.
*Should be an unidimensional array.*

`config`: the suggestions config.

>:memo:By default, the function uses the global options.

Examples are available [here](/examples/functions.md#setsuggestions).
