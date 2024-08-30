import { language, configuration } from "../config";
import { getImageDimensions, sizeStringToBytes } from "../utils";

/* Checks if the size of the selected files is correct  */
configuration.validators["file_size"] = {
  name: "file_size",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type == "file") {
      const files = field.files;
      if (files) {
        const sizeSTR = field.getAttribute("data-fv-file_max_size") ?? "5MB";
        const maxSize = sizeStringToBytes(sizeSTR);
        let check = true;
        for (const file of Array.from(files)) {
          if (file.size > maxSize) {
            check = false;
            break;
          }
        }
        if (!check) {
          this.invalidMessage = lang.inv_file_size.replace("{max}", sizeSTR);
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "file_size",
};

/* Checks if the selected files are of the correct MIME type */
configuration.validators["file_type"] = {
  name: "file_type",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type === "file") {
      const files = field.files;
      if (files) {
        const typeList = (field.getAttribute("data-fv-file_type") ?? "").split(
          /[,|-]+\s*|\s+/
        );
        const check = Array.from(files).every((file) =>
          typeList.includes(file.type)
        );
        if (!check) {
          this.invalidMessage = lang.inv_file_type.replace(
            "{type}",
            `(${typeList.join(", ")})`
          );
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "file_type",
};

/* Checks if the selected files has the correct extension */
configuration.validators["file_extension"] = {
  name: "file_extension",
  validatorFunction: function (value, form, field, options, lang) {
    if (field instanceof HTMLInputElement && field.type === "file") {
      const files = field.files;
      if (files) {
        const extensionList = (
          field.getAttribute("data-fv-file_extension") ?? ""
        ).split(/[,|-]+\s*|\s+/);
        const check = Array.from(files).every((file) =>
          extensionList.includes(
            file.name.slice(file.name.lastIndexOf(".") + 1)
          )
        );
        if (!check) {
          this.invalidMessage = lang.inv_file_extension.replace(
            "{extension}",
            `(${extensionList.join(", ")})`
          );
        }
        return check;
      }
    }
    return false;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "file_extension",
};

/* Checks if the selected images have the correct dimensions */
configuration.asyncValidators["image_dimension"] = {
  name: "image_dimension",
  validatorFunction: async function (value, form, field, options, lang) {
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const dimension = field.getAttribute("data-fv-image_dimension") ?? "";
    if (dimension.trim().length === 0) return false;
    const files = field.files;
    if (!files) return false;
    const [width, height] = dimension.split("x").map(Number);
    let check = false;
    for (const file of Array.from(files)) {
      if (!file.type.includes("image")) {
        this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
        check = false;
        break;
      }
      const dim = await getImageDimensions(file);
      check = dim[0] == width && dim[1] == height;
      if (!check) {
        this.invalidMessage = lang.inv_image_dimension;
        break;
      }
    }
    return check;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "image_dimension",
};

/* Checks if the selected images have the correct height */
configuration.asyncValidators["image_height"] = {
  name: "image_height",
  validatorFunction: async function (value, form, field, options, lang) {
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const height = field.getAttribute("data-fv-image_height") ?? "";
    if (height.trim().length === 0) return false;
    const files = field.files;
    if (!files) return false;
    let check = false;
    for (const file of Array.from(files)) {
      if (!file.type.includes("image")) {
        this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
        check = false;
        break;
      }
      const dim = await getImageDimensions(file);
      check = dim[0] <= parseFloat(height);
      if (!check) {
        this.invalidMessage = lang.inv_image_heigh.replace("{max}", height);
        break;
      }
    }
    return check;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "image_height",
};

/* Checks if the selected images have the correct width */
configuration.asyncValidators["image_width"] = {
  name: "image_width",
  validatorFunction: async function (value, form, field, options, lang) {
    if (!(field instanceof HTMLInputElement && field.type === "file"))
      return false;
    const width = field.getAttribute("data-fv-image_width") ?? "";
    if (width.trim().length === 0) return false;
    const files = field.files;
    if (!files) return false;
    let check = false;
    for (const file of Array.from(files)) {
      if (!file.type.includes("image")) {
        this.invalidMessage = lang.inv_file_type.replace("{type}", "image/*");
        check = false;
        break;
      }
      const dim = await getImageDimensions(file);
      check = dim[0] <= parseFloat(width);
      if (!check) {
        this.invalidMessage = lang.inv_image_width.replace("{max}", width);
        break;
      }
    }
    return check;
  },
  invalidMessage: language.notConfirmed,
  messageKey: "image_width",
};
