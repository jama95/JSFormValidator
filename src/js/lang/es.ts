import type { Lang } from "../types";
import FV from "../FormValidator";

(function (window) {
  const es: Lang = {
    validTitle: "Formulario enviado correctamente!",
    invalidTitle: "¡Falló el envío del formulario!",
    required: "Este campo es obligatorio",
    invalidTime: "La hora indicada es incorrecta",
    invalidEmail: "La dirección de correo electrónico ingresada es incorrecta",
    invalidTelephone: "El número de teléfono ingresado es incorrecto",
    invalidSecurityAnswer:
      "La respuesta a la pregunta de seguridad es incorrecta",
    invalidDate: "La fecha indicada es incorrecta",
    invalidLength:
      "El valor ingresado debe estar comprendido entre {range} caracteres",
    lengthTooLongStart: "El valor ingresado es superior a ",
    lengthTooShortStart: "El valor ingresado es inferior a ",
    notConfirmed: "No se han podido confirmar los valores ingresados",
    invalidDomain: "El dominio ingresado es incorrecto",
    invalidUrl: "La URL ingresada es incorrecta",
    invalidCustomVal: "El valor ingresado es incorrecto",
    andSpaces: " y espacios ",
    invalidNumber: "El valor ingresado no es un número aceptado",
    invalidStrength: "La contraseña no es lo suficientemente fuerte",
    invalidNumberOfSelectedOptions: "Debe elegir al menos {options} respuestas",
    invalidAlphaNumeric:
      "El valor ingresado sólo puede contener letras y números ",
    invalidAlphaNumericExtra: " y ",
    invalidFileSize:
      "El archivo que está intentando cargar es demasiado grande (max %s)",
    invalidFileType: "Sólo se permiten archivos del tipo %s",
    groupCheckedRangeStart: "Por favor, elige entre {range} ítem(s)",
    groupCheckedTooFewStart: "Por favor, elija al menos {number} ítem(s)",
    groupCheckedTooManyStart: "Por favor, elija un máximo de {number} ítem(s)",
    invalidCreditCard: "El número de tarjeta de crédito no es correcto",
    invalidCVV: "El número CVV no es correcto",
    invalidImageDim: "Las dimensiones de la imagen son incorrectas",
    imageTooTall: "la imagen no puede tener un alto mayor a",
    imageTooWide: "la imagen no puede tener un ancho mayor a",
    imageTooSmall: "la imagen es demasiado pequeña",
    min: "mínimo",
    max: "máximo",
    imageRatioNotAccepted: "El ratio de la imagen no se acepta",
    passwordComplexityStart: "La contraseña debe contener al menos ",
    passwordComplexityUppercaseInfo: "Letra(s) mayúscula(s)",
    passwordComplexityLowercaseInfo: "Letra(s) minúscula(s)",
    passwordComplexitySpecialCharsInfo: "Carácter(es) especial(es)",
    passwordComplexityNumericCharsInfo: "Carácter(es) numérico(s)",
    passwordComplexityEnd: ".",
    locale: "es-EC",
    currencyCode: "USD",
    decimal: ",",
  };
  window.addEventListener("validatorsLoaded", function () {
    FV().registerLanguage(es);
  });
})(window);
