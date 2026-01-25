import { configuration, language } from "./config";
import {
  capitalizedWords,
  sentenceCase,
  camel_pascal,
  currencyFormat,
} from "./utils";

/* Converts the text to lowercase */
configuration.modifiers["lower"] = {
  name: "lower",
  modifierFunction: function (value) {
    return value.toLowerCase();
  },
};

/* Converts the text to uppercase */
configuration.modifiers["upper"] = {
  name: "upper",
  modifierFunction: function (value) {
    return value.toUpperCase();
  },
};

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
  modifyOnInput: false,
};

/* Converts the first letter of each word(except for the first) in the text to uppercase and removes all the spaces */
configuration.modifiers["pascal"] = {
  name: "pascal",
  modifierFunction: function (value) {
    return camel_pascal(value, true);
  },
  modifyOnInput: false,
};

/* Convert a number to currency format */
configuration.modifiers["currency"] = {
  name: "currency",
  modifierFunction: function (value, form, input) {
    const d = input.dataset.fvDecimals;
    const locale = input.dataset.fvLocale ?? undefined,
      currency = input.dataset.fvCurrency ?? undefined,
      decimals = d ? Number.parseInt(d) : undefined;
    if (!Object.hasOwn(input.dataset, "fvCurrency_original")) {
      input.dataset.fvCurrency_original = value;
    }
    input.addEventListener("focus", () => {
      input.value = input.dataset.fvCurrency_original ?? value;
    });
    input.addEventListener("input", () => {
      input.dataset.fvCurrency_original = input.value;
    });
    value = input.dataset.fvCurrency_original as string;
    if (/[^\d.]/.test(value)) return value;
    return currencyFormat(value, language, locale, currency, decimals);
  },
  modifyOnInput: false,
};

/* Removes the leading and trailing white space and line terminator characters from a string */
configuration.modifiers["trim"] = {
  name: "trim",
  modifierFunction: function (value) {
    return value.trim();
  },
  modifyOnInput: false,
};

/* Removes the leading white space and line terminator characters from a string */
configuration.modifiers["trim_left"] = {
  name: "trim_left",
  modifierFunction: function (value) {
    return value.trimStart();
  },
  modifyOnInput: false,
};

/* Removes the trailing white space and line terminator characters from a string */
configuration.modifiers["trim_right"] = {
  name: "trim_right",
  modifierFunction: function (value) {
    return value.trimEnd();
  },
  modifyOnInput: false,
};
