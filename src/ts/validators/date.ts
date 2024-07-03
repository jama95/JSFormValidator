import { language, configuration } from "../config";
import { checkDateFormat, checkTimeFormat } from "../utils";

/* Checks if the field value match with the specified date format */
configuration.validators["date"] = {
  name: "date",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-date_format") ?? lang.dateFormat;
    const check = checkDateFormat(value, format);
    if (check == "no") {
      this.invalidMessage = lang.notConfirmed;
      return false;
    }
    if (check == "invalid") {
      this.invalidMessage = lang.inv_date;
      return false;
    }
    return true;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "date",
};

/* Checks if the field value match with the specified time format   */
configuration.validators["time"] = {
  name: "time",
  validatorFunction: function (value, form, field, options, lang) {
    const format = field.getAttribute("data-fv-time_format") ?? lang.timeFormat;
    const check = checkTimeFormat(value, format);
    if (check == "no") {
      this.invalidMessage = lang.notConfirmed;
      return false;
    }
    if (check == "invalid") {
      this.invalidMessage = lang.inv_time;
      return false;
    }
    return true;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "time",
};
