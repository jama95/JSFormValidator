import type {
  Lang,
  Options,
  ValidationField,
  Suggestion,
  JSONConfig,
  ValidatorEvent,
  Validator,
  AsyncValidator,
  Modifier,
  Configuration,
} from "./types";
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
  passwordInfo,
  removeInlineMessages,
} from "./dom";
import { escapeRegExp, notAccept } from "./utils";

/**
 * FormValidator class definition
 * @class FormValidate
 */
class FormValidate {
  private conf: Configuration;
  private opt: Options;
  private lang: Lang;
  constructor(opt?: Options, lang?: Lang) {
    this.conf = configuration;
    this.conf.language = { ...language, ...lang };
    this.opt = { ...options, ...opt };
    this.lang = this.conf.language;
  }

  /**
   * Triggers the FormValidator events of the fields
   * @param {string} event Event name
   * @param {HTMLFormElement} form  Parent form
   * @param {ValidationField} field Validating field
   * @param {boolean} state Validation result (false in event beforeValidation or afterValidation)
   * @param {Options} options Validation options
   */
  private triggerEvent(
    event: string,
    form: HTMLFormElement,
    field: ValidationField,
    state: boolean,
    options: Options
  ): void {
    let fns: ValidatorEvent[] = [];
    switch (event) {
      case "beforeValidate":
        fns = configuration.onBeforeValidate[field.name];
        break;
      case "valid":
        fns = configuration.onValid[field.name];
        break;
      case "invalid":
        fns = configuration.onInvalid[field.name];
        break;
      case "afterValidate":
        fns = configuration.onAfterValidate[field.name];
        break;
    }
    if (fns)
      fns.forEach((fn) => {
        fn(form, field, state, options);
      });
  }

  /**
   * Triggers all validators set in the fields
   * @param {ValidationField} field Field to validate
   * @param {HTMLFormElement} form Parent form
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @param {string} event Event to check if must be triggered
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateField(
    field: ValidationField,
    form: HTMLFormElement,
    options: Options,
    config: Configuration,
    event: string
  ): boolean {
    this.triggerEvent("beforeValidate", form, field, false, options);
    const list = this.searchSyncValidators(field, options, config),
      value = field.value,
      valid_invalid: boolean[] = [];
    for (const validator of list) {
      if (config.validators[validator]) {
        if (
          event == "input" &&
          !(
            config.validators[validator].validateOnInput ??
            options.validateOnInput
          )
        )
          continue;
        const r = config.validators[validator].validatorFunction(
          value,
          form,
          field,
          options,
          this.lang
        );
        if (r) this.triggerEvent("valid", form, field, true, options);
        else this.triggerEvent("invalid", form, field, false, options);
        valid_invalid.push(r);
        removeStyles(field, form, options);
        setStyles(field, form, options, r);
        setMessage(
          field,
          form,
          options,
          config,
          this.lang,
          r,
          config.validators[validator]
        );
      } else {
        console.error(
          `FormValidator: Failed to trigger the validator: ${validator}, can not be found.`
        );
      }
      if (valid_invalid.includes(false)) break;
    }
    this.triggerEvent(
      "afterValidate",
      form,
      field,
      !valid_invalid.includes(false),
      options
    );
    return !valid_invalid.includes(false);
  }

  /**
   * Triggers all async validators set in the fields
   * @param {ValidationField} field Field to validate
   * @param {HTMLFormElement} form Parent form
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @param {string} event Event to check if must be triggered
   * @returns {Promise<boolean>} Returns a true promise only if pass all validations
   */
  private async validateFieldAsync(
    field: ValidationField,
    form: HTMLFormElement,
    options: Options,
    config: Configuration,
    event: string
  ): Promise<boolean> {
    this.triggerEvent("beforeValidate", form, field, false, options);
    const list = this.searchAsyncValidators(field, options, config),
      value = field.value;
    const valid_invalid: boolean[] = [];
    for (const validator of list) {
      if (config.asyncValidators[validator]) {
        if (
          event == "input" &&
          !(
            config.asyncValidators[validator].validateOnInput ??
            options.validateOnInput
          )
        )
          continue;
        const r = await config.asyncValidators[validator].validatorFunction(
          value,
          form,
          field,
          options,
          this.lang
        );
        if (r) this.triggerEvent("valid", form, field, true, options);
        else this.triggerEvent("invalid", form, field, false, options);
        valid_invalid.push(r);
        removeStyles(field, form, options);
        setStyles(field, form, options, r);
        setMessage(
          field,
          form,
          options,
          config,
          this.lang,
          r,
          config.asyncValidators[validator]
        );
      } else {
        console.error(
          `FormValidator: Failed to trigger the validator: ${validator}, can not be found.`
        );
      }
      if (valid_invalid.includes(false)) break;
    }
    this.triggerEvent(
      "afterValidate",
      form,
      field,
      !valid_invalid.includes(false),
      options
    );
    return !valid_invalid.includes(false);
  }

