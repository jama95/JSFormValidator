import { configuration, language, telephoneFormats } from "../config";
import { Lang } from "../types";
import { checkRangeStep, checkStringLength, escapeRegExp } from "../utils";

/* Checks if the field has a value */
configuration.validators["required"] = {
  name: "required",
  validatorFunction: function (value, form, field, options, lang) {
    const name = field.getAttribute("name");
    if (field instanceof HTMLInputElement && field.type == "checkbox") {
      return (
        form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`)
          .length > 0
      );
    } else if (field instanceof HTMLInputElement && field.type == "radio") {
      return (
        form.querySelectorAll(`input[type="radio"][name="${name}"]:checked`)
          .length > 0
      );
    } else {
      return value.trim().length > 0;
    }
  },
  invalidMessage: language.inv_required,
  messageKey: "required",
};

let lengthMessage = language.notConfirmed;

/**
 * Set the invalid length message
 * @param {boolean} file True if it is a file input
 * @param {boolean} multiple True if it is a multiple select
 * @param {boolean} check True if it is a checkbox input
 * @returns {string} Length message
 */
function setLengthMessage(
  file: boolean,
  multiple: boolean,
  check: boolean
): string {
  if (file)
    return lengthMessage
      .replace(/1\x5B.+2\x5B/, "")
      .replace("]2", "")
      .replace(/3\x5B.+4\x5B/, "")
      .replace(/\x5D4.+\x5D5/, "");
  else if (multiple || check)
    return lengthMessage
      .replace(/1\x5B.+2\x5B/, "")
      .replace("]2", "")
      .replace(/3\x5B.+5\x5B/, "")
      .replace("]5", "");
  else
    return lengthMessage
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
      this.invalidMessage = lang.notConfirmed;
      return false;
    }
    let val = value.length,
      file = false,
      multiple = false,
      checkbox = false;
    if (
      field instanceof HTMLInputElement &&
      field.type == "file" &&
      field.files
    ) {
      file = true;
      val = field.files.length;
    }
    if (field instanceof HTMLInputElement && field.type == "checkbox") {
      val = document.querySelectorAll(
        `input[name=${field.name}]:checked`
      ).length;
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
        lengthMessage = lang.inv_lengthRange
          .replace("{max}", check[2])
          .replace("{min}", check[1]);
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
  messageKey: "length",
};

/**
 * Set the invalid number message
 * @param {string[]} check Response of check function
 * @param {Lang} lang Language
 * @returns {string} Number message
 */
function setNumberMessage(check: string[], lang: Lang): string {
  switch (check[0]) {
    case "max":
      return lang.inv_numberMax.replace("{max}", check[1]);
    case "min":
      return lang.inv_numberMin.replace("{min}", check[1]);
    case "range":
      return lang.inv_numberRange.replace(
        "{range}",
        `${check[1]}::${check[2]}`
      );
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
    const allow = (field.getAttribute("data-fv-numbers_allow") ?? "").split(
      /[,|-]+\s*|\s+/
    );
    if (allow.includes("noPositive") && !value.includes("-")) return false;
    if (
      !allow.includes("negative") &&
      !allow.includes("noPositive") &&
      value.includes("-")
    )
      return false;
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
  messageKey: "numbers",
};

/* Checks if the field value contains only letters and/or the allowed characters */
configuration.validators["letters"] = {
  name: "letters",
  validatorFunction: function (value, form, field, options, lang) {
    const allow = field.getAttribute("data-fv-letters_allow") ?? "";
    const regex = new RegExp(`^[a-z${escapeRegExp(allow)}]+$`, "i");
    if (!regex.test(value)) {
      if (allow.length == 0)
        this.invalidMessage = language.inv_letters.replace(/\x5B.+\x5D/, "");
      else
        this.invalidMessage = language.inv_letters
          .replace("[", "")
          .replace("]", "")
          .replace(/\x7B.+\x7D/, allow);
      return false;
    }
    return true;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "letters",
};

/**
 * Set the invalid alphanumeric message
 * @param {string} allow Allowed characters
 * @returns {string} Alphanumeric message
 */
function setAlphanumericMessage(allow: string): string {
  if (allow.length == 0)
    return language.inv_alphanumeric.replace(/\x5B.+\x5D/i, "");
  else
    return language.inv_alphanumeric
      .replace("[", "")
      .replace("]", "")
      .replace(/\x7B\w+\x7D/, allow);
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
  messageKey: "alphanumeric",
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
  messageKey: "regex",
};

/* Checks if the field value matches with the specified time format   */
configuration.validators["telephone"] = {
  name: "telephone",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-telephone_format") ?? "EC";
    if (telephoneFormats[format])
      return new RegExp(
        telephoneFormats[format].join("|").replace(/\//g, "")
      ).test(value);
    return false;
  },
  invalidMessage: language.inv_telephone,
  messageKey: "telephone",
};

// Regex compatible with "test" and "match"
const RGB =
  "(rgb\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\x29)";
const RGBA =
  "(rgba\\x28(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(25[0-5]|2[0-4]\\d|1?\\d{1,2})\\s*\\x2C\\s*(0?\\x2E\\d+|[01])\\x29)";
const HSL =
  "(hsl\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\x29)";
const HSLA =
  "(hsla\\x28(360|3[0-5]\\d|[12]?\\d{1,2})\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s*\\x2C\\s*(0\\x2E\\d+|[01])\\x29)";
const CMYK =
  "(CMYK\\x28(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s?\\x2C\\s?(100|[1-9]?\\d)\\x25\\s*\\x2C\\s*(100|[1-9]?\\d)\\x25\\x29)";
const HEX =
  "((?:\\x23(?:[a-f\\d]{2}){3}(?:[a-f\\d]{2})?)|(?:\\x23[a-f\\d]{3}[a-f\\d]?))";

/* Checks if the field value matches with the specified color formats   */
configuration.validators["color"] = {
  name: "color",
  validatorFunction: function (value, form, field, options, lang) {
    const colors = field.getAttribute("data-fv-colors") ?? "";
    const regex: string[] = [];
    if (colors.trim().length == 0)
      regex.push(`^${RGB}$|^${RGBA}$|^${HSL}$|^${HSLA}$|^${CMYK}$|^${HEX}$`);
    else {
      if (colors.search(/rgba?/i)) regex.push(`^${RGB}$|^${RGBA}$`);
      if (colors.search(/hsla?/i)) regex.push(`^${HSL}$|^${HSLA}$`);
      if (colors.search(/CMYK/i)) regex.push(`^${CMYK}$`);
      if (colors.search(/(?:hex)|#/i)) regex.push(`^${HEX}$`);
    }
    const check = new RegExp(
      regex.length > 1 ? regex.join("|") : regex[0],
      "i"
    );
    if (check.test(value)) return true;
    return false;
  },
  invalidMessage: language.inv_color,
  messageKey: "color",
};
