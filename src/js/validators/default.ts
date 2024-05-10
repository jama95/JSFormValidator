import { configuration, language, telephoneFormats } from "../config";
import { Lang } from "../types";
import { checkRangeStep, checkStringLength, escapeRegExp } from "../utils";

/* Checks if the field has a value */
configuration.validators["required"] = {
  name: "required",
  validatorFunction: function (value, form, field, options, lang) {
    let name = field.getAttribute("name");
    if (field instanceof HTMLInputElement && field.type == "checkbox") {
      return field.checked;
    } else if (field instanceof HTMLInputElement && field.type == "radio") {
      return (
        form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`)
          .length > 0
      );
    } else {
      return !!(value && value.trim().length > 0);
    }
  },
  invalidMessage: language.required,
  invalidMessageKey: "inv_required",
  validMessageKey: "val_required",
};

let lengthMessage = language.notConfirmed;

/**
 * Set the invalid length message
 * @param {boolean} file True if it is a file input
 * @param {boolean} multiple True if it is a multiple select
 */
function setLengthMessage(file: boolean, multiple: boolean) {
  if (file)
    lengthMessage
      .replace(/1\x5B.+2\x5B/, "")
      .replace("]2", "")
      .replace(/3\x5B.+4\x5B/, "")
      .replace(/\x5D4.+\x5D5/, "");
  else if (multiple)
    lengthMessage
      .replace(/1\x5B.+2\x5B/, "")
      .replace("]2", "")
      .replace(/3\x5B.+5\x5B/, "")
      .replace("]5", "");
  else
    lengthMessage
      .replace(/\x5D1.+\x5D2/, "")
      .replace("1[", "")
      .replace(/\x5D3.+\x5D5/, "")
      .replace("3[", "");
}

/* Checks if the field value has the correct length */
configuration.validators["length"] = {
  name: "length",
  validatorFunction: function (value, form, field, options, lang) {
    const length = field.getAttribute("data-fv-length");
    if (!length) {
      lengthMessage = lang.notConfirmed;
      return false;
    }
    let val = value.length,
      file = false,
      multiple = false;
    if (
      field instanceof HTMLInputElement &&
      field.type == "file" &&
      field.files
    ) {
      file = true;
      val = field.files.length;
    }
    if (field instanceof HTMLSelectElement && field.hasAttribute("multiple")) {
      multiple = true;
      val = field.selectedOptions.length;
    }
    const check = checkStringLength(val, length);
    switch (check[0]) {
      case "max":
        lengthMessage = lang.invalidLengthMax.replace("{max}", check[1]);
        setLengthMessage(file, multiple);
        return false;
      case "min":
        lengthMessage = lang.invalidLengthMin.replace("{min}", check[1]);
        setLengthMessage(file, multiple);
        return false;
      case "range":
        lengthMessage = lang.invalidLengthRange
          .replace("{max}", check[1])
          .replace("{min}", check[2]);
        setLengthMessage(file, multiple);
        return false;
      case "equal":
        lengthMessage = lang.invalidLengthEqual.replace("{equal}", check[1]);
        setLengthMessage(file, multiple);
        return false;
      case "no":
        lengthMessage = lang.notConfirmed;
        return false;
    }
    return true;
  },
  invalidMessage: lengthMessage,
  invalidMessageKey: "inv_length",
  validMessageKey: "val_length",
};

let numberMessage = language.invalidNumber;

/**
 * Set the invalid number message
 * @param {string[]} check Response of check function
 * @param {Lang} lang Language
 */
function setNumberMessage(check: string[], lang: Lang): void {
  switch (check[0]) {
    case "max":
      numberMessage = lang.invalidNumberMax.replace("{max}", check[1]);
      break;
    case "min":
      numberMessage = lang.invalidNumberMin.replace("{min}", check[1]);
      break;
    case "range":
      numberMessage = lang.invalidNumberMax.replace(
        "{range}",
        `${check[1]}:${check[2]}`
      );
      break;
    case "equal":
      numberMessage = lang.invalidNumberEqual.replace("{equal}", check[1]);
      break;
    case "step":
      numberMessage = lang.invalidNumberStep.replace("{step}", check[1]);
      break;
    default:
      numberMessage = lang.notConfirmed;
      break;
  }
}

/* Checks if the field value has only numbers and if match with the conditions */
configuration.validators["numbers"] = {
  name: "numbers",
  validatorFunction: function (value, form, field, options, lang) {
    const allow = (field.getAttribute("data-fv-numbers_allow") || "").split(
      /[,|-]+\s*|\s+/
    );
    if (allow.includes("noPositive") && !value.includes("-")) return false;
    if (!allow.includes("negative") && value.includes("-")) return false;
    if (!allow.includes("decimal") && value.includes(".")) return false;
    if (/^-?\d+(\x2E\d+)?$/.test(value)) {
      const range = field.getAttribute("data-fv-numbers_range") || "",
        step = field.getAttribute("data-fv-numbers_step") || "",
        check = checkRangeStep(allow, parseFloat(value), range, step);
      if (check[0][0] && check[0][0] != "ok") {
        setNumberMessage(check[0], lang);
        return false;
      }
      if (check[1][0] && check[1][0] != "ok") {
        setNumberMessage(check[1], lang);
        return false;
      }
    }
    return true;
  },
  invalidMessage: numberMessage,
  invalidMessageKey: "inv_numbers",
  validMessageKey: "val_numbers",
};

let lettersMessage = language.invalidLetters;

/* Checks if the field value has only letters and/or the allowed characters */
configuration.validators["letters"] = {
  name: "letters",
  validatorFunction: function (value, form, field, options, lang) {
    const allow = field.getAttribute("data-fv-letters_allow") || "";
    const regex = new RegExp(`[a-z${escapeRegExp(allow)}]`, "i");
    if (/\d/.test(value) || !regex.test(value)) {
      if (allow.length == 0)
        lettersMessage = lettersMessage.replace(/\x5B.+\x5D/, "");
      else
        lettersMessage = lettersMessage
          .replace("[", "")
          .replace("]", "")
          .replace(/\x7B.+\x7D/, allow);
      return false;
    }
    return true;
  },
  invalidMessage: lettersMessage,
  invalidMessageKey: "inv_letters",
  validMessageKey: "val_letters",
};

let alphanumericMessage = language.invalidAlphaNumeric;

/**
 * Set the invalid alphanumeric message
 * @param {string} allow Allowed characters
 */
function setAlphanumericMessage(allow: string) {
  if (allow.length == 0)
    alphanumericMessage = alphanumericMessage.replace(/\x5B.+\x5D/i, "");
  else
    alphanumericMessage = alphanumericMessage
      .replace("[", "")
      .replace("]", "")
      .replace(/\x7B\w+\x7D/, allow);
}

/* Checks if the field value has only numbers and/or letters and/or the allowed characters */
configuration.validators["alphanumeric"] = {
  name: "alphanumeric",
  validatorFunction: function (value, form, field, options, lang) {
    const allow = field.getAttribute("data-fv-letters_allow") || "";
    const regex = new RegExp(`[a-z\\d${escapeRegExp(allow)}]`, "i");
    if (!regex.test(value)) {
      setAlphanumericMessage(allow);
      return false;
    }
    return true;
  },
  invalidMessage: alphanumericMessage,
  invalidMessageKey: "inv_alphanumeric",
  validMessageKey: "val_alphanumeric",
};

/* Checks if the field value match with the specified regular expression */
configuration.validators["regex"] = {
  name: "regex",
  validatorFunction: function (value, form, field, options, lang) {
    const regex = field.getAttribute("data-fv-regex") || "";
    const flags = field.getAttribute("data-fv-flags") || undefined;
    if (!regex) return false;
    return new RegExp(regex, flags).test(value);
  },
  invalidMessage: language.invalidCustomVal,
  invalidMessageKey: "inv_regexp",
  validMessageKey: "val_regexp",
};

/* Checks if the field value match with the specified time format   */
configuration.validators["telephone"] = {
  name: "telephone",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-telephone_format") || "EC";
    if (telephoneFormats[format])
      return new RegExp(telephoneFormats[format].join("|")).test(value);
    return false;
  },
  invalidMessage: language.invalidTelephone,
  invalidMessageKey: "inv_telephone",
  validMessageKey: "val_telephone",
};

// Regex compatible with "test" and "match"
const RGB =
  "(rgb\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\x29)";
const RGBA =
  "(rgba\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(0?\\x2E\\d+|[01])\\x29)";
const HSL =
  "(hsl\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\s?\\x2C\\s?(100|[1-9]?\\d)\\x29)";
const HSLA =
  "(hsla\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\s?\\x2C\\s?(100|[1-9]?\\d)\\s*\\x2C\\s*(0?\\x2E\\d+|[01])\\x29)";
const CMYK =
  "(CMYK\\x28(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s*\\x2C\\s*(100|[1-9]?\\d)\\x25\\x29)";
const HEX =
  "((?:\\x23(?:[a-f\\d]{2}){3}(?:[a-f\\d]{2})?)|(?:\\x23[a-f\\d]{3}[a-f\\d]?))";

/* Checks if the field value match with the specified color formats   */
configuration.validators["color"] = {
  name: "color",
  validatorFunction: function (value, form, field, options, lang) {
    const colors = field.getAttribute("data-fv-colors") || "";
    let regex: string[] = [];
    if (colors.trim().length == 0)
      regex.push(`^${RGB}$|^${RGBA}$|^${HSL}$|^${HSLA}$|^${CMYK}$|^${HEX}$`);
    else {
      if (colors.search(/rgba?/i)) regex.push(`^${RGB}$|^${RGBA}$`);
      if (colors.search(/hsla?/i)) regex.push(`^${HSL}$|^${HSLA}$`);
      if (colors.search(/CMYK/i)) regex.push(`^${CMYK}$`);
      if (colors.search(/(?:hex)|#/i)) regex.push(`^${HEX}$`);
    }
    if (new RegExp(regex.length > 1 ? regex.join("|") : regex[0], "i"))
      return true;
    return false;
  },
  invalidMessage: language.color,
  invalidMessageKey: "inv_color",
  validMessageKey: "val_color",
};
