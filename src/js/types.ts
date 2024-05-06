export type FV = Options & Configuration;

export type Options = {
  /* Signature symbol */
  [key: string]: any;
  /** List of fields names that will not be validated @default []*/
  ignoredFieldsNames: string[];
  /** Valid inline message class @default 'valid-feedback' */
  validMessageClass: string;
  /** Invalid inline message class @default 'invalid-feedback' */
  invalidMessageClass: string;
  /** Valid field class @default 'is-valid' */
  validClass: string;
  /** Invalid field class @default 'is-invalid' */
  invalidClass: string;
  /** Valid class for parent's field @default 'Valid' */
  validParentClass: string;
  /** Invalid class for parent's field @default 'Invalid' */
  invalidParentClass: string;
  /** Inline message class @default 'fv-msg' */
  inlineMessageClass: string;
  /** Top message class @default 'alert' */
  topMessagesClass: string;
  /** Valid class for the top container messages @default 'alert-success' */
  validMessagesClass: string;
  /** Invalid class for the top container messages @default 'alert-danger' */
  invalidMessagesClass: string;
  /** Valid message position (Available positions: inline & top) @default 'inline' */
  validMessagesPosition: string;
  /** Invalid message position (Available positions: inline & top) @default 'inline' */
  invalidMessagesPosition: string;
  /** Top messages HTML template (values with {} are mandatory) @default '<div class="{topMessagesClass} {iv-MessageClass}"><h4>{title}</h4><ul>{fields&messagesList}</ul></div>' */
  topMessagesTemplate: string;
  /** Scrolls the page up to the top messages position on submit event @default false */
  scrollToTopOnInvalid: boolean;
  /** Adds a valid class on all fields even if they are not validated @default false */
  addValidClassOnAll: boolean;
  /** Validates hidden type fields @default false */
  validateHiddenFields: boolean;
  /** Function triggered when valid messages are shown @default undefined */
  validMessageCallback: MessageCallback | undefined;
  /** Function triggered when invalid messages are shown @default undefined */
  invalidMessageCallback: MessageCallback | undefined;
  /** List of forms selectors (comma separated) @default 'form' */
  form: string;
  /** Parent selector for all form fields @default 'fv-group' */
  parentField: string;
  /** Data attribute of the field to list modifiers @default 'data-modifyList' */
  fieldModifyAttribute: string;
  /** Data attribute of the field to list validators @default 'data-validateList' */
  fieldValidateAttribute: string;
  /** Data attribute of the field to overwrite invalid messages @default 'data-validate-invalidMessage' */
  fieldInvalidMessageAttribute: string;
  /** Data attribute of the field to overwrite valid messages @default 'data-validate-validMessage' */
  fieldValidMessageAttribute: string;
  /** Data attribute of the field to show help messages @default 'data-validate-helpMessage' */
  fieldHelpMessageAttribute: string;
  /** Triggers validations on field's input event @default false */
  validateOnInput: boolean;
  /** Triggers validation on field's blur event @default true */
  validateOnBlur: boolean;
  /** Triggers validation when click a checkbox or radio button @default true */
  validateCheckboxRadioOnClick: boolean;
  /** Shows help messages on fields's focus event @default true */
  showHelpMessagesOnFocus: boolean;
  /** Shows input's suggestion @default true */
  addSuggestions: boolean;
  /** Datalist style options */
  suggestionConfig: Suggestion;
  /** Data attribute of the input to list the words to be suggested @default 'data-suggestions'*/
  suggestionAttribute: string;
  /** Data attribute of the textArea to set the max number of characters allowed @default 'data-lengthRestrict' */
  lengthRestrictAttribute: string;
  /** Length restriction info to show (Available options: both, count, remaining) @default 'count' @example count: 100/5000 ; remaining: 4900/5000 ; both: 100(4900)/5000*/
  lengthRestrictInfo: string;
  /** Regex for admitted password special characters @default /(\x21\x40\x23\x24\x25\x5E\x26\x2A\x5F\x2D\x2B\x3D)/ */
  passwordSpecialChars: RegExp;
  /** Password info container additional class @default card */
  passwordInfoClass: string;
};

export type Configuration = {
  /** Validators list @default {} */
  validators: { [key: string]: Validator };
  /** Modifiers list @default {} */
  modifiers: { [key: string]: Modifier };
  /** Stops all the validations @default false */
  stopValidation: boolean;
  /** Event triggered when a field is going to be validated */
  onBeforeValidate: ValidatorEvent | undefined;
  /** Event triggered when a field is valid   @default undefined */
  onValid: ValidatorEvent | undefined;
  /** Event triggered when a field is invalid @default undefined */
  onInvalid: ValidatorEvent | undefined;
  /** Event triggered when a field has been validated @default undefined */
  onAfterValidate: ValidatorEvent | undefined;
  /** Top messages when valid */
  validMessages: { [key: string]: string };
  /** Top messages when invalid */
  invalidMessages: { [key: string]: string };
  /** Messages language */
  language: Lang;
};

