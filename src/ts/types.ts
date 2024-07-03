export type Options = {
  /* Signature symbol */
  [key: string]: unknown;
  /** List of fields names that will not be validated @default []*/
  ignoredFieldsNames: string[] | string;
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
  /** Top messages HTML template (values with {} are mandatory) @default '<div class="{topMessagesClass} {iv-MessageClass}" target="#{formID}" data-fv-top-{vi}><h4>{title}</h4><ul>{fields&messagesList}</ul></div>' */
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
  /** Data attribute of the field to list modifiers @default 'data-fv-modifiers' */
  fieldModifyAttribute: string;
  /** Data attribute of the field to list validators @default 'data-fv-validators' */
  fieldValidateAttribute: string;
  /** Data attribute of the field to overwrite invalid messages @default 'data-fv-invalid-msg' */
  fieldInvalidMessageAttribute: string;
  /** Data attribute of the field to overwrite valid messages @default 'data-fv-valid-msg' */
  fieldValidMessageAttribute: string;
  /** Data attribute of the field to show help messages @default 'data-fv-help-msg' */
  fieldHelpMessageAttribute: string;
  /** Triggers modifiers on field's input event @default true */
  modifyOnInput: boolean;
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
  /** Data attribute of the input to list the words to be suggested @default 'data-fv-suggestions'*/
  suggestionAttribute: string;
  /** Data attribute of the textArea to set the max number of characters allowed @default 'data-fv-text-length' */
  lengthRestrictAttribute: string;
  /** Length restriction info to show (Available options: both, count, remaining) @default 'count' @example count: 100/5000 ; remaining: 4900/5000 ; both: 100(4900)/5000*/
  lengthRestrictInfo: string;
  /** Regex for admitted password special characters @default /[\x21\x40\x23\x24\x25\x5E\x26\x2A\x5F\x2D\x2B\x3D]/ */
  passwordSpecialChars: RegExp;
  /** Shows password info on inputs type password @default true */
  addPasswordInfo: boolean;
  /** Password info container additional class @default card */
  passwordInfoClass: string;
};

export type Configuration = {
  /** Validators list @default {} */
  validators: { [key: string]: Validator };
  /** Async Validators list @default {} */
  asyncValidators: { [key: string]: AsyncValidator };
  /** Modifiers list @default {} */
  modifiers: { [key: string]: Modifier };
  /** Stops all the validations @default false */
  stopValidation: boolean;
  /** Event triggered when a field is going to be validated @default {} */
  onBeforeValidate: { [field: string]: ValidatorEvent[] };
  /** Event triggered when a field is valid   @default {} */
  onValid: { [field: string]: ValidatorEvent[] };
  /** Event triggered when a field is invalid @default {} */
  onInvalid: { [field: string]: ValidatorEvent[] };
  /** Event triggered when a field has been validated @default {} */
  onAfterValidate: { [field: string]: ValidatorEvent[] };
  /** Top messages when valid @default {} */
  validMessages: { [key: string]: { [key: string]: string } };
  /** Top messages when invalid @default {} */
  invalidMessages: { [key: string]: { [key: string]: string } };
  /** Messages language @default en */
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
  inv_required: string;
  /** Invalid date message */
  inv_date: string;
  /** Invalid time message */
  inv_time: string;
  /** Invalid telephone number message */
  inv_telephone: string;
  /** Invalid IPv4 address */
  inv_ipv4: string;
  /** Invalid IPv6 address */
  inv_ipv6: string;
  /** Invalid domain message */
  inv_domain: string;
  /** Invalid email message */
  inv_email: string;
  /** Invalid url message */
  inv_url: string;
  /** Invalid number type message */
  inv_numbers: string;
  /** Invalid number, max value exceeded message */
  inv_numberMax: string;
  /** Invalid number, min value exceeded message */
  inv_numberMin: string;
  /** Invalid number, out of range message */
  inv_numberRange: string;
  /** Invalid number, not equal message */
  inv_numberEqual: string;
  /** Invalid number, out of step message */
  inv_numberStep: string;
  /** Invalid length, too long value message (text|files|options) */
  inv_lengthMax: string;
  /** Invalid length, too short value message (text|files|options) */
  inv_lengthMin: string;
  /** Invalid length, too long or too short value message (text|files|options) */
  inv_lengthRange: string;
  /** Invalid length, not equal value message (text|files|options) */
  inv_lengthEqual: string;
  /** Invalid letters and/or allowed values message */
  inv_letters: string;
  /** Invalid custom value message */
  inv_regexp: string;
  /** Invalid alphanumeric value message */
  inv_alphanumeric: string;
  /** Invalid color */
  inv_color: string;
  /** Invalid file size message */
  inv_file_size: string;
  /** Invalid file type message */
  inv_file_type: string;
  /** Invalid file extension message */
  inv_file_extension: string;
  /** Invalid image dimensions message */
  inv_image_dimension: string;
  /** Invalid image height message */
  inv_image_heigh: string;
  /** Invalid image width message */
  inv_image_width: string;
  /** Invalid image ratio message */
  inv_image_ratio: string;
  /** Invalid credit card number message*/
  inv_credit_card: string;
  /** Invalid credit card cvv number message */
  inv_cvv: string;
  /** Invalid confirmation value message */
  inv_confirmation: string;
  /** Invalid  security answer message */
  inv_security_answer: string;
  /** Insecure password message */
  inv_strength: string;
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

export type ValidationField =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

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
    field: ValidationField,
    /** Validator options */
    options: Options,
    /** Validator language */
    lang: Lang
  ) => boolean;
  /** Message on invalid validation */
  invalidMessage: string;
  /** Message attribute key */
  messageKey?: string;
  /** Message on valid validation */
  validMessage?: string;
  /** Indicates whether validation is triggered on each Input event (default: false) */
  validateOnInput?: boolean;
};

