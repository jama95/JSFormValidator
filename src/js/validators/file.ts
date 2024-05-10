import { language, configuration } from "../config";
import { sizeStringToBytes } from "../utils";

let sizeFileMessage = language.notConfirmed;

/* Checks if the selected files size has the correct size  */
configuration.validators["file_size"] = {
  name: "file_size",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type == "file") {
      const files = field.files;
      if (files) {
        const sizeSTR = field.getAttribute("data-fv-file_max_size") || "5MB";
        const maxSize = sizeStringToBytes(sizeSTR);
        let check = true;
        for (const file of files) {
          if (file.size > maxSize) {
            check = false;
            break;
          }
        }
        if (!check) {
          sizeFileMessage = lang.invalidFileSize.replace("{max}", sizeSTR);
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: sizeFileMessage,
  invalidMessageKey: "inv_file_size",
  validMessage: "val_file_size",
};

let typeFileMessage = language.notConfirmed;

/* Checks if the selected files has the correct type (mime) */
configuration.validators["file_type"] = {
  name: "file_type",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type === "file") {
      const files = field.files;
      if (files) {
        let typeList = (field.getAttribute("data-fv-file_type") || "").split(
          /[,|-]+\s*|\s+/
        );
        let check = Array.from(files).every((file) =>
          typeList.includes(file.type)
        );
        if (!check) {
          typeFileMessage = lang.invalidFileType.replace(
            "{type}",
            `(${typeList.join(", ")})`
          );
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: typeFileMessage,
  invalidMessageKey: "inv_file_type",
  validMessageKey: "val_file_type",
};

let extensionFileMessage = language.notConfirmed;

/* Checks if the selected files has the correct extension */
configuration.validators["file_extension"] = {
  name: "file_extension",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type === "file") {
      const files = field.files;
      if (files) {
        let extensionList = (
          field.getAttribute("data-fv-file_extension") || ""
        ).split(/[,|-]+\s*|\s+/);
        let check = Array.from(files).every((file) =>
          extensionList.includes(
            file.name.slice(file.name.lastIndexOf(".") + 1)
          )
        );
        if (!check) {
          extensionFileMessage = lang.invalidFileExtension.replace(
            "{extension}",
            `(${extensionList.join(", ")})`
          );
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: extensionFileMessage,
  invalidMessageKey: "inv_file_extension",
  validMessageKey: "val_file_extension",
};

let dimensionImageMessage = language.notConfirmed;

/* Checks if the selected images has the correct dimension */
configuration.validators["image_dimension"] = {
  name: "",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type === "file") {
      const dimension = field.getAttribute("data-fv-image_dimension") || "";
      if (dimension.trim().length === 0) return false;
      field.setAttribute(
        "data-fv-file_type",
        "image/jpeg, image/png, image/gif"
      );
      const isImage = configuration.validators[
        "image_dimension"
      ].validatorFunction(value, form, field, options, lang);
      if (!isImage) {
        dimensionImageMessage = lang.invalidFileType.replace(
          "{type}",
          "image/jpeg, image/png, image/gif"
        );
        return false;
      }
      const files = field.files;
      if (files) {
        const [width, height] = dimension.split("x").map(Number);
        const reader = new FileReader();
        let check = true;
        for (const file of files) {
          reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
              if ((image.width > width || image.height > height) && !check)
                check = false;
            };
            image.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }
        if (!check) dimensionImageMessage = lang.invalidImageDim;
        return check;
      }
    }
    return false;
  },
  invalidMessage: dimensionImageMessage,
  invalidMessageKey: "inv_image_dimension",
  validMessageKey: "val_image_dimension",
};