  /**
   * Triggers all validators set in the fields
   * @param {HTMLFormElement} form Parent form
   * @param {string} not List of inputs attributes not to be validated
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @param {string} event Event to check if must be triggered
   * @returns {boolean} Returns true only if pass all validations
   */
  private validateAllFields(
    form: HTMLFormElement,
    not: string,
    options: Options,
    config: Configuration,
    event: string
  ): boolean {
    const fields = form.querySelectorAll<ValidationField>(
        `textarea, select, input:not(${not})`
      ),
      valid: boolean[] = [];
    fields.forEach((field) => {
      if (this.validateFieldController(field, "submit", options))
        valid.push(this.validateField(field, form, options, config, event));
    });
    if (valid.length == 0) valid.push(true);
    return !valid.includes(false);
  }

  /**
   * Triggers all async validators set in the fields
   * @param {HTMLFormElement} form Parent form
   * @param {string} not List of inputs attributes not to be validated
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @param {string} event Event to check if must be triggered
   * @returns {Promise<boolean>} Returns a true promise only if pass all validations
   */
  private async validateAllFieldsAsync(
    form: HTMLFormElement,
    not: string,
    options: Options,
    config: Configuration,
    event: string
  ): Promise<boolean> {
    const fields = form.querySelectorAll<ValidationField>(
        `textarea, select, input:not(${not})`
      ),
      valid: boolean[] = [];
    for (const element of Array.from(fields)) {
      const field = element;
      if (this.validateFieldController(field, "submit", options))
        valid.push(
          await this.validateFieldAsync(field, form, options, config, event)
        );
    }
    if (valid.length == 0) valid.push(true);
    return !valid.includes(false);
  }

