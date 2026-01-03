declare module "types" {
    export type Options = {
        [key: string]: unknown;
        /** List of fields names that will not be validated @default []*/
        ignoredFieldsNames: string[] | string;
        /** Valid class for the inline messages @default 'valid-feedback' */
        validMessageClass: string;
        /** Invalid class for the inline messages @default 'invalid-feedback' */
        invalidMessageClass: string;
        /** Valid class for the field @default 'is-valid' */
        validClass: string;
        /** Invalid class for the field @default 'is-invalid' */
        invalidClass: string;
        /** Valid class for the label of the field @default 'text-success' */
        validLabelClass: string;
        /** Invalid class for the label of the field @default 'text-danger' */
        invalidLabelClass: string;
        /** Class for the inline messages @default 'fv-msg' */
        inlineMessageClass: string;
        /** Class for the top messages @default 'alert' */
        topMessagesClass: string;
        /** Valid class for the top messages @default 'alert-success' */
        validMessagesClass: string;
        /** Invalid class for the top messages @default 'alert-danger' */
        invalidMessagesClass: string;
        /** Position for the valid messages (Available positions: inline & top) @default 'inline' */
        validMessagesPosition: string;
        /** Position for the invalid messages (Available positions: inline & top) @default 'inline' */
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
        /** List of forms selectors @default 'form' */
        form: string;
        /** Parent selector for all form fields @default '.fv-group' */
        parentField: string;
        /** Attribute of the field to list modifiers @default 'data-fv-modifiers' */
        fieldModifyAttribute: string;
        /** Attribute of the field to list validators @default 'data-fv-validators' */
        fieldValidateAttribute: string;
        /** Attribute of the field to overwrite invalid messages @default 'data-fv-invalid-msg' */
        fieldInvalidMessageAttribute: string;
        /** Attribute of the field to overwrite valid messages @default 'data-fv-valid-msg' */
        fieldValidMessageAttribute: string;
        /** Attribute of the field to set help messages @default 'data-fv-help-msg' */
        fieldHelpMessageAttribute: string;
        /** Triggers modifiers on field input event @default true */
        modifyOnInput: boolean;
        /** Triggers validations on field input event @default false */
        validateOnInput: boolean;
        /** Triggers validation on field blur event @default true */
        validateOnBlur: boolean;
        /** Triggers validation on checkbox or radio button click event @default true */
        validateCheckboxRadioOnClick: boolean;
        /** Shows help messages on field focus event @default true */
        showHelpMessagesOnFocus: boolean;
        /** Shows the suggestions of the input @default true */
        addSuggestions: boolean;
        /** Style options of the datalist */
        suggestionConfig: Suggestion;
        /** Attribute of the input to list the words to be suggested @default 'data-fv-suggestions'*/
        suggestionAttribute: string;
        /** Attribute of the textArea to set the max number of characters allowed @default 'data-fv-text-length' */
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
        validators: {
            [key: string]: Validator;
        };
        /** Async Validators list @default {} */
        asyncValidators: {
            [key: string]: AsyncValidator;
        };
        /** Modifiers list @default {} */
        modifiers: {
            [key: string]: Modifier;
        };
        /** Stops all the validations @default false */
        stopValidation: boolean;
        /** Event triggered when a field is going to be validated @default {} */
        onBeforeValidate: {
            [field: string]: ValidatorEvent[];
        };
        /** Event triggered when a field is valid   @default {} */
        onValid: {
            [field: string]: ValidatorEvent[];
        };
        /** Event triggered when a field is invalid @default {} */
        onInvalid: {
            [field: string]: ValidatorEvent[];
        };
        /** Event triggered when a field has been validated @default {} */
        onAfterValidate: {
            [field: string]: ValidatorEvent[];
        };
        /** Top messages when valid @default {} */
        validMessages: {
            [key: string]: {
                [key: string]: string;
            };
        };
        /** Top messages when invalid @default {} */
        invalidMessages: {
            [key: string]: {
                [key: string]: string;
            };
        };
        /** Messages language @default en */
        language: Lang;
    };
    export type Lang = {
        [key: string]: string;
        /** Language and region code (for more information see "BCP 47 language tags") */
        locale: string;
        /** Currency code (for more information see "ISO 4217 standard") */
        currencyCode: string;
        /** Default date format */
        dateFormat: string;
        /** Default time format */
        timeFormat: string;
        /** Title for top valid messages */
        validTitle: string;
        /** Title for top invalid messages */
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
        /** Invalid number message */
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
        /** Password requires min and max length */
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
    export type ValidationField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    export type Validator = {
        /** Validator name */
        name: string;
        /** Validator function @returns {boolean} Returns true if the field pass the validation*/
        validatorFunction: (
        /** Field value */
        value: string, 
        /** Form element (parent of the field) */
        form: HTMLFormElement, 
        /** Field element */
        field: ValidationField, 
        /** Validator options */
        options: Options, 
        /** Validator language */
        lang: Lang) => boolean;
        /** Default message on invalid validation */
        invalidMessage: string;
        /** Message attribute key to set custom messages */
        messageKey?: string;
        /** Default message on valid validation */
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
        /** Field element */
        field: ValidationField, 
        /** Validator options */
        options: Options, 
        /** Validator language */
        lang: Lang) => Promise<boolean>;
        /** Default message on invalid validation */
        invalidMessage: string;
        /** Message attribute key to set custom messages */
        messageKey?: string;
        /** Default message on valid validation */
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
        /** Field element */
        field: HTMLInputElement | HTMLTextAreaElement, 
        /** Validator options */
        options: Options, 
        /** Validator language */
        lang: Lang) => string;
        /** Indicates whether modifier is triggered on each Input event (default: false) */
        modifyOnInput?: boolean;
    };
    export type MessageCallback = (
    /** Parent form */
    form: HTMLFormElement, 
    /** Field element */
    field: ValidationField, 
    /** Validation message */
    message: string, 
    /** FormValidator options */
    options: Options) => void;
    export type ValidatorEvent = (
    /** Parent form */
    form: HTMLFormElement, 
    /** Field element */
    field: ValidationField, 
    /** Validation state (false: invalid, true: valid) */
    state: boolean, 
    /** Form Validator options */
    options: Options) => void;
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
            /** First fixed numbers of the credit card */
            first: number[];
            /** Credit card number length */
            length: {
                /** Credit card number min length */
                min: number;
                /** Credit card number max length */
                max: number;
            };
            /** Credit card CVV code length */
            cvv: number;
        };
    };
    export type iso3166 = {
        /** ISO 3166 Country/Territory name */
        CTname: string;
        /** Capital name */
        Capital: string;
        /** Continent name */
        Continent: string;
        /** ONU affiliation */
        ONU: string;
        /** ISO 3166-1 alpha 2 tag */
        "3166-1a2": string;
        /** ISO 3166-2 alpha3 tag */
        "3166-2a3": string;
        /** ISO 3166-3 tag */
        "3166-3": string;
        /** Unicode flag code as HTML entity */
        Flag: string;
        /** ISO 4217 currency name */
        Currency: string;
        /** ISO 4217 currency tag */
        ISO4217: string;
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
                /** optional attributes (data-fv-)  */
                dataFV?: {
                    [key: string]: string;
                };
            };
        };
    };
}
declare module "config" {
    import type { Options, Configuration, Lang, TelephoneFormats, CardInfo } from "types";
    export const options: Options;
    export const language: Lang;
    export const configuration: Configuration;
    export const telephoneFormats: TelephoneFormats;
    export const cardInfo: CardInfo;
}
declare module "utils" {
    import type { Lang, Options, ValidationField } from "types";
    /**
     * Checks if the date matches the date format.
    
     * ** Only supports date with number format.
     * @param {string} date Date
     * @param {string} format Number date format: (DD) for day, (MM) for month, (YYYY) for year
     * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
     */
    export function checkDateFormat(date: string, format: string): string;
    /**
     * Checks if the time matches the time format.
     * A valid format could be: HH:mm:ss.sssA HH:mm:ssA HH:mmA
     * @param {string} time Time
     * @param {string} format Time format: (HH) for Hours, (mm) for minutes, (ss) for seconds, (sss) for milliseconds, (A) for AM/PM
     * @returns {string} Returns invalid, ok if is valid or no if the format is incorrect
     */
    export function checkTimeFormat(time: string, format: string): string;
    /**
     * Check if the number match the range or the step
     * @param {string[]} allow Allowed numbers options
     * @param {number} value Number to check
     * @param {string} rangeVal The range
     * @param {string} stepVal The step
     * @returns {string[][]} The response of range and step check
     */
    export function checkRangeStep(allow: string[], value: number, rangeVal: string, stepVal: string): string[][];
    /**
     * Checks if the string length matches with a specific range
     * @param {number} value Length to check
     * @param {string} range Accepted range
     * @returns {string} Returns ok or the unfulfilled range
     */
    export function checkStringLength(value: number, range: string): string[];
    /**
     * Convert a number to currency format
     * @param {string} value Number to convert
     * @param {Lang} lang Form Validator language
     * @param {?(string|string[])} [locale] List of language and region codes (for more information see "BCP 47 language tags")
     * @param {?string} [currency] Currency code (for more information se "ISO 4217 standard")
     * @param {?number} [decimals] Number of fixed decimal numbers to be displayed
     * @returns {string} Converted number
     */
    export function currencyFormat(value: string, lang: Lang, locale?: string | string[], currency?: string, decimals?: number): string;
    /**
     * Converts the first letter of the text to uppercase
     * @param {string} str Text to convert
     * @returns {string} Converted text
     */
    export function sentenceCase(str: string): string;
    /**
     * Converts the first letter of each word in the text to uppercase
     * @param {string} str Text to convert
     * @returns {string} Converted text
     */
    export function capitalizedWords(str: string): string;
    /**
     * Converts the text in camelCase or pascalCase
     * @param {string} str Text to convert
     * @param {boolean} p Indicates whether the text will be converted to pascalCase (true) or camelCase (false)
     * @returns {string} Converted text
     */
    export function camel_pascal(str: string, p: boolean): string;
    /**
     * Returns the not accepted fields
     * @param {boolean} acceptHidden Whether or not to accept hidden fields
     * @param {boolean} acceptIgnored Whether or not to accept ignored fields
     * @returns {string} List of non accepted fields selector
     */
    export function notAccept(acceptHidden: boolean, acceptIgnored: boolean): string;
    /**
     * Trigger the callbacks when a message is showed
     * @param {boolean} isValid Validation state
     * @param {Options} options Validation options
     * @param {ValidationField} field The validated field
     * @param {string} message The validation message
     */
    export function triggerMessageCallback(isValid: boolean, options: Options, form: HTMLFormElement, field: ValidationField, message: string): void;
    /**
     * Escapes all characters that may have conflicts in a regex
     * @param {string} str String to escape
     * @returns {string} Scaped string
     */
    export function escapeRegExp(str: string): string;
    /**
     * Check the password strength and character conditions
     * @param {string} password Password to check
     * @returns {{
     *   strength: number;
     *   check: string[];
     * }} Password check
     */
    export function checkPasswordStrength(password: string): {
        strength: number;
        check: string[];
    };
    /**
     * Lhun algorithm
     * @param {number[]} digits digits to calculate
     * @returns {number} Calculated digit
     */
    export function luhn(digits: number[]): number;
    /**
     * Module 11 algorithm
     * @param {number[]} digits digits to calculate
     * @returns {number} Calculated digit
     */
    export function module11(digits: number[]): number;
    /**
     * Convert the user provided size to bytes
     * @param {string} size Size with string size type
     * @returns {number} Size in bytes
     */
    export function sizeStringToBytes(size: string): number;
    /**
     * Returns the image dimensions
     * @param {File} file Image file
     * @returns {Promise<number[]>} Number array Promise of the dimensions (width, height)
     */
    export function getImageDimensions(file: File): Promise<number[]>;
}
declare module "dom" {
    import { Options, Lang, Validator, Suggestion, ValidationField, Configuration, AsyncValidator } from "types";
    /**
     * Restricts the number of characters in a TextArea and displays the information
     * @param {HTMLTextAreaElement} TextArea TextArea to limit
     * @param {number} max Max number of character to write
     * @param {string} info Type of information showed
     */
    export function textAreaLengthRestriction(TextArea: HTMLTextAreaElement, max: number, info: string): void;
    /**
     * Set the input suggestions
     * @param {HTMLInputElement} input Input element where suggestions will be shown
     * @param {string[]} words List of words to suggest
     * @param {Suggestion} settings Custom options for suggestion's DataList Element
     */
    export function inputSuggestion(input: HTMLInputElement, words: string[], settings: Suggestion): void;
    /**
     * Show password strength info
     * @param {HTMLInputElement} input Input type password
     * @param {Options} options Validation options
     */
    export function passwordInfo(input: HTMLInputElement, options: Options): void;
    /**
     * Set the field help message
     * @param {ValidationField} field The field to attach the message
     * @param {string} message The message to show
     */
    export function fieldHelpMessage(field: ValidationField, message: string): void;
    /**
     * Sets the styles for the field and their parent
     * @param {ValidationField} field The validated field
     * @param {HTMLFormElement} form The validated field parent form
     * @param {Options} options Validation options
     * @param {boolean} valid_invalid True if is valid, false if is invalid
     */
    export function setStyles(field: ValidationField, form: HTMLFormElement, options: Options, valid_invalid: boolean): void;
    /**
     * Removes the field style and its parent
     * @param {ValidationField} field The validated field
     * @param {HTMLFormElement} form The validated field parent form
     * @param {Options} options Validation options
     */
    export function removeStyles(field: ValidationField, form: HTMLFormElement, options: Options): void;
    /**
     * Removes the field message
     * @param {ValidationField} field The validated field
     * @param {HTMLFormElement} form The validated field parent form
     */
    export function removeInlineMessages(field: ValidationField, form: HTMLFormElement): void;
    /**
     * Sets the field validation message
     * @param {ValidationField} field The validated field
     * @param {HTMLFormElement} form The validated field parent form
     * @param {Options} options Validation options
     * @param {Configuration} configuration Validation configuration
     * @param {Lang} language Form Validator language
     * @param {boolean} valid_invalid True if is valid, false if is invalid
     * @param {(Validator | AsyncValidator)} validator The validator
     */
    export function setMessage(field: ValidationField, form: HTMLFormElement, options: Options, configuration: Configuration, language: Lang, valid_invalid: boolean, validator: Validator | AsyncValidator): void;
    /**
     * Remove all styles and messages
     * @param {HTMLFormElement} form The validated fields parent form
     * @param {Options} options Validation options
     * @param {Configuration} configuration Validation configuration
     */
    export function formReset(form: HTMLFormElement, options: Options, configuration: Configuration): void;
    /**
     * Toggles the visibility of the help messages
     * @param {ValidationField} field Field owner of the help message
     * @param {HTMLFormElement} form Form to search fields
     * @param {Options} options Validation options
     * @param {Boolean} show Show or hide de message
     */
    export function toggleHelpMessage(field: ValidationField, form: HTMLFormElement, options: Options, show: boolean): void;
    /**
     * Adds the valid class in all no validated fields
     * @param {HTMLFormElement} form Form to search fields
     * @param {Options} options Validation options
     */
    export function addValidStyleInAllFields(form: HTMLFormElement, options: Options): void;
}
declare module "FormValidator" {
    import type { Lang, Options, Suggestion, JSONConfig, ValidatorEvent, Validator, AsyncValidator, Modifier } from "types";
    /**
     * FormValidator class definition
     * @class FormValidate
     */
    class FormValidate {
        private conf;
        private opt;
        private lang;
        constructor(opt?: Options, lang?: Lang);
        /**
         * Triggers the FormValidator events of the fields
         * @param {string} event Event name
         * @param {HTMLFormElement} form  Parent form
         * @param {ValidationField} field Validating field
         * @param {boolean} state Validation result (false in event beforeValidation or afterValidation)
         * @param {Options} options Validation options
         */
        private triggerEvent;
        /**
         * Triggers all validators set in the fields
         * @param {ValidationField} field Field to validate
         * @param {HTMLFormElement} form Parent form
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @param {string} event Event to check if must be triggered
         * @returns {boolean} Returns true only if pass all validations
         */
        private validateField;
        /**
         * Triggers all async validators set in the fields
         * @param {ValidationField} field Field to validate
         * @param {HTMLFormElement} form Parent form
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @param {string} event Event to check if must be triggered
         * @returns {Promise<boolean>} Returns a true promise only if pass all validations
         */
        private validateFieldAsync;
        /**
         * Triggers all validators set in the fields
         * @param {HTMLFormElement} form Parent form
         * @param {string} not List of inputs attributes not to be validated
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @param {string} event Event to check if must be triggered
         * @returns {boolean} Returns true only if pass all validations
         */
        private validateAllFields;
        /**
         * Triggers all async validators set in the fields
         * @param {HTMLFormElement} form Parent form
         * @param {string} not List of inputs attributes not to be validated
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @param {string} event Event to check if must be triggered
         * @returns {Promise<boolean>} Returns a true promise only if pass all validations
         */
        private validateAllFieldsAsync;
        /**
         * Triggers all modifiers set in the fields
         * @param {(HTMLInputElement | HTMLTextAreaElement)} field Field to modify the value
         * @param {HTMLFormElement} form Form to search fields
         * @param {string} event Event type name
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private modifyField;
        /**
         * Set the dependant validation
         * @param {HTMLFormElement} form Form to search target field
         * @param {ValidationField} field Field to check if it must be dependant
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private setDependantValidation;
        /**
         * Set the optional validation
         * @param {HTMLFormElement} form Form to search target field
         * @param {ValidationField} field Field to check if it must be optional
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private setOptionalValidation;
        /**
         * Controls if the field could be validated
         * @param {ValidationField} field Field to check the type
         * @param {string} event Event to check if must be triggered
         * @param {Options} options Validation options
         * @returns {boolean} True if could be validated
         */
        private validateFieldController;
        /**
         * Adds the DOM features to the field
         * @param {HTMLFormElement} form Parent form
         * @param {ValidationField} field Target field
         * @param {Options} options Validation options
         */
        private domFieldsFeatures;
        /**
         * Adds an ignore attribute to the field if it is in the ignore list
         * @param {HTMLFormElement} form Parent form
         * @param {ValidationField} field Target field
         * @param {Options} options Validation options
         */
        private ignoreField;
        /**
         * Search for async validators in the validator list of the field
         * @param {ValidationField} field Target field
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @returns {string[]} Async validators list
         */
        private searchAsyncValidators;
        /**
         * Search for sync validators in the validator list of the field
         * @param {ValidationField} field Target field
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         * @returns {string[]} Sync validators list
         */
        private searchSyncValidators;
        /**
         * Adds the event listeners to the field
         * @param {HTMLFormElement} form Parent form
         * @param {ValidationField} field Target field
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private addEventListenersToFormFields;
        /**
         * Add the event listeners to the form
         * @param {HTMLFormElement} form Parent form
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private addEventListenersToForm;
        /**
         * Set up modifiers and validators in all fields of all configured forms
         * @param {Options} options Validation options
         * @param {Configuration} config Validation configuration
         */
        private setUpFV;
        /**
         * Set suggestions to the specified input
         * @param {HTMLInputElement} input Input element or input name
         * @param {string[]} words Array of words to suggest
         * @param {?Suggestion} [config] Suggestion list config
         */
        setSuggestions(input: string | HTMLInputElement, words: string[], config?: Suggestion): void;
        /**
         * Set the text length restriction to the specified textarea
         * @param {(string | HTMLTextAreaElement)} TextArea Textarea element or textarea name
         * @param {number} max Text max length
         * @param {?string} [info] Type of info to show (count, both, remaining)
         */
        setTextAreaLengthRestriction(TextArea: string | HTMLTextAreaElement, max: number, info?: string): void;
        /**
         * Set the password info to the input type password
         * @param {(string | HTMLInputElement)} input Input element or input name
         */
        setPasswordInfo(input: string | HTMLInputElement): void;
        /**
         * Validates the specified fields of the specified forms
         * @param {?string} [form] Form or forms id to validate (comma separated)
         * @param {?Options} [options] Validation options
         */
        validate(form?: string, options?: Options): void;
        /**
         * Sets the validation attributes on the form's fields then validates
         * @param {JSONConfig} json Form's Validation configuration
         * @param {?Options} [options] Validation options
         */
        fromJSON(json: JSONConfig, options?: Options): void;
        /**
         * Adds an Form Validator event to the field
         * @param {string} event Event name
         * @param {string} field Field id
         * @param {ValidatorEvent} eventFunction Event function
         */
        addFormValidationEvent(event: string, field: string, eventFunction: ValidatorEvent): void;
        /**
         * Adds a validator to the global config
         * @param {Validator} validator Validator config
         */
        addValidator(validator: Validator): void;
        /**
         * Adds an async validator to the global config
         * @param {AsyncValidator} validator Validator config
         */
        addAsyncValidator(validator: AsyncValidator): void;
        /**
         * Adds a modifier to the global config
         * @param {Modifier} modifier Modifier config
         */
        addModifier(modifier: Modifier): void;
        /**
         * Restricts typed characters of the input
         * @param {(string | HTMLInputElement)} input Input element or input id to restrict
         * @param {string} type Accepted types of characters (numbers, letters, text, all, none)
         * @param {?string} [reject] Additional rejected characters
         * @param {?string} [accept] Additional accepted characters
         */
        restrict(input: string | HTMLInputElement, type: string, reject?: string, accept?: string): void;
    }
    /**
     * Validates form field contents before submission.
     * @param {?Options} [options] Form validation options
     * @param {?Lang} [lang] Form validation language
     * @returns {FormValidate} Form validation
     */
    export function FormValidator(options?: Options, lang?: Lang): FormValidate;
}
//# sourceMappingURL=FormValidator.d.ts.map