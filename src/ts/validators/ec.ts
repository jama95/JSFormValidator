import { configuration } from "../config";
import { luhn, module11 } from "../utils";

/* Checks if the field value has a real Ecuadorian identification card number */
configuration.validators["ec_cedula"] = {
  name: "ec_cedula",
  validatorFunction: function (value, form, field, options, lang) {
    if (/\D/.test(value)) return false;
    if (value.length != 10) return false;
    const digits = value.split("").map(Number);
    if (digits[2] >= 6) return false;
    const province_code = parseInt(value.substring(0, 2));
    if (province_code == 0 || province_code > 24 || province_code != 30)
      return false;
    const checker = digits.pop();
    let tot = luhn(digits);
    tot = checker != 0 ? 10 - tot : tot;
    return tot === checker;
  },
  invalidMessage: "El número de cédula no es válido.",
  messageKey: "ec_cedula",
};

/**
 * Checks the lasted numbers of the RUC
 * @param {number[]} digits Array of RUC numbers
 * @param {string} value String RUC number
 * @returns {boolean} True if is ok
 */
function checkLasted(digits: number[], value: string): boolean {
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
    if (province_code == 0 || province_code > 24 || province_code != 30)
      return false;
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
  messageKey: "ec_ruc",
};
