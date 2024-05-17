import type {
  Options,
  Configuration,
  Lang,
  TelephoneFormats,
  CardInfo,
} from "./types";

export const options: Options = {
  ignoredFieldsNames: "",
  validMessageClass: "valid-feedback",
  invalidMessageClass: "invalid-feedback",
  validClass: "is-valid",
  invalidClass: "is-invalid",
  validParentClass: "Valid",
  invalidParentClass: "Invalid",
  inlineMessageClass: "fv-msg",
  topMessagesClass: "alert",
  validMessagesClass: "alert-success",
  invalidMessagesClass: "alert-danger",
  validMessagesPosition: "inline",
  invalidMessagesPosition: "inline",
  topMessagesTemplate: `<div class="fv-top-messages {topMessagesClass} {valid_invalid}"><h4>{title}</h4><ul>{fields&messagesList}</ul></div>`,
  scrollToTopOnInvalid: false,
  addValidClassOnAll: false,
  validateHiddenFields: false,
  validMessageCallback: undefined,
  invalidMessageCallback: undefined,
  form: "form",
  parentField: "fv-group",
  fieldModifyAttribute: "data-fv-modifiers",
  fieldValidateAttribute: "data-fv-validators",
  fieldInvalidMessageAttribute: "data-fv-invalid-msg",
  fieldValidMessageAttribute: "data-fv-valid-msg",
  fieldHelpMessageAttribute: "data-fv-help-msg",
  validateOnInput: false,
  validateOnBlur: true,
  validateCheckboxRadioOnClick: true,
  showHelpMessagesOnFocus: true,
  addSuggestions: true,
  suggestionConfig: {
    maxHeight: "150px",
    containerClass: "fv-suggestion_container",
    optionClass: "fv-suggestion_option",
  },
  suggestionAttribute: "data-fv-suggestions",
  lengthRestrictAttribute: "data-fv-text-length",
  lengthRestrictInfo: "count",
  passwordSpecialChars: /(\x21\x40\x23\x24\x25\x5E\x26\x2A\x5F\x2D\x2B\x3D)/,
  passwordInfoClass: "card",
};

export const language: Lang = {
  locale: "en-US",
  currencyCode: "USD",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm:ss",
  validTitle: "Valid form!",
  invalidTitle: "Invalid form!",
  notConfirmed: "Could not be validated.",
  inv_required: "Is required.",
  inv_date: "Is not a valid date.",
  inv_time: "Is not a valid time.",
  inv_telephone: "Is not a valid phone number.",
  inv_ipv4: "Is not a valid IPv4 address.",
  inv_ipv6: "Is not a valid IPv6 address.",
  inv_domain: "Is not a valid domain.",
  inv_email: "Is not a valid e-mail address.",
  inv_url: "Is not a valid URL.",
  inv_numbers: "Is not a valid number.",
  inv_numberMax: "Must be less than or equal to {max}.",
  inv_numberMin: "Must be greater than or equal to {mix}.",
  inv_numberRange: "Must match the range {range}.",
  inv_numberEqual: "Must be equal to {equal}.",
  inv_numberStep: "Must increase by {step}.",
  inv_lengthMax:
    "Must 1[have]1|2[choose]2 a maximum of {max} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
  inv_lengthMin:
    "Must 1[have]1|2[choose]2 a minimum of {min} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
  inv_lengthRange:
    "Must 1[have]1|2[choose]2 between {min} and {max} 3[characters]3|4[files]4|5[options]5.",
  inv_lengthEqual:
    "Must 1[have]1|2[choose]2 {equal} 3[character(s)]3|4[file(s)]4|5[option(s)]5.",
  inv_letters: "Can oly contain letters.[ Also can contain {extra}]",
  inv_regexp: "Is not a valid value.",
  inv_alphanumeric:
    "Can only contain letters and numbers.[ Also can contain {extra}]",
  inv_color: "Is not a valid color format.",
  inv_file_size: "File(s) size is too large (max: {max}).",
  inv_file_type: "File(S) type must be: {type}.",
  inv_file_extension: "File(s) extension must be: {extension}.",
  inv_image_dimension: "Image(s) dimensions are not valid.",
  inv_image_heigh: "Image(S) heigh must not exceed: {max}px.",
  inv_image_width: "Image(s) width must not exceed: {max}px.",
  inv_image_ratio: "Image aspect ratio is not valid.",
  inv_credit_card: "Credit card number is not valid.",
  inv_cvv: "CVV number is not valid.",
  inv_confirmation: "The [values] do not match.",
  inv_security_answer: "Security question answer is not valid.",
  inv_strength: "Password is not strong enough.",
  passwordConditionsTitle: "Password must contain:",
  passwordConditionUppercase: "Uppercase letter(s).",
  passwordConditionLowercase: "Lowercase letter(s).",
  passwordConditionSpecialChars: "Special character(s).",
  passwordConditionNumericChars: "Numeric character(s).",
  passwordConditionLength: "At least 8 characters.",
  passwordStrengthVeryWeak: "Very weak &#x1F628;",
  passwordStrengthWeak: "Weak &#x1F61E;",
  passwordStrengthNormal: "Normal &#x1F610;",
  passwordStrengthStrong: "Strong &#x1F601;",
  passwordStrengthVeryStrong: "Very Strong &#x1F60E;",
};

export const configuration: Configuration = {
  validators: {},
  modifiers: {},
  stopValidation: false,
  onBeforeValidate: undefined,
  onValid: undefined,
  onInvalid: undefined,
  onAfterValidate: undefined,
  validMessages: {},
  invalidMessages: {},
  language: language,
};

export const telephoneFormats: TelephoneFormats = {
  EC: [
    /^(?:0|\x2B593\s)(?:(?:[2-7]\s)?|(?:\d{2}(?:\s|-)?))\d{3}(?:\s|-)?\d{4}$/,
  ],
};

export const cardInfo: CardInfo = {
  AMEX: { first: [3], length: { min: 15, max: 15 }, cvv: 4 },
  VISA: { first: [4], length: { min: 16, max: 16 }, cvv: 3 },
  MASTERCARD: { first: [5], length: { min: 16, max: 16 }, cvv: 3 },
  DISCOVER: { first: [6], length: { min: 16, max: 16 }, cvv: 3 },
};
