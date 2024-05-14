import { configuration, language } from "./config";
import {
  capitalizedWords,
  sentenceCase,
  camel_pascal,
  currencyFormat,
} from "./utils";

/* Converts the first letter of each word in the text to uppercase */
configuration.modifiers["capital"] = {
  name: "capital",
  modifierFunction: function (value) {
    return capitalizedWords(value);
  },
};

/* Converts the first letter of the text to uppercase */
configuration.modifiers["sentence"] = {
  name: "sentence",
  modifierFunction: function (value) {
    return sentenceCase(value);
  },
};

/* Converts the first letter of each word in the text to uppercase and removes all the spaces */
configuration.modifiers["camel"] = {
  name: "camel",
  modifierFunction: function (value) {
    return camel_pascal(value, false);
  },
};

/* Converts the first letter of each word(except for the first) in the text to uppercase and removes all the spaces */
configuration.modifiers["pascal"] = {
  name: "pascal",
  modifierFunction: function (value) {
    return camel_pascal(value, true);
  },
};

/* Convert a number to currency format */
configuration.modifiers["currency"] = {
  name: "currency",
  modifierFunction: function (value, input) {
    const d = input.getAttribute("data-fm-decimals");
    const locale = input.getAttribute("data-fm-locale") || undefined,
      currency = input.getAttribute("data-fm-currency") || undefined,
      decimals = d ? parseInt(d) : undefined;
    if (/[^\d.]/.test(value)) return value;
    return currencyFormat(value, language, locale, currency, decimals);
  },
};

/* Removes the leading and trailing white space and line terminator characters from a string */
configuration.modifiers["trim"] = {
  name: "trim",
  modifierFunction: function (value) {
    return value.trim();
  },
};

/* Removes the leading white space and line terminator characters from a string */
configuration.modifiers["trimLeft"] = {
  name: "trimLeft",
  modifierFunction: function (value) {
    return value.trimStart();
  },
};

/* Removes the trailing white space and line terminator characters from a string */
configuration.modifiers["trimRight"] = {
  name: "trimRight",
  modifierFunction: function (value) {
    return value.trimEnd();
  },
};
