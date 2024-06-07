import { configuration, language } from "../config";

// Regex according to RFC791 and RFC4632, compatible with "test" and "match"
const IPv4Regex =
  "((?:25[0-5]|2[0-4]\\d|1?\\d{1,2})(?:\\x2E(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){3})";
const IPv4Prefix = "(\\x2F(?:3[0-2]|[12]?\\d))?";
const IPv4Complete = `${IPv4Regex}${IPv4Prefix}`;

/* Checks if the field value has the correct format of an ipv4  */
configuration.validators["ipv4"] = {
  name: "ipv4",
  validatorFunction: function (value, form, field, options, lang) {
    let regex = new RegExp(`^${IPv4Complete}$`);
    if (regex.test(value)) return true;
    return false;
  },
  invalidMessage: language.invalidIPv4,
  invalidMessageKey: "inv_ipv4",
  validMessageKey: "val_ipv4",
};

// Regex according to RFC4291, RFC4007 and RFC5952, compatible with "test" and "match"
const IPv6Regex =
  "(?:((?:[\\da-f]{1,4}\\x3A){7}[\\da-f]{1,4})|((?:[\\da-f]{1,4}\\x3A){1,6}\\x3A)|((?:[\\da-f]{1,4}\\x3A){1,5}\\x3A[\\da-f]{1,4})|((?:[\\da-f]{1,4}\\x3A){1,4}(?:\\x3A[\\da-f]{1,4}){1,2})|((?:[\\da-f]{1,4}\\x3A){1,3}(?:\\x3A[\\da-f]{1,4}){1,3})|((?:[\\da-f]{1,4}\\x3A){1,2}(?:\\x3A[\\da-f]{1,4}){1,4})|((?:[\\da-f]{1,4}\\x3A)(?:\\x3A[\\da-f]{1,4}){1,5})|(\\x3A(?:(?:\\x3A[\\da-f]{1,4}){1,6}|\\x3A)))";
const IPv6Zone = "(\\x25[\\da-zA-Z\\x2D\\x5F]+)?";
const IPv6Prefix = "(\\x2F(?:1[0-2][0-8]?|\\d\\d?))?";
const IPv6Mapped = `((\\x3A\\x3Affff\\x3A)${IPv4Regex}${IPv6Zone})`;
const IPv6Local = `(?:(fe80(?:(?:\\x3A[\\da-f]{1,4}){7}|(?:(?:\\x3A[\\da-f]{1,4}){1,5}\\x3A\\x3A)|(?:(?:\\x3A[\\da-f]{1,4}){4}\\x3A(?:\\x3A[\\da-f]{1,4}))|(?:(?:\\x3A[\\da-f]{1,4}){3}\\x3A(?:\\x3A[\\da-f]{1,4}){1,2})|(?:(?:\\x3A[\\da-f]{1,4}){2}\\x3A(?:\\x3A[\\da-f]{1,4}){1,3})|(?:(?:\\x3A[\\da-f]{1,4}){1}\\x3A(?:\\x3A[\\da-f]{1,4}){1,4})|(?:\\x3A(?:(?:\\x3A[\\da-f]{1,4}){1,5}|\\x3A))))${IPv6Zone})`;
const IPv6Complete = `(${IPv6Regex}${IPv6Zone}${IPv6Prefix})`;
const IPv6Full = `^${IPv6Mapped}$|^${IPv6Local}$|^${IPv6Complete}$`;

/**
 * Check the zeros rules in the ipv6 address
 * @param {string} ip ipv6 address
 * @returns {boolean}
 */
function zeros(ip: string): boolean {
  const segments = ip
    .split("::")
    .flatMap((p) => p.split(":"))
    .filter((s) => s.length > 0);
  const OnlyOne0 = segments.filter((s) => /^(0{2,4})$/.test(s));
  if (OnlyOne0.length > 0) return false;
  if (/^(0\x3A){7}0$/.test(ip)) return false;
  const noLeading0 = segments.filter((s) => s === "0" || !s.startsWith("0"));
  if (noLeading0.length != segments.length) return false;
  if (/\x3A\x3A/.test(ip)) {
    if (/(^|\x3A)0\x3A\x3A|\x3A\x3A0(\x3A|$)/.test(ip)) return false;
    const Reduced0 = 8 - segments.length;
    const zeros = segments.map((s) => (s == "0" ? s : "-")).join("");
    if (new RegExp(`0{${Reduced0 + 1},}`).test(zeros)) return false;
    if (/0{2,}/.test(zeros)) {
      const reducedIndex = ip.indexOf("::");
      const start0Index = zeros.search(/0{2,}/);
      if (start0Index > reducedIndex) return false;
    }
  }
  return true;
}

/* Checks if the field value has the correct format of an ipv6 */
configuration.validators["ipv6"] = {
  name: "ipv6",
  validatorFunction: function (value, form, field, options, lang) {
    let zerosRule = field.getAttribute("data-fv-IPv6_zeros") == "true";
    let regex = new RegExp(`${IPv6Full}`);
    if (regex.test(value)) {
      if (!new RegExp(IPv4Regex).test(value)) {
        value = value.replace(new RegExp(IPv6Prefix.slice(0, -1)), "");
        value = value.replace(new RegExp(IPv6Zone.slice(0, -1)), "");
        if (zerosRule) return zeros(value);
      }
      return true;
    }
    return false;
  },
  invalidMessage: language.invalidIPv6,
  invalidMessageKey: "inv_ipv6",
  validMessageKey: "val_ipv6",
};

