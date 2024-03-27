import { options } from "./config";
import type { Lang, Options } from "./types";

/**
 * Checks if the date matches the date format
 * @param {string} date Date
 * @param {string} format Number date format: (D, DD) for day, (M, MM) for month, (YY, YYYY) for year
 * @returns {(number[] | false)} Array of the date
 */
export function CheckDateFormat(
  date: string,
  format: string
): number[] | false {
  const separator = format.replace(/[DMY]/gi, "").charAt(0);
  // Add a leading zero to the day and month if necessary
  if (format.includes("DD") || format.includes("MM")) {
    date = date
      .split(separator)
      .map((part) => (part.length === 1 ? `0${part}` : part))
      .join(separator);
  }
  // Do the magic
  const regexpStr =
      "^" +
      format
        .split(separator)
        .map((part) => `(\\d{${part.length}})`)
        .join(`\\${separator}`) +
      "$",
    matches = date.match(new RegExp(regexpStr));
  if (!matches) return false;
  // If the date matches the format, check if it is real.
  const [day, month, year] = matches.slice(1).map(Number);
  const checkDate = new Date(year, month - 1, day);
  if (
    checkDate.getFullYear() !== year &&
    checkDate.getMonth() !== month - 1 &&
    checkDate.getDate() !== day
  )
    return false;
  return [day, month, year];
}

/**
 * Checks if a number matches with a specific range
 * @param {number} value Number to check
 * @param {string} range Accepted range
 * @returns {string[]} Returns true if the number matches the range
 */
export function checkNumberRange(value: number, range: string): string[] {
  const match = range.match(/^(min|max)?(\d+)(?:-(\d+))?$/);
  if (!match) return ["no"];
  const [, minOrMax, num1, num2] = match,
    min = minOrMax === "min",
    max = minOrMax === "max",
    number1 = parseInt(num1),
    number2 = num2 ? parseInt(num2) : undefined;
  if (min && value < number1) return ["min", num1];
  if (max && value > number1) return ["max", num1];
  if (number2 !== undefined && (value < number1 || value > number2))
    return ["range", num1, num2];
  if (!min && !max && number2 === undefined && value !== number1)
    return ["equal", num1];
  return ["no"];
}

/**
 * Convert a number to currency format
 * @param {string} value Number to convert
 * @param {?string} [locale] Language and region code (for more information see "BCP 47 standard language tags")
 * @param {?string} [currency] Currency code (for more information se "ISO 4217 standard")
 * @param {?number} [decimals] Number of fixed decimal numbers to be displayed
 * @returns {string} Converted number
 */
export function currencyFormat(
  value: string,
  lang: Lang,
  locale?: string,
  currency?: string,
  decimals?: number
): string {
  if (!/^\d+(\.\d+)?$/.test(value)) return value;
  if (!decimals) {
    let prt = value.split(".");
    if (prt.length > 1) decimals = parseInt(prt[1]);
  }
  let num = parseFloat(value).toFixed(decimals);
  locale = !locale ? lang.locale : locale;
  currency = !currency ? lang.currencyCode : currency;
  return parseFloat(num).toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}

/**
 * Converts the first letter of the text to uppercase
 * @param {string} str Text to convert
 * @returns {string} Converted text
 */
export function sentenceCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts the first letter of each word in the text to uppercase
 * @param {string} str Text to convert
 * @returns {string} Converted text
 */
export function capitalizedWords(str: string): string {
  return str
    .split(" ")
    .map((v) => sentenceCase(v))
    .join(" ");
}

/**
 * Description placeholder
 * @param {string} str Text to convert
 * @param {boolean} p Indicates whether the text will be converted to pascalCase (true) or camelCase (false)
 * @returns {string} Converted text
 */
export function camel_pascal(str: string, p: boolean): string {
  str = capitalizedWords(str).replace(/\s/g, "");
  if (!p) str.slice(0, 1).toLowerCase();
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
  const hidden = ',[type:"hidden"]',
    ignore = ',[ignored="true"]',
    notAccept = '[type="submit"],[type="button"],[type="reset"]';
  let not = notAccept;
  if (acceptHidden) not += hidden;
  if (acceptIgnored) not += ignore;
  return not;
}

/**
 * Trigger the callbacks when a message is showed
 * @param {boolean} isValid Validation state
 * @param {Options} options FormValidator options
 * @param {(HTMLInputElement | HTMLTextAreaElement)} field The validated field
 * @param {string} message The validation message
 */
export function triggerMessageCallback(
  isValid: boolean,
  options: Options,
  form: HTMLFormElement,
  field: HTMLInputElement | HTMLTextAreaElement,
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
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Description placeholder
 * @param {string} password Password to check
 * @returns {{
 *   strength: number;
 *   check: string[];
 * }} Password strength
 */
export function CheckPasswordStrength(password: string): {
  strength: number;
  check: string[];
} {
  let strength: number = 0,
    check = [];
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
