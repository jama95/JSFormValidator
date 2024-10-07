# JSFormValidator

[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?logo=javascript&logoColor=%23000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=%23fff)](https://www.typescriptlang.org) [![Sass](https://img.shields.io/badge/Sass-%23CC6699?logo=sass&logoColor=%23fff)](https://sass-lang.com) [![CSS](https://img.shields.io/badge/CSS-%231572B6?logo=css3&logoColor=%23fff)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![Gulp](https://img.shields.io/badge/Gulp-%23CF4647?logo=gulp&logoColor=%23fff)](https://gulpjs.com/) [![Babel](https://img.shields.io/badge/Babel-%23F9DC3E?logo=babel&logoColor=%23000)](https://babeljs.io) [![NPM](https://img.shields.io/badge/NPM-%23CB3837?logo=npm)](https://www.npmjs.com) [![standard-readme compliant](https://img.shields.io/badge/readme%20style%20standard-brightgreen)](https://github.com/RichardLitt/standard-readme) [![contributor covenant code of conduct](https://img.shields.io/badge/contributor_covenant-9f16c3)](https://github.com/RichardLitt/standard-readme) [![Keep a Changelog v1.1.0 badge](https://img.shields.io/badge/Keep%20a%20Changelog%20v1.1.0-%23E05735)](./CHANGELOG.md)  [![MIT LiCENSE](https://img.shields.io/badge/MIT%20License-blue.svg?style=flat)](/LICENSE)

A JavaScript library for validating data in HTML forms.

Ensures that form data is valid before submission, preventing the form from being submitted if any field is invalid. The library is highly configurable, written in TypeScript, compiled in UMD format, and includes minimal CSS styles to ensure compatibility with any CSS framework.

Features:

- Sync validation.
- Async validation.
- Valid and invalid messages.
- Help messages.
- Validation events.
- Text modifiers.
- Char restriction for text inputs.
- Password info and strength meter.
- Word suggestions for text inputs.
- Text length restriction for Textarea.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Security](#security)
- [Validators and Modifiers](#validators-and-modifiers)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Background

This library is inspired by [Victor Jonsson](https://github.com/victorjonsson)'s [jQuery-Form-Validator](https://github.com/victorjonsson/jQuery-Form-Validator) project.

## Install

It is recommended to use a package manager to include it in your project, or you can also include it in the head of your HTML via a CDN or downloading the compiled files from a [release](https://github.com/jama95/JSFormValidator/releases).

### Via package manager

```bash
npm install js-form-validator
```

### Via CDN or Release

```html
<link href="https://cdn.jsdelivr.net/npm/js-form-validator/dist/css/FormValidator.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/js-form-validator/dist/js/FormValidator.min.js" type="text/javascript"></script>
<!-- (optional) if you want to use the country list info -->
<script src="https://cdn.jsdelivr.net/npm/js-form-validator/dist/js/lang/countries.min.js" type="text/javascript"></script>
<!-- (optional) if you want to use a translation -->
<script src="https://cdn.jsdelivr.net/npm/js-form-validator/dist/js/lang/es.min.js" type="text/javascript"></script>
```

If you want to download a version, add the file references as shown above by replacing the href and src values with the appropriate file paths.

>:memo:The translations already includes the country list info.

## Usage

To use JSFormValidator you can just use de root function or assign it to a variable or constant (recommended).

```javascript
// if you need to use only one feature.
FormValidator().validate("myForm");
// if you need to use several features.
const fv = FormValidator();
```

There are two ways to validate forms: `validate` and `formJSON`. Each one is isolated, which means that it has its own copy of options that are independent of the global ones, so you can set different options for each validation without modifying the global options.

To use `validate`, you must add attributes to the form fields.

```html
<form id="login">
  <div class="fv-group">
    <label for="user">User</label>
    <input type="text" name="user" id="user"
    data-fv-validators="required">
  </div>
  <div class="fv-group">
    <label for="psw">Password</label>
    <input type="password" name="psw" id="psw"
    class="form-control" data-fv-validators="required">
  </div>
  <div class="fv-group">
    <label for="remember">Remember me</label>
    <input type="checkbox" name="remember" id="remember"
    data-fv-validators="required">
  </div>
  <br>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

>:memo:All the default attributes used by the library start with `data-fv`, but you can change some ot them in the options.

```javascript
FormValidator().validate("login");
```

To use `fromJSON` is not needed to add attributes to the form fields. This is useful if you can not modify the HTML files, or if you just do not want to.

```javascript
let config = {
  "#login": {
      "#user": {
        validators: "required"
      },
      "#psw": {
        validators: "required"
      },
      "#remember": {
        validators: "required"
      }
    }
  };
FormValidator().fromJSON(config);
```

>:bulb:To list the validators o modifiers you can do it by separating them with any combination of: , | - or spaces.

Read more about its use in [examples](./examples).

Check the [FAQ](./FAQ.md) if you have a question, you can also view the existing [discussions](https://github.com/jama95/JSFormValidator/discussions/categories/q-a), if there is none related to your question, you can start a [new discussion](https://github.com/jama95/JSFormValidator/discussions/new?category=q-a) to ask the community.

>:memo:Remember to choose the Q&A category if you want to ask questions to the community through a discussion.

## Security

Reliable references have been used to ensure the reliability of the information used.

Read more about in [SECURITY.md](./SECURITY.md)

## Validators and Modifiers

**Validators** check that the data typed into the form fields is correct.
**Modifiers** change or apply a format to the text typed in the form fields.

Read more about the available validators and modifiers:

- [Default validators](./docs/validators.md#default-validators)
- [Date validators](./docs/validators.md#date-validators)
- [Net validators](./docs/validators.md#net-validators)
- [File validators](./docs/validators.md#file-validators)
- [Security validators](./docs/validators.md#security-validators)
- [Dependant validation](./docs/specials.md#dependant-validation)
- [Optional validation](./docs/specials.md#optional-validation)
- [EC validators](./docs/specials.md#ec-validators)
- [Modifiers](./docs/modifiers.md)

## API

### Types

The most important types of the library are `options` and `lang`, because they allow you to customize the functionality of the library.

`Options`: Where all the options for modifying the basic operation of the library are listed.

`Lang`: Where all language-related options are listed.

>:warning:Knowing the types is important if you want to contribute to the code.

Read more about these and other types in [docs](./docs/types.md).

### Functions

The main functions of the library are `FormValidator` `validate` and `fromJSON`.

`FormValidator`: The root function, all the other functions need it to work.

`validate`: The function to validate the data in the fields of the forms.

`fromJSON`: A programmatic alternative to `validate`.

Read more about these and other functions in [docs](./docs/functions.md).

## Contributing

Read about how to contribute, [here](./CONTRIBUTING.md).

Donations are welcome🙂.

[![PayPal Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/jama95)

## License

JSFormValidator is freely distributable under the terms of the [MIT License](https://spdx.org/licenses/MIT.html).

See the license file [here](/LICENSE).
