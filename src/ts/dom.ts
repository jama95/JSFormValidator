import { language } from "./config";
import {
  Options,
  Lang,
  Validator,
  Suggestion,
  ValidationField,
  Configuration,
  AsyncValidator,
} from "./types";
import {
  checkPasswordStrength,
  escapeRegExp,
  triggerMessageCallback,
} from "./utils";

/**
 * Restricts the number of characters in a TextArea and displays the information
 * @param {HTMLTextAreaElement} TextArea TextArea to limit
 * @param {number} max Max number of character to write
 * @param {string} info Type of information showed
 */
export function textAreaLengthRestriction(
  TextArea: HTMLTextAreaElement,
  max: number,
  info: string
): void {
  if (TextArea.hasAttribute("data-fv-length_restriction")) return;
  const container = document.createElement("div");
  container.classList.add("fv-textAreaLength");
  let remaining: number;
  const characterCount = function () {
    let count = TextArea.value.length;
    if (count >= max) {
      count = max;
      TextArea.value = TextArea.value.substring(0, max);
    }
    remaining = max - count;
    if (remaining < 0) remaining = 0;
    if (info)
      switch (info) {
        case "both":
          container.innerText = `${count}(${remaining})/${max}`;
          break;
        case "remaining":
          container.innerText = `${remaining}/${max}`;
          break;
        case "count":
        default:
          container.innerText = `${count}/${max}`;
          break;
      }
    position();
  };
  container.style.backgroundColor = window.getComputedStyle(
    document.getElementsByTagName("body")[0]
  ).backgroundColor;
  const position = function () {
    let left =
      TextArea.getBoundingClientRect().width -
      container.getBoundingClientRect().width -
      20;
    left = left < 8 ? 8 : left;
    container.style.marginLeft = `${left}px`;
    container.style.marginTop = `-${
      container.getBoundingClientRect().height / 2
    }px`;
  };
  TextArea.before(container);
  TextArea.setAttribute("data-fv-length_restriction", "");
  TextArea.addEventListener("input", characterCount);
  TextArea.dispatchEvent(new Event("input"));
  new ResizeObserver(position).observe(TextArea);
}

/**
 * Set the input suggestions
 * @param {HTMLInputElement} input Input element where suggestions will be shown
 * @param {string[]} words List of words to suggest
 * @param {Suggestion} settings Custom options for suggestion's DataList Element
 */
