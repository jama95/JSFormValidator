(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.FormValidator = mod.exports.FormValidator;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.FormValidator = FormValidator;
  //#region config
  const options = {
    ignoredFieldsNames: "",
    validMessageClass: "valid-feedback",
    invalidMessageClass: "invalid-feedback",
    validClass: "is-valid",
    invalidClass: "is-invalid",
    validLabelClass: "text-success",
    invalidLabelClass: "text-danger",
    inlineMessageClass: "fv-msg",
    topMessagesClass: "alert",
    validMessagesClass: "alert-success",
    invalidMessagesClass: "alert-danger",
    validMessagesPosition: "inline",
    invalidMessagesPosition: "inline",
    topMessagesTemplate: `<div class="{topMessagesClass} {valid_invalid}" target="#{formID}" data-fv-top-{vi}><h4>{title}</h4><ul>{fields&messagesList}</ul></div>`,
    scrollToTopOnInvalid: false,
    addValidClassOnAll: false,
    validateHiddenFields: false,
    validMessageCallback: undefined,
    invalidMessageCallback: undefined,
    form: "form",
    parentField: ".fv-group",
    fieldModifyAttribute: "data-fv-modifiers",
    fieldValidateAttribute: "data-fv-validators",
    fieldInvalidMessageAttribute: "data-fv-invalid-msg",
    fieldValidMessageAttribute: "data-fv-valid-msg",
    fieldHelpMessageAttribute: "data-fv-help-msg",
    modifyOnInput: true,
    validateOnInput: false,
    validateOnBlur: true,
    validateCheckboxRadioOnClick: true,
    showHelpMessagesOnFocus: true,
    addSuggestions: true,
    suggestionConfig: {
      maxHeight: "150px",
      containerClass: "fv-suggestion_container",
      optionClass: "fv-suggestion_option"
    },
    suggestionAttribute: "data-fv-suggestions",
    lengthRestrictAttribute: "data-fv-text-length",
    lengthRestrictInfo: "count",
    passwordSpecialChars: /[\x21\x40\x23\x24\x25\x5E\x26\x2A\x5F\x2D\x2B\x3D]/,
    addPasswordInfo: true,
    passwordInfoClass: "card"
  };
  const language = {
    locale: "en-US",
    currencyCode: "USD",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm:ss",
    validTitle: "Valid form data!",
    invalidTitle: "Invalid form data!",
    notConfirmed: "Could not be validated.",
    inv_required: "Is required.",
    inv_date: "Is not a valid date.",
    inv_time: "Is not a valid time.",
    inv_telephone: "Is not a valid phone number.",
    inv_ipv4: "Is not a valid IPv4 address.",
    inv_ipv6: "Is not a valid IPv6 address.",
    inv_domain: "Is not a valid domain.",
    inv_email: "Is not a valid e-mail address.",
    inv_url: "Is not a valid URL.",
    inv_numbers: "Is not a valid number.",
    inv_numberMax: "Must be less than or equal to {max}.",
    inv_numberMin: "Must be greater than or equal to {min}.",
    inv_numberRange: "Must match the range {range}.",
    inv_numberEqual: "Must be equal to {equal}.",
    inv_numberStep: "Must increase by {step}.",
    inv_lengthMax: "Must 1[have]1|2[choose]2 a maximum of {max} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
    inv_lengthMin: "Must 1[have]1|2[choose]2 a minimum of {min} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
    inv_lengthRange: "Must 1[have]1|2[choose]2 between {min} and {max} 3[characters]3|4[files]4|5[options]5.",
    inv_lengthEqual: "Must 1[have]1|2[choose]2 {equal} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
    inv_letters: "Can oly contain letters.[ Also can contain {extra}]",
    inv_regexp: "Is not a valid value.",
    inv_alphanumeric: "Can only contain letters and numbers.[ Also can contain {extra}]",
    inv_color: "Is not a valid color format.",
    inv_file_size: "File(s) size is too large (max: {max}).",
    inv_file_type: "File(s) type must be: {type}.",
    inv_file_extension: "File(s) extension must be: {extension}.",
    inv_image_dimension: "Image(s) dimensions are not valid.",
    inv_image_heigh: "Image(s) heigh must not exceed: {max}px.",
    inv_image_width: "Image(s) width must not exceed: {max}px.",
    inv_image_ratio: "Image aspect ratio is not valid.",
    inv_credit_card: "Credit card number is not valid.",
    inv_cvv: "CVV number is not valid.",
    inv_confirmation: "[The values] do not match.",
    inv_security_answer: "Security question answer is not valid.",
    inv_strength: "Password is not strong enough.",
    passwordConditionsTitle: "Password must contain:",
    passwordConditionUppercase: "Uppercase letter(s).",
    passwordConditionLowercase: "Lowercase letter(s).",
    passwordConditionSpecialChars: "Special character(s).",
    passwordConditionNumericChars: "Numeric character(s).",
    passwordConditionLength: "At least 8 characters.",
    passwordStrengthVeryWeak: "Very weak &#x1F628;",
    passwordStrengthWeak: "Weak &#x1F61E;",
    passwordStrengthNormal: "Normal &#x1F610;",
    passwordStrengthStrong: "Strong &#x1F601;",
    passwordStrengthVeryStrong: "Very Strong &#x1F60E;"
  };
  const configuration = {
    validators: {},
    asyncValidators: {},
    modifiers: {},
    stopValidation: false,
    onBeforeValidate: {},
    onValid: {},
    onInvalid: {},
    onAfterValidate: {},
    validMessages: {},
    invalidMessages: {},
    language: language
  };
  const telephoneFormats = {
    EC: [/^(?:0|\x2B593\s?)(?:\d{2}(?:\s|-)?)\d{3}(?:\s|-)?\d{4}$/, /^(?:(?:0|\x2B593\s?)[2-7]\s?)?\d{7}$/]
  };
  const cardInfo = {
    AMEX: {
      first: [3],
      length: {
        min: 15,
        max: 15
      },
      cvv: 4
    },
    VISA: {
      first: [4],
      length: {
        min: 16,
        max: 16
      },
      cvv: 3
    },
    MAST: {
      first: [2, 5],
      length: {
        min: 16,
        max: 16
      },
      cvv: 3
    },
    DISC: {
      first: [6],
      length: {
        min: 16,
        max: 16
      },
      cvv: 3
    }
  };
  //#endregion config

  //#region modifiers
  /* Converts the text to lowercase */
  configuration.modifiers["lower"] = {
    name: "lower",
    modifierFunction: function (value) {
      return value.toLowerCase();
    }
  };

  /* Converts the text to uppercase */
  configuration.modifiers["upper"] = {
    name: "upper",
    modifierFunction: function (value) {
      return value.toUpperCase();
    }
  };

  /* Converts the first letter of each word in the text to uppercase */
  configuration.modifiers["capital"] = {
    name: "capital",
    modifierFunction: function (value) {
      return capitalizedWords(value);
    }
  };

  /* Converts the first letter of the text to uppercase */
  configuration.modifiers["sentence"] = {
    name: "sentence",
    modifierFunction: function (value) {
      return sentenceCase(value);
    }
  };

  /* Converts the first letter of each word in the text to uppercase and removes all the spaces */
  configuration.modifiers["camel"] = {
    name: "camel",
    modifierFunction: function (value) {
      return camel_pascal(value, false);
    },
    modifyOnInput: false
  };

  /* Converts the first letter of each word(except for the first) in the text to uppercase and removes all the spaces */
  configuration.modifiers["pascal"] = {
    name: "pascal",
    modifierFunction: function (value) {
      return camel_pascal(value, true);
    },
    modifyOnInput: false
  };

  /* Convert a number to currency format */
  configuration.modifiers["currency"] = {
    name: "currency",
    modifierFunction: function (value, form, input) {
      const d = input.getAttribute("data-fv-decimals");
      const locale = input.getAttribute("data-fv-locale") ?? undefined,
        currency = input.getAttribute("data-fv-currency") ?? undefined,
        decimals = d ? parseInt(d) : undefined;
      if (!input.hasAttribute("data-fv-currency_original")) {
        input.setAttribute("data-fv-currency_original", value);
      }
      input.addEventListener("focus", () => {
        input.value = input.getAttribute("data-fv-currency_original") ?? value;
      });
      input.addEventListener("input", () => {
        input.setAttribute("data-fv-currency_original", input.value);
      });
      value = input.getAttribute("data-fv-currency_original");
      if (/[^\d.]/.test(value)) return value;
      return currencyFormat(value, language, locale, currency, decimals);
    },
    modifyOnInput: false
  };

  /* Removes the leading and trailing white space and line terminator characters from a string */
  configuration.modifiers["trim"] = {
    name: "trim",
    modifierFunction: function (value) {
      return value.trim();
    },
    modifyOnInput: false
  };

  /* Removes the leading white space and line terminator characters from a string */
  configuration.modifiers["trim_left"] = {
    name: "trim_left",
    modifierFunction: function (value) {
      return value.trimStart();
    },
    modifyOnInput: false
  };

  /* Removes the trailing white space and line terminator characters from a string */
  configuration.modifiers["trim_right"] = {
    name: "trim_right",
    modifierFunction: function (value) {
      return value.trimEnd();
    },
    modifyOnInput: false
  };
  //#endregion modifiers

  //#region date
  /* Checks if the field value matches with the specified date format */
  configuration.validators["date"] = {
    name: "date",
    validatorFunction: function (value, form, field, options, lang) {
      const format = field.getAttribute("data-fv-date_format") ?? lang.dateFormat;
      const check = checkDateFormat(value, format);
      if (check == "no") {
        this.invalidMessage = lang.notConfirmed;
        return false;
      }
      if (check == "invalid") {
        this.invalidMessage = lang.inv_date;
        return false;
      }
      return true;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "date"
  };

  /* Checks if the field value matches with the specified time format   */
  configuration.validators["time"] = {
    name: "time",
    validatorFunction: function (value, form, field, options, lang) {
      const format = field.getAttribute("data-fv-time_format") ?? lang.timeFormat;
      const check = checkTimeFormat(value, format);
      if (check == "no") {
        this.invalidMessage = lang.notConfirmed;
        return false;
      }
      if (check == "invalid") {
        this.invalidMessage = lang.inv_time;
        return false;
      }
      return true;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "time"
  };
  //#endregion date

  //#region default
  /* Checks if the field has a value */
  configuration.validators["required"] = {
    name: "required",
    validatorFunction: function (value, form, field, options, lang) {
      const name = field.getAttribute("name");
      if (field instanceof HTMLInputElement && field.type == "checkbox") {
        return form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`).length > 0;
      } else if (field instanceof HTMLInputElement && field.type == "radio") {
        return form.querySelectorAll(`input[type="radio"][name="${name}"]:checked`).length > 0;
      } else {
        return value.trim().length > 0;
      }
    },
    invalidMessage: language.inv_required,
    messageKey: "required"
  };
  let lengthMessage = language.notConfirmed;

  /**
   * Set the invalid length message
   * @param {boolean} file True if it is a file input
   * @param {boolean} multiple True if it is a multiple select
   * @param {boolean} check True if it is a checkbox input
   * @returns {string} Length message
   */
  function setLengthMessage(file, multiple, check) {
    if (file) return lengthMessage.replace(/1\x5B.+2\x5B/, "").replace("]2", "").replace(/3\x5B.+4\x5B/, "").replace(/\x5D4.+\x5D5/, "");else if (multiple || check) return lengthMessage.replace(/1\x5B.+2\x5B/, "").replace("]2", "").replace(/3\x5B.+5\x5B/, "").replace("]5", "");else return lengthMessage.replace(/\x5D1.+\x5D2/, "").replace("1[", "").replace(/\x5D3.+\x5D5/, "").replace("3[", "");
  }

  /* Checks if the field value has the correct length */
  configuration.validators["length"] = {
    name: "length",
    validatorFunction: function (value, form, field, options, lang) {
      const length = field.getAttribute("data-fv-length");
      if (!length) {
        this.invalidMessage = lang.notConfirmed;
        return false;
      }
      let val = value.length,
        file = false,
        multiple = false,
        checkbox = false;
      if (field instanceof HTMLInputElement && field.type == "file" && field.files) {
        file = true;
        val = field.files.length;
      }
      if (field instanceof HTMLInputElement && field.type == "checkbox") {
        val = document.querySelectorAll(`input[name=${field.name}]:checked`).length;
        checkbox = true;
      }
      if (field instanceof HTMLSelectElement && field.hasAttribute("multiple")) {
        multiple = true;
        val = field.selectedOptions.length;
      }
      const check = checkStringLength(val, length);
      switch (check[0]) {
        case "max":
          lengthMessage = lang.inv_lengthMax.replace("{max}", check[1]);
          this.invalidMessage = setLengthMessage(file, multiple, checkbox);
          return false;
        case "min":
          lengthMessage = lang.inv_lengthMin.replace("{min}", check[1]);
          this.invalidMessage = setLengthMessage(file, multiple, checkbox);
          return false;
        case "range":
          lengthMessage = lang.inv_lengthRange.replace("{max}", check[2]).replace("{min}", check[1]);
          this.invalidMessage = setLengthMessage(file, multiple, checkbox);
          return false;
        case "equal":
          lengthMessage = lang.inv_lengthEqual.replace("{equal}", check[1]);
          this.invalidMessage = setLengthMessage(file, multiple, checkbox);
          return false;
        case "no":
          this.invalidMessage = lang.notConfirmed;
          return false;
      }
      return true;
    },
    invalidMessage: lengthMessage,
    messageKey: "length"
  };

  /**
   * Set the invalid number message
   * @param {string[]} check Response of check function
   * @param {Lang} lang Language
   * @returns {string} Number message
   */
  function setNumberMessage(check, lang) {
    switch (check[0]) {
      case "max":
        return lang.inv_numberMax.replace("{max}", check[1]);
      case "min":
        return lang.inv_numberMin.replace("{min}", check[1]);
      case "range":
        return lang.inv_numberRange.replace("{range}", `${check[1]}::${check[2]}`);
      case "equal":
        return lang.inv_numberEqual.replace("{equal}", check[1]);
      case "step":
        return lang.inv_numberStep.replace("{step}", check[1]);
      default:
        return lang.inv_numbers;
    }
  }

  /* Checks if the field value contains only numbers and if it matches with the conditions */
  configuration.validators["numbers"] = {
    name: "numbers",
    validatorFunction: function (value, form, field, options, lang) {
      const allow = (field.getAttribute("data-fv-numbers_allow") ?? "").split(/[,|-]+\s*|\s+/);
      if (allow.includes("noPositive") && !value.includes("-")) return false;
      if (!allow.includes("negative") && !allow.includes("noPositive") && value.includes("-")) return false;
      if (!allow.includes("decimal") && value.includes(".")) return false;
      if (/^-?\d+(\x2E\d+)?$/.test(value)) {
        const range = field.getAttribute("data-fv-numbers_range") ?? "",
          step = field.getAttribute("data-fv-numbers_step") ?? "",
          check = checkRangeStep(allow, parseFloat(value), range, step);
        if (check[0][0] && check[0][0] != "ok") {
          this.invalidMessage = setNumberMessage(check[0], lang);
          return false;
        }
        if (check[1][0] && check[1][0] != "ok") {
          this.invalidMessage = setNumberMessage(check[1], lang);
          return false;
        }
      } else return false;
      return true;
    },
    invalidMessage: language.inv_numbers,
    messageKey: "numbers"
  };

  /* Checks if the field value contains only letters and/or the allowed characters */
  configuration.validators["letters"] = {
    name: "letters",
    validatorFunction: function (value, form, field, options, lang) {
      const allow = field.getAttribute("data-fv-letters_allow") ?? "";
      const regex = new RegExp(`^[a-z${escapeRegExp(allow)}]+$`, "i");
      if (!regex.test(value)) {
        if (allow.length == 0) this.invalidMessage = language.inv_letters.replace(/\x5B.+\x5D/, "");else this.invalidMessage = language.inv_letters.replace("[", "").replace("]", "").replace(/\x7B.+\x7D/, allow);
        return false;
      }
      return true;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "letters"
  };

  /**
   * Set the invalid alphanumeric message
   * @param {string} allow Allowed characters
   * @returns {string} Alphanumeric message
   */
  function setAlphanumericMessage(allow) {
    if (allow.length == 0) return language.inv_alphanumeric.replace(/\x5B.+\x5D/i, "");else return language.inv_alphanumeric.replace("[", "").replace("]", "").replace(/\x7B\w+\x7D/, allow);
  }

  /* Checks if the field value contains only numbers and/or letters and/or the allowed characters */
  configuration.validators["alphanumeric"] = {
    name: "alphanumeric",
    validatorFunction: function (value, form, field, options, lang) {
      const allow = field.getAttribute("data-fv-letters_allow") ?? "";
      const regex = new RegExp(`^[a-z\\d${escapeRegExp(allow)}]+$`, "i");
      if (!regex.test(value)) {
        this.invalidMessage = setAlphanumericMessage(allow);
        return false;
      }
      return true;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "alphanumeric"
  };

  /* Checks if the field value matches with the specified regular expression */
  configuration.validators["regex"] = {
    name: "regex",
    validatorFunction: function (value, form, field, options, lang) {
      const regex = field.getAttribute("data-fv-regex") ?? "";
      const flags = field.getAttribute("data-fv-flags") ?? undefined;
      if (!regex) return false;
      return new RegExp(regex, flags).test(value);
    },
    invalidMessage: language.inv_regexp,
    messageKey: "regex"
  };

  /* Checks if the field value matches with the specified time format   */
  configuration.validators["telephone"] = {
    name: "telephone",
    validatorFunction: function (value, form, field, options, lang) {
      const format = field.getAttribute("data-fv-telephone_format") ?? "EC";
      if (telephoneFormats[format]) return new RegExp(telephoneFormats[format].join("|").replace(/\//g, "")).test(value);
      return false;
    },
    invalidMessage: language.inv_telephone,
    messageKey: "telephone"
  };

  // Regex compatible with "test" and "match"
  const RGB = "(rgb\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\x29)";
  const RGBA = "(rgba\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(0?\\x2E\\d+|[01])\\x29)";
  const HSL = "(hsl\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\x29)";
  const HSLA = "(hsla\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s*\\x2C\\s*(0\\x2E\\d+|[01])\\x29)";
  const CMYK = "(CMYK\\x28(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s*\\x2C\\s*(100|[1-9]?\\d)\\x25\\x29)";
  const HEX = "((?:\\x23(?:[a-f\\d]{2}){3}(?:[a-f\\d]{2})?)|(?:\\x23[a-f\\d]{3}[a-f\\d]?))";

  /* Checks if the field value matches with the specified color formats   */
  configuration.validators["color"] = {
    name: "color",
    validatorFunction: function (value, form, field, options, lang) {
      const colors = field.getAttribute("data-fv-colors") ?? "";
      const regex = [];
      if (colors.trim().length == 0) regex.push(`^${RGB}$|^${RGBA}$|^${HSL}$|^${HSLA}$|^${CMYK}$|^${HEX}$`);else {
        if (colors.search(/rgba?/i)) regex.push(`^${RGB}$|^${RGBA}$`);
        if (colors.search(/hsla?/i)) regex.push(`^${HSL}$|^${HSLA}$`);
        if (colors.search(/CMYK/i)) regex.push(`^${CMYK}$`);
        if (colors.search(/(?:hex)|#/i)) regex.push(`^${HEX}$`);
      }
      const check = new RegExp(regex.length > 1 ? regex.join("|") : regex[0], "i");
      if (check.test(value)) return true;
      return false;
    },
    invalidMessage: language.inv_color,
    messageKey: "color"
  };
  //#endregion default

  //#region ec
  /* Checks if the field value has a real Ecuadorian identification card number */
  configuration.validators["ec_cedula"] = {
    name: "ec_cedula",
    validatorFunction: function (value, form, field, options, lang) {
      if (/\D/.test(value)) return false;
      if (value.length != 10) return false;
      const digits = value.split("").map(Number);
      if (digits[2] >= 6) return false;
      const province_code = parseInt(value.substring(0, 2));
      if (province_code == 0 || province_code > 24 || province_code != 30) return false;
      const checker = digits.pop();
      let tot = luhn(digits);
      tot = checker != 0 ? 10 - tot : tot;
      return tot === checker;
    },
    invalidMessage: "El número de cédula no es válido.",
    messageKey: "ec_cedula"
  };

  /**
   * Checks the lasted numbers of the RUC
   * @param {number[]} digits Array of RUC numbers
   * @param {string} value String RUC number
   * @returns {boolean} True if is ok
   */
  function checkLasted(digits, value) {
    if (digits[2] < 6 && value.substring(10) != "001") return false;
    if (digits[2] == 9 && value.substring(10) == "000") return false;
    if (digits[2] == 6 && value.substring(9) != "0000") return false;
    return true;
  }

  /* Checks if the field value has a real Ecuadorian RUC number */
  configuration.validators["ec_ruc"] = {
    name: "ec_ruc",
    validatorFunction: function (value, form, field, options) {
      if (/\D/.test(value)) return false;
      if (value.length != 13) return false;
      const digits = value.split("").map(Number);
      if (digits[2] == 7 || digits[2] == 8) return false;
      const province_code = parseInt(value.substring(0, 2));
      if (province_code == 0 || province_code > 24 || province_code != 30) return false;
      const toCheck = digits.slice(0, 10);
      const check = digits[2] < 6 ? 10 : 11;
      if (!checkLasted(digits, value)) return false;
      if (digits[2] == 6) toCheck.pop();
      const checker = toCheck.pop();
      let tot = digits[2] < 6 ? luhn(digits) : module11(digits);
      tot = checker != 0 ? check - tot : tot;
      return tot === checker;
    },
    invalidMessage: "El número de ruc no es válido",
    messageKey: "ec_ruc"
  };
  //#endregion ec

  //#region file
  /* Checks if the size of the selected files is correct  */
  configuration.validators["file_size"] = {
    name: "file_size",
    validatorFunction: function (value, form, field, options, lang) {
      if (field instanceof HTMLInputElement && field.type == "file") {
        const files = field.files;
        if (files) {
          const sizeSTR = field.getAttribute("data-fv-file_max_size") ?? "5MB";
          const maxSize = sizeStringToBytes(sizeSTR);
          let check = true;
          for (const file of Array.from(files)) {
            if (file.size > maxSize) {
              check = false;
              break;
            }
          }
          if (!check) {
            this.invalidMessage = lang.inv_file_size.replace("{max}", sizeSTR);
          }
          return check;
        }
      }
      return false;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "file_size"
  };

  /* Checks if the selected files are of the correct MIME type */
  configuration.validators["file_type"] = {
    name: "file_type",
    validatorFunction: function (value, form, field, options, lang) {
      if (field instanceof HTMLInputElement && field.type === "file") {
        const files = field.files;
        if (files) {
          const typeList = (field.getAttribute("data-fv-file_type") ?? "").split(/[,|-]+\s*|\s+/);
          const check = Array.from(files).every(file => typeList.includes(file.type));
          if (!check) {
            this.invalidMessage = lang.inv_file_type.replace("{type}", `(${typeList.join(", ")})`);
          }
          return check;
        }
      }
      return false;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "file_type"
  };

  /* Checks if the selected files has the correct extension */
  configuration.validators["file_extension"] = {
    name: "file_extension",
    validatorFunction: function (value, form, field, options, lang) {
      if (field instanceof HTMLInputElement && field.type === "file") {
        const files = field.files;
        if (files) {
          const extensionList = (field.getAttribute("data-fv-file_extension") ?? "").split(/[,|-]+\s*|\s+/);
          const check = Array.from(files).every(file => extensionList.includes(file.name.slice(file.name.lastIndexOf(".") + 1)));
          if (!check) {
            this.invalidMessage = lang.inv_file_extension.replace("{extension}", `(${extensionList.join(", ")})`);
          }
          return check;
        }
      }
      return false;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "file_extension"
  };

  /* Checks if the selected images have the correct dimensions */
  configuration.asyncValidators["image_dimension"] = {
    name: "image_dimension",
    validatorFunction: async function (value, form, field, options, lang) {
      if (!(field instanceof HTMLInputElement && field.type === "file")) return false;
      const dimension = field.getAttribute("data-fv-image_dimension") ?? "";
      if (dimension.trim().length === 0) return false;
      const files = field.files;
      if (!files) return false;
      const [width, height] = dimension.split("x").map(Number);
      let check = false;
      for (const file of Array.from(files)) {
        if (!file.type.includes("image")) {
          this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
          check = false;
          break;
        }
        const dim = await getImageDimensions(file);
        check = dim[0] == width && dim[1] == height;
        if (!check) {
          this.invalidMessage = lang.inv_image_dimension;
          break;
        }
      }
      return check;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "image_dimension"
  };

  /* Checks if the selected images have the correct height */
  configuration.asyncValidators["image_height"] = {
    name: "image_height",
    validatorFunction: async function (value, form, field, options, lang) {
      if (!(field instanceof HTMLInputElement && field.type === "file")) return false;
      const height = field.getAttribute("data-fv-image_height") ?? "";
      if (height.trim().length === 0) return false;
      const files = field.files;
      if (!files) return false;
      let check = false;
      for (const file of Array.from(files)) {
        if (!file.type.includes("image")) {
          this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
          check = false;
          break;
        }
        const dim = await getImageDimensions(file);
        check = dim[0] <= parseFloat(height);
        if (!check) {
          this.invalidMessage = lang.inv_image_heigh.replace("{max}", height);
          break;
        }
      }
      return check;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "image_height"
  };

  /* Checks if the selected images have the correct width */
  configuration.asyncValidators["image_width"] = {
    name: "image_width",
    validatorFunction: async function (value, form, field, options, lang) {
      if (!(field instanceof HTMLInputElement && field.type === "file")) return false;
      const width = field.getAttribute("data-fv-image_width") ?? "";
      if (width.trim().length === 0) return false;
      const files = field.files;
      if (!files) return false;
      let check = false;
      for (const file of Array.from(files)) {
        if (!file.type.includes("image")) {
          this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
          check = false;
          break;
        }
        const dim = await getImageDimensions(file);
        check = dim[0] <= parseFloat(width);
        if (!check) {
          this.invalidMessage = lang.inv_image_width.replace("{max}", width);
          break;
        }
      }
      return check;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "image_width"
  };
  //#endregion file

  //#region net
  // Regex according to RFC791 and RFC4632, compatible with "test" and "match"
  const IPv4Regex = "((?:25[0-5]|2[0-4]\\d|1?\\d{1,2})(?:\\x2E(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){3})";
  const IPv4Prefix = "(\\x2F(?:3[0-2]|[12]?\\d))?";
  const IPv4Complete = `${IPv4Regex}${IPv4Prefix}`;

  /* Checks if the field value has the correct format of an ipv4  */
  configuration.validators["ipv4"] = {
    name: "ipv4",
    validatorFunction: function (value, form, field, options, lang) {
      const regex = new RegExp(`^${IPv4Complete}$`);
      if (regex.test(value)) return true;
      return false;
    },
    invalidMessage: language.inv_ipv4,
    messageKey: "ipv4"
  };

  // Regex according to RFC4291, RFC4007 and RFC5952, compatible with "test" and "match"
  const IPv6Regex = "(?:((?:[\\da-f]{1,4}\\x3A){7}[\\da-f]{1,4})|((?:[\\da-f]{1,4}\\x3A){1,6}\\x3A)|((?:[\\da-f]{1,4}\\x3A){1,5}\\x3A[\\da-f]{1,4})|((?:[\\da-f]{1,4}\\x3A){1,4}(?:\\x3A[\\da-f]{1,4}){1,2})|((?:[\\da-f]{1,4}\\x3A){1,3}(?:\\x3A[\\da-f]{1,4}){1,3})|((?:[\\da-f]{1,4}\\x3A){1,2}(?:\\x3A[\\da-f]{1,4}){1,4})|((?:[\\da-f]{1,4}\\x3A)(?:\\x3A[\\da-f]{1,4}){1,5})|(\\x3A(?:(?:\\x3A[\\da-f]{1,4}){1,6}|\\x3A)))";
  const IPv6Zone = "(\\x25[\\da-zA-Z\\x2D\\x5F]+)?";
  const IPv6Prefix = "(\\x2F(?:1[0-2][0-8]?|\\d\\d?))?";
  const IPv6Mapped = `((\\x3A\\x3Affff\\x3A)${IPv4Regex}${IPv6Zone})`;
  const IPv6Local = `(?:(fe80(?:(?:\\x3A[\\da-f]{1,4}){7}|(?:(?:\\x3A[\\da-f]{1,4}){1,5}\\x3A\\x3A)|(?:(?:\\x3A[\\da-f]{1,4}){4}\\x3A(?:\\x3A[\\da-f]{1,4}))|(?:(?:\\x3A[\\da-f]{1,4}){3}\\x3A(?:\\x3A[\\da-f]{1,4}){1,2})|(?:(?:\\x3A[\\da-f]{1,4}){2}\\x3A(?:\\x3A[\\da-f]{1,4}){1,3})|(?:(?:\\x3A[\\da-f]{1,4}){1}\\x3A(?:\\x3A[\\da-f]{1,4}){1,4})|(?:\\x3A(?:(?:\\x3A[\\da-f]{1,4}){1,5}|\\x3A))))${IPv6Zone})`;
  const IPv6Complete = `(${IPv6Regex}${IPv6Zone}${IPv6Prefix})`;
  const IPv6Full = `^${IPv6Mapped}$|^${IPv6Local}$|^${IPv6Complete}$`;

  /**
   * Checks the zeros rule in the ipv6 address
   * @param {string} ip ipv6 address
   * @returns {boolean}
   */
  function zeros(ip) {
    const segments = ip.split("::").flatMap(p => p.split(":")).filter(s => s.length > 0);
    const OnlyOne0 = segments.filter(s => /^(0{2,4})$/.test(s));
    if (OnlyOne0.length > 0) return false;
    if (/^(0\x3A){7}0$/.test(ip)) return false;
    const noLeading0 = segments.filter(s => s === "0" || !s.startsWith("0"));
    if (noLeading0.length != segments.length) return false;
    if (/\x3A\x3A/.test(ip)) {
      if (/(^|\x3A)0\x3A\x3A|\x3A\x3A0(\x3A|$)/.test(ip)) return false;
      const Reduced0 = 8 - segments.length;
      const zeros = segments.map(s => s == "0" ? s : "-").join("");
      if (new RegExp(`0{${Reduced0 + 1},}`).test(zeros)) return false;
      if (/0{2,}/.test(zeros)) {
        const reducedIndex = ip.indexOf("::");
        const start0Index = zeros.search(/0{2,}/);
        if (start0Index > reducedIndex) return false;
      }
    }
    return true;
  }

  /* Checks if the field value has the correct format of an ipv6 */
  configuration.validators["ipv6"] = {
    name: "ipv6",
    validatorFunction: function (value, form, field, options, lang) {
      const zerosRule = field.getAttribute("data-fv-ipv6_zeros") == "true";
      const regex = new RegExp(`${IPv6Full}`);
      if (regex.test(value)) {
        if (!new RegExp(IPv4Regex).test(value)) {
          value = value.replace(new RegExp(IPv6Prefix.slice(0, -1)), "");
          value = value.replace(new RegExp(IPv6Zone.slice(0, -1)), "");
          if (zerosRule) return zeros(value);
        }
        return true;
      }
      return false;
    },
    invalidMessage: language.inv_ipv6,
    messageKey: "ipv6"
  };

  // Regex according to RFC1034, RFC1035 and RFC3696, compatible with "test" and "match"
  const domainRegex = "(((?:[a-z][a-z\\d\\x2D]{0,61}[a-z\\d]?\\x2E)+)([a-z\\d][a-z\\d\\x2D]*[a-z\\d]\\x2E?))";

  /* Checks if the field value has the correct format of a domain name */
  configuration.validators["domain"] = {
    name: "domain",
    validatorFunction: function (value, form, field, options, lang) {
      if (value.length > 253) return false;
      if (/\x2D{2,}/g.test(value)) return false;
      const regex = new RegExp(`^${domainRegex}$`, "i");
      if (!regex.test(value)) return false;
      if (value.endsWith(".")) value = value.slice(0, -1);
      const labels = value.split(".");
      const TLD = labels.pop();
      if (TLD?.search(/[^A-Z]/)) return false;
      const subdomains = labels;
      subdomains.filter(s => /\x2D{2,}/.test(s));
      if (subdomains.length != labels.length) return false;
      let equal = false;
      for (let i = 0; i <= labels.length - 2; i++) {
        if (labels[i].toUpperCase() == labels[i + 1].toUpperCase()) {
          equal = true;
          break;
        }
      }
      return !equal;
    },
    invalidMessage: language.inv_domain,
    messageKey: "domain"
  };
  const Ipv4NoGroups = IPv4Regex.replace("((?:", "(?:(?:");
  const IPv6NoGroups = IPv6Regex.replace(/\x28\x28\x3F\x3A/g, "(?:(?:").replace("|(\\x3A", "|(?:\\x3A");
  const domainNoGroups = domainRegex.replace("((", "(?:(?:").replace(")(", ")(?:");

  // Regex according to RFC5321, RFC5322 and RFC3696, compatible with "test" and "match"
  const validCharacters = "\\x21\\x23\\x24\\x25\\x26\\x2A\\x2B\\x2D\\x2E\\x2F\\x3D\\x3F\\x5E\\x7B\\x7C\\x7D\\x7E\\u02BC\\u02BD";
  const escapedCharacters = "\\x22\\x2C\\x40\\x5B\\x5C\\x5D";
  const emailLocal = `((?:\\w|\\d|[${validCharacters}]|(?:\\x5C[${escapedCharacters}]))*|(?:\\x22(?:\\w|\\d|[${validCharacters}${escapedCharacters}])*\\x22))`;
  const emailDomain = `(${domainRegex}|(?:\\x5B${Ipv4NoGroups}\\x5D)|(?:Ipv6:\\x5B${IPv6NoGroups}\\x5D))`;
  const emailRegex = `(${emailLocal}\\x40${emailDomain})`;

  /* Checks is the field value has the correct format of an e-mail address */
  configuration.validators["email"] = {
    name: "email",
    validatorFunction: function (value, form, field, options, lang) {
      if (value.startsWith(".")) return false;
      if (value.endsWith(".")) return false;
      if (value.length > 254) return false;
      const regex = new RegExp(`^${emailRegex}$`, "i");
      const email = RegExp(regex).exec(value);
      if (!email) return false;
      const parts = [...email];
      const localPart = parts[2];
      const domainPart = parts[3];
      if (localPart.length > 64) return false;
      if (localPart.endsWith(".") || localPart.includes("..")) return false;
      if (!domainPart.includes("[")) if (!configuration.validators["domain"].validatorFunction(domainPart, form, field, options, lang)) return false;
      return true;
    },
    invalidMessage: language.inv_email,
    messageKey: "email"
  };
  const IPv6ZoneNoGroupsURL = IPv6Zone.replace("(\\x25", "(?:\\x2525");

  // Regex according to RFC1738, RFC3986 and RFC6874, compatible with "test" and "match"
  const unreserved = "a-z\\d\\x2D\\x2E\\x5F\\x7E";
  const sub_delimiters = "\\x21\\x24\\x26\\x27\\x28\\x29\\x2A\\x2B\\x2C\\x3B\\x3D";
  const percentEncoded = "(?:\\x25[a-f\\d]{2})";
  const schemePart = "(https?\\x3A)"; //"([a-z\\d\\x2B\\x2D\\x2C]+\\x3A)";
  const authorityPart = `(\\x2F\\x2F((?:[${unreserved}${sub_delimiters}\\x3A]|${percentEncoded})+\\x40)?(localhost|${domainNoGroups}|(?:\\x5B(?:${IPv6NoGroups}${IPv6ZoneNoGroupsURL})\\x5D)|${Ipv4NoGroups})(\\x3A\\d+)?\\x2F?)`;
  const pathPart = `((?:\\x2F(?:[${unreserved}${sub_delimiters}\\x3A\\x40]|${percentEncoded})+)*)`;
  const queryPart = `(\\x3F(?:[${unreserved}${sub_delimiters}\\x2F\\x3A\\x3F\\x40]|${percentEncoded})+)?`;
  const fragmentPart = `(\\x23(?:[${unreserved}${sub_delimiters}\\x2F\\x3A\\x3F\\x40]|${percentEncoded})+)?`;
  const URLRegex = `(${schemePart}${authorityPart}${pathPart}${queryPart}${fragmentPart})`;

  /* Checks if the field value is has the correct format of an URL */
  configuration.validators["url"] = {
    name: "url",
    validatorFunction: function (value, form, field, options, lang) {
      const regex = new RegExp(`^${URLRegex}$`, "i");
      if (!regex.test(value)) return false;
      return true;
    },
    invalidMessage: language.inv_url,
    messageKey: "url"
  };
  //#endregion net

  //#region security
  /* Checks if the field has a strong password */
  configuration.validators["password"] = {
    name: "password",
    validatorFunction: function (value, form, field, options, lang) {
      const min = parseInt(field.getAttribute("data-fv-min_strength") ?? "5", 10);
      const strength = checkPasswordStrength(value).strength;
      if (strength >= min) return true;
      return false;
    },
    invalidMessage: language.inv_strength,
    messageKey: "password"
  };

  /**
   * Set the invalid confirmation value message
   * @param {string} custom Custom value name
   * @param {Lang} lang Language
   * @returns {string} Confirmation message
   */
  function setConfirmationMessage(custom, lang) {
    if (custom.length > 0) {
      return lang.inv_confirmation.replace(/\x5B.+\x5D/g, custom);
    } else {
      return lang.inv_confirmation.replace("[", "").replace("]", "");
    }
  }

  /* Checks if the field value matches the target value */
  configuration.validators["confirmation"] = {
    name: "confirmation",
    validatorFunction: function (value, form, field, options, lang) {
      const target = field.getAttribute("data-fv-target") ?? "";
      if (target.trim() === "") return false;
      const custom = field.getAttribute("data-fv-custom_value_message") ?? "";
      const targetValue = document.querySelector(target)?.value;
      if (targetValue !== value) {
        this.invalidMessage = setConfirmationMessage(custom, lang);
        return false;
      }
      return true;
    },
    invalidMessage: language.notConfirmed,
    messageKey: "confirmation"
  };

  /* Checks if the field value has a valid credit/debit card number */
  configuration.validators["credit_card"] = {
    name: "credit_card",
    validatorFunction: function (value, form, field, options, lang) {
      if (/\D/.test(value)) return false;
      let card = "unknown";
      let min = 16;
      let max = 19;
      const allowing = (field.getAttribute("data-fv-allowed_cards") ?? Object.keys(cardInfo).join(",")).split(/[,|-]+\s*|\s+/);
      allowing.filter(c => Object.keys(cardInfo).includes(c.toUpperCase()));
      for (const c of allowing) {
        for (const e of cardInfo[c].first) {
          if (value.startsWith(e.toString())) {
            card = c;
            min = cardInfo[c].length.min;
            max = cardInfo[c].length.max;
            break;
          }
        }
        if (card !== "unknown") break;
      }
      field.setAttribute("data-fv-card", card);
      const digits = value.split("").map(Number);
      if (digits.length < min || digits.length > max) return false;
      return luhn(digits) === 0;
    },
    invalidMessage: language.inv_credit_card,
    messageKey: "credit_card"
  };

  /* Checks if the field value has a valid CVV number */
  configuration.validators["cvv"] = {
    name: "cvv",
    validatorFunction: function (value, form, field, options, lang) {
      if (/\D/.test(value)) return false;
      const target = field.getAttribute("data-fv-target") ?? "";
      if (target.trim() === "") return false;
      const creditCard = document.querySelector(target)?.getAttribute("data-fv-card");
      if (!creditCard) return false;
      if (creditCard !== "unknown") {
        return cardInfo[creditCard].cvv === value.length;
      } else {
        return value.length < 3 || value.length > 4;
      }
    },
    invalidMessage: language.inv_cvv,
    messageKey: "cvv"
  };
  //#endregion security

  //#region utils
  /**
   * Check if the format is correct
   * @param {string} format Date format
   * @param {string} separator Date format separator
   * @returns {boolean} True if is correct
   */
  function validateDateFormat(format, separator) {
    if (/[A-Z0-9]/.test(separator)) return false;
    const count = (RegExp(new RegExp(`\\${separator}`)).exec(format) ?? []).length;
    if (format.replace(separator, "").length != format.length - count) return false;
    if (new RegExp(`[^YMD${separator}]`).test(format)) return false;
    const fParts = format.split(separator);
    switch (fParts.length) {
      case 3:
        if (!fParts.includes("YYYY") && !fParts.includes("MM") && !fParts.includes("DD")) return false;
        break;
      case 2:
        if (!fParts.includes("YYYY") && !fParts.includes("MM")) return false;
        break;
      case 1:
        if (!fParts.includes("YYYY")) return false;
        break;
      default:
        return false;
    }
    return true;
  }

  /**
   * Prepare the regexp for check the date format
   * @param {string} format Date format
   * @param {string} separator Date format separator
   * @returns {string} Regexp based in the date format
   */
  function dateRegex(format, separator) {
    return "^" + format.split(separator).map(part => {
      if (part.includes("YYYY")) return `\\d{4}`;else return `\\d{2}`;
    }).join(`\\${separator}`) + "$";
  }

  /**
   * Checks if the date matches the date format.
  
   * ** Only supports date with number format.
   * @param {string} date Date
   * @param {string} format Number date format: (DD) for day, (MM) for month, (YYYY) for year
   * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
   */
  function checkDateFormat(date, format) {
    const separator = format.toUpperCase().replace(/[DMY]/g, "").charAt(0);
    if (!validateDateFormat(format.toUpperCase(), separator)) return "no";
    const regex = dateRegex(format.toUpperCase(), separator);
    if (!new RegExp(regex).test(date)) return "invalid";
    const dParts = date.split(separator),
      fParts = format.toUpperCase().split(separator);
    const day = parseInt(dParts[fParts.indexOf("DD")], 10),
      month = parseInt(dParts[fParts.indexOf("MM")], 10),
      year = parseInt(dParts[fParts.indexOf("YYYY")], 10);
    if (year < 0 || year > 9999) return "invalid";
    if (fParts.length > 1) if (month && (month < 1 || month > 12)) return "invalid";
    if (fParts.length == 3) {
      if (day && (day < 1 || day > new Date(year, month - 1, 0).getDate())) return "invalid";
    }
    return "ok";
  }

  /**
   * Splits the time into an array
   * @param {string} tf Time to split
   * @returns {string[]} [HH,mm,ss,sss?]
   */
  function splitTime(tf) {
    const ms = tf.split("."),
      r = [...ms[0].split(":")];
    if (ms[1]) r.push(ms[1]);
    return r;
  }

  /**
   * Prepare the regexp for check the time format
   * @param {string} format Time format
   * @returns {string} Regexp based in the time format
   */
  function timeRegex(format) {
    return "^" + format.replace("A", "").split(":").map(part => {
      if (part.includes(".")) return `\\d{2}\\x2E\\d{3}`;
      return `\\d{2}`;
    }).join(`\\x3A`) + (format.lastIndexOf("A") > -1 ? "(a\\s?m|p\\s?m|a.\\s?m.|p.\\s?m.)" : "") + "$";
  }

  /**
   * Checks if the time matches the time format.
   * A valid format could be: HH:mm:ss.sssA HH:mm:ssA HH:mmA
   * @param {string} time Time
   * @param {string} format Time format: (HH) for Hours, (mm) for minutes, (ss) for seconds, (sss) for milliseconds, (A) for AM/PM
   * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
   */
  function checkTimeFormat(time, format) {
    if (!/^(HH\x3Amm)((\x3Ass)|(\x3Ass\x2Esss))?(A)?$/.test(format)) return "no";
    const regex = timeRegex(format);
    if (!new RegExp(regex, "i").test(time)) return "invalid";
    const tParts = splitTime(time.replace(/a\s?m|p\s?m|a.\s?m.|p.\s?m./i, "")),
      fParts = splitTime(format.replace("A", ""));
    const hours = parseInt(tParts[fParts.indexOf("HH")], 10),
      minutes = parseInt(tParts[fParts.indexOf("mm")], 10),
      seconds = parseInt(tParts[fParts.indexOf("ss")], 10),
      milliseconds = parseInt(tParts[fParts.indexOf("sss")], 10),
      h24_h12 = format.search(/A/) == -1 ? 23 : 12;
    if (hours < 0 || hours > h24_h12) return "invalid";
    if (minutes < 0 || minutes > 59) return "invalid";
    if (seconds && (seconds < 0 || seconds > 59)) return "invalid";
    if (milliseconds && (milliseconds < 0 || milliseconds > 999)) return "invalid";
    return "ok";
  }

  /**
   * Checks if a number matches with a specific range
   * @param {number} value Number to check
   * @param {string} range Accepted range
   * @returns {string} Returns ok or the unfulfilled range
   */
  function checkNumberRange(value, range) {
    if (range.includes("::") && (range.includes("max") || range.includes("min"))) return ["no"];
    const match = RegExp(/^(min|max)?((?:-?)\d+(?:\x2E\d+)?)(?:\x3A\x3A((?:-?)\d+(?:\x2E\d+)?))?$/).exec(range);
    if (!match) return ["no"];
    const [, minOrMax, num1, num2] = match,
      min = minOrMax === "min",
      max = minOrMax === "max",
      number1 = parseFloat(num1),
      number2 = num2 ? parseFloat(num2) : undefined;
    if (min && value < number1) return ["min", num1];
    if (max && value > number1) return ["max", num1];
    if (number2 !== undefined && (value < number1 || value > number2)) return ["range", num1, num2];
    if (!min && !max && number2 === undefined && value !== number1) return ["equal", num1];
    return ["ok"];
  }

  /**
   * Checks if a number satisfies with the step
   * @param {number} value Number to check
   * @param {string} step Step
   * @returns {string[]} Returns ok or the unfulfilled step
   */
  function checkNumberStep(value, step) {
    const regex = /^-?\d+(\x2E\d+)?$/;
    if (!regex.test(step)) return ["no"];
    const s = parseFloat(step);
    if (value % s !== 0) return ["step", step];
    return ["ok"];
  }

  /**
   * Checks if the range value matches with the allowed numbers
   * @param {string[]} allow Allowed numbers options
   * @param {string} rangeVal Range value
   * @returns {string[]} Returns no if no match
   */
  function checkRangeAllowed(allow, rangeVal) {
    let r = ["ok"];
    if (allow.includes("noPositive") && !rangeVal.includes("-")) r = ["no"];
    if (!allow.includes("negative") && !allow.includes("noPositive") && rangeVal.includes("-")) r = ["no"];
    if (!allow.includes("decimal") && rangeVal.includes(".")) r = ["no"];
    return r;
  }

  /**
   * Checks if the step value matches with the allowed numbers
   * @param {string[]} allow Allowed numbers options
   * @param {string} stepVal Step value
   * @returns {string[]} Returns no if no match
   */
  function checkStepAllowed(allow, stepVal) {
    let s = ["ok"];
    if (allow.includes("noPositive") && !stepVal.includes("-")) s = ["no"];
    if (!allow.includes("negative") && !allow.includes("noPositive") && stepVal.includes("-")) s = ["no"];
    if (!allow.includes("decimal") && stepVal.includes(".")) s = ["no"];
    return s;
  }

  /**
   * Check if the number match the range or the step
   * @param {string[]} allow Allowed numbers options
   * @param {number} value Number to check
   * @param {string} rangeVal The range
   * @param {string} stepVal The step
   * @returns {string[][]} The response of range and step check
   */
  function checkRangeStep(allow, value, rangeVal, stepVal) {
    let check = [],
      r = ["ok"],
      s = ["ok"];
    if (allow.includes("range")) {
      r = checkRangeAllowed(allow, rangeVal);
      if (r[0] == "ok") r = checkNumberRange(value, rangeVal);
    }
    if (allow.includes("step")) {
      s = checkStepAllowed(allow, stepVal);
      if (s[0] == "ok") s = checkNumberStep(value, stepVal);
    }
    check = [[...r], [...s]];
    return check;
  }

  /**
   * Checks if the string length matches with a specific range
   * @param {number} value Length to check
   * @param {string} range Accepted range
   * @returns {string} Returns ok or the unfulfilled range
   */
  function checkStringLength(value, range) {
    if (range.includes("::") && (range.includes("max") || range.includes("min"))) return ["no"];
    const match = RegExp(/^(min|max)?(\d+)(?:\x3A\x3A(\d+))?$/).exec(range);
    if (!match) return ["no"];
    const [, minOrMax, num1, num2] = match,
      min = minOrMax === "min",
      max = minOrMax === "max",
      number1 = parseInt(num1, 10),
      number2 = num2 ? parseInt(num2, 10) : undefined;
    if (min && value < number1) return ["min", num1];
    if (max && value > number1) return ["max", num1];
    if (number2 !== undefined && (value < number1 || value > number2)) return ["range", num1, num2];
    if (!min && !max && number2 === undefined && value !== number1) return ["equal", num1];
    return ["ok"];
  }

  /**
   * Convert a number to currency format
   * @param {string} value Number to convert
   * @param {Lang} lang Form Validator language
   * @param {?(string|string[])} [locale] List of language and region codes (for more information see "BCP 47 language tags")
   * @param {?string} [currency] Currency code (for more information se "ISO 4217 standard")
   * @param {?number} [decimals] Number of fixed decimal numbers to be displayed
   * @returns {string} Converted number
   */
  function currencyFormat(value, lang, locale, currency, decimals) {
    if (!/^\d+(\.\d+)?$/.test(value)) return value;
    if (!decimals) {
      const prt = value.split(".");
      decimals = prt.length;
    }
    locale = !locale ? lang.locale : locale;
    currency = !currency ? lang.currencyCode : currency;
    decimals = Math.abs(decimals) > 100 ? 100 : Math.abs(decimals);
    try {
      return parseFloat(value).toLocaleString(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: decimals
      });
    } catch {
      return parseFloat(value).toFixed(decimals);
    }
  }

  /**
   * Converts the first letter of the text to uppercase
   * @param {string} str Text to convert
   * @returns {string} Converted text
   */
  function sentenceCase(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  }

  /**
   * Converts the first letter of each word in the text to uppercase
   * @param {string} str Text to convert
   * @returns {string} Converted text
   */
  function capitalizedWords(str) {
    return str.split(/\s/g).map(v => sentenceCase(v)).join(" ");
  }

  /**
   * Converts the text in camelCase or pascalCase
   * @param {string} str Text to convert
   * @param {boolean} p Indicates whether the text will be converted to pascalCase (true) or camelCase (false)
   * @returns {string} Converted text
   */
  function camel_pascal(str, p) {
    str = capitalizedWords(str).replace(/\s/g, "");
    if (!p) str = str.charAt(0).toLocaleLowerCase() + str.slice(1);
    return str;
  }

  /**
   * Returns the not accepted fields
   * @param {boolean} acceptHidden Whether or not to accept hidden fields
   * @param {boolean} acceptIgnored Whether or not to accept ignored fields
   * @returns {string} List of non accepted fields selector
   */
  function notAccept(acceptHidden, acceptIgnored) {
    const hidden = ',[type="hidden"]',
      ignore = ',[ignored="true"]',
      notAccept = '[type="image"],[type="submit"],[type="button"],[type="reset"]';
    let not = notAccept;
    if (acceptHidden) not += hidden;
    if (acceptIgnored) not += ignore;
    return not;
  }

  /**
   * Trigger the callbacks when a message is showed
   * @param {boolean} isValid Validation state
   * @param {Options} options Validation options
   * @param {ValidationField} field The validated field
   * @param {string} message The validation message
   */
  function triggerMessageCallback(isValid, options, form, field, message) {
    if (isValid && options.validMessageCallback) {
      options.validMessageCallback(form, field, message, options);
    } else if (!isValid && options.invalidMessageCallback) {
      options.invalidMessageCallback(form, field, message, options);
    }
  }

  /**
   * Escapes all characters that may have conflicts in a regex
   * @param {string} str String to escape
   * @returns {string} Scaped string
   */
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|\x5B\x5D\x2F\x5C]/g, "\\$&");
  }

  /**
   * Check the password strength and character conditions
   * @param {string} password Password to check
   * @returns {{
   *   strength: number;
   *   check: string[];
   * }} Password check
   */
  function checkPasswordStrength(password) {
    let strength = 0;
    const check = [];
    if (/[A-Z]/.test(password)) {
      strength++;
      check.push("UC");
    }
    if (/[a-z]/.test(password)) {
      strength++;
      check.push("LC");
    }
    if (options.passwordSpecialChars.test(password)) {
      strength++;
      check.push("SC");
    }
    if (/\d/.test(password)) {
      strength++;
      check.push("NC");
    }
    if (password.length < 8) strength--;
    if (password.length >= 8) check.push("L");
    if (password.length >= 12) strength++;
    if (/\s/.test(password)) strength = 1;
    return {
      strength: strength,
      check: check
    };
  }

  /**
   * Lhun algorithm
   * @param {number[]} digits digits to calculate
   * @returns {number} Calculated digit
   */
  function luhn(digits) {
    let sum = 0;
    digits.slice().reverse().forEach((digit, i) => {
      if (i % 2 == 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    });
    return sum % 10;
  }

  /**
   * Module 11 algorithm
   * @param {number[]} digits digits to calculate
   * @returns {number} Calculated digit
   */
  function module11(digits) {
    let sum = 0;
    let factor = 2;
    digits.slice().reverse().forEach(digit => {
      sum += digit * factor;
      factor++;
      if (factor > 7) factor = 2;
    });
    return sum % 11;
  }

  /**
   * Convert the user provided size to bytes
   * @param {string} size Size with string size type
   * @returns {number} Size in bytes
   */
  function sizeStringToBytes(size) {
    size = size.toUpperCase();
    if (size.endsWith("GB")) {
      return parseInt(size.slice(0, -2), 10) * 1024 * 1024 * 1024;
    } else if (size.endsWith("MB")) {
      return parseInt(size.slice(0, -2), 10) * 1024 * 1024;
    } else if (size.endsWith("KB")) {
      return parseInt(size.slice(0, -2), 10) * 1024;
    } else if (size.endsWith("B")) {
      return parseInt(size.slice(0, -1), 10);
    } else {
      return parseInt(size, 10);
    }
  }

  /**
   * Returns the image dimensions
   * @param {File} file Image file
   * @returns {Promise<number[]>} Number array Promise of the dimensions (width, height)
   */
  function getImageDimensions(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (e.target) {
          const image = new Image();
          image.src = e.target.result;
          image.onload = function () {
            resolve([image.width, image.height]);
          };
        } else resolve([0, 0]);
      };
    });
  }
  //#endregion utils

  //#region dom
  /**
   * Restricts the number of characters in a TextArea and displays the information
   * @param {HTMLTextAreaElement} TextArea TextArea to limit
   * @param {number} max Max number of character to write
   * @param {string} info Type of information showed
   */
  function textAreaLengthRestriction(TextArea, max, info) {
    if (TextArea.hasAttribute("data-fv-length_restriction")) return;
    const container = document.createElement("div");
    container.classList.add("fv-textAreaLength");
    let remaining;
    const characterCount = function () {
      let count = TextArea.value.length;
      if (count >= max) {
        count = max;
        TextArea.value = TextArea.value.substring(0, max);
      }
      remaining = max - count;
      if (remaining < 0) remaining = 0;
      if (info) switch (info) {
        case "both":
          container.innerText = `${count}(${remaining})/${max}`;
          break;
        case "remaining":
          container.innerText = `${remaining}/${max}`;
          break;
        case "count":
        default:
          container.innerText = `${count}/${max}`;
          break;
      }
      position();
    };
    container.style.backgroundColor = window.getComputedStyle(document.getElementsByTagName("body")[0]).backgroundColor;
    const position = function () {
      let left = TextArea.getBoundingClientRect().width - container.getBoundingClientRect().width - 20;
      left = left < 8 ? 8 : left;
      container.style.marginLeft = `${left}px`;
      container.style.marginTop = `-${container.getBoundingClientRect().height / 2}px`;
    };
    TextArea.before(container);
    TextArea.setAttribute("data-fv-length_restriction", "");
    TextArea.addEventListener("input", characterCount);
    TextArea.dispatchEvent(new Event("input"));
    new ResizeObserver(position).observe(TextArea);
  }

  /**
   * Set the input suggestions
   * @param {HTMLInputElement} input Input element where suggestions will be shown
   * @param {string[]} words List of words to suggest
   * @param {Suggestion} settings Custom options for suggestion's DataList Element
   */
  function inputSuggestion(input, words, settings) {
    if (input.hasAttribute("data-fv-suggestions")) return;
    if (words.filter(w => w.length > 0).length == 0) return;
    let currentFocus = -1;
    const datalist = document.createElement("datalist");
    datalist.classList.add("fv-suggestions");
    datalist.classList.add(settings.containerClass);
    datalist.style.maxHeight = settings.maxHeight;
    datalist.style.display = "none";
    datalist.setAttribute("target", `#${input.id}`);
    datalist.style.backgroundColor = window.getComputedStyle(document.getElementsByTagName("body")[0]).backgroundColor;
    input.setAttribute("autocomplete", "off");
    input.setAttribute("list", "");
    const fillDatalist = function (words) {
      currentFocus = -1;
      while (datalist.firstChild) datalist.removeChild(datalist.firstChild);
      for (const word of words) {
        const option = document.createElement("option");
        option.value = word;
        option.innerText = word;
        option.classList.add(settings.optionClass);
        option.onclick = function () {
          datalist.style.display = "none";
          input.value = option.value;
        };
        datalist.appendChild(option);
      }
      if (datalist.options.length > 0) {
        datalist.style.display = "block";
        datalist.scrollTo(0, 0);
      } else {
        datalist.style.display = "none";
      }
    };
    input.addEventListener("blur", function () {
      const no = document.querySelector(`datalist.fv-suggestions[target="#${input.id}"] option:hover`);
      if (no) return;
      datalist.style.display = "none";
    });
    input.addEventListener("dblclick", function () {
      fillDatalist(words);
    });
    input.addEventListener("input", function () {
      datalist.style.display = "none";
      if (input.value.trim().length == 0) return;
      setTimeout(() => {
        const regexp = new RegExp(escapeRegExp(input.value), "i");
        const match = words.filter(word => regexp.test(word));
        if (match.length > 0) fillDatalist(match);
      }, 200);
    });
    input.addEventListener("keydown", function (e) {
      if (datalist.style.display == "block" && datalist.options) {
        if (e.key == "Escape") {
          e.preventDefault();
          datalist.style.display = "none";
        }
        if (e.key == "ArrowUp") {
          e.preventDefault();
          currentFocus--;
          simulateScroll();
        }
        if (e.key == "ArrowDown") {
          e.preventDefault();
          currentFocus++;
          simulateScroll();
        }
        addActive();
        if (e.key == "Enter") {
          e.preventDefault();
          datalist.options[currentFocus].click();
        }
      }
    });
    const addActive = function () {
      const selected = document.querySelector("datalist.fv-suggestions option.active");
      if (selected) selected.classList.remove("active");
      if (currentFocus >= datalist.options.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = datalist.options.length - 1;
      datalist.options[currentFocus].classList.add("active");
      return true;
    };
    const simulateScroll = function () {
      currentFocus = currentFocus <= -1 ? 0 : currentFocus;
      currentFocus = currentFocus > datalist.options.length - 1 ? datalist.options.length - 1 : currentFocus;
      const c = Math.floor(parseInt(datalist.style.maxHeight, 10) / datalist.options[0].offsetHeight);
      datalist.scrollTo(0, datalist.options[0].offsetHeight * (currentFocus - c + 1));
    };
    input.after(datalist);
    input.setAttribute("data-fv-suggestions", "");
    new ResizeObserver(() => {
      datalist.style.width = `${input.getBoundingClientRect().width}px`;
    }).observe(input);
  }

  /**
   * Show password strength info
   * @param {HTMLInputElement} input Input type password
   * @param {Options} options Validation options
   */
  function passwordInfo(input, options) {
    if (input.hasAttribute("data-fv-password_info")) return;
    if (input.type != "password") return;
    const container = document.createElement("div");
    const additionalClass = options.passwordInfoClass ?? "";
    container.classList.add("fv-password", additionalClass);
    container.style.display = "none";
    container.setAttribute("target", `#${input.id}`);
    const content = `<div class="tittle">${language.passwordConditionsTitle}</div>
<div class="condition UC">${language.passwordConditionUppercase}</div>
<div class="condition LC">${language.passwordConditionLowercase}</div>
<div class="condition SC">${language.passwordConditionSpecialChars}</div>
<div class="condition NC">${language.passwordConditionNumericChars}</div>
<div class="condition L">${language.passwordConditionLength}</div>
<div class="strength-text"></div>
<div class="strength-bar"></div>`;
    container.innerHTML = content;
    input.after(container);
    input.setAttribute("data-fv-password_info", "");
    const strengthBar = document.querySelector(`div.fv-password[target="#${input.id}"] div.strength-bar`),
      strength = document.querySelector(`div.fv-password[target="#${input.id}"] div.strength-text`);
    input.addEventListener("blur", function () {
      container.style.display = "none";
    });
    input.addEventListener("input", function () {
      container.style.display = "block";
      strengthBar.classList.remove("very-strong", "strong", "normal", "weak", "very-weak");
      strength.innerHTML = "";
      document.querySelectorAll(`div.fv-password[target="#${input.id}"] div.condition`).forEach(condition => {
        condition.classList.remove("check", "no-check");
      });
      if (input.value.length == 0) return;
      const p = checkPasswordStrength(input.value);
      const checkList = p.check;
      const strengthLevel = p.strength;
      ["UC", "LC", "SC", "NC", "L"].forEach(c => {
        document.querySelector(`div.fv-password[target="#${input.id}"] div.condition.${c}`)?.classList.add(checkList.includes(c) ? "check" : "no-check");
      });
      switch (strengthLevel) {
        case 5:
          strength.innerHTML = language.passwordStrengthVeryStrong;
          strengthBar.classList.add("very-strong");
          break;
        case 4:
          strength.innerHTML = language.passwordStrengthStrong;
          strengthBar.classList.add("strong");
          break;
        case 3:
          strength.innerHTML = language.passwordStrengthNormal;
          strengthBar.classList.add("normal");
          break;
        case 2:
          strength.innerHTML = language.passwordStrengthWeak;
          strengthBar.classList.add("weak");
          break;
        case 1:
        default:
          strength.innerHTML = language.passwordStrengthVeryWeak;
          strengthBar.classList.add("very-weak");
          break;
      }
      input.setAttribute("data-fv-password_strength", strengthLevel.toString());
      const left = (parseFloat(window.getComputedStyle(input).width) - parseFloat(window.getComputedStyle(container).width)) / 2;
      container.style.marginLeft = `${left}px`;
    });
  }

  /**
   * Set the field help message
   * @param {ValidationField} field The field to attach the message
   * @param {string} message The message to show
   */
  function fieldHelpMessage(field, message) {
    const span = document.createElement("span"),
      name = field.getAttribute("name");
    if (!name) return;
    span.classList.add("fv-help_message");
    span.setAttribute("for", name);
    span.textContent = message;
    span.style.display = "none";
    if (field.hasAttribute("data-fv-suggestions")) {
      const dt = document.querySelector(`datalist.fv-suggestions[target="#${field.id}"]`);
      dt.after(span);
    } else if (field.hasAttribute("data-fv-password_info")) {
      const pi = document.querySelector(`div.fv-password[target="#${field.id}`);
      pi.after(span);
    } else field.after(span);
  }

  /**
   * Get the parent of the field
   * @param {ValidationField} field The field element
   * @param {Options} options Validation options
   * @param {HTMLFormElement} form The validated field parent form
   * @returns {HTMLElement | null} Parent element or null if the parent is the form
   */
  function getFieldParent(field, form, options) {
    let parent = null;
    const p = form.querySelector(options.parentField.trim());
    if (p) parent = p ?? field.parentElement;
    if (parent?.nodeName == "FORM") parent = null;
    return parent;
  }

  /**
   * Get the invalid message for the validator
   * @param {ValidationField} field The validated field
   * @param {Validator} validator The validator
   * @param {Options} options Validation options
   * @param {Lang} language Form Validator language
   * @returns {string} Invalid message
   */
  function getInvalidMessage(field, validator, options, language) {
    let message = field.getAttribute(`${options.fieldInvalidMessageAttribute}-${validator.messageKey ?? validator.name}`);
    if (!message) {
      message = field.getAttribute(options.fieldInvalidMessageAttribute);
      if (!message) message = validator.invalidMessage;
    }
    return message;
  }

  /**
   * Get the valid message for the validator
   * @param {ValidationField} field The validated field
   * @param {Validator} validator The validator
   * @param {Options} options Validation options
   * @returns {string} Valid message
   */
  function getValidMessage(field, validator, options) {
    let message = field.getAttribute(`${options.fieldValidMessageAttribute}-${validator.messageKey ?? validator.name}`);
    if (!message) {
      message = field.getAttribute(options.fieldValidMessageAttribute);
      if (!message) message = validator.validMessage ?? "";
    }
    return message;
  }

  /**
   * Sets the styles for the field and their parent
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Options} options Validation options
   * @param {boolean} valid_invalid True if is valid, false if is invalid
   */
  function setStyles(field, form, options, valid_invalid) {
    let fieldClass, fieldRemove, parentClass, parentRemove, labelClass, labelRemove;
    if (valid_invalid) {
      fieldClass = options.validClass;
      fieldRemove = options.invalidClass;
      parentClass = "Valid";
      parentRemove = "Invalid";
      labelClass = options.validLabelClass;
      labelRemove = options.invalidLabelClass;
    } else {
      fieldClass = options.invalidClass;
      fieldRemove = options.validClass;
      parentClass = "Invalid";
      parentRemove = "Valid";
      labelClass = options.invalidLabelClass;
      labelRemove = options.validLabelClass;
    }
    document.querySelectorAll(`[name=${field.name}]`).forEach(f => {
      f.classList.remove(fieldRemove);
      f.classList.add(fieldClass);
      const parent = getFieldParent(f, form, options);
      if (parent) {
        parent.classList.remove(parentRemove);
        parent.classList.add(parentClass);
      }
      const name = ["checkbox", "radio"].includes(field.type) ? field.id : field.name;
      const label = document.querySelector(`label[for=${name}]`);
      if (label) {
        label.classList.remove(labelRemove);
        label.classList.add(labelClass);
      }
    });
  }

  /**
   * Removes the field style and its parent
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Options} options Validation options
   */
  function removeStyles(field, form, options) {
    document.querySelectorAll(`[name=${field.name}]`).forEach(f => {
      f.classList.remove(options.invalidClass);
      f.classList.remove(options.validClass);
      const parent = getFieldParent(f, form, options);
      if (parent) {
        parent.classList.remove("Valid");
        parent.classList.remove("Invalid");
      }
      const name = ["checkbox", "radio"].includes(field.type) ? field.id : field.name;
      const label = document.querySelector(`label[for=${name}]`);
      if (label) {
        label.classList.remove(options.validLabelClass);
        label.classList.remove(options.invalidLabelClass);
      }
    });
  }

  /**
   * Sets the field inline validation message
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Options} options Validation options
   * @param {Configuration} configuration Validation configuration
   * @param {Lang} language Form Validator language
   * @param {boolean} valid_invalid True if is valid, false if is invalid
   * @param {(Validator | AsyncValidator)} validator The validator
   */
  function setInlineMessage(field, form, options, configuration, language, valid_invalid, validator) {
    const span = document.createElement("span"),
      parent = getFieldParent(field, form, options),
      fieldName = form.querySelector(`label[for="${field.name}"]`)?.textContent ?? field.name;
    let message;
    span.classList.add(options.inlineMessageClass);
    span.setAttribute("for-field", field.name);
    if (valid_invalid) {
      span.classList.add(options.validMessageClass);
      message = getValidMessage(field, validator, options);
      configuration.validMessages[form.id][fieldName] = message;
    } else {
      span.classList.add(options.invalidMessageClass);
      message = getInvalidMessage(field, validator, options, language);
      configuration.invalidMessages[form.id][fieldName] = message;
    }
    if (message.length == 0) return;
    span.innerText = message;
    span.style.display = "block";
    if (parent) {
      parent.insertAdjacentElement("beforeend", span);
    } else {
      field.after(span);
    }
    triggerMessageCallback(valid_invalid, options, form, field, message);
  }

  /**
   * Sets the field top validation message
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Options} options Validation options
   * @param {Configuration} configuration Validation configuration
   * @param {Lang} language Form Validator language
   * @param {boolean} valid_invalid True if is valid, false if is invalid
   * @param {(Validator | AsyncValidator)} validator The validator
   */
  function setTopMessage(field, form, options, configuration, language, valid_invalid, validator) {
    let message;
    const fieldName = form.querySelector(`label[for="${field.name}"]`)?.textContent ?? field.name;
    const validView = options.topMessagesTemplate.replace("{topMessagesClass}", options.topMessagesClass).replace("{formID}", form.id).replace("{title}", language.validTitle).replace("{valid_invalid}", options.validMessagesClass).replace("{vi}", "valid"),
      invalidView = options.topMessagesTemplate.replace("{topMessagesClass}", options.topMessagesClass).replace("{formID}", form.id).replace("{title}", language.invalidTitle).replace("{valid_invalid}", options.invalidMessagesClass).replace("{vi}", "invalid");
    if (valid_invalid) {
      message = getValidMessage(field, validator, options);
      configuration.validMessages[form.id][fieldName] = message;
    } else {
      message = getInvalidMessage(field, validator, options, language);
      configuration.invalidMessages[form.id][fieldName] = message;
    }
    let validMessages = "",
      invalidMessages = "";
    for (const key in configuration.validMessages[form.id]) {
      if (configuration.validMessages[form.id][key].trim().length > 0) validMessages += `<li for="${key}"><strong>${key}</strong> ${configuration.validMessages[form.id][key]}</li>`;
    }
    for (const key in configuration.invalidMessages[form.id]) {
      if (configuration.invalidMessages[form.id][key].length > 0) invalidMessages += `<li for="${key}"><strong>${key}</strong> ${configuration.invalidMessages[form.id][key]}</li>`;
    }
    if (!valid_invalid && invalidMessages.length > 0) form.insertAdjacentHTML("afterbegin", invalidView.replace("{fields&messagesList}", invalidMessages));else if (valid_invalid && validMessages.length > 0) form.insertAdjacentHTML("afterbegin", validView.replace("{fields&messagesList}", validMessages));
    triggerMessageCallback(valid_invalid, options, form, field, message);
  }

  /**
   * Removes the field message
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   */
  function removeInlineMessages(field, form) {
    const span = form.querySelector(`span[for-field="${field.name}"]`);
    if (span) span.remove();
  }

  /**
   * Remove all the top messages
   * @param {HTMLFormElement} form The validated fields parent form
   * @param {Configuration} configuration Validation configuration
   */
  function removeTopMessage(form, configuration) {
    configuration.validMessages[form.id] = {};
    configuration.invalidMessages[form.id] = {};
    form.querySelectorAll("div[data-fv-top-valid],div[data-fv-top-invalid]").forEach(div => div.remove());
  }

  /**
   * Sync the top messages with the inline messages
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Configuration} configuration Validation configuration
   * @param {boolean} valid_invalid True if is valid, false if is invalid
   */
  function syncTopMessages(field, form, configuration, valid_invalid) {
    const fieldName = form.querySelector(`label[for="${field.name}"]`)?.textContent ?? field.name;
    if (!valid_invalid && configuration.validMessages[form.id][fieldName]) {
      delete configuration.validMessages[form.id][fieldName];
      form.querySelector(`div[data-fv-top-valid] li[for="${fieldName}"]`)?.remove();
    } else if (valid_invalid && configuration.invalidMessages[form.id][fieldName]) {
      delete configuration.invalidMessages[form.id][fieldName];
      form.querySelector(`div[data-fv-top-invalid] li[for="${fieldName}"]`)?.remove();
    }
    if (form.querySelectorAll(`div[data-fv-top-valid] li`).length == 0) form.querySelector(`div[data-fv-top-valid]`)?.remove();
    if (form.querySelectorAll(`div[data-fv-top-invalid] li`).length == 0) form.querySelector(`div[data-fv-top-invalid]`)?.remove();
  }

  /**
   * Sets the field validation message
   * @param {ValidationField} field The validated field
   * @param {HTMLFormElement} form The validated field parent form
   * @param {Options} options Validation options
   * @param {Configuration} configuration Validation configuration
   * @param {Lang} language Form Validator language
   * @param {boolean} valid_invalid True if is valid, false if is invalid
   * @param {(Validator | AsyncValidator)} validator The validator
   */
  function setMessage(field, form, options, configuration, language, valid_invalid, validator) {
    const isHidden = field.type == "hidden" || window.getComputedStyle(field).display == "none";
    syncTopMessages(field, form, configuration, valid_invalid);
    removeInlineMessages(field, form);
    if (valid_invalid && options.validMessagesPosition == "top") {
      form.querySelector(`div[data-fv-top-valid]`)?.remove();
      setTopMessage(field, form, options, configuration, language, valid_invalid, validator);
    } else if (valid_invalid && options.validMessagesPosition == "inline" && !isHidden) {
      setInlineMessage(field, form, options, configuration, language, valid_invalid, validator);
    }
    if (!valid_invalid && options.invalidMessagesPosition == "top") {
      form.querySelector(`div[data-fv-top-invalid]`)?.remove();
      setTopMessage(field, form, options, configuration, language, valid_invalid, validator);
    } else if (!valid_invalid && options.invalidMessagesPosition == "inline" && !isHidden) {
      setInlineMessage(field, form, options, configuration, language, valid_invalid, validator);
    }
  }

  /**
   * Remove all styles and messages
   * @param {HTMLFormElement} form The validated fields parent form
   * @param {Options} options Validation options
   * @param {Configuration} configuration Validation configuration
   */
  function formReset(form, options, configuration) {
    const fields = form.querySelectorAll('textarea, select, input:not([type="submit"],[type="button"],[type="reset"])');
    fields.forEach(field => {
      removeStyles(field, form, options);
      removeInlineMessages(field, form);
    });
    removeTopMessage(form, configuration);
  }

  /**
   * Toggles the visibility of the help messages
   * @param {ValidationField} field Field owner of the help message
   * @param {HTMLFormElement} form Form to search fields
   * @param {Options} options Validation options
   * @param {Boolean} show Show or hide de message
   */
  function toggleHelpMessage(field, form, options, show) {
    if (options.showHelpMessagesOnFocus) {
      const name = field.name ?? "",
        span = form.querySelector(`span.fv-help_message[for="${name}"]`);
      if (span) {
        span.style.display = show ? "block" : "none";
      }
    }
  }

  /**
   * Adds the valid class in all no validated fields
   * @param {HTMLFormElement} form Form to search fields
   * @param {Options} options Validation options
   */
  function addValidStyleInAllFields(form, options) {
    if (!options.addValidClassOnAll) return;
    const fields = form.querySelectorAll(`textarea:not(.${options.validClass}, .${options.invalidClass}), input:not(.${options.validClass}, .${options.invalidClass}), select:not(.${options.validClass}, .${options.invalidClass})`);
    fields.forEach(field => setStyles(field, form, options, true));
  }
  //#endregion dom

  //#region FormValidator
  /**
   * FormValidator class definition
   * @class FormValidate
   */
  class FormValidate {
    constructor(opt, lang) {
      this.conf = configuration;
      this.conf.language = {
        ...language,
        ...lang
      };
      this.opt = {
        ...options,
        ...opt
      };
      this.lang = this.conf.language;
    }

    /**
     * Triggers the FormValidator events of the fields
     * @param {string} event Event name
     * @param {HTMLFormElement} form  Parent form
     * @param {ValidationField} field Validating field
     * @param {boolean} state Validation result (false in event beforeValidation or afterValidation)
     * @param {Options} options Validation options
     */
    triggerEvent(event, form, field, state, options) {
      let fns = [];
      switch (event) {
        case "beforeValidate":
          fns = configuration.onBeforeValidate[field.name];
          break;
        case "valid":
          fns = configuration.onValid[field.name];
          break;
        case "invalid":
          fns = configuration.onInvalid[field.name];
          break;
        case "afterValidate":
          fns = configuration.onAfterValidate[field.name];
          break;
      }
      if (fns) fns.forEach(fn => {
        fn(form, field, state, options);
      });
    }

    /**
     * Triggers all validators set in the fields
     * @param {ValidationField} field Field to validate
     * @param {HTMLFormElement} form Parent form
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @param {string} event Event to check if must be triggered
     * @returns {boolean} Returns true only if pass all validations
     */
    validateField(field, form, options, config, event) {
      this.triggerEvent("beforeValidate", form, field, false, options);
      const list = this.searchSyncValidators(field, options, config),
        value = field.value,
        valid_invalid = [];
      for (const validator of list) {
        if (config.validators[validator]) {
          if (event == "input" && !(config.validators[validator].validateOnInput ?? options.validateOnInput)) continue;
          const r = config.validators[validator].validatorFunction(value, form, field, options, this.lang);
          if (r) this.triggerEvent("valid", form, field, true, options);else this.triggerEvent("invalid", form, field, false, options);
          valid_invalid.push(r);
          removeStyles(field, form, options);
          setStyles(field, form, options, r);
          setMessage(field, form, options, config, this.lang, r, config.validators[validator]);
        } else {
          console.error(`FormValidator: Failed to trigger the validator: ${validator}, can not be found.`);
        }
        if (valid_invalid.includes(false)) break;
      }
      this.triggerEvent("afterValidate", form, field, !valid_invalid.includes(false), options);
      return !valid_invalid.includes(false);
    }

    /**
     * Triggers all async validators set in the fields
     * @param {ValidationField} field Field to validate
     * @param {HTMLFormElement} form Parent form
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @param {string} event Event to check if must be triggered
     * @returns {Promise<boolean>} Returns a true promise only if pass all validations
     */
    async validateFieldAsync(field, form, options, config, event) {
      this.triggerEvent("beforeValidate", form, field, false, options);
      const list = this.searchAsyncValidators(field, options, config),
        value = field.value;
      const valid_invalid = [];
      for (const validator of list) {
        if (config.asyncValidators[validator]) {
          if (event == "input" && !(config.asyncValidators[validator].validateOnInput ?? options.validateOnInput)) continue;
          const r = await config.asyncValidators[validator].validatorFunction(value, form, field, options, this.lang);
          if (r) this.triggerEvent("valid", form, field, true, options);else this.triggerEvent("invalid", form, field, false, options);
          valid_invalid.push(r);
          removeStyles(field, form, options);
          setStyles(field, form, options, r);
          setMessage(field, form, options, config, this.lang, r, config.asyncValidators[validator]);
        } else {
          console.error(`FormValidator: Failed to trigger the validator: ${validator}, can not be found.`);
        }
        if (valid_invalid.includes(false)) break;
      }
      this.triggerEvent("afterValidate", form, field, !valid_invalid.includes(false), options);
      return !valid_invalid.includes(false);
    }

    /**
     * Triggers all validators set in the fields
     * @param {HTMLFormElement} form Parent form
     * @param {string} not List of inputs attributes not to be validated
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @param {string} event Event to check if must be triggered
     * @returns {boolean} Returns true only if pass all validations
     */
    validateAllFields(form, not, options, config, event) {
      const fields = form.querySelectorAll(`textarea, select, input:not(${not})`),
        valid = [];
      fields.forEach(field => {
        if (this.validateFieldController(field, "submit", options)) valid.push(this.validateField(field, form, options, config, event));
      });
      if (valid.length == 0) valid.push(true);
      return !valid.includes(false);
    }

    /**
     * Triggers all async validators set in the fields
     * @param {HTMLFormElement} form Parent form
     * @param {string} not List of inputs attributes not to be validated
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @param {string} event Event to check if must be triggered
     * @returns {Promise<boolean>} Returns a true promise only if pass all validations
     */
    async validateAllFieldsAsync(form, not, options, config, event) {
      const fields = form.querySelectorAll(`textarea, select, input:not(${not})`),
        valid = [];
      for (const element of Array.from(fields)) {
        const field = element;
        if (this.validateFieldController(field, "submit", options)) valid.push(await this.validateFieldAsync(field, form, options, config, event));
      }
      if (valid.length == 0) valid.push(true);
      return !valid.includes(false);
    }

    /**
     * Triggers all modifiers set in the fields
     * @param {(HTMLInputElement | HTMLTextAreaElement)} field Field to modify the value
     * @param {HTMLFormElement} form Form to search fields
     * @param {string} event Event type name
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    modifyField(field, form, event, options, config) {
      const modifiersList = field.getAttribute(options.fieldModifyAttribute),
        isForModifier = field instanceof HTMLInputElement && !["search", "checkbox", "radio", "file"].includes(field.type) || field instanceof HTMLTextAreaElement;
      if (!isForModifier) return;
      const list = !modifiersList ? [] : modifiersList.split(/[,|-]+\s*|\s+/);
      let value = field.value;
      for (const modifier of list) {
        if (config.modifiers[modifier]) {
          if (event == "input" && !(config.modifiers[modifier].modifyOnInput ?? options.modifyOnInput)) continue;
          value = config.modifiers[modifier].modifierFunction(value, form, field, options, this.lang);
        } else {
          console.error(`FormValidator: Failed to trigger the modifier: ${modifier}, can not be found.`);
        }
      }
      field.value = value;
    }

    /**
     * Set the dependant validation
     * @param {HTMLFormElement} form Form to search target field
     * @param {ValidationField} field Field to check if it must be dependant
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    setDependantValidation(form, field, options, config) {
      const depending = field.getAttribute("data-fv-depends-on");
      if (!depending) return;
      const target = form.querySelector(`[name=${depending}]`);
      if (target) {
        field.setAttribute("data-fv-skip", "true");
        const validators = field.getAttribute(options.fieldValidateAttribute) ?? "";
        if (!validators.includes("required")) field.setAttribute(options.fieldValidateAttribute, validators + "required");
        target.setAttribute("data-fv-dependant", depending);
        const fEvent = field instanceof HTMLSelectElement ? "change" : "input";
        const value = field.getAttribute("data-fv-depends-on-value") ?? "";
        field.addEventListener(fEvent, function () {
          field.setAttribute("data-fv-skip", "true");
          removeStyles(field, form, options);
          removeInlineMessages(field, field.form);
          if (config.validMessages[form.id][field.name]) delete config.validMessages[form.id][field.name];
          if (config.invalidMessages[form.id][field.name]) delete config.invalidMessages[form.id][field.name];
          document.querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)?.remove();
          if (target.value.trim().length > 0) field.setAttribute("data-fv-skip", "false");
          if (value.length > 0) if (value != target.value) field.setAttribute("data-fv-skip", "true");
        });
        const tEvent = field instanceof HTMLSelectElement ? "change" : "input";
        const _self = this;
        target.addEventListener(tEvent, function () {
          removeStyles(field, form, options);
          removeInlineMessages(field, field.form);
          if (config.validMessages[form.id][field.name]) delete config.validMessages[form.id][field.name];
          if (config.invalidMessages[form.id][field.name]) delete config.invalidMessages[form.id][field.name];
          document.querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)?.remove();
          if (field.classList.contains(options.validClass) || field.classList.contains(options.invalidClass)) _self.validateField(field, form, options, config, tEvent);
        });
      } else {
        console.error(`FormValidator: Failed to set the dependant validation on ${field.name}, the target field ${depending} can not be found.`);
      }
    }

    /**
     * Set the optional validation
     * @param {HTMLFormElement} form Form to search target field
     * @param {ValidationField} field Field to check if it must be optional
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    setOptionalValidation(form, field, options, config) {
      if (field.hasAttribute("data-fv-depends-on")) return;
      const optional = field.getAttribute("data-fv-optional") ?? "";
      if (optional == "true") {
        field.setAttribute("data-fv-skip", "true");
        const validators = field.getAttribute(options.fieldValidateAttribute) ?? "";
        if (!validators.includes("required")) field.setAttribute(options.fieldValidateAttribute, validators + "required");
        const event = field instanceof HTMLSelectElement ? "change" : "input";
        field.addEventListener(event, function () {
          if (field.value.trim().length > 0) field.setAttribute("data-fv-skip", "false");else {
            field.setAttribute("data-fv-skip", "true");
            removeStyles(field, form, options);
            removeInlineMessages(field, field.form);
            if (config.validMessages[form.id][field.name]) delete config.validMessages[form.id][field.name];
            if (config.invalidMessages[form.id][field.name]) delete config.invalidMessages[form.id][field.name];
            document.querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)?.remove();
          }
        });
      }
    }

    /**
     * Controls if the field could be validated
     * @param {ValidationField} field Field to check the type
     * @param {string} event Event to check if must be triggered
     * @param {Options} options Validation options
     * @returns {boolean} True if could be validated
     */
    validateFieldController(field, event, options) {
      const isIgnored = field.getAttribute("data-fv-ignored") ?? "false";
      const isSkipped = field.getAttribute("data-fv-skip") ?? "false";
      if (isIgnored == "true" || isSkipped == "true") return false;
      const isCheckOrRadio = field instanceof HTMLInputElement && ["checkbox", "radio"].includes(field.type);
      let validate = false;
      switch (event) {
        case "click":
          if (isCheckOrRadio && options.validateCheckboxRadioOnClick) validate = true;
          break;
        case "blur":
          if (options.validateOnBlur) validate = true;
          break;
        default:
          validate = true;
          break;
      }
      return validate;
    }

    /**
     * Adds the DOM features to the field
     * @param {HTMLFormElement} form Parent form
     * @param {ValidationField} field Target field
     * @param {Options} options Validation options
     */
    domFieldsFeatures(form, field, options) {
      const fieldsToIgnore = form.querySelectorAll(notAccept(false, false));
      if (field instanceof HTMLInputElement && Array.from(fieldsToIgnore).includes(field)) return;
      if (field instanceof HTMLInputElement) {
        if (options.addSuggestions) {
          const suggestions = field.getAttribute(options.suggestionAttribute) ?? "";
          inputSuggestion(field, suggestions.split(/[,|-]+\s*|\s+/), options.suggestionConfig);
        }
        if (options.addPasswordInfo) {
          passwordInfo(field, options);
        }
      }
      if (field instanceof HTMLTextAreaElement) {
        const restriction = field.getAttribute(options.lengthRestrictAttribute);
        if (restriction) textAreaLengthRestriction(field, parseInt(restriction, 10), options.lengthRestrictInfo);
      }
      if (options.showHelpMessagesOnFocus) {
        const message = field.getAttribute(options.fieldHelpMessageAttribute);
        if (message) {
          fieldHelpMessage(field, message);
        }
      }
    }

    /**
     * Adds an ignore attribute to the field if it is in the ignore list
     * @param {HTMLFormElement} form Parent form
     * @param {ValidationField} field Target field
     * @param {Options} options Validation options
     */
    ignoreField(form, field, options) {
      const fieldsToIgnore = form.querySelectorAll(notAccept(false, false));
      if (field instanceof HTMLInputElement && Array.from(fieldsToIgnore).includes(field)) return;
      let list = [];
      const name = field.getAttribute("name") ?? "";
      if (Array.isArray(options.ignoredFieldsNames)) {
        list = options.ignoredFieldsNames;
      } else if (typeof options.ignoredFieldsNames == "string") {
        list = options.ignoredFieldsNames.split(/[,|-]+\s*|\s+/);
      }
      if (list.indexOf(name) > -1) {
        field.setAttribute("data-fv-ignored", "true");
      } else {
        field.setAttribute("data-fv-ignored", "false");
      }
      field.setAttribute("data-fv-skip", "false");
    }

    /**
     * Search for async validators in the validator list of the field
     * @param {ValidationField} field Target field
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @returns {string[]} Async validators list
     */
    searchAsyncValidators(field, options, config) {
      const asyncValidators = Object.keys(config.asyncValidators),
        validatorsList = field.getAttribute(options.fieldValidateAttribute),
        list = !validatorsList ? [] : validatorsList.split(/[,|-]+\s*|\s+/);
      return asyncValidators.filter(asyncValidator => list.includes(asyncValidator));
    }

    /**
     * Search for sync validators in the validator list of the field
     * @param {ValidationField} field Target field
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     * @returns {string[]} Sync validators list
     */
    searchSyncValidators(field, options, config) {
      const syncValidators = Object.keys(config.validators),
        validatorsList = field.getAttribute(options.fieldValidateAttribute),
        list = !validatorsList ? [] : validatorsList.split(/[,|-]+\s*|\s+/);
      return syncValidators.filter(syncValidator => list.includes(syncValidator));
    }

    /**
     * Adds the event listeners to the field
     * @param {HTMLFormElement} form Parent form
     * @param {ValidationField} field Target field
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    addEventListenersToFormFields(form, field, options, config) {
      const fieldsToIgnore = form.querySelectorAll(notAccept(options.validateHiddenFields, false));
      if (field instanceof HTMLInputElement && Array.from(fieldsToIgnore).includes(field)) return;
      field.addEventListener("focus", () => {
        toggleHelpMessage(field, form, options, true);
      });
      field.addEventListener("click", async () => {
        toggleHelpMessage(field, form, options, true);
        if (this.validateFieldController(field, "click", options)) {
          if (!this.validateField(field, form, options, config, "click")) return;
          await this.validateFieldAsync(field, form, options, config, "click");
        }
      });
      field.addEventListener("blur", async () => {
        toggleHelpMessage(field, form, options, false);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) this.modifyField(field, form, "blur", options, config);
        if (this.validateFieldController(field, "blur", options)) {
          if (!this.validateField(field, form, options, config, "blur")) return;
          await this.validateFieldAsync(field, form, options, config, "blur");
        }
      });
      field.addEventListener("input", async () => {
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) this.modifyField(field, form, "input", options, config);
        if (this.validateFieldController(field, "input", options)) {
          if (!this.validateField(field, form, options, config, "input")) return;
          await this.validateFieldAsync(field, form, options, config, "input");
        }
      });
      if (field instanceof HTMLSelectElement) field.addEventListener("change", async () => {
        if (!this.validateField(field, form, options, config, "change")) return;
        await this.validateFieldAsync(field, form, options, config, "change");
      });
    }

    /**
     * Add the event listeners to the form
     * @param {HTMLFormElement} form Parent form
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    addEventListenersToForm(form, options, config) {
      form.addEventListener("submit", async e => {
        e.preventDefault();
        let isValid = this.validateAllFields(form, notAccept(options.validateHiddenFields, false), options, config, "submit");
        if (isValid) isValid = await this.validateAllFieldsAsync(form, notAccept(options.validateHiddenFields, false), options, config, "submit");
        form.setAttribute("valid-state", isValid ? "validForm" : "invalidForm");
        if (!isValid) {
          if (options.scrollToTopOnInvalid) form.scrollIntoView({
            behavior: "smooth"
          });
          e.stopImmediatePropagation();
        }
        addValidStyleInAllFields(form, options);
      });
      form.addEventListener("reset", () => {
        formReset(form, options, config);
        form.removeAttribute("valid-state");
      });
    }

    /**
     * Set up modifiers and validators in all fields of all configured forms
     * @param {Options} options Validation options
     * @param {Configuration} config Validation configuration
     */
    setUpFV(options, config) {
      const form = options.form.split(/[,|-]+\s*|\s+/).map(f => `#${f}`).join(",");
      let forms = document.querySelectorAll(form);
      if (!forms) forms = document.querySelectorAll("form");
      forms.forEach(form => {
        config.validMessages[form.id] = {};
        config.invalidMessages[form.id] = {};
        form.classList.add("fv");
        form.noValidate = true;
        this.addEventListenersToForm(form, options, config);
        const fields = form.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
          this.domFieldsFeatures(form, field, options);
          this.ignoreField(form, field, options);
          this.setDependantValidation(form, field, options, config);
          this.setOptionalValidation(form, field, options, config);
          this.addEventListenersToFormFields(form, field, options, config);
        });
      });
    }

    /**
     * Set suggestions to the specified input
     * @param {HTMLInputElement} input Input element or input name
     * @param {string[]} words Array of words to suggest
     * @param {?Suggestion} [config] Suggestion list config
     */
    setSuggestions(input, words, config) {
      let i = null;
      if (!(input instanceof HTMLInputElement)) {
        i = document.querySelector(`[name=${input}]`);
        if (i) input = i;else {
          console.error(`FormValidator: Failed to set the suggestions, the input '${input}' can not be found.`);
          return;
        }
      }
      if (!config) config = options.suggestionConfig;
      inputSuggestion(input, words, config);
    }

    /**
     * Set the text length restriction to the specified textarea
     * @param {(string | HTMLTextAreaElement)} TextArea Textarea element or textarea name
     * @param {number} max Text max length
     * @param {?string} [info] Type of info to show (count, both, remaining)
     */
    setTextAreaLengthRestriction(TextArea, max, info) {
      let t = null;
      if (!(TextArea instanceof HTMLTextAreaElement)) {
        t = document.querySelector(`[name=${TextArea}]`);
        if (t) TextArea = t;else {
          console.error(`FormValidator: Failed to set the text length restriction, the textarea '${TextArea}' can not be found.`);
          return;
        }
      }
      if (!info) info = "count";
      if (!["count", "both", "remaining"].includes(info)) return;
      textAreaLengthRestriction(TextArea, max, info);
    }

    /**
     * Set the password info to the input type password
     * @param {(string | HTMLInputElement)} input Input element or input name
     */
    setPasswordInfo(input) {
      let i = null;
      if (!(input instanceof HTMLInputElement)) {
        i = document.querySelector(`[name=${input}]`);
        if (i) input = i;else {
          console.error(`FormValidator: Failed to set the password info, the input '${input}' can not be found.`);
          return;
        }
      }
      passwordInfo(input, options);
    }

    /**
     * Validates the specified fields of the specified forms
     * @param {?string} [form] Form or forms id to validate (comma separated)
     * @param {?Options} [options] Validation options
     */
    validate(form, options) {
      const opt = {
          ...this.opt,
          ...options
        },
        conf = this.conf;
      let f;
      if (!form) {
        f = opt.form;
      } else {
        f = form ?? "";
        f = f.trim().length > 0 ? f : opt.form;
      }
      opt.form = f;
      this.setUpFV(opt, conf);
    }

    /**
     * Sets the validation attributes on the form's fields then validates
     * @param {JSONConfig} json Form's Validation configuration
     * @param {?Options} [options] Validation options
     */
    fromJSON(json, options) {
      const forms = Object.keys(json);
      if (forms.length == 0) return;
      const frm = json[0];
      if (!frm) return;
      const form = document.querySelector(Object.keys(json)[0]);
      if (!form) {
        console.error(`FormValidator: Failed to set the validation config on the from, '${Object.keys(json)[0]}' can not be found.`);
        return;
      }
      const opt = {
          ...this.opt,
          ...options
        },
        conf = this.conf;
      opt.form = Object.keys(json)[0];
      for (const fld in frm) {
        const field = form.querySelector(fld);
        if (!field) {
          console.error(`FormValidator: Failed to set the validation on the field, '${fld}' can not be found.`);
          continue;
        }
        const element = frm[fld];
        if (element.validators) field.setAttribute(opt.fieldValidateAttribute, element.validators);
        if (element.modifiers) field.setAttribute(opt.fieldModifyAttribute, element.modifiers);
        for (const dt in element.dataFV) {
          const data = element.dataFV[dt];
          const dt_fv = dt.includes("data-fv-") ? dt : `data-fv-${dt}`;
          field.setAttribute(dt_fv, data);
        }
      }
      this.setUpFV(opt, conf);
    }

    /**
     * Adds an Form Validator event to the field
     * @param {string} event Event name
     * @param {string} field Field id
     * @param {ValidatorEvent} eventFunction Event function
     */
    addFormValidationEvent(event, field, eventFunction) {
      const element = document.getElementById(field);
      if (element) {
        switch (event) {
          case "beforeValidate":
            configuration.onBeforeValidate[element.name].push(eventFunction);
            break;
          case "valid":
            configuration.onValid[element.name].push(eventFunction);
            break;
          case "invalid":
            configuration.onInvalid[element.name].push(eventFunction);
            break;
          case "afterValidate":
            configuration.onAfterValidate[element.name].push(eventFunction);
            break;
          default:
            console.error(`FormValidator: Failed to add the event, '${event}' is not a valid event.`);
            break;
        }
      } else {
        console.error(`FormValidator: Failed to add the event,  the field named '${field}' cant not be found.`);
      }
    }

    /**
     * Adds a validator to the global config
     * @param {Validator} validator Validator config
     */
    addValidator(validator) {
      const list = Object.keys(this.conf.validators);
      if (list.includes(validator.name)) {
        console.error(`FormValidator: Failed to add the validator, the name '${validator.name}' is already in use.`);
        return;
      }
      this.conf.validators[validator.name] = validator;
    }

    /**
     * Adds an async validator to the global config
     * @param {AsyncValidator} validator Validator config
     */
    addAsyncValidator(validator) {
      const list = Object.keys(this.conf.asyncValidators);
      if (list.includes(validator.name)) {
        console.error(`FormValidator: Failed to add the validator, the name '${validator.name}' is already in use.`);
        return;
      }
      this.conf.asyncValidators[validator.name] = validator;
    }

    /**
     * Adds a modifier to the global config
     * @param {Modifier} modifier Modifier config
     */
    addModifier(modifier) {
      const list = Object.keys(this.conf.modifiers);
      if (list.includes(modifier.name)) {
        console.error(`FormValidator: Failed to add the modifier, the name '${modifier.name}' is already in use.`);
        return;
      }
      this.conf.modifiers[modifier.name] = modifier;
    }

    /**
     * Restricts typed characters of the input
     * @param {(string | HTMLInputElement)} input Input element or input id to restrict
     * @param {string} type Accepted types of characters (numbers, letters, text, all, none)
     * @param {?string} [reject] Additional rejected characters
     * @param {?string} [accept] Additional accepted characters
     */
    restrict(input, type, reject, accept) {
      let i = null;
      if (!(input instanceof HTMLInputElement)) {
        i = document.querySelector(`#${input}`);
        if (i) input = i;else {
          console.error(`FormValidator: Failed to set the characters restriction on the input, '${input}' can not be found.`);
          return;
        }
      }
      if (reject) reject = escapeRegExp(reject);
      if (accept) accept = escapeRegExp(accept);
      let acceptRegexp;
      switch (type) {
        case "numbers":
          acceptRegexp = new RegExp(`[0-9${accept ?? ""}]`);
          break;
        case "letters":
          acceptRegexp = new RegExp(`[a-zA-Z${accept ?? ""}]`);
          break;
        case "text":
          acceptRegexp = new RegExp(`[a-zA-Z0-9\\s\\,\\;\\.${accept ?? ""}]`);
          break;
        case "none":
          acceptRegexp = new RegExp(`[${accept ?? ""}]`);
          break;
        default:
          acceptRegexp = /[.]/;
          break;
      }
      const acceptDefault = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Backspace", "Delete", "Control", "Shift", "CapsLock", "Tab", "AltGraph", "Home", "End", "PageUp", "PageDown"];
      const rejectRegexp = new RegExp(`[${reject}]`);
      input.addEventListener("keydown", function (e) {
        if (!acceptDefault.includes(e.key) && (!acceptRegexp.test(e.key) || rejectRegexp.test(e.key))) e.preventDefault();
      });
      input.addEventListener("input", function (e) {
        if (!acceptRegexp.test(input.value) || rejectRegexp.test(input.value)) input.value = input.value.replace(new RegExp(`[^${acceptRegexp.source}]`, "g"), "");
        input.value = input.value.replace(new RegExp(`[${rejectRegexp.source}]`, "g"), "");
      });
    }
  }

  /**
   * Validates form field contents before submission.
   * @param {?Options} [options] Form validation options
   * @param {?Lang} [lang] Form validation language
   * @returns {FormValidate} Form validation
   */
  function FormValidator(options, lang) {
    return new FormValidate(options, lang);
  }
  //#endregion FormValidator
});
//# sourceMappingURL=FormValidator.js.map