  /**
   * Triggers all modifiers set in the fields
   * @param {(HTMLInputElement | HTMLTextAreaElement)} field Field to modify the value
   * @param {HTMLFormElement} form Form to search fields
   * @param {string} event Event type name
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private modifyField(
    field: HTMLInputElement | HTMLTextAreaElement,
    form: HTMLFormElement,
    event: string,
    options: Options,
    config: Configuration
  ): void {
    const modifiersList = field.getAttribute(options.fieldModifyAttribute),
      isForModifier =
        (field instanceof HTMLInputElement &&
          !["search", "checkbox", "radio", "file"].includes(field.type)) ||
        field instanceof HTMLTextAreaElement;
    if (!isForModifier) return;
    const list = !modifiersList ? [] : modifiersList.split(/[,|-]+\s*|\s+/);
    let value = field.value;
    for (const modifier of list) {
      if (config.modifiers[modifier]) {
        if (
          event == "input" &&
          !(config.modifiers[modifier].modifyOnInput ?? options.modifyOnInput)
        )
          continue;
        value = config.modifiers[modifier].modifierFunction(
          value,
          form,
          field,
          options,
          this.lang
        );
      } else {
        console.error(
          `FormValidator: Failed to trigger the modifier: ${modifier}, can not be found.`
        );
      }
    }
    field.value = value;
  }

  /**
   * Set the dependant validation
   * @param {HTMLFormElement} form Form to search target field
   * @param {ValidationField} field Field to check if it must be dependant
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private setDependantValidation(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options,
    config: Configuration
  ): void {
    const depending = field.getAttribute("data-fv-depends-on");
    if (!depending) return;
    const target = form.querySelector<ValidationField>(`[name=${depending}]`);
    if (target) {
      field.setAttribute("data-fv-skip", "true");
      const validators =
        field.getAttribute(options.fieldValidateAttribute) ?? "";
      if (!validators.includes("required"))
        field.setAttribute(
          options.fieldValidateAttribute,
          validators + "required"
        );
      target.setAttribute("data-fv-dependant", depending);
      const fEvent = field instanceof HTMLSelectElement ? "change" : "input";
      const value = field.getAttribute("data-fv-depends-on-value") ?? "";
      field.addEventListener(fEvent, function () {
        field.setAttribute("data-fv-skip", "true");
        removeStyles(field, form, options);
        removeInlineMessages(field, field.form as HTMLFormElement);
        if (config.validMessages[form.id][field.name])
          delete config.validMessages[form.id][field.name];
        if (config.invalidMessages[form.id][field.name])
          delete config.invalidMessages[form.id][field.name];
        document
          .querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)
          ?.remove();
        if (target.value.trim().length > 0)
          field.setAttribute("data-fv-skip", "false");
        if (value.length > 0)
          if (value != target.value) field.setAttribute("data-fv-skip", "true");
      });
      const tEvent = field instanceof HTMLSelectElement ? "change" : "input";
      const _self = this;
      target.addEventListener(tEvent, function () {
        removeStyles(field, form, options);
        removeInlineMessages(field, field.form as HTMLFormElement);
        if (config.validMessages[form.id][field.name])
          delete config.validMessages[form.id][field.name];
        if (config.invalidMessages[form.id][field.name])
          delete config.invalidMessages[form.id][field.name];
        document
          .querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)
          ?.remove();
        if (
          field.classList.contains(options.validClass) ||
          field.classList.contains(options.invalidClass)
        )
          _self.validateField(field, form, options, config, tEvent);
      });
    } else {
      console.error(
        `FormValidator: Failed to set the dependant validation on ${field.name}, the target field ${depending} can not be found.`
      );
    }
  }

  /**
   * Set the optional validation
   * @param {HTMLFormElement} form Form to search target field
   * @param {ValidationField} field Field to check if it must be optional
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private setOptionalValidation(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options,
    config: Configuration
  ): void {
    if (field.hasAttribute("data-fv-depends-on")) return;
    const optional = field.getAttribute("data-fv-optional") ?? "";
    if (optional == "true") {
      field.setAttribute("data-fv-skip", "true");
      const validators =
        field.getAttribute(options.fieldValidateAttribute) ?? "";
      if (!validators.includes("required"))
        field.setAttribute(
          options.fieldValidateAttribute,
          validators + "required"
        );
      const event = field instanceof HTMLSelectElement ? "change" : "input";
      field.addEventListener(event, function () {
        if (field.value.trim().length > 0)
          field.setAttribute("data-fv-skip", "false");
        else {
          field.setAttribute("data-fv-skip", "true");
          removeStyles(field, form, options);
          removeInlineMessages(field, field.form as HTMLFormElement);
          if (config.validMessages[form.id][field.name])
            delete config.validMessages[form.id][field.name];
          if (config.invalidMessages[form.id][field.name])
            delete config.invalidMessages[form.id][field.name];
          document
            .querySelector(`.${options.topMessagesClass} li[for=${field.name}]`)
            ?.remove();
        }
      });
    }
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
    const isIgnored = field.getAttribute("data-fv-ignored") ?? "false";
    const isSkipped = field.getAttribute("data-fv-skip") ?? "false";
    if (isIgnored == "true" || isSkipped == "true") return false;
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
    const fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      notAccept(false, false)
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    if (field instanceof HTMLInputElement) {
      if (options.addSuggestions) {
        const suggestions =
          field.getAttribute(options.suggestionAttribute) ?? "";
        inputSuggestion(
          field,
          suggestions.split(/[,|-]+\s*|\s+/),
          options.suggestionConfig
        );
      }
      if (options.addPasswordInfo) {
        passwordInfo(field, options);
      }
    }
    if (field instanceof HTMLTextAreaElement) {
      const restriction = field.getAttribute(options.lengthRestrictAttribute);
      if (restriction)
        textAreaLengthRestriction(
          field,
          parseInt(restriction, 10),
          options.lengthRestrictInfo
        );
    }
    if (options.showHelpMessagesOnFocus) {
      const message = field.getAttribute(options.fieldHelpMessageAttribute);
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
    const fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      notAccept(false, false)
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    let list: string[] = [];
    const name = field.getAttribute("name") ?? "";
    if (Array.isArray(options.ignoredFieldsNames)) {
      list = options.ignoredFieldsNames;
    } else if (typeof options.ignoredFieldsNames == "string") {
      list = options.ignoredFieldsNames.split(/[,|-]+\s*|\s+/);
    }
    if (list.indexOf(name) > -1) {
      field.setAttribute("data-fv-ignored", "true");
    } else {
      field.setAttribute("data-fv-ignored", "false");
    }
    field.setAttribute("data-fv-skip", "false");
  }

  /**
   * Search for async validators in the validator list of the field
   * @param {ValidationField} field Target field
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @returns {string[]} Async validators list
   */
  private searchAsyncValidators(
    field: ValidationField,
    options: Options,
    config: Configuration
  ): string[] {
    const asyncValidators = Object.keys(config.asyncValidators),
      validatorsList = field.getAttribute(options.fieldValidateAttribute),
      list = !validatorsList ? [] : validatorsList.split(/[,|-]+\s*|\s+/);
    return asyncValidators.filter((asyncValidator) =>
      list.includes(asyncValidator)
    );
  }

