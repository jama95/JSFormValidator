import type { Validator, Modifier, Lang, FV, Options } from "./types";
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
  private options: Options;
  private lang: Lang;
  constructor(opt?: Options, lang?: Lang) {
    this.conf = { ...options, ...configuration, ...opt };
    this.conf.language = { ...language, ...lang };
    this.options = { ...options, ...opt };
    this.lang = this.conf.language;
  }

  /**
   * Triggers all validators set in the fields
   * @param {(HTMLInputElement | HTMLTextAreaElement)} field Input element to validate
   * @param {HTMLFormElement} form Parent form
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateField(
    field: HTMLInputElement | HTMLTextAreaElement,
    form: HTMLFormElement
  ): boolean {
    const validatorsList = field.getAttribute(this.conf.fieldValidateAttribute),
      list = validatorsList ? validatorsList?.split(/[,|-]+\s*|\s+/) : [],
      value = field.value;
    let valid_invalid: boolean | null = null;
    list.forEach((validator) => {
      if (this.conf.validators[validator]) {
        const opt = this.options,
          lang = this.lang;
        valid_invalid = this.conf.validators[validator].validatorFunction(
          value,
          form,
          field,
          opt,
          lang
        );
        if (valid_invalid != null) {
          removeStyles(field, form, this.options);
          setStyles(field, form, this.options, valid_invalid);
          setMessage(
            field,
            form,
            this.options,
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
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateAllFields(form: HTMLFormElement, not: string): boolean {
    let fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      `textarea, input:not(${not})`
    );
    let valid: boolean[] = [];
    fields.forEach((field) => {
      if (this.validateFieldController(field, form, "submit"))
        valid.push(this.validateField(field, form));
    });
    if (valid.length == 0) valid.push(true);
    return !valid.includes(false);
  }

  /**
   * Triggers all modifiers set in the fields
   * @param {(HTMLInputElement | HTMLTextAreaElement)} field Field element to modify the value
   * @param {HTMLFormElement} form Form to search fields
   * @param {string} event Event type name
   */
  private modifyField(
    field: HTMLInputElement | HTMLTextAreaElement,
    form: HTMLFormElement,
    event: string
  ): void {
    const modifiersList = field.getAttribute(this.conf.fieldModifyAttribute),
      isForModifier: boolean =
        (field instanceof HTMLInputElement &&
          ["search", "checkbox", "radio"].indexOf(field.type) == -1) ||
        field instanceof HTMLTextAreaElement;
    if (!isForModifier && ["input", "blur"].indexOf(event)) return;
    let list = modifiersList ? modifiersList?.split(/[,|-]+\s*|\s+/) : [],
      value = field.value;
    list.forEach((modifier) => {
      if (this.conf.modifiers[modifier]) {
        const opt = this.options,
          lang = this.lang;
        value = this.conf.modifiers[modifier].modifierFunction(
          value,
          form,
          field,
          opt,
          lang
        );
      }
    });
    field.value = value;
  }

  /**
   * Control if the field will be validated
   * @param {(HTMLInputElement | HTMLTextAreaElement)} field
   * @param {HTMLFormElement} form
   * @param {string} event
   */
  private validateFieldController(
    field: HTMLInputElement | HTMLTextAreaElement,
    form: HTMLFormElement,
    event: string
  ) {
    const isCheckOrRadio: boolean =
      field instanceof HTMLInputElement &&
      ["checkbox", "radio"].indexOf(field.type) > -1;
    let validate = false;
    switch (event) {
      case "click":
        if (isCheckOrRadio && this.conf.validateCheckboxRadioOnClick)
          validate = true;
        break;
      case "blur":
        if (this.conf.validateOnBlur) validate = true;
        break;
      case "input":
        if (this.conf.validateOnInput) validate = true;
        break;
      case "submit":
      default:
        validate = true;
        break;
    }
    return validate;
  }
  /**
   * Add the DOM features to the fields
   * @param {HTMLFormElement} form Parent form
   */
  private domFieldsFeatures(form: HTMLFormElement): void {
    let fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      `textarea, input:not(${notAccept(false, false)})`
    );
    fields.forEach((field) => {
      if (field instanceof HTMLInputElement) {
        if (this.conf.addSuggestions) {
          let suggestions = field.getAttribute(this.conf.suggestionAttribute);
          if (suggestions)
            inputSuggestion(
              field,
              suggestions.split(/[,|-]+\s*|\s+/),
              this.conf.suggestionConfig
            );
        }
      }
      if (field instanceof HTMLTextAreaElement) {
        let restriction = field.getAttribute(this.conf.lengthRestrictAttribute);
        if (restriction)
          textAreaLengthRestriction(
            field,
            parseInt(restriction, 10),
            this.options.lengthRestrictInfo
          );
      }
      if (this.conf.showHelpMessagesOnFocus) {
        let message = field.getAttribute(this.conf.fieldHelpMessageAttribute);
        if (message) {
          fieldHelpMessage(field, message);
        }
      }
    });
  }

  /**
   * Add an ignore attribute to all fields in the ignore list
   * @param {HTMLFormElement} form Parent form
   */
  private ignoreField(form: HTMLFormElement): void {
    let fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      `textarea, input:not(${notAccept(false, false)})`
    );
    fields.forEach((field) => {
      let list: string[] = [],
        name: string = field.getAttribute("name") ?? "";
      if (Array.isArray(this.conf.ignoredFieldsNames)) {
        list = this.conf.ignoredFieldsNames;
      } else if (typeof this.conf.ignoredFieldsNames == "string") {
        list = (this.conf.ignoredFieldsNames as string).split(/[,|-]+\s*|\s+/);
      }
      if (list.indexOf(name) > -1) {
        field.setAttribute("ignored", "true");
      } else {
        field.setAttribute("ignored", "false");
      }
    });
  }

  /**
   * Add the event listeners to all fields of the form
   * @param {HTMLFormElement} form Parent form
   */
  private addEventListenersToFormFields(form: HTMLFormElement): void {
    let fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      `textarea, input:not(${notAccept(this.conf.validateHiddenFields, false)})`
    );
    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        toggleHelpMessage(field, form, this.options);
      });
      field.addEventListener("click", () => {
        if (this.validateFieldController(field, form, "click"))
          this.validateField(field, form);
      });
      field.addEventListener("blur", () => {
        this.modifyField(field, form, "blur");
        if (this.validateFieldController(field, form, "blur"))
          this.validateField(field, form);
      });
      field.addEventListener("input", () => {
        this.modifyField(field, form, "input");
        if (this.validateFieldController(field, form, "input"))
          this.validateField(field, form);
      });
    });
  }

  /**
   * Add the event listeners to the form
   * @param {HTMLFormElement} form Parent form
   */
  private addEventListenersToForm(form: HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      let isValid = this.validateAllFields(
        form,
        notAccept(this.conf.validateHiddenFields, false)
      );
      form.setAttribute("valid-state", isValid ? "validForm" : "invalidForm");
      if (!isValid) {
        if (this.conf.scrollToTopOnInvalid)
          form.scrollIntoView({ behavior: "smooth" });
        e.stopImmediatePropagation();
        e.preventDefault();
      }
      addValidStyleInAllFields(form, this.options);
    });
    form.addEventListener("reset", () => {
      formReset(form, this.options);
      form.removeAttribute("valid-state");
    });
  }

  /**
   * Set up modifiers and validators in all fields of all configured forms
   */
  private setUpFV(): void {
    let form = this.conf.form.split(/[,|-]+\s*|\s+/).join(","),
      forms = document.querySelectorAll<HTMLFormElement>(form);
    if (!forms) forms = document.querySelectorAll<HTMLFormElement>("form");
    forms.forEach((form) => {
      this.domFieldsFeatures(form);
      this.ignoreField(form);
      this.addEventListenersToFormFields(form);
      this.addEventListenersToForm(form);
    });
  }

  /**
   * Register a language
   * @param {Lang} lang Language config
   */
  public registerLanguage(lang: Lang): void {
    this.conf.language = lang;
    this.lang = lang;
  }

  /**
   * Adds a validator to the list of validators
   * @param {Validator} validator Validator configuration options
   */
  public addValidator(validator: Validator): void {
    if (validator.validateOnInput === undefined) {
      validator.validateOnInput = true;
    }
    this.conf.validators[validator.name] = validator;
  }

  /**
   * Adds a Modifier to the list of Modifiers
   * @param {Modifier} modifier Modifier configuration options
   */
  public addModifier(modifier: Modifier): void {
    this.conf.modifiers[modifier.name] = modifier;
  }

  /**
   * Validates the specified fields of the specified forms
   * @param {?string} [form] Form or forms id to validate (comma separated)
   * @param {?Options} [options] FormValidation configuration options
   */
  public validate(form?: string, options?: Options) {
    this.conf = { ...this.conf, ...options };
    if (options) this.options = { ...options };
    let forms = this.conf.form,
      f = form ?? "";
    f = f.length > 0 ? `${forms},${f}` : f;
    form = forms.length > 0 && forms !== "form" ? f : forms;
    this.conf.form = form;
    this.setUpFV();
  }

  /**
   * Restricts typed characters of the input
   * @param {HTMLInputElement} input Input to restrict
   * @param {string} type Accepted types of characters (numbers, letters, text, all)
   * @param {?string} [reject] Additional rejected characters
   * @param {?string} [accept] Additional accepted characters
   */
  public restrict(
    input: HTMLInputElement,
    type: string,
    reject?: string,
    accept?: string
  ) {
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
 */
function FormValidator(options?: Options, lang?: Lang): FormValidate {
  return new FormValidate(options, lang);
}

export default FormValidator;
