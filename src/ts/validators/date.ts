import { language, configuration } from "../config";
import { checkDateFormat, checkTimeFormat } from "../utils";

let dateMessage = language.invalidDate;

/* Checks if the field value match with the specified date format */
configuration.validators["date"] = {
  name: "date",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-date_format") || lang.dateFormat;
    const check = checkDateFormat(value, format);
    if (check == "no") {
      dateMessage = lang.notConfirmed;
      return false;
    }
    if (check == "invalid") {
      dateMessage = lang.invalidDate;
      return false;
    }
    return true;
  },
  invalidMessage: dateMessage,
  invalidMessageKey: "inv_date",
  validMessageKey: "val_date",
};

let timeMessage = language.invalidTime;

/* Checks if the field value match with the specified time format   */
configuration.validators["time"] = {
  name: "time",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-time_format") || lang.timeFormat;
    const check = checkTimeFormat(value, format);
    if (check == "no") {
      timeMessage = lang.notConfirmed;
      return false;
    }
    if (check == "invalid") {
      timeMessage = lang.invalidTime;
      return false;
    }
    return true;
  },
  invalidMessage: timeMessage,
  invalidMessageKey: "inv_time",
  validMessageKey: "val_time",
};