  /**
   * Search for sync validators in the validator list of the field
   * @param {ValidationField} field Target field
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   * @returns {string[]} Sync validators list
   */
  private searchSyncValidators(
    field: ValidationField,
    options: Options,
    config: Configuration
  ): string[] {
    const syncValidators = Object.keys(config.validators),
      validatorsList = field.getAttribute(options.fieldValidateAttribute),
      list = !validatorsList ? [] : validatorsList.split(/[,|-]+\s*|\s+/);
    return syncValidators.filter((syncValidator) =>
      list.includes(syncValidator)
    );
  }

  /**
   * Adds the event listeners to the field
   * @param {HTMLFormElement} form Parent form
   * @param {ValidationField} field Target field
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private addEventListenersToFormFields(
    form: HTMLFormElement,
    field: ValidationField,
    options: Options,
    config: Configuration
  ): void {
    const fieldsToIgnore = form.querySelectorAll<HTMLInputElement>(
      notAccept(options.validateHiddenFields, false)
    );
    if (
      field instanceof HTMLInputElement &&
      Array.from(fieldsToIgnore).includes(field)
    )
      return;
    field.addEventListener("focus", () => {
      toggleHelpMessage(field, form, options, true);
    });
    field.addEventListener("click", async () => {
      toggleHelpMessage(field, form, options, true);
      if (this.validateFieldController(field, "click", options)) {
        if (!this.validateField(field, form, options, config, "click")) return;
        await this.validateFieldAsync(field, form, options, config, "click");
      }
    });
    field.addEventListener("blur", async () => {
      toggleHelpMessage(field, form, options, false);
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      )
        this.modifyField(field, form, "blur", options, config);
      if (this.validateFieldController(field, "blur", options)) {
        if (!this.validateField(field, form, options, config, "blur")) return;
        await this.validateFieldAsync(field, form, options, config, "blur");
      }
    });
    field.addEventListener("input", async () => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      )
        this.modifyField(field, form, "input", options, config);
      if (this.validateFieldController(field, "input", options)) {
        if (!this.validateField(field, form, options, config, "input")) return;
        await this.validateFieldAsync(field, form, options, config, "input");
      }
    });
    if (field instanceof HTMLSelectElement)
      field.addEventListener("change", async () => {
        if (!this.validateField(field, form, options, config, "change")) return;
        await this.validateFieldAsync(field, form, options, config, "change");
      });
  }

  /**
   * Add the event listeners to the form
   * @param {HTMLFormElement} form Parent form
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private addEventListenersToForm(
    form: HTMLFormElement,
    options: Options,
    config: Configuration
  ): void {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let isValid = this.validateAllFields(
        form,
        notAccept(options.validateHiddenFields, false),
        options,
        config,
        "submit"
      );
      if (isValid)
        isValid = await this.validateAllFieldsAsync(
          form,
          notAccept(options.validateHiddenFields, false),
          options,
          config,
          "submit"
        );
      form.setAttribute("valid-state", isValid ? "validForm" : "invalidForm");
      if (!isValid) {
        if (options.scrollToTopOnInvalid)
          form.scrollIntoView({ behavior: "smooth" });
        e.stopImmediatePropagation();
      }
      addValidStyleInAllFields(form, options);
    });
    form.addEventListener("reset", () => {
      formReset(form, options, config);
      form.removeAttribute("valid-state");
    });
  }

  /**
   * Set up modifiers and validators in all fields of all configured forms
   * @param {Options} options Validation options
   * @param {Configuration} config Validation configuration
   */
  private setUpFV(options: Options, config: Configuration): void {
    const form = options.form
      .split(/[,|-]+\s*|\s+/)
      .map((f) => `#${f}`)
      .join(",");
    let forms = document.querySelectorAll<HTMLFormElement>(form);
    if (!forms) forms = document.querySelectorAll<HTMLFormElement>("form");
    forms.forEach((form) => {
      config.validMessages[form.id] = {};
      config.invalidMessages[form.id] = {};
      form.classList.add("fv");
      form.noValidate = true;
      this.addEventListenersToForm(form, options, config);
      const fields = form.querySelectorAll<ValidationField>(
        "input, textarea, select"
      );
      fields.forEach((field) => {
        this.domFieldsFeatures(form, field, options);
        this.ignoreField(form, field, options);
        this.setDependantValidation(form, field, options, config);
        this.setOptionalValidation(form, field, options, config);
        this.addEventListenersToFormFields(form, field, options, config);
      });
    });
  }