export function inputSuggestion(
  input: HTMLInputElement,
  words: string[],
  settings: Suggestion
): void {
  if (input.hasAttribute("data-fv-suggestions")) return;
  if (words.filter((w) => w.length > 0).length == 0) return;
  let currentFocus = -1;
  const datalist = document.createElement("datalist");
  datalist.classList.add("fv-suggestions");
  datalist.classList.add(settings.containerClass);
  datalist.style.maxHeight = settings.maxHeight;
  datalist.style.display = "none";
  datalist.setAttribute("target", `#${input.id}`);
  datalist.style.backgroundColor = window.getComputedStyle(
    document.getElementsByTagName("body")[0]
  ).backgroundColor;
  input.setAttribute("autocomplete", "off");
  input.setAttribute("list", "");
  const fillDatalist = function (words: string[]) {
    currentFocus = -1;
    while (datalist.firstChild) datalist.removeChild(datalist.firstChild);
    for (const word of words) {
      const option = document.createElement("option");
      option.value = word;
      option.innerText = word;
      option.classList.add(settings.optionClass);
      option.onclick = function () {
        datalist.style.display = "none";
        input.value = option.value;
      };
      datalist.appendChild(option);
    }
    if (datalist.options.length > 0) {
      datalist.style.display = "block";
      datalist.scrollTo(0, 0);
    } else {
      datalist.style.display = "none";
    }
  };
  input.addEventListener("blur", function () {
    const no = document.querySelector<HTMLDataListElement>(
      `datalist.fv-suggestions[target="#${input.id}"] option:hover`
    );
    if (no) return;
    datalist.style.display = "none";
  });
  input.addEventListener("dblclick", function () {
    fillDatalist(words);
  });
  input.addEventListener("input", function () {
    datalist.style.display = "none";
    if (input.value.trim().length == 0) return;
    setTimeout(() => {
      const regexp = new RegExp(escapeRegExp(input.value), "i");
      const match = words.filter((word) => regexp.test(word));
      if (match.length > 0) fillDatalist(match);
    }, 200);
  });
  input.addEventListener("keydown", function (e) {
    if (datalist.style.display == "block" && datalist.options) {
      if (e.key == "Escape") {
        e.preventDefault();
        datalist.style.display = "none";
      }
      if (e.key == "ArrowUp") {
        e.preventDefault();
        currentFocus--;
        simulateScroll();
      }
      if (e.key == "ArrowDown") {
        e.preventDefault();
        currentFocus++;
        simulateScroll();
      }
      addActive();
      if (e.key == "Enter") {
        e.preventDefault();
        datalist.options[currentFocus].click();
      }
    }
  });
  const addActive = function () {
    const selected = document.querySelector<HTMLDataListElement>(
      "datalist.fv-suggestions option.active"
    );
    if (selected) selected.classList.remove("active");
    if (currentFocus >= datalist.options.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = datalist.options.length - 1;
    datalist.options[currentFocus].classList.add("active");
    return true;
  };
  const simulateScroll = function () {
    currentFocus = currentFocus <= -1 ? 0 : currentFocus;
    currentFocus =
      currentFocus > datalist.options.length - 1
        ? datalist.options.length - 1
        : currentFocus;
    const c = Math.floor(
      parseInt(datalist.style.maxHeight, 10) / datalist.options[0].offsetHeight
    );
    datalist.scrollTo(
      0,
      datalist.options[0].offsetHeight * (currentFocus - c + 1)
    );
  };
  input.after(datalist);
  input.setAttribute("data-fv-suggestions", "");
  new ResizeObserver(() => {
    datalist.style.width = `${input.getBoundingClientRect().width}px`;
  }).observe(input);
}

/**
 * Show password strength info
 * @param {HTMLInputElement} input Input type password
 * @param {Options} options Validation options
 */
export function passwordInfo(input: HTMLInputElement, options: Options): void {
  if (input.hasAttribute("data-fv-password_info")) return;
  if (input.type != "password") return;
  const container = document.createElement("div");
  const additionalClass = options.passwordInfoClass ?? "";
  container.classList.add("fv-password", additionalClass);
  container.style.display = "none";
  container.setAttribute("target", `#${input.id}`);
  const content = `<div class="tittle">${language.passwordConditionsTitle}</div>
<div class="condition UC">${language.passwordConditionUppercase}</div>
<div class="condition LC">${language.passwordConditionLowercase}</div>
<div class="condition SC">${language.passwordConditionSpecialChars}</div>
<div class="condition NC">${language.passwordConditionNumericChars}</div>
<div class="condition L">${language.passwordConditionLength}</div>
<div class="strength-text"></div>
<div class="strength-bar"></div>`;
  container.innerHTML = content;
  input.after(container);
  input.setAttribute("data-fv-password_info", "");
  const strengthBar = document.querySelector<HTMLDivElement>(
      `div.fv-password[target="#${input.id}"] div.strength-bar`
    ) as HTMLDivElement,
    strength = document.querySelector<HTMLDivElement>(
      `div.fv-password[target="#${input.id}"] div.strength-text`
    ) as HTMLDivElement;
  input.addEventListener("blur", function () {
    container.style.display = "none";
  });
  input.addEventListener("input", function () {
    container.style.display = "block";
    strengthBar.classList.remove(
      "very-strong",
      "strong",
      "normal",
      "weak",
      "very-weak"
    );
    strength.innerHTML = "";
    document
      .querySelectorAll<HTMLDivElement>(
        `div.fv-password[target="#${input.id}"] div.condition`
      )
      .forEach((condition) => {
        condition.classList.remove("check", "no-check");
      });
    if (input.value.length == 0) return;
    const p = checkPasswordStrength(input.value);
    const checkList: string[] = p.check;
    const strengthLevel: number = p.strength;
    ["UC", "LC", "SC", "NC", "L"].forEach((c) => {
      document
        .querySelector<HTMLDivElement>(
          `div.fv-password[target="#${input.id}"] div.condition.${c}`
        )
        ?.classList.add(checkList.includes(c) ? "check" : "no-check");
    });
    switch (strengthLevel) {
      case 5:
        strength.innerHTML = language.passwordStrengthVeryStrong;
        strengthBar.classList.add("very-strong");
        break;
      case 4:
        strength.innerHTML = language.passwordStrengthStrong;
        strengthBar.classList.add("strong");
        break;
      case 3:
        strength.innerHTML = language.passwordStrengthNormal;
        strengthBar.classList.add("normal");
        break;
      case 2:
        strength.innerHTML = language.passwordStrengthWeak;
        strengthBar.classList.add("weak");
        break;
      case 1:
      default:
        strength.innerHTML = language.passwordStrengthVeryWeak;
        strengthBar.classList.add("very-weak");
        break;
    }
    input.setAttribute("data-fv-password_strength", strengthLevel.toString());
    const left =
      (parseFloat(window.getComputedStyle(input).width) -
        parseFloat(window.getComputedStyle(container).width)) /
      2;
    container.style.marginLeft = `${left}px`;
  });
}

/**
 * Set the field help message
 * @param {ValidationField} field The field to attach the message
 * @param {string} message The message to show
 */
export function fieldHelpMessage(
  field: ValidationField,
  message: string
): void {
  const span = document.createElement("span"),
    name = field.getAttribute("name");
  if (!name) return;
  span.classList.add("fv-help_message");
  span.setAttribute("for", name);
  span.textContent = message;
  span.style.display = "none";
  if (field.hasAttribute("data-fv-suggestions")) {
    const dt = document.querySelector<HTMLDataListElement>(
      `datalist.fv-suggestions[target="#${field.id}"]`
    ) as HTMLDataListElement;
    dt.after(span);
  } else if (field.hasAttribute("data-fv-password_info")) {
    const pi = document.querySelector<HTMLDivElement>(
      `div.fv-password[target="#${field.id}`
    ) as HTMLDivElement;
    pi.after(span);
  } else field.after(span);
}

/**
 * Get the parent of the field
 * @param {ValidationField} field The field element
 * @param {Options} options Validation options
 * @param {HTMLFormElement} form The validated field parent form
 * @returns {HTMLElement | null} Parent element or null if the parent is the form
 */
function getFieldParent(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options
): HTMLElement | null {
  let parent: HTMLElement | null = null;
  const p = form.querySelector<HTMLElement>(options.parentField.trim());
  if (p) parent = p ?? field.parentElement;
  if (parent?.nodeName == "FORM") parent = null;
  return parent;
}

/**
 * Get the invalid message for the validator
 * @param {ValidationField} field The validated field
 * @param {Validator} validator The validator
 * @param {Options} options Validation options
 * @param {Lang} language Form Validator language messages
 * @returns {string} Invalid message
 */
function getInvalidMessage(
  field: ValidationField,
  validator: Validator | AsyncValidator,
  options: Options,
  language: Lang
): string {
  let message = field.getAttribute(
    `${options.fieldInvalidMessageAttribute}-${
      validator.messageKey ?? validator.name
    }`
  );
  if (!message) {
    message = field.getAttribute(options.fieldInvalidMessageAttribute);
    if (!message) message = validator.invalidMessage;
  }
  return message;
}

/**
 * Get the valid message for the validator
 * @param {ValidationField} field The validated field
 * @param {Validator} validator The validator
 * @param {Options} options Validation options
 * @returns {string} Valid message
 */
function getValidMessage(
  field: ValidationField,
  validator: Validator | AsyncValidator,
  options: Options
): string {
  let message = field.getAttribute(
    `${options.fieldValidMessageAttribute}-${
      validator.messageKey ?? validator.name
    }`
  );
  if (!message) {
    message = field.getAttribute(options.fieldValidMessageAttribute);
    if (!message) message = validator.validMessage ?? "";
  }
  return message;
}

/**
 * Sets the styles for the field and their parent
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Form Validation options
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 */
export function setStyles(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  valid_invalid: boolean
): void {
  let fieldClass: string,
    fieldRemove: string,
    parentClass: string,
    parentRemove: string,
    labelClass: string,
    labelRemove: string;
  if (valid_invalid) {
    fieldClass = options.validClass;
    fieldRemove = options.invalidClass;
    parentClass = "Valid";
    parentRemove = "Invalid";
    labelClass = options.validLabelClass;
    labelRemove = options.invalidLabelClass;
  } else {
    fieldClass = options.invalidClass;
    fieldRemove = options.validClass;
    parentClass = "Invalid";
    parentRemove = "Valid";
    labelClass = options.invalidLabelClass;
    labelRemove = options.validLabelClass;
  }
  document
    .querySelectorAll<ValidationField>(`[name=${field.name}]`)
    .forEach((f) => {
      f.classList.remove(fieldRemove);
      f.classList.add(fieldClass);
      const parent = getFieldParent(f, form, options);
      if (parent) {
        parent.classList.remove(parentRemove);
        parent.classList.add(parentClass);
      }
      const name = ["checkbox", "radio"].includes(field.type)
        ? field.id
        : field.name;
      const label = document.querySelector(`label[for=${name}]`);
      if (label) {
        label.classList.remove(labelRemove);
        label.classList.add(labelClass);
      }
    });
}

/**
 * Removes the field style and its parent
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Validation options
 */
export function removeStyles(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options
): void {
  document
    .querySelectorAll<ValidationField>(`[name=${field.name}]`)
    .forEach((f) => {
      f.classList.remove(options.invalidClass);
      f.classList.remove(options.validClass);
      const parent = getFieldParent(f, form, options);
      if (parent) {
        parent.classList.remove("Valid");
        parent.classList.remove("Invalid");
      }
      const name = ["checkbox", "radio"].includes(field.type)
        ? field.id
        : field.name;
      const label = document.querySelector(`label[for=${name}]`);
      if (label) {
        label.classList.remove(options.validLabelClass);
        label.classList.remove(options.invalidLabelClass);
      }
    });
}

/**
 * Sets the field inline validation message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Validation options
 * @param {Configuration} configuration Validation configuration
 * @param {Lang} language Form Validator language
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 * @param {(Validator | AsyncValidator)} validator The validator
 */
function setInlineMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator | AsyncValidator
): void {
  const span = document.createElement("span"),
    parent = getFieldParent(field, form, options),
    fieldName =
      form.querySelector<HTMLLabelElement>(`label[for="${field.name}"]`)
        ?.textContent ?? field.name;
  let message: string;
  span.classList.add(options.inlineMessageClass);
  span.setAttribute("for-field", field.name);
  if (valid_invalid) {
    span.classList.add(options.validMessageClass);
    message = getValidMessage(field, validator, options);
    configuration.validMessages[form.id][fieldName] = message;
  } else {
    span.classList.add(options.invalidMessageClass);
    message = getInvalidMessage(field, validator, options, language);
    configuration.invalidMessages[form.id][fieldName] = message;
  }
  if (message.length == 0) return;
  span.innerText = message;
  span.style.display = "block";
  if (parent) {
    parent.insertAdjacentElement("beforeend", span);
  } else {
    field.after(span);
  }
  triggerMessageCallback(valid_invalid, options, form, field, message);
}