export type AsyncValidator = {
  /** Validator name */
  name: string;
  /** Validator async function @returns {Promise<boolean>} Returns true promise if the field pass the validation*/
  validatorFunction: (
    /** Field value */
    value: string,
    /** Form element (parent of the field) */
    form: HTMLFormElement,
    /** Field element (Input, Select or TextArea) */
    field: ValidationField,
    /** Validator options */
    options: Options,
    /** Validator language */
    lang: Lang
  ) => Promise<boolean>;
  /** Message on invalid validation */
  invalidMessage: string;
  /** Message attribute key */
  messageKey?: string;
  /** Message on valid validation */
  validMessage?: string;
  /** Indicates whether validation is triggered on each Input event (default: false) */
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
    /** Field element (Input or TextArea) */
    field: HTMLInputElement | HTMLTextAreaElement,
    /** Validator options */
    options: Options,
    /** Validator language */
    lang: Lang
  ) => string;
  /** Indicates whether modifier is triggered on each Input event (default: false) */
  modifyOnInput?: boolean;
};

export type MessageCallback = (
  /** Parent form */
  form: HTMLFormElement,
  /** Field element (Input, Select or TextArea) */
  field: ValidationField,
  /** Validation message */
  message: string,
  /** FormValidator options */
  options: Options
) => void;

export type ValidatorEvent = (
  /** Parent form */
  form: HTMLFormElement,
  /** Field element (Input, Select or TextArea) */
  field: ValidationField,
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

export type TelephoneFormats = {
  [key: string]: RegExp[];
};

export type CardInfo = {
  [key: string]: {
    /** Fixed first numbers */
    first: number[];
    /** Number length */
    length: { min: number; max: number };
    /** CVV length */
    cvv: number;
  };
};

export type Country = {
  country: string;
  capital: string;
};

export type JSONConfig = {
  /** Form selector */
  [key: string]: {
    /** Field selector */
    [key: string]: {
      /** Validators list */
      validators?: string;
      /** Modifiers list */
      modifiers?: string;
      /** optional data attributes (data-fv-)  */
      dataFV?: {
        [key: string]: string;
      };
    };
  };
};
