import { options } from "./config";
import type { Lang, Options, ValidationField } from "./types";

/**
 * Check if the format is correct
 * @param {string} format Date format
 * @param {string} separator Date format separator
 * @returns {boolean} True if is correct
 */
function validateDateFormat(format: string, separator: string): boolean {
  if (/[A-Z0-9]/.test(separator)) return false;
  const count = (RegExp(new RegExp(`\\${separator}`)).exec(format) ?? [])
    .length;
  if (format.replace(separator, "").length != format.length - count)
    return false;
  if (new RegExp(`[^YMD${separator}]`).test(format)) return false;
  const fParts = format.split(separator);
  switch (fParts.length) {
    case 3:
      if (
        !fParts.includes("YYYY") &&
        !fParts.includes("MM") &&
        !fParts.includes("DD")
      )
        return false;
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
function dateRegex(format: string, separator: string): string {
  return (
    "^" +
    format
      .split(separator)
      .map((part) => {
        if (part.includes("YYYY")) return `\\d{4}`;
        else return `\\d{2}`;
      })
      .join(`\\${separator}`) +
    "$"
  );
}

/**
 * Checks if the date matches the date format.

 * ** Only supports date with number format.
 * @param {string} date Date
 * @param {string} format Number date format: (DD) for day, (MM) for month, (YYYY) for year
 * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
 */
export function checkDateFormat(date: string, format: string): string {
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
  if (fParts.length > 1)
    if (month && (month < 1 || month > 12)) return "invalid";
  if (fParts.length == 3) {
    if (day && (day < 1 || day > new Date(year, month - 1, 0).getDate()))
      return "invalid";
  }
  return "ok";
}

/**
 * Splits the time into an array
 * @param {string} tf Time to split
 * @returns {string[]} [HH,mm,ss,sss?]
 */
function splitTime(tf: string): string[] {
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
function timeRegex(format: string): string {
  return (
    "^" +
    format
      .replace("A", "")
      .split(":")
      .map((part) => {
        if (part.includes(".")) return `\\d{2}\\x2E\\d{3}`;
        return `\\d{2}`;
      })
      .join(`\\x3A`) +
    (format.lastIndexOf("A") > -1 ? "(a\\s?m|p\\s?m|a.\\s?m.|p.\\s?m.)" : "") +
    "$"
  );
}

/**
 * Checks if the time matches the time format.
 * A valid format could be: HH:mm:ss.sssA HH:mm:ssA HH:mmA
 * @param {string} time Time
 * @param {string} format Time format: (HH) for Hours, (mm) for minutes, (ss) for seconds, (sss) for milliseconds, (A) for AM/PM
 * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
 */
export function checkTimeFormat(time: string, format: string): string {
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
  if (milliseconds && (milliseconds < 0 || milliseconds > 999))
    return "invalid";
  return "ok";
}

/**
 * Checks if a number matches with a specific range
 * @param {number} value Number to check
 * @param {string} range Accepted range
 * @returns {string} Returns ok or the unfulfilled range
 */
function checkNumberRange(value: number, range: string): string[] {
  if (range.includes("::") && (range.includes("max") || range.includes("min")))
    return ["no"];
  const match = RegExp(
    /^(min|max)?((?:-?)\d+(?:\x2E\d+)?)(?:\x3A\x3A((?:-?)\d+(?:\x2E\d+)?))?$/
  ).exec(range);
  if (!match) return ["no"];
  const [, minOrMax, num1, num2] = match,
    min = minOrMax === "min",
    max = minOrMax === "max",
    number1 = parseFloat(num1),
    number2 = num2 ? parseFloat(num2) : undefined;
  if (min && value < number1) return ["min", num1];
  if (max && value > number1) return ["max", num1];
  if (number2 !== undefined && (value < number1 || value > number2))
    return ["range", num1, num2];
  if (!min && !max && number2 === undefined && value !== number1)
    return ["equal", num1];
  return ["ok"];
}

/**
 * Checks if a number satisfies with the step
 * @param {number} value Number to check
 * @param {string} step Step
 * @returns {string[]} Returns ok or the unfulfilled step
 */
function checkNumberStep(value: number, step: string): string[] {
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
function checkRangeAllowed(allow: string[], rangeVal: string): string[] {
  let r: string[] = ["ok"];
  if (allow.includes("noPositive") && !rangeVal.includes("-")) r = ["no"];
  if (
    !allow.includes("negative") &&
    !allow.includes("noPositive") &&
    rangeVal.includes("-")
  )
    r = ["no"];
  if (!allow.includes("decimal") && rangeVal.includes(".")) r = ["no"];
  return r;
}

/**
 * Checks if the step value matches with the allowed numbers
 * @param {string[]} allow Allowed numbers options
 * @param {string} stepVal Step value
 * @returns {string[]} Returns no if no match
 */
function checkStepAllowed(allow: string[], stepVal: string): string[] {
  let s: string[] = ["ok"];
  if (allow.includes("noPositive") && !stepVal.includes("-")) s = ["no"];

  if (
    !allow.includes("negative") &&
    !allow.includes("noPositive") &&
    stepVal.includes("-")
  )
    s = ["no"];
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
export function checkRangeStep(
  allow: string[],
  value: number,
  rangeVal: string,
  stepVal: string
): string[][] {
  let check: string[][] = [],
    r: string[] = ["ok"],
    s: string[] = ["ok"];
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
export function checkStringLength(value: number, range: string): string[] {
  if (range.includes("::") && (range.includes("max") || range.includes("min")))
    return ["no"];
  const match = RegExp(/^(min|max)?(\d+)(?:\x3A\x3A(\d+))?$/).exec(range);
  if (!match) return ["no"];
  const [, minOrMax, num1, num2] = match,
    min = minOrMax === "min",
    max = minOrMax === "max",
    number1 = parseInt(num1, 10),
    number2 = num2 ? parseInt(num2, 10) : undefined;
  if (min && value < number1) return ["min", num1];
  if (max && value > number1) return ["max", num1];
  if (number2 !== undefined && (value < number1 || value > number2))
    return ["range", num1, num2];
  if (!min && !max && number2 === undefined && value !== number1)
    return ["equal", num1];
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
export function currencyFormat(
  value: string,
  lang: Lang,
  locale?: string | string[],
  currency?: string,
  decimals?: number
): string {
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
      minimumFractionDigits: decimals,
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
export function sentenceCase(str: string): string {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

/**
 * Converts the first letter of each word in the text to uppercase
 * @param {string} str Text to convert
 * @returns {string} Converted text
 */
export function capitalizedWords(str: string): string {
  return str
    .split(/\s/g)
    .map((v) => sentenceCase(v))
    .join(" ");
}

/**
 * Converts the text in camelCase or pascalCase
 * @param {string} str Text to convert
 * @param {boolean} p Indicates whether the text will be converted to pascalCase (true) or camelCase (false)
 * @returns {string} Converted text
 */
export function camel_pascal(str: string, p: boolean): string {
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
export function notAccept(
  acceptHidden: boolean,
  acceptIgnored: boolean
): string {
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
export function triggerMessageCallback(
  isValid: boolean,
  options: Options,
  form: HTMLFormElement,
  field: ValidationField,
  message: string
) {
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
export function escapeRegExp(str: string): string {
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
export function checkPasswordStrength(password: string): {
  strength: number;
  check: string[];
} {
  let strength: number = 0;
  const check: string[] = [];
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
  return { strength: strength, check: check };
}

/**
 * Lhun algorithm
 * @param {number[]} digits digits to calculate
 * @returns {number} Calculated digit
 */
export function luhn(digits: number[]): number {
  let sum = 0;
  digits
    .slice()
    .reverse()
    .forEach((digit, i) => {
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
export function module11(digits: number[]): number {
  let sum = 0;
  let factor = 2;
  digits
    .slice()
    .reverse()
    .forEach((digit) => {
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
export function sizeStringToBytes(size: string): number {
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
export function getImageDimensions(file: File): Promise<number[]> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      if (e.target) {
        const image = new Image();
        image.src = e.target.result as string;
        image.onload = function () {
          resolve([image.width, image.height]);
        };
      } else resolve([0, 0]);
    };
  });
}