/**
 * Sets the field top validation message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Validation options
 * @param {Configuration} configuration Validation configuration
 * @param {Lang} language Form Validator language
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 * @param {(Validator | AsyncValidator)} validator The validator
 */
function setTopMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator | AsyncValidator
): void {
  let message: string;
  const fieldName =
    form.querySelector<HTMLLabelElement>(`label[for="${field.name}"]`)
      ?.textContent ?? field.name;
  const validView = options.topMessagesTemplate
      .replace("{topMessagesClass}", options.topMessagesClass)
      .replace("{formID}", form.id)
      .replace("{title}", language.validTitle)
      .replace("{valid_invalid}", options.validMessagesClass)
      .replace("{vi}", "valid"),
    invalidView = options.topMessagesTemplate
      .replace("{topMessagesClass}", options.topMessagesClass)
      .replace("{formID}", form.id)
      .replace("{title}", language.invalidTitle)
      .replace("{valid_invalid}", options.invalidMessagesClass)
      .replace("{vi}", "invalid");
  if (valid_invalid) {
    message = getValidMessage(field, validator, options);
    configuration.validMessages[form.id][fieldName] = message;
  } else {
    message = getInvalidMessage(field, validator, options, language);
    configuration.invalidMessages[form.id][fieldName] = message;
  }
  let validMessages = "",
    invalidMessages = "";
  for (const key in configuration.validMessages[form.id]) {
    if (configuration.validMessages[form.id][key].trim().length > 0)
      validMessages += `<li for="${key}"><strong>${key}</strong> ${
        configuration.validMessages[form.id][key]
      }</li>`;
  }
  for (const key in configuration.invalidMessages[form.id]) {
    if (configuration.invalidMessages[form.id][key].length > 0)
      invalidMessages += `<li for="${key}"><strong>${key}</strong> ${
        configuration.invalidMessages[form.id][key]
      }</li>`;
  }
  if (!valid_invalid && invalidMessages.length > 0)
    form.insertAdjacentHTML(
      "afterbegin",
      invalidView.replace("{fields&messagesList}", invalidMessages)
    );
  else if (valid_invalid && validMessages.length > 0)
    form.insertAdjacentHTML(
      "afterbegin",
      validView.replace("{fields&messagesList}", validMessages)
    );
  triggerMessageCallback(valid_invalid, options, form, field, message);
}

