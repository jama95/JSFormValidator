import type { Lang, FV, Options, ValidationField } from "./types";
import { options, language, configuration } from "./config";
import {
  formReset,
  removeStyles,
  setMessage,
  setStyles,
  inputSuggestion,
  textAreaLengthRestriction,
  toggleHelpMessage,
  addValidStyleInAllFields,
  fieldHelpMessage,
} from "./dom";
import { escapeRegExp, notAccept } from "./utils";

/**
 * FormValidator class definition
 * @class FormValidate
 */
class FormValidate {
  private conf: FV;
  private opt: Options;
  private lang: Lang;
  constructor(opt?: Options, lang?: Lang) {
    this.conf = { ...options, ...configuration, ...opt };
    this.conf.language = { ...language, ...lang };
    this.opt = { ...options, ...opt };
    this.lang = this.conf.language;
  }

  /**
   * Triggers all validators set in the fields
   * @param {ValidationField} field Field to validate
   * @param {HTMLFormElement} form Parent form
   * @param {Options} options Validation options
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateField(
    field: ValidationField,
    form: HTMLFormElement,
    options: Options
  ): boolean {
    const validatorsList = field.getAttribute(options.fieldValidateAttribute),
      list = !validatorsList ? [] : validatorsList.split(/[,|-]+\s*|\s+/),
      value = field.value;
    let valid_invalid: boolean | null = null;
    list.forEach((validator) => {
      if (this.conf.validators[validator]) {
        valid_invalid = this.conf.validators[validator].validatorFunction(
          value,
          form,
          field,
          options,
          this.lang
        );
        if (valid_invalid != null) {
          removeStyles(field, form, options);
          setStyles(field, form, options, valid_invalid);
          setMessage(
            field,
            form,
            options,
            this.conf,
            this.lang,
            valid_invalid,
            this.conf.validators[validator]
          );
        }
      }
      if (!valid_invalid) return false;
    });
    return valid_invalid ?? false;
  }

  /**
   * Triggers all validators set in the fields
   * @param {HTMLFormElement} form Parent form
   * @param {string} not List of inputs attributes not to be validated
   * @param {Options} options Validation options
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateAllFields(
    form: HTMLFormElement,
    not: string,
    options: Options
  ): boolean {
    let fields = form.querySelectorAll<ValidationField>(
      `textarea, select, input:not(${not})`
    );
    let valid: boolean[] = [];
    fields.forEach((field) => {
      if (this.validateFieldController(field, "submit", options))
        valid.push(this.validateField(field, form, options));
    });
    if (valid.length == 0) valid.push(true);
    return !valid.includes(false);
  }

  /**
   * Triggers all modifiers set in the fields
   * @param {(HTMLInputElement | HTMLTextAreaElement)} field Field to modify the value
   * @param {HTMLFormElement} form Form to search fields
   * @param {string} event Event type name
   * @param {Options} options Validation options
   */
  private modifyField(
    field: HTMLInputElement | HTMLTextAreaElement,
    form: HTMLFormElement,
    event: string,
    options: Options
  ): void {
    const modifiersList = field.getAttribute(options.fieldModifyAttribute),
      isForModifier =
        (field instanceof HTMLInputElement &&
          ["search", "checkbox", "radio"].includes(field.type)) ||
        field instanceof HTMLTextAreaElement;
    if (!isForModifier && ["input", "blur"].includes(event)) return;
    const list = !modifiersList ? [] : modifiersList.split(/[,|-]+\s*|\s+/);
    let value = field.value;
    list.forEach((modifier) => {
      if (this.conf.modifiers[modifier]) {
        value = this.conf.modifiers[modifier].modifierFunction(
          value,
          form,
          field,
          options,
          this.lang
        );
      }
    });
    field.value = value;
  }

