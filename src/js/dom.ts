import { language } from "./config";
import {
  Options,
  Lang,
  Validator,
  Suggestion,
  ValidationField,
  Configuration,
} from "./types";
import { checkPasswordStrength, triggerMessageCallback } from "./utils";

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
  };
  const position = function () {
    TextArea.dispatchEvent(new Event("input"));
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
  TextArea.addEventListener("input", characterCount);
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
  if (words.length == 0) return;
  let currentFocus = -1; // The first option element index is 0
  const datalist = document.createElement("datalist");
  datalist.classList.add("fv-suggestions");
  datalist.classList.add(settings.containerClass);
  datalist.style.maxHeight = settings.maxHeight;
  datalist.style.display = "none";
  datalist.setAttribute("target", `#${input.id}`);
  input.setAttribute("autocomplete", "off");
  input.setAttribute("list", "");
  const fillDatalist = function (words: string[]) {
    currentFocus = -1;
    while (datalist.firstChild) datalist.removeChild(datalist.firstChild);
    for (let word of words) {
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
  // Hide the datalist when it is not focused
  input.addEventListener("blur", function () {
    let no = document.querySelector<HTMLDataListElement>(
      `datalist.fv-suggestions[target="#${input.id}"] option:hover`
    );
    if (no) return;
    datalist.style.display = "none";
  });
  // Shows all options when double-clicked
  input.addEventListener("dblclick", function () {
    fillDatalist(words);
  });
  // Shows matched options when input
  input.addEventListener("input", function () {
    datalist.style.display = "none";
    if (input.value.trim().length == 0) return;
    setTimeout(() => {
      const regexp = new RegExp(input.value, "i");
      const match = words.filter((word) => regexp.test(word));
      if (match.length > 0) fillDatalist(match);
    }, 200);
  });
  // Choose an option with the keyboard
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
  // Select an option with the keyboard
  const addActive = function () {
    let selected = document.querySelector<HTMLDataListElement>(
      "datalist.fv-suggestions option.active"
    );
    if (selected) selected.classList.remove("active");
    if (currentFocus >= datalist.options.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = datalist.options.length - 1;
    datalist.options[currentFocus].classList.add("active");
    return true;
  };
  // Simulates de scroll move when use up and down arrows
  const simulateScroll = function () {
    currentFocus = currentFocus <= -1 ? 0 : currentFocus;
    currentFocus =
      currentFocus > datalist.options.length - 1
        ? datalist.options.length - 1
        : currentFocus;
    let c = Math.floor(
      parseInt(datalist.style.maxHeight, 10) / datalist.options[0].offsetHeight
    );
    datalist.scrollTo(
      0,
      datalist.options[0].offsetHeight * (currentFocus - c + 1)
    );
  };
  // Append the DataList for the input in the DOM
  input.after(datalist);
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
  if (input.type != "password") return;
  const container = document.createElement("div");
  let additionalClass = options.passwordInfoClass ?? "";
  container.classList.add("fv-password", additionalClass);
  container.style.display = "none";
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
  let strengthBar = document.querySelector<HTMLDivElement>(
      "div.fv-password div.strength-bar"
    ) as HTMLDivElement,
    strength = document.querySelector<HTMLDivElement>(
      "div.fv-password div.strength-text"
    ) as HTMLDivElement;
  input.addEventListener("focus", function () {
    container.style.display = "block";
  });
  input.addEventListener("blur", function () {
    container.style.display = "none";
  });
  input.addEventListener("input", function () {
    strengthBar.classList.remove(
      "very-strong",
      "strong",
      "normal",
      "weak",
      "very-weak"
    );
    strength.innerHTML = "";
    document
      .querySelectorAll<HTMLDivElement>("div.fv-password div.condition")
      .forEach((condition) => {
        condition.classList.remove("check", "no-check");
      });
    if (input.value.length == 0) return;
    const p = checkPasswordStrength(input.value);
    const checkList: string[] = p.check;
    const strengthLevel: number = p.strength;
    ["UC", "LC", "SC", "NC", "L"].forEach((c) => {
      document
        .querySelector<HTMLDivElement>(`div.fv-password div.condition.${c}`)
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
  field.after(span);
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
  let p = form.querySelectorAll<HTMLElement>(options.parentField.trim());
  if (p) parent = p[0] ?? field.parentElement;
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
  validator: Validator,
  options: Options,
  language: Lang
): string {
  let message = field.getAttribute(
    `${options.fieldInvalidMessageAttribute}-${validator.name}`
  );
  if (!message) {
    message = field.getAttribute(options.fieldInvalidMessageAttribute);
    if (!message) message = language[validator.invalidMessageKey];
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
  validator: Validator,
  options: Options
): string {
  let message = field.getAttribute(
    `${options.fieldValidMessageAttribute}-${validator.name}`
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
    parent = getFieldParent(field, form, options),
    parentClass: string,
    parentRemove: string;
  if (valid_invalid) {
    fieldClass = options.validClass;
    fieldRemove = options.invalidClass;
    parentClass = options.validParentClass;
    parentRemove = options.invalidParentClass;
  } else {
    fieldClass = options.invalidClass;
    fieldRemove = options.validClass;
    parentClass = options.invalidParentClass;
    parentRemove = options.validParentClass;
  }
  document.querySelectorAll(field.name).forEach((f) => {
    f.classList.remove(fieldRemove);
    f.classList.add(fieldClass);
  });
  if (parent) {
    parent.classList.remove(parentRemove);
    parent.classList.add(parentClass);
  }
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
  let parent = getFieldParent(field, form, options);
  document.querySelectorAll(field.name).forEach((f) => {
    f.classList.remove(options.invalidClass);
    f.classList.remove(options.validClass);
  });
  if (parent) {
    parent.classList.remove(options.validParentClass);
    parent.classList.remove(options.invalidParentClass);
  }
}

/**
 * Sets the field inline validation message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Validation options
 * @param {Lang} language Form Validator language
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 * @param {Validator} validator The validator
 */
function setInlineMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator
): void {
  const span = document.createElement("span");
  let parent = getFieldParent(field, form, options),
    fieldName =
      form.querySelector<HTMLLabelElement>(`label[for="${field.name}"]`)
        ?.textContent ?? "",
    message: string;
  span.classList.add(options.inlineMessageClass);
  if (!fieldName) fieldName = field.name;
  span.setAttribute("for-field", fieldName);
  if (valid_invalid) {
    span.classList.add(options.validMessageClass);
    message = getValidMessage(field, validator, options);
  } else {
    span.classList.add(options.invalidMessageClass);
    message = getInvalidMessage(field, validator, options, language);
  }
  span.innerText = message;
  if (parent) {
    parent.insertAdjacentElement("afterend", span);
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
 * @param {Configuration} configuration Form Validator configuration
 * @param {Lang} language Form Validator language
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 * @param {Validator} validator The validator
 */
function setTopMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator
): void {
  let message: string,
    validView = options.topMessagesTemplate,
    invalidView = options.topMessagesTemplate,
    fieldName =
      form.querySelector<HTMLLabelElement>(`label[for="${field.name}"]`)
        ?.textContent ?? "";
  if (!fieldName) fieldName = field.name;
  validView.replace("{topMessageClass}", options.topMessagesClass);
  invalidView.replace("{topMessageClass}", options.topMessagesClass);
  if (valid_invalid) {
    validView.replace("{title}", language.validTitle);
    validView.replace("{valid_invalid}", options.validMessagesClass);
    message = getValidMessage(field, validator, options);
    configuration.validMessages[fieldName] = message;
    if (configuration.invalidMessages[fieldName])
      delete configuration.invalidMessages[fieldName];
  } else {
    invalidView.replace("{title}", language.invalidTitle);
    invalidView.replace("{valid_invalid}", options.invalidMessagesClass);
    message = getInvalidMessage(field, validator, options, language);
    configuration.invalidMessages[fieldName] = message;
    if (configuration.validMessages[fieldName])
      delete configuration.validMessages[fieldName];
  }
  let validMessages = "",
    invalidMessages = "";
  for (const key in configuration.validMessages) {
    if (configuration.validMessages[key].trim().length > 0)
      validMessages += `<li><strong>${key}</strong>: ${configuration.validMessages[key]}</li>`;
  }
  for (const key in configuration.invalidMessages) {
    if (configuration.invalidMessages[key].length > 0)
      invalidMessages += `<li><strong>${key}</strong>: ${configuration.invalidMessages[key]}</li>`;
  }
  if (validMessages.length > 0) {
    validView.replace("{fields&messagesList}", validMessages);
    form.insertAdjacentHTML("afterbegin", validView);
  }
  if (invalidMessages.length > 0) {
    invalidView.replace("{fields&messagesList}", invalidMessages);
    form.insertAdjacentHTML("afterbegin", invalidView);
  }
  triggerMessageCallback(valid_invalid, options, form, field, message);
}

/**
 * Removes the field message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 */
function removeInlineMessages(
  field: ValidationField,
  form: HTMLFormElement
): void {
  let span = form.querySelector<HTMLSpanElement>(
    `span[for-field="${field.name}"]`
  );
  if (span) span.remove();
}

/**
 * Remove all the top messages
 * @param {HTMLFormElement} form The validated fields parent form
 * @param {Options} options Validation options
 */
function removeTopMessage(form: HTMLFormElement, options: Options): void {
  options.validMessages = {};
  options.invalidMessages = {};
  const classes = options.topMessagesClass.split(" ").join(".");
  let ul = form.querySelector<HTMLUListElement>(
    `.fv-top-messages.${classes} ul`
  );
  if (ul) ul.innerHTML = "";
}

/**
 * Sets the field validation message
 * @param {ValidationField} field The validated field
 * @param {HTMLFormElement} form The validated field parent form
 * @param {Options} options Validation options
 * @param {Configuration} configuration Form Validator configuration
 * @param {Lang} language Form Validator language
 * @param {boolean} valid_invalid True if is valid, false if is invalid
 * @param {Validator} validator The validator
 */
export function setMessage(
  field: ValidationField,
  form: HTMLFormElement,
  options: Options,
  configuration: Configuration,
  language: Lang,
  valid_invalid: boolean,
  validator: Validator
): void {
  if (
    options.invalidMessagesPosition == "inline" ||
    options.validMessagesPosition == "inline"
  ) {
    removeInlineMessages(field, form);
    setInlineMessage(field, form, options, language, valid_invalid, validator);
  }
  if (
    options.invalidMessagesPosition == "top" ||
    options.validMessagesPosition == "top"
  ) {
    removeTopMessage(form, options);
    setTopMessage(
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
 */
export function formReset(form: HTMLFormElement, options: Options): void {
  let fields = form.querySelectorAll<ValidationField>(
    'textarea, select, input:not([type="submit"],[type="button"],[type="reset"])'
  );
  fields.forEach((field) => {
    removeStyles(field, form, options);
    removeInlineMessages(field, form);
  });
  removeTopMessage(form, options);
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
    let name = field.getAttribute("name") ?? "",
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
  let fields = form.querySelectorAll<ValidationField>(
    `textarea:not(.${options.validClass}, .${options.invalidClass}), input:not(.${options.validClass}, .${options.invalidClass}), select:not(.${options.validClass}, .${options.invalidClass})`
  );
  fields.forEach((field) => setStyles(field, form, options, true));
}