/**
 * Removes the field message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 */
export function removeInlineMessages(
  field: ValidationField,
  form: HTMLFormElement
): void {
  const span = form.querySelector<HTMLSpanElement>(
    `span[for-field="${field.name}"]`
  );
  if (span) span.remove();
}

/**
 * Remove all the top messages
 * @param {HTMLFormElement} form The validated fields parent form
 * @param {Configuration} configuration Validation configuration
 */
function removeTopMessage(
  form: HTMLFormElement,
  configuration: Configuration
): void {
  configuration.validMessages[form.id] = {};
  configuration.invalidMessages[form.id] = {};
  form
    .querySelectorAll<HTMLDivElement>(
      "div[data-fv-top-valid],div[data-fv-top-invalid]"
    )
    .forEach((div) => div.remove());
}

/**
 * Sync the top messages with the inline messages
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Configuration} configuration Validation configuration
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 */
function syncTopMessages(
  field: ValidationField,
  form: HTMLFormElement,
  configuration: Configuration,
  valid_invalid: boolean
): void {
  const fieldName =
    form.querySelector<HTMLLabelElement>(`label[for="${field.name}"]`)
      ?.textContent ?? field.name;
  if (!valid_invalid && configuration.validMessages[form.id][fieldName]) {
    delete configuration.validMessages[form.id][fieldName];
    form
      .querySelector<HTMLLIElement>(
        `div[data-fv-top-valid] li[for="${fieldName}"]`
      )
      ?.remove();
  } else if (
    valid_invalid &&
    configuration.invalidMessages[form.id][fieldName]
  ) {
    delete configuration.invalidMessages[form.id][fieldName];
    form
      .querySelector<HTMLLIElement>(
        `div[data-fv-top-invalid] li[for="${fieldName}"]`
      )
      ?.remove();
  }
  if (
    form.querySelectorAll<HTMLLIElement>(`div[data-fv-top-valid] li`).length ==
    0
  )
    form.querySelector<HTMLDivElement>(`div[data-fv-top-valid]`)?.remove();
  if (
    form.querySelectorAll<HTMLLIElement>(`div[data-fv-top-invalid] li`)
      .length == 0
  )
    form.querySelector<HTMLDivElement>(`div[data-fv-top-invalid]`)?.remove();
}

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
export function setMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator | AsyncValidator
): void {
  const isHidden =
    field.type == "hidden" || window.getComputedStyle(field).display == "none";
  syncTopMessages(field, form, configuration, valid_invalid);
  removeInlineMessages(field, form);
  if (valid_invalid && options.validMessagesPosition == "top") {
    form.querySelector<HTMLDivElement>(`div[data-fv-top-valid]`)?.remove();
    setTopMessage(
      field,
      form,
      options,
      configuration,
      language,
      valid_invalid,
      validator
    );
  } else if (
    valid_invalid &&
    options.validMessagesPosition == "inline" &&
    !isHidden
  ) {
    setInlineMessage(
      field,
      form,
      options,
      configuration,
      language,
      valid_invalid,
      validator
    );
  }
  if (!valid_invalid && options.invalidMessagesPosition == "top") {
    form.querySelector<HTMLDivElement>(`div[data-fv-top-invalid]`)?.remove();
    setTopMessage(
      field,
      form,
      options,
      configuration,
      language,
      valid_invalid,
      validator
    );
  } else if (
    !valid_invalid &&
    options.invalidMessagesPosition == "inline" &&
    !isHidden
  ) {
    setInlineMessage(
      field,
      form,
      options,
      configuration,
      language,
      valid_invalid,
      validator
    );
  }
}