  /**
   * Controls if the field could be validated
   * @param {ValidationField} field Field to check the type
   * @param {string} event Event to check if must be triggered
   * @param {Options} options Validation options
   * @returns {boolean} True if could be validated
   */
  private validateFieldController(
    field: ValidationField,
    event: string,
    options: Options
  ): boolean {
    const isIgnored = field.getAttribute("fv-ignored") ?? "false";
    if (isIgnored == "true") return false;
    const isCheckOrRadio =
      field instanceof HTMLInputElement &&
      ["checkbox", "radio"].includes(field.type);
    let validate = false;
    switch (event) {
      case "click":
        if (isCheckOrRadio && options.validateCheckboxRadioOnClick)
          validate = true;
        break;
      case "blur":
        if (options.validateOnBlur) validate = true;
        break;
      case "input":
        if (options.validateOnInput) validate = true;
        break;
      case "submit":
      default:
        validate = true;
        break;
    }
    return validate;
  }

  /**
   * Adds the DOM features to the field
   * @param {HTMLFormElement} form Parent form
   * @param {ValidationField} field Target field
   * @param {Options} options Form validation options
   */
  private domFieldsFeatures(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options
  ): void {
    let fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      `input:not(${notAccept(false, false)})`
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    if (field instanceof HTMLInputElement) {
      if (options.addSuggestions) {
        let suggestions = field.getAttribute(options.suggestionAttribute);
        if (suggestions)
          inputSuggestion(
            field,
            suggestions.split(/[,|-]+\s*|\s+/),
            options.suggestionConfig
          );
      }
    }
    if (field instanceof HTMLTextAreaElement) {
      let restriction = field.getAttribute(options.lengthRestrictAttribute);
      if (restriction)
        textAreaLengthRestriction(
          field,
          parseInt(restriction, 10),
          options.lengthRestrictInfo
        );
    }
    if (options.showHelpMessagesOnFocus) {
      let message = field.getAttribute(options.fieldHelpMessageAttribute);
      if (message) {
        fieldHelpMessage(field, message);
      }
    }
  }

  /**
   * Adds an ignore attribute to the field if it is in the ignore list
   * @param {HTMLFormElement} form Parent form
   * @param {ValidationField} field Target field
   * @param {Options} options Validation options
   */
  private ignoreField(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options
  ): void {
    let fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      `input:not(${notAccept(false, false)})`
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    let list: string[] = [],
      name = field.getAttribute("name") ?? "";
    if (Array.isArray(options.ignoredFieldsNames)) {
      list = options.ignoredFieldsNames;
    } else if (typeof options.ignoredFieldsNames == "string") {
      list = options.ignoredFieldsNames.split(/[,|-]+\s*|\s+/);
    }
    if (list.indexOf(name) > -1) {
      field.setAttribute("fv-ignored", "true");
    } else {
      field.setAttribute("fv-ignored", "false");
    }
    field.setAttribute("fv-skipped", "false");
  }

