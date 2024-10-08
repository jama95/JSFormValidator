/*global FormValidator */
/*global es */
const fv = FormValidator({}, es);
fv.validate("f");
fv.restrict("rsl1", "letters");
fv.restrict("rsl2", "letters", "", " ");
fv.restrict("rsn1", "numbers");
fv.restrict("rsn2", "numbers", "", ".");
fv.setPasswordInfo("pass");
fv.setSuggestions("city", ["Guayaquil", "Quito", "Cuenca"]);
fv.setTextAreaLengthRestriction("t1", 5000, "both");
fv.validate("login", {
  ignoredFieldsNames: "ig",
  invalidMessagesPosition: "top",
  scrollToTopOnInvalid: true,
  addValidClassOnAll: true,
  validateHiddenFields: false,
  validMessageCallback: function (form, field, message) {
    const p = document.getElementById("log");
    p.innerText += `* El valor del campo '${field.name}' del formulario '${form.id}' si es válido. Mensaje: ${message}\n`;
    p.scrollBy(0, p.clientHeight);
  },
  invalidMessageCallback: function (form, field, message) {
    const p = document.getElementById("log");
    p.innerText += `* El valor del campo '${field.name}' del formulario '${form.id}' no es válido. Mensaje: ${message}\n`;
    p.scrollBy(0, p.clientHeight);
  },
});
document.querySelector("#login").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Anything");
});
