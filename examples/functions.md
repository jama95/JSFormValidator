# Functions examples

The examples use the Bootstrap CSS classes and the default options.

## Table of contents

- [FormValidator](#formvalidator)
- [validate](#validate)
- [fromJSON](#fromjson)
- [restrict](#restrict)
- [addValidator](#addvalidator)
- [addAsyncValidator](#addasyncvalidator)
- [addFormValidationEvent](#addformvalidationevent)
- [setPasswordInfo](#setpasswordinfo)
- [setTextAreaLengthRestriction](#settextarealengthrestriction)
- [setSuggestions](#setsuggestions)

### FormValidator

Read more about the function and its parameters [here](/docs/functions.md#formvalidatoroptions-options-lang-lang).

```javascript
/* To use the default options and lang. */
FormValidator();

/* To use the default options and a custom lang. */
FormValidator({}, es);
/* NOTE: Works only if a constant of language is declared, before this call.  */

/* To use custom options */
FormValidator({validMessagesPosition: true});
```

### validate

Read more about the function and its parameters [here](/docs/functions.md#validateform-string-options-options).

```javascript
/* To validate all the configured forms. */
FormValidator().validate();

/* To validate only the specified forms. */
FormValidator().validate("MyForm1,MyForm2");

/* To set private options */
FormValidator().validate("MyForm", {validateOnInput: true});
/* NOTE: These options do not change the global ones, they are for this form only.*/
```

### fromJSON

Read more about the function and its parameters [here](/docs/functions.md#fromjsonjson-jsonconfig-options-options).

```javascript
const config = {
  "#MyForm": {
    "input[name=input1]": {
      validators: "required",
      modifiers: "capitalized"
    },
    "#input2": {
      validators: "required color",
      dataFV: {
        colors: "RGB,RGBA"
      }
    },
    "#input3": {
      validators: "required",
      dataFV: {
        "depends-on": "input1"
        "depends-on-value": "Something"
      }
    }
  }
}

FormValidator().fromJSON(config);

/* To set private options */
FormValidator().fromJSON(config, {validateOnInput: true});
/* NOTE: These options do not change the global ones, they are for this form only.*/
```

### restrict

Read more about the function and its parameters [here](/docs/functions.md#restrict).

```javascript
/* Numbers and decimal point */
FormValidator().restrict("input2", "numbers", "", ".");

/* Hexadecimal numbers */
FormValidator().restrict("input2", "none", "", "0123456789abcdef");
```

### addValidator

Read more about the function and its parameters [here](/docs/functions.md#add-validator).

```javascript
const fv = FormValidator()
fv.addValidator({
  name: "is_even",
  validatorFunction: function (value, form, field, options, lang) {
    if (/[a-z]/i.test(value)) return false;
    if (parseInt(value) % 2 == 0) return true;
    else return false;
  },
  invalidMessage: "invalid",
  messageKey: "vKey"
});
fv.validate();
```

### addAsyncValidator

Read more about the function and its parameters [here](/docs/functions.md#add-async-validator).

```javascript
const fv = FormValidator()
fv.addAsyncValidator({
  name: "server_check",
  validatorFunction: async function (value, form, field, options, lang) {
   const res =  await fetch("server/request/path/");
   if(res.ok) return res.text() == "ok" ? true : false;
   else return false;
  },
  invalidMessage: "invalid",
  messageKey: "avKey"
});
fv.validate();
```

### addModifier

Read more about the function and its parameters [here](/docs/functions.md#addmodifiermodifier-modifier-add-modifier).

```javascript
const fv = FormValidator()
fv.addModifier({
  name: "upper_case",
  modifierFunction: function (value) {
    return value.toUpperCase();
  }
});
fv.validate();
```

### addFormValidationEvent

Read more about the function and its parameters [here](/docs/functions.md#addformvalidationeventevent-string-field-string-eventfunction-validatorevent-add-form-validation-event).

```javascript
const fv = FormValidator()
fv.addFormValidationEvent("invalid", "input1", function (form, field, state, options) {
  console.log(`The field '#${field.id}' of the form '#${form.id}' has an invalid state.`).
});
fv.validate();
```

### setPasswordInfo

Read more about the function and its parameters [here](/docs/functions.md#setpasswordinfoinput-string--htmlinputelement-set-password-info).

```javascript
FormValidator().setPasswordInfo("input1");
```

### setTextAreaLengthRestriction

Read more about the function and its parameters [here](/docs/functions.md#settextarealengthrestrictiontextarea-string--htmltextareaelement-max-number-info-string-set-textarea-length-restriction).

```javascript
FormValidator().setTextAreaLengthRestriction("input1", 5000, "both");
```

### setSuggestions

Read more about the function and its parameters [here](/docs/functions.md#setsuggestionsinput-string--htmlinputelement-words-string-config-suggestion-set-suggestions).

```javascript
FormValidator().setSuggestions("input2", ["list","of","words"], {maxHeight: "300px"});

/* using the country list info */
const ONU_countries = world_en.filter(w => w.ONU == "YES").map(w => w.CTname)
FormValidator().setSuggestions("input2", ONU_countries);
```