export type Lang = {
  /* Signature symbol */
  [key: string]: string;
  /** Language and region code (for more information see "BCP 47 standard language tags") */
  locale: string;
  /** Currency code (for more information see "ISO 4217 standard") */
  currencyCode: string;
  /** Default date format */
  dateFormat: string;
  /** Default time format */
  timeFormat: string;
  /** Valid top messages title */
  validTitle: string;
  /** Invalid top messages title */
  invalidTitle: string;
  /** Value not confirmed */
  notConfirmed: string;
  /** Required field message */
  required: string;
  /** Invalid date message */
  invalidDate: string;
  /** Invalid time message */
  invalidTime: string;
  /** Invalid telephone number message */
  invalidTelephone: string;
  /** Invalid IPv4 address */
  invalidIPv4: string;
  /** Invalid IPv6 address */
  invalidIPv6: string;
  /** Invalid domain message */
  invalidDomain: string;
  /** Invalid email message */
  invalidEmail: string;
  /** Invalid url message */
  invalidUrl: string;
  /** Invalid number type message */
  invalidNumber: string;
  /** Invalid number, max value exceeded message */
  invalidNumberMax: string;
  /** Invalid number, min value exceeded message */
  invalidNumberMin: string;
  /** Invalid number, out of range message */
  invalidNumberRange: string;
  /** Invalid number, not equal message */
  invalidNumberEqual: string;
  /** Invalid number, out of step message */
  invalidNumberStep: string;
  /** Invalid length, too long value message (text|files|options) */
  invalidLengthMax: string;
  /** Invalid length, too short value message (text|files|options) */
  invalidLengthMin: string;
  /** Invalid length, too long or too short value message (text|files|options) */
  invalidLengthRange: string;
  /** Invalid length, not equal value message (text|files|options) */
  invalidLengthEqual: string;
  /** Invalid letters and/or allowed values message */
  invalidLetters: string;
  /** Invalid custom value message */
  invalidCustomVal: string;
  /** Invalid alphanumeric value message */
  invalidAlphaNumeric: string;
  /** Invalid color */
  invalidColor: string;
  /** Invalid file size message */
  invalidFileSize: string;
  /** Invalid file type message */
  invalidFileType: string;
  /** Invalid file extension message */
  invalidFileExtension: string;
  /** Invalid image dimensions message */
  invalidImageDim: string;
  /** Invalid image height message */
  imageTooTall: string;
  /** Invalid image width message */
  imageTooWide: string;
  /** Invalid image ratio message */
  imageRatioNotAccepted: string;
  /** Invalid credit card number message*/
  invalidCreditCard: string;
  /** Invalid credit card cvv number message */
  invalidCVV: string;
  /** Invalid  security answer message */
  invalidSecurityAnswer: string;
  /** Insecure password message */
  invalidStrength: string;
  /** Title for secure password conditions */
  passwordConditionsTitle: string;
  /** Password requires upper case letters */
  passwordConditionUppercase: string;
  /** Password requires lower case letters */
  passwordConditionLowercase: string;
  /** Password requires special characters */
  passwordConditionSpecialChars: string;
  /** Password requires numbers */
  passwordConditionNumericChars: string;
  /** Password requires min  and max length */
  passwordConditionLength: string;
  /** Password strength very weak */
  passwordStrengthVeryWeak: string;
  /** Password strength weak */
  passwordStrengthWeak: string;
  /** Password strength normal */
  passwordStrengthNormal: string;
  /** Password strength strong  */
  passwordStrengthStrong: string;
  /** Password strength very strong  */
  passwordStrengthVeryStrong: string;
};

export type Validator = {
  /** Validator name */
  name: string;
  /** Validator function @returns {boolean} Returns true if the field pass the validation*/
  validatorFunction: (
    /** Field value */
    value: string,
    /** Form element (parent of the field) */
    form: HTMLFormElement,
    /** Field element (Input, Select or TextArea) */
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    /** Validator options */
    options: Options,
    /** Validator language */
    lang: Lang
  ) => boolean;
  /** Message on invalid validation */
  invalidMessage: string;
  /** Invalid message attribute key */
  invalidMessageKey: string;
  /** Message on valid validation */
  validMessage?: string;
  /** Valid message attribute key */
  validMessageKey?: string;
  /** Indicates whether validation is triggered on each Input event */
  validateOnInput?: boolean;
};

export type Modifier = {
  /** Modifier name */
  name: string;
  /** Modifier function @returns {string} Returns the modified field value */
  modifierFunction: (
    /** Field value */
    value: string,
    /** Parent form */
    form: HTMLFormElement,
    /** Field element (Input, Select or TextArea) */
    field: HTMLInputElement | HTMLTextAreaElement,
    /** Validator options */
    options: Options,
    /** Validator language */
    lang: Lang
  ) => string;
};

export type MessageCallback = (
  /** Parent form */
  form: HTMLFormElement,
  /** Field element (Input, Select or TextArea) */
  field: HTMLInputElement | HTMLTextAreaElement,
  /** Validation message */
  message: string,
  /** FormValidator options */
  options: Options
) => void;

export type ValidatorEvent = (
  /** Parent form */
  form: HTMLFormElement,
  /** Field element (Input, Select or TextArea) */
  field: HTMLInputElement | HTMLTextAreaElement,
  /** Validation state (false: invalid, true: valid) */
  state: boolean,
  /** Form Validator options */
  options: Options
) => void;

export type Suggestion = {
  /** Maximum height of Datalist element @default '150px' */
  maxHeight: string;
  /** Custom class for Datalist element @default 'fv-suggestion_container' */
  containerClass: string;
  /** Custom class for the options of the Datalist element @default 'fv-suggestion_option' */
  optionClass: string;
};