  /**
   * Adds the event listeners to the field
   * @param {HTMLFormElement} form Parent form
   * @param {ValidationField} field Target field
   * @param {Options} options Validation options
   */
  private addEventListenersToFormFields(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options
  ): void {
    let fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      `input:not(${notAccept(options.validateHiddenFields, false)})`
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    field.addEventListener("focus", () => {
      toggleHelpMessage(field, form, options, true);
    });
    field.addEventListener("click", () => {
      toggleHelpMessage(field, form, options, true);
      if (this.validateFieldController(field, "click", options))
        this.validateField(field, form, options);
    });
    field.addEventListener("blur", () => {
      toggleHelpMessage(field, form, options, false);
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        this.modifyField(field, form, "blur", options);
        if (this.validateFieldController(field, "blur", options))
          this.validateField(field, form, options);
      }
    });
    field.addEventListener("input", () => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        this.modifyField(field, form, "input", options);
        if (this.validateFieldController(field, "input", options))
          this.validateField(field, form, options);
      }
    });
    if (field instanceof HTMLSelectElement)
      field.addEventListener("change", () => {
        this.validateField(field, form, options);
      });
  }

  /**
   * Add the event listeners to the form
   * @param {HTMLFormElement} form Parent form
   * @param {Options} options Validation options
   */
  private addEventListenersToForm(
    form: HTMLFormElement,
    options: Options
  ): void {
    form.addEventListener("submit", (e) => {
      let isValid = this.validateAllFields(
        form,
        notAccept(options.validateHiddenFields, false),
        options
      );
      form.setAttribute("valid-state", isValid ? "validForm" : "invalidForm");
      if (!isValid) {
        if (options.scrollToTopOnInvalid)
          form.scrollIntoView({ behavior: "smooth" });
        e.stopImmediatePropagation();
        e.preventDefault();
      }
      addValidStyleInAllFields(form, options);
    });
    form.addEventListener("reset", () => {
      formReset(form, options);
      form.removeAttribute("valid-state");
    });
  }

  /**
   * Set up modifiers and validators in all fields of all configured forms
   * @param {Options} options Validation options
   */
  private setUpFV(options: Options): void {
    const form = options.form.split(/[,|-]+\s*|\s+/).join(",");
    let forms = document.querySelectorAll<HTMLFormElement>(form);
    if (!forms) forms = document.querySelectorAll<HTMLFormElement>("form");
    forms.forEach((form) => {
      this.addEventListenersToForm(form, options);
      const fields = form.querySelectorAll<ValidationField>(
        "input, textarea, select"
      );
      fields.forEach((field) => {
        this.domFieldsFeatures(form, field, options);
        this.ignoreField(form, field, options);
        this.addEventListenersToFormFields(form, field, options);
      });
    });
  }

  /**
   * Validates the specified fields of the specified forms
   * @param {?string} [form] Form or forms id to validate (comma separated)
   * @param {?Options} [options] Validation options
   */
  public validate(form?: string, options?: Options): void {
    let opt = { ...this.opt, ...options };
    let f: string;
    if (!form) {
      f = opt.form;
    } else {
      f = form ?? "";

      f = f.trim().length > 0 ? f : opt.form;
    }
    opt.form = f;
    this.setUpFV(opt);
  }

  /**
   * Restricts typed characters of the input
   * @param {(string | HTMLInputElement)} input Input element or input name to restrict
   * @param {string} type Accepted types of characters (numbers, letters, text, all, none)
   * @param {?string} [reject] Additional rejected characters
   * @param {?string} [accept] Additional accepted characters
   */
  public restrict(
    input: string | HTMLInputElement,
    type: string,
    reject?: string,
    accept?: string
  ): void {
    let i: HTMLInputElement | null = null;
    if (!(input instanceof HTMLInputElement)) {
      i = document.querySelector<HTMLInputElement>(`[name=${input}]`);
      if (i) input = i;
      else {
        console.error(
          `FormValidator: Failed to set the restriction, the input named '${input}' does not exist.`
        );
        return;
      }
    }
    if (reject) reject = escapeRegExp(reject);
    if (accept) accept = escapeRegExp(accept);
    let acceptRegexp: RegExp, rejectRegexp: RegExp;
    switch (type) {
      case "numbers":
        acceptRegexp = new RegExp(`[0-9${accept ?? ""}]`);
        break;
      case "letters":
        acceptRegexp = new RegExp(`[a-zA-Z${accept ?? ""}]`);
        break;
      case "alphanumeric":
        acceptRegexp = new RegExp(`[a-zA-Z0-9${accept ?? ""}]`);
        break;
      case "none":
        acceptRegexp = new RegExp(`[${accept ?? ""}]`);
        break;
      default:
        acceptRegexp = /[.]/;
        break;
    }
    const acceptDefault = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Backspace",
      "Delete",
      "Control",
      "Shift",
      "CapsLock",
      "Tab",
      "AltGraph",
      "Home",
      "End",
      "PageUp",
      "PageDown",
    ];
    rejectRegexp = new RegExp(`[${reject}]`);
    input.addEventListener("keydown", function (e) {
      if (
        !acceptDefault.includes(e.key) &&
        (!acceptRegexp.test(e.key) || rejectRegexp.test(e.key))
      )
        e.preventDefault();
    });
    input.addEventListener("input", function (e) {
      if (!acceptRegexp.test(input.value) || rejectRegexp.test(input.value))
        input.value = input.value.replace(
          new RegExp(`[^${acceptRegexp.source}]`, "g"),
          ""
        );
      input.value = input.value.replace(
        new RegExp(`[${rejectRegexp.source}]`, "g"),
        ""
      );
    });
  }
}

/**
 * Validates form field contents before submission.
 * @param {?Options} [options] Form validation options
 * @param {?Lang} [lang] Form validation language messages
 * @returns {FormValidate} Form validation
 */
function FormValidator(options?: Options, lang?: Lang): FormValidate {
  return new FormValidate(options, lang);
}

export default FormValidator;
