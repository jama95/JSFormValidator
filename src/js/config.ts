import type { Options, Configuration, Lang } from "./types";

export const options: Options = {
  ignoredFieldsNames: [],
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
  dateFormat: "YYYY-MM-DD",
  form: "form",
  parentField: "fv-group",
  fieldModifyAttribute: "data-modifyList",
  fieldValidateAttribute: "data-validateList",
  fieldInvalidMessageAttribute: "data-validate-invalidMessage",
  fieldValidMessageAttribute: "data-validate-validMessage",
  fieldHelpMessageAttribute: "data-validate-helpMessage",
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
  suggestionAttribute: "data-suggestions",
  lengthRestrictAttribute: "data-lengthRestrict",
  lengthRestrictInfo: "count",
  passwordSpecialChars: /[@%+\x5C/!#$^?:.(){}\x5B\x5D~_-]/,
  passwordInfoClass: "card",
};

export const language: Lang = {
  locale: "en-US",
  currencyCode: "USD",
  decimal: ",",
  validTitle: "Form submission successfully!",
  invalidTitle: "Form submission failed!",
  notConfirmed: "The field value could not be confirmed.",
  required: "This field is required.",
  invalidTime: "The field value is not a valid time.",
  invalidEmail: "The field value is not a valid e-mail address.",
  invalidTelephone: "The field value is not a valid phone number.",
  invalidDate: "The field value is not a valid date.",
  invalidDomain: "The field value is not a valid domain.",
  invalidUrl: "The field value is not a valid URL.",
  invalidNumber: "The field value is not a valid number.",
  invalidLength: "The field value must be between {min} and {max} characters.",
  lengthTooLong: "The field value is longer than {max}.",
  lengthTooShort: "The field value is shorter than {min}.",
  invalidCustomVal: "The field value is incorrect.",
  invalidNumberOfSelectedOptions:
    "You must choose at least {options} option{s}.",
  invalidAlphaNumeric: "The field value can only contain letters and numbers.",
  invalidAlphaNumericExtra: "Also can contain ",
  groupCheckedRangeStart: "Please choose between {max} and {min} option{s}.",
  groupCheckedTooFewStart: "Please choose at least {number} option{s}.",
  groupCheckedTooManyStart: "Please choose a maximum of {number} option{s}.",
  invalidFileSize: "The selected file size is too large (max %s).",
  invalidFileType: "Only files of type %s are allowed",
  invalidImageDim: "The image dimensions are incorrect.",
  imageTooTall: "The image can not be taller than {max}.",
  imageTooWide: "The image can not be wider than {max}.",
  imageTooSmall: "The image is too small.",
  imageRatioNotAccepted: "Image ratio is not be accepted",
  invalidCreditCard: "The credit card number is not correct.",
  invalidCVV: "The CVV number is not correct.",
  invalidSecurityAnswer: "The answer to the security question is incorrect.",
  invalidStrength: "The password is not strong enough",
  passwordConditionsTitle: "Password must contain:",
  passwordConditionUppercase: "Uppercase letter(s).",
  passwordConditionLowercase: "Lowercase letter(s).",
  passwordConditionSpecialChars: "Special character(s).",
  passwordConditionNumericChars: "Numeric character(s).",
  passwordConditionLength: "At least 8 characters.",
  passwordStrengthVeryWeak: "Very weak &#128552;",
  passwordStrengthWeak: "Weak &#128542;",
  passwordStrengthNormal: "Normal &#128528;",
  passwordStrengthStrong: "Strong &#128513;",
  passwordStrengthVeryStrong: "Very Strong &#128526;",
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
