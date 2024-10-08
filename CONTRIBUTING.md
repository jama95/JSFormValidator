# Contributing guide

Thank you to contribute in this project! Any contributions you make will be mentioned.

Please be sure to adhere to our [Code of Conduct](/CODE_OF_CONDUCT).

## Table of Contents

- [Discussions](#discussions)
- [Issues](#issues)
- [Make changes](#make-changes)
  - [Make changes in the code](#make-changes-in-the-code)
  - [Make changes in the docs](#make-changes-in-the-docs)
- [External contribution](#external-contribution)

Writing code is not the only way to contribute; you can also report bugs, answer community questions, and suggest new features or improvements.

>**Remember:**
If you have any questions, do not be afraid to ask. Asking questions to the community is also a way to contribute.

## Discussions

A great way to interact with the community.

### When to use discussions?

If you have questions about how to use or suggestions for new features or improvements.
If you have a problem with the functionality and you are not sure if it is a bug or not.
>*In this case, if the conclusion of the community is that it is an unreported bug, please report it in [issues](https://github.com/jama95/JSFormValidator/issues/new).*

### Create a discussion

You should always check to see if a related [discussion](https://github.com/jama95/JSFormValidator/discussions) already exists before starting a [new one](https://github.com/jama95/JSFormValidator/discussions/new/choose).

>:warning:Select the correct category and always set an appropriate label.

## Issues

The only and the best way to report a bug.

### When to use issues?

If you are absolutely sure that you have found a bug in the code or an error in the docs.

### Create an issue

You should always check to see if a related [issue](https://github.com/jama95/JSFormValidator/issues) already exists before opening a [new one](https://github.com/jama95/JSFormValidator/issues/new/choose).

>:memo:Always set an appropriate label.

### Solve an issue

As a general rule, issues are not assigned to anyone, so you are free to search an existing issue that interest you and solve it.

## Make changes

To make any changes in any file, you must follow these steps:

1. Fork the repository.
2. Clones your fork.
3. Installs the project.
4. Create a working branch.
5. Commit and push the changes.
6. Creates a pull request to `dev branch`.

Every pull request should be related to an issue or discussion, otherwise it will be rejected.

If it is related to a discussion, it must be approved in advance.

>:memo:You must create a branch for each issue or discussion.
>:warning:Any pull request to the master branch will be rejected.

### Make changes in the code

When you make changes in the code, there are a few considerations you should always keep in mind:

- If you add a function, you must document it using JSDoc (in english).
- If you add a validator or modifier, you must add a short description about it (in english).
- Be sure to maintain low [cognitive complexity](https://rules.sonarsource.com/typescript/RSPEC-3776/) in the code.
- Do not add inline comments.

>:bulb:*You can use the existing code as an example.*

#### Validators

- You must include it in the appropriate ts file, or create a new one in the [validators folder](./src/ts/validators/) if necessary.
- The default messages must be in English, unless it is a validator for a specific country, e.g. the [EC validators](./src/ts/validators/ec.ts).
- If you need to add an attribute, it is not mandatory that it starts with `data-fv`. *But I recommend it.*
- Always must return a `boolean` value.

#### Modifiers

- You must always include it in the [`modifiers.ts`](./src/ts/modifiers.ts) file.
- If you need to add an attribute, it is not mandatory that it starts with `data-fv`. *But I recommend it.*
- Always must return a `string` value.

#### Translations

- The filename must match the value of its [`locale`](./docs/types.md#locale) property.
- All translation files must be located in the [lang folder](./src/ts/lang/).
- Always must include a translation for the country list.
- Must include only the default properties.

>:warning:All translations must be done according to the default values (English).

#### How the expressions in the messages work

Some messages of the language options (translations) contain expressions that are used to programmatically add data or change their meaning.

**Expressions to add data:** they are between the braces `{}` and will be replaced by a value.
*They can be excluded from the message if necessary for translation.*

**Expressions to change the meaning:** they are enclosed in square brackets and/or numbers, each separated by a pipe `[] or 1[]1|2[]2`, and will be removed according to the message.
*They can not be excluded form the message.*

>:warning:Only the *expressions to change the meaning* must be translated.

##### Examples

The message of [`inv_lengthMax`](./docs/types.md#inv_lengthmax) in english (default):
`Must 1[have]1|2[choose]2 a maximum of {max} 3[character(s)]3|4[file(s)]4|5[option(s)]5.`
Could look like this:
`Must have a maximum of 20 character(s).`.

Using the translation [`es_EC`](./src/ts/lang/es_EC.ts):
`Debe 1[tener]1|2[elegir]2 un máximo de {max} 3[caracter(es)]3|4[archivo(s)]4|5[opción(es)]5.`
Could look like this:
`Debe tener un máximo de 20 caracter(es).`.

The message of [`inv_letters`](./docs/types.md#inv_letters) in english (default):
`Can oly contain letters.[ Also can contain {extra}]`
Could look like this:
`Can oly contain letters.` or `Can oly contain letters. Also can contain ,.;`.

Using the translation [`es_EC`](./src/ts/lang/es_EC.ts):
`Sólo puede contener letras.[ También puede contener {extra}]`
Could look like this:
`Sólo puede contener letras.` or `Sólo puede contener letras. También puede contener ,.;`.

##### Special cases

A special case is when an expression that *change the meaning* can be programmatically replaced by the value of an attribute of the field.
*If the attribute is not present, only the square brackets are removed*.

>:memo:The attribute name is determined in the function of the validator.

The message of [`inv_confirmation`](./docs/types.md#inv_confirmation) in english (default):
`[The values] do not match.`
Could look like this:
`The values do not match.` or `The passwords do not match.`

Using the translation [`es_EC`](./src/ts/lang/es_EC.ts):
`[Los valores] no coinciden.`
Could look like this:
`Los valores no coinciden.` or `Las contraseñas no coinciden.`.

### Make changes in the docs

Any change to the documentation files is considered an improvement, so you must [create a discussion](#create-a-discussion) first and wait for it to be approved.

## External contribution

Feel free to fork and make your own builds, validators or modifiers.

Any external contribution can be mentioned in the acknowledgements section of the README, if desired.

>:memo:Do not forget to mention this repository in your own.
