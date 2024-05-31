import { language, configuration } from "../config";
import { getImageDimensions, sizeStringToBytes } from "../utils";

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
  invalidMessageKey: "inv_image_dimension",
  validMessageKey: "val_image_dimension",
};

let dimensionImageMessage = language.notConfirmed;

/* Checks if the selected images has the correct dimension */
configuration.asyncValidators["image_dimension"] = {
  name: "image_dimension",
  validatorFunction: async function (value, form, field, options, lang) {
    dimensionImageMessage = language.notConfirmed;
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const dimension = field.getAttribute("data-fv-image_dimension") || "";
    if (dimension.trim().length === 0) return false;
    let bck = "";
    if (field.hasAttribute("data-fv-file_type"))
      bck = field.getAttribute("data-fv-file_type") as string;
    field.setAttribute("data-fv-file_type", "image/jpeg, image/png, image/gif");
    const isImage = configuration.validators["image_type"].validatorFunction(
      value,
      form,
      field,
      options,
      lang
    );
    if (!isImage) {
      dimensionImageMessage = lang.inv_file_type.replace(
        "{type}",
        "image/jpeg, image/png, image/gif"
      );
      return false;
    }
    field.setAttribute("data-fv-file_type", bck);
    const files = field.files;
    if (!files) return false;
    const [width, height] = dimension.split("x").map(Number);
    let check = false;
    for (const file of files) {
      const dim = await getImageDimensions(file);
      check = dim[0] == width && dim[1] == height;
      if (!check) {
        dimensionImageMessage = lang.inv_image_dimension;
        break;
      }
    }
    return check;
  },
  invalidMessage: dimensionImageMessage,
  invalidMessageKey: "inv_image_dimension",
  validMessageKey: "val_image_dimension",
};

let heightImageMessage = language.notConfirmed;

configuration.asyncValidators["image_width"] = {
  name: "image_width",
  validatorFunction: async function (value, form, field, options, lang) {
    heightImageMessage = language.notConfirmed;
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const width = field.getAttribute("data-fv-image_dimension") || "";
    if (width.trim().length === 0) return false;
    let bck = "";
    if (field.hasAttribute("data-fv-file_type"))
      bck = field.getAttribute("data-fv-file_type") as string;
    field.setAttribute("data-fv-file_type", "image/jpeg, image/png, image/gif");
    const isImage = configuration.validators["image_type"].validatorFunction(
      value,
      form,
      field,
      options,
      lang
    );
    if (!isImage) {
      heightImageMessage = lang.inv_file_type.replace(
        "{type}",
        "image/jpeg, image/png, image/gif"
      );
      return false;
    }
    field.setAttribute("data-fv-file_type", bck);
    const files = field.files;
    if (!files) return false;
    let check = false;
    for (const file of files) {
      const dim = await getImageDimensions(file);
      check = dim[0] > parseFloat(width);
      if (!check) {
        heightImageMessage = lang.inv_image_heigh;
        break;
      }
    }
    return check;
  },
  invalidMessage: heightImageMessage,
  invalidMessageKey: "inv_image_width",
  validMessageKey: "val_image_width",
};

let widthImageMessage = language.notConfirmed;

configuration.asyncValidators["image_width"] = {
  name: "image_width",
  validatorFunction: async function (value, form, field, options, lang) {
    widthImageMessage = language.notConfirmed;
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const width = field.getAttribute("data-fv-image_dimension") || "";
    if (width.trim().length === 0) return false;
    let bck = "";
    if (field.hasAttribute("data-fv-file_type"))
      bck = field.getAttribute("data-fv-file_type") as string;
    field.setAttribute("data-fv-file_type", "image/jpeg, image/png, image/gif");
    const isImage = configuration.validators["image_type"].validatorFunction(
      value,
      form,
      field,
      options,
      lang
    );
    if (!isImage) {
      widthImageMessage = lang.inv_file_type.replace(
        "{type}",
        "image/jpeg, image/png, image/gif"
      );
      return false;
    }
    field.setAttribute("data-fv-file_type", bck);
    const files = field.files;
    if (!files) return false;
    let check = false;
    for (const file of files) {
      const dim = await getImageDimensions(file);
      check = dim[0] > parseFloat(width);
      if (!check) {
        widthImageMessage = lang.inv_image_width;
        break;
      }
    }
    return check;
  },
  invalidMessage: widthImageMessage,
  invalidMessageKey: "inv_image_width",
  validMessageKey: "val_image_width",
};