// Regex according to RFC1034, RFC1035 and RFC3696, compatible with "test" and "match"
const domainRegex =
  "(((?:[a-z][a-z\\d\\x2D]{0,61}[a-z\\d]?\\x2E)+)([a-z\\d][a-z\\d\\x2D]*[a-z\\d]\\x2E?))";

/* Checks if the field value has the correct format of a domain name */
configuration.validators["domain"] = {
  name: "domain",
  validatorFunction: function (value, form, field, options, lang) {
    if (value.length > 253) return false;
    if (/\x2D{2,}/.test(value)) return false;
    const regex = new RegExp(`^${domainRegex}$`, "i");
    if (!regex.test(value)) return false;
    if (value.endsWith(".")) value = value.slice(0, -1);
    const labels = value.toUpperCase().split(".");
    const TLD = labels.pop();
    if (TLD?.search(/[^A-Z]/)) return false;
    const subdomains = labels;
    subdomains.filter((s) => /\x2D{2,}/.test(s));
    if (subdomains.length > 0) return false;
    let equal = false;
    for (let i = 0; i <= labels.length - 2; i++) {
      if (labels[i] == labels[i + 1]) {
        equal = true;
        break;
      }
    }
    return !equal;
  },
  invalidMessage: language.invalidDomain,
  invalidMessageKey: "inv_domain",
  validMessageKey: "val_domain",
};

const Ipv4NoGroups = IPv4Regex.replace("((?:", "(?:(?:");
const IPv6NoGroups = IPv6Regex.replace(/\x28\x28\x3F\x3A/g, "(?:(?:").replace(
  "|(\\x3A",
  "|(?:\\x3A"
);
const domainNoGroups = domainRegex
  .replace("((", "(?:(?:")
  .replace(")(", ")(?:");

// Regex according to RFC5321, RFC5322 and RFC3696, compatible with "test" and "match"
const validCharacters =
  "\\x21\\x23\\x24\\x25\\x26\\x2A\\x2B\\x2D\\x2E\\x2F\\x3D\\x3F\\x5E\\x7B\\x7C\\x7D\\x7E\\u02BC\\u02BD";
const escapedCharacters = "\\x22\\x2C\\x40\\x5B\\x5C\\x5D";
const emailLocal = `((?:\\w|\\d|[${validCharacters}]|(?:\\x5C[${escapedCharacters}]))*|(?:\\x22(?:\\w|\\d|[${validCharacters}${escapedCharacters}])*\\x22))`;
const emailDomain = `(${domainRegex}|(?:\\x5B${Ipv4NoGroups}\\x5D)|(?:Ipv6:\\x5B${IPv6NoGroups}\\x5D))`;
const emailRegex = `(${emailLocal}\\x40${emailDomain})`;

/* Checks is the field value has the correct format of an e-mail address */
configuration.validators["email"] = {
  name: "email",
  validatorFunction: function (value, form, field, options, lang) {
    if (value.startsWith(".")) return false;
    if (value.endsWith(".")) return false;
    if (value.length > 254) return false;
    const regex = new RegExp(`^${emailRegex}$`, "i");
    const email = value.match(regex);
    if (!email) return false;
    const parts = [...email];
    const localPart = parts[1];
    const domainPart = parts[2];
    if (localPart.length > 64) return false;
    if (localPart.endsWith(".") || localPart.includes("..")) return false;
    if (!domainPart.includes("["))
      if (
        !configuration.validators["domain"].validatorFunction(
          domainPart,
          form,
          field,
          options,
          lang
        )
      )
        return false;
    return true;
  },
  invalidMessage: language.invalidEmail,
  invalidMessageKey: "inv_email",
  validMessageKey: "val_email",
};

const IPv6ZoneNoGroupsURL = IPv6Zone.replace("(\\x25", "(?:\\x2525");

// Regex according to RFC1738, RFC3986 and RFC6874, compatible with "test" and "match"
const unreserved = "a-z\\d\\x2D\\x2E\\x5F\\x7E";
const sub_delimiters =
  "\\x21\\x24\\x26\\x27\\x28\\x29\\x2A\\x2B\\x2C\\x3B\\x3D";
const percentEncoded = "(?:\\x25[a-f\\d]{2})";
const schemePart = "(https?\\x3A)"; //"([a-z\\d\\x2B\\x2D\\x2C]+\\x3A)";
const authorityPart = `(\\x2F\\x2F((?:[${unreserved}${sub_delimiters}\\x3A]|${percentEncoded})+\\x40)?(localhost|${domainNoGroups}|(?:\\x5B(?:${IPv6NoGroups}${IPv6ZoneNoGroupsURL})\\x5D)|${Ipv4NoGroups})(\\x3A\\d+)?\\x2F?)`;
const pathPart = `((?:\\x2F(?:[${unreserved}${sub_delimiters}\\x3A\\x40]|${percentEncoded})+)*)`;
const queryPart = `(\\x3F(?:[${unreserved}${sub_delimiters}\\x2F\\x3A\\x3F\\x40]|${percentEncoded})+)?`;
const fragmentPart = `(\\x23(?:[${unreserved}${sub_delimiters}\\x2F\\x3A\\x3F\\x40]|${percentEncoded})+)?`;
const URLRegex = `(${schemePart}${authorityPart}${pathPart}${queryPart}${fragmentPart})`;

/* Checks if the field value is has the correct format of an URL */
configuration.validators["url"] = {
  name: "url",
  validatorFunction: function (value, form, field, options, lang) {
    const regex = new RegExp(`^${URLRegex}$`, "i");
    if (!regex.test(value)) return false;
    return true;
  },
  invalidMessage: language.invalidUrl,
  invalidMessageKey: "inv_url",
  validMessageKey: "val_url",
};