  /**
   * Set suggestions to the specified input
   * @param {HTMLInputElement} input Input element or input name
   * @param {string[]} words Array of words to suggest
   * @param {?Suggestion} [config] Suggestion list config
   */
  public setSuggestions(
    input: string | HTMLInputElement,
    words: string[],
    config?: Suggestion
  ): void {
    let i: HTMLInputElement | null = null;
    if (!(input instanceof HTMLInputElement)) {
      i = document.querySelector<HTMLInputElement>(`[name=${input}]`);
      if (i) input = i;
      else {
        console.error(
          `FormValidator: Failed to set the suggestions, the input '${input}' can not be found.`
        );
        return;
      }
    }
    if (!config) config = options.suggestionConfig;
    inputSuggestion(input, words, config);
  }

  /**
   * Set the text length restriction to the specified textarea
   * @param {(string | HTMLTextAreaElement)} TextArea Textarea element or textarea name
   * @param {number} max Text max length
   * @param {?string} [info] Type of info to show (count, both, remaining)
   */
  public setTextAreaLengthRestriction(
    TextArea: string | HTMLTextAreaElement,
    max: number,
    info?: string
  ): void {
    let t: HTMLTextAreaElement | null = null;
    if (!(TextArea instanceof HTMLTextAreaElement)) {
      t = document.querySelector<HTMLTextAreaElement>(`[name=${TextArea}]`);
      if (t) TextArea = t;
      else {
        console.error(
          `FormValidator: Failed to set the text length restriction, the textarea '${TextArea}' can not be found.`
        );
        return;
      }
    }
    if (!info) info = "count";
    if (!["count", "both", "remaining"].includes(info)) return;
    textAreaLengthRestriction(TextArea, max, info);
  }

  /**
   * Set the password info to the input type password
   * @param {(string | HTMLInputElement)} input Input element or input name
   */
  public setPasswordInfo(input: string | HTMLInputElement): void {
    let i: HTMLInputElement | null = null;
    if (!(input instanceof HTMLInputElement)) {
      i = document.querySelector<HTMLInputElement>(`[name=${input}]`);
      if (i) input = i;
      else {
        console.error(
          `FormValidator: Failed to set the password info, the input '${input}' can not be found.`
        );
        return;
      }
    }
    passwordInfo(input, options);
  }

  /**
   * Validates the specified fields of the specified forms
   * @param {?string} [form] Form or forms id to validate (comma separated)
   * @param {?Options} [options] Validation options
   */
  public validate(form?: string, options?: Options): void {
    const opt = { ...this.opt, ...options },
      conf = this.conf;
    let f: string;
    if (!form) {
      f = opt.form;
    } else {
      f = form ?? "";

      f = f.trim().length > 0 ? f : opt.form;
    }
    opt.form = f;
    this.setUpFV(opt, conf);
  }