/**
 * Remove all styles and messages
 * @param {HTMLFormElement} form The validated fields parent form
 * @param {Options} options Validation options
 * @param {Configuration} configuration Validation configuration
 */
export function formReset(
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration
): void {
  const fields = form.querySelectorAll<ValidationField>(
    'textarea, select, input:not([type="submit"],[type="button"],[type="reset"])'
  );
  fields.forEach((field) => {
    removeStyles(field, form, options);
    removeInlineMessages(field, form);
  });
  removeTopMessage(form, configuration);
}

/**
 * Toggles the visibility of the help messages
 * @param {ValidationField} field Field owner of the help message
 * @param {HTMLFormElement} form Form to search fields
 * @param {Options} options Validation options
 * @param {Boolean} show Show or hide de message
 */
export function toggleHelpMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  show: boolean
): void {
  if (options.showHelpMessagesOnFocus) {
    const name = field.name ?? "",
      span = form.querySelector<HTMLSpanElement>(
        `span.fv-help_message[for="${name}"]`
      );
    if (span) {
      span.style.display = show ? "block" : "none";
    }
  }
}

/**
 * Adds the valid class in all no validated fields
 * @param {HTMLFormElement} form Form to search fields
 * @param {Options} options Validation options
 */
export function addValidStyleInAllFields(
  form: HTMLFormElement,
  options: Options
): void {
  if (!options.addValidClassOnAll) return;
  const fields = form.querySelectorAll<ValidationField>(
    `textarea:not(.${options.validClass}, .${options.invalidClass}), input:not(.${options.validClass}, .${options.invalidClass}), select:not(.${options.validClass}, .${options.invalidClass})`
  );
  fields.forEach((field) => setStyles(field, form, options, true));
}
