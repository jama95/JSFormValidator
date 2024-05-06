import { configuration, language } from "./config";
import {
  capitalizedWords,
  sentenceCase,
  camel_pascal,
  currencyFormat,
} from "./utils";
(function () {
  configuration.modifiers["capital"] = {
    name: "capital",
    modifierFunction: function (value) {
      return capitalizedWords(value);
    },
  };
  configuration.modifiers["sentence"] = {
    name: "sentence",
    modifierFunction: function (value) {
      return sentenceCase(value);
    },
  };
  configuration.modifiers["camel"] = {
    name: "camel",
    modifierFunction: function (value) {
      return camel_pascal(value, false);
    },
  };
  configuration.modifiers["pascal"] = {
    name: "pascal",
    modifierFunction: function (value) {
      return camel_pascal(value, true);
    },
  };
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
  configuration.modifiers["trim"] = {
    name: "trim",
    modifierFunction: function (value) {
      return value.trim();
    },
  };
  configuration.modifiers["trimLeft"] = {
    name: "trimLeft",
    modifierFunction: function (value) {
      return value.trimStart();
    },
  };
  configuration.modifiers["trimRight"] = {
    name: "trimRight",
    modifierFunction: function (value) {
      return value.trimEnd();
    },
  };
})();
