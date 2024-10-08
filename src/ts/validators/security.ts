import { language, configuration, cardInfo } from "../config";
import { Lang } from "../types";
import { checkPasswordStrength, luhn } from "../utils";

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
  messageKey: "password",
};

/**
 * Set the invalid confirmation value message
 * @param {string} custom Custom value name
 * @param {Lang} lang Language
 * @returns {string} Confirmation message
 */
function setConfirmationMessage(custom: string, lang: Lang): string {
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
    const targetValue = document.querySelector<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >(target)?.value;
    if (targetValue !== value) {
      this.invalidMessage = setConfirmationMessage(custom, lang);
      return false;
    }
    return true;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "confirmation",
};

/* Checks if the field value has a valid credit/debit card number */
configuration.validators["credit_card"] = {
  name: "credit_card",
  validatorFunction: function (value, form, field, options, lang) {
    if (/\D/.test(value)) return false;
    let card = "unknown";
    let min = 16;
    let max = 19;
    const allowing = (
      field.getAttribute("data-fv-allowed_cards") ??
      Object.keys(cardInfo).join(",")
    ).split(/[,|-]+\s*|\s+/);
    allowing.filter((c) => Object.keys(cardInfo).includes(c.toUpperCase()));
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
  messageKey: "credit_card",
};

/* Checks if the field value has a valid CVV number */
configuration.validators["cvv"] = {
  name: "cvv",
  validatorFunction: function (value, form, field, options, lang) {
    if (/\D/.test(value)) return false;
    const target = field.getAttribute("data-fv-target") ?? "";
    if (target.trim() === "") return false;
    const creditCard = document
      .querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >(target)
      ?.getAttribute("data-fv-card");
    if (!creditCard) return false;
    if (creditCard !== "unknown") {
      return cardInfo[creditCard].cvv === value.length;
    } else {
      return value.length < 3 || value.length > 4;
    }
  },
  invalidMessage: language.inv_cvv,
  messageKey: "cvv",
};