  /**
   * Sets the validation attributes on the form's fields then validates
   * @param {JSONConfig} json Form's Validation configuration
   * @param {?Options} [options] Validation options
   */
  public fromJSON(json: JSONConfig, options?: Options): void {
    const forms = Object.keys(json);
    if (forms.length == 0) return;
    const frm = json[0];
    if (!frm) return;
    const form = document.querySelector<HTMLFormElement>(Object.keys(json)[0]);
    if (!form) {
      console.error(
        `FormValidator: Failed to set the validation config on the from, '${
          Object.keys(json)[0]
        }' can not be found.`
      );
      return;
    }
    const opt = { ...this.opt, ...options },
      conf = this.conf;
    opt.form = Object.keys(json)[0];
    for (const fld in frm) {
      const field = form.querySelector<ValidationField>(fld);
      if (!field) {
        console.error(
          `FormValidator: Failed to set the validation on the field, '${fld}' can not be found.`
        );
        continue;
      }
      const element = frm[fld];
      if (element.validators)
        field.setAttribute(opt.fieldValidateAttribute, element.validators);
      if (element.modifiers)
        field.setAttribute(opt.fieldModifyAttribute, element.modifiers);
      for (const dt in element.dataFV) {
        const data = element.dataFV[dt];
        const dt_fv = dt.includes("data-fv-") ? dt : `data-fv-${dt}`;
        field.setAttribute(dt_fv, data);
      }
    }
    this.setUpFV(opt, conf);
  }

  /**
   * Adds an Form Validator event to the field
   * @param {string} event Event name
   * @param {string} field Field id
   * @param {ValidatorEvent} eventFunction Event function
   */
  public addFormValidationEvent(
    event: string,
    field: string,
    eventFunction: ValidatorEvent
  ): void {
    const element = document.getElementById(field) as ValidationField;
    if (element) {
      switch (event) {
        case "beforeValidate":
          configuration.onBeforeValidate[element.name].push(eventFunction);
          break;
        case "valid":
          configuration.onValid[element.name].push(eventFunction);
          break;
        case "invalid":
          configuration.onInvalid[element.name].push(eventFunction);
          break;
        case "afterValidate":
          configuration.onAfterValidate[element.name].push(eventFunction);
          break;
        default:
          console.error(
            `FormValidator: Failed to add the event, '${event}' is not a valid event.`
          );
          break;
      }
    } else {
      console.error(
        `FormValidator: Failed to add the event,  the field named '${field}' cant not be found.`
      );
    }
  }

  /**
   * Adds a validator to the global config
   * @param {Validator} validator Validator config
   */
  public addValidator(validator: Validator): void {
    const list = Object.keys(this.conf.validators);
    if (list.includes(validator.name)) {
      console.error(
        `FormValidator: Failed to add the validator, the name '${validator.name}' is already in use.`
      );
      return;
    }
    this.conf.validators[validator.name] = validator;
  }

  /**
   * Adds an async validator to the global config
   * @param {AsyncValidator} validator Validator config
   */
  public addAsyncValidator(validator: AsyncValidator): void {
    const list = Object.keys(this.conf.asyncValidators);
    if (list.includes(validator.name)) {
      console.error(
        `FormValidator: Failed to add the validator, the name '${validator.name}' is already in use.`
      );
      return;
    }
    this.conf.asyncValidators[validator.name] = validator;
  }

  /**
   * Adds a modifier to the global config
   * @param {Modifier} modifier Modifier config
   */
  public addModifier(modifier: Modifier): void {
    const list = Object.keys(this.conf.modifiers);
    if (list.includes(modifier.name)) {
      console.error(
        `FormValidator: Failed to add the modifier, the name '${modifier.name}' is already in use.`
      );
      return;
    }
    this.conf.modifiers[modifier.name] = modifier;
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
          `FormValidator: Failed to set the characters restriction on the input, '${input}' can not be found.`
        );
        return;
      }
    }
    if (reject) reject = escapeRegExp(reject);
    if (accept) accept = escapeRegExp(accept);
    let acceptRegexp: RegExp;
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
    const rejectRegexp = new RegExp(`[${reject}]`);
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
export function FormValidator(options?: Options, lang?: Lang): FormValidate {
  return new FormValidate(options, lang);
}
