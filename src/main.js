/**
 * Returns the url to GET from and POST to.
 * @param {string} domain
 * @param {string} formId
 * @returns {string}
 */
export const getUrl = (domain, formId) =>
  `https://${domain}/api/form/v1/${formId}`;

/**
 * Default request data to be POSTed.
 */
export const defaultRequestData = {
  token: null,
  profile_uid: null,
  data: [],
  options: {
    force_new_profile: false,
    allow_empty_profile: false,
  },
};

const xml_special_to_escaped_one_map = {
  "&": "&amp;",
  '"': "&quot;",
  "<": "&lt;",
  ">": "&gt;",
};

const escaped_one_to_xml_special_map = {
  "&amp;": "&",
  "&quot;": '"',
  "&lt;": "<",
  "&gt;": ">",
};

/**
 * Encode special chars.
 * @param {string} string
 * @returns {string}
 */
export const encodeXml = (string) =>
  string.replace(/([\&"<>])/g, function (str, item) {
    return xml_special_to_escaped_one_map[item];
  });

/**
 * Decode special chars.
 * @param {string} string
 * @returns {string}
 */
export const decodeXml = (string) =>
  string.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function (str, item) {
    return escaped_one_to_xml_special_map[item];
  });

/**
 * Returns data for simple form elements with a value.
 * @param {Object[]} elements
 * @returns {Object[]}
 */
export const getSimpleData = (elements) =>
  elements.map(({ name: field_name, value }) => ({
    field_name,
    value: encodeXml(value),
  }));

/**
 * Returns data for boolean form elements.
 * @param {Object[]} elements
 * @returns {Object[]}
 */
export const getBooleanData = (elements) =>
  elements
    .filter(({ checked }) => checked)
    .map(({ name: field_name }) => ({
      field_name,
      value: "1",
    }));

/**
 * Returns data for radio form elements.
 * @param {Object[]} elements
 * @returns {Object[]}
 */
export const getRadioData = (elements) =>
  elements
    .filter(({ checked }) => checked)
    .map(({ name: field_name, value }) => ({
      field_name,
      value,
    }));

/**
 * Returns data for checkbox form elements.
 * @param {Object[]} elements
 * @returns {Object[]}
 */
export const getCheckboxData = (elements) =>
  Object.entries(
    elements
      .filter(({ checked }) => checked)
      .reduce(
        (acc, { name, value }) => ({
          ...acc,
          [name]: acc[name]
            ? [...acc[name], parseInt(value, 10)]
            : [parseInt(value, 10)],
        }),
        {}
      )
  ).map(([field_name, value]) => ({
    field_name,
    value,
  }));

/**
 * Format date value for evalanche API.
 * @param {string} value
 * @returns
 */
export const formatDateValue = (value) => {
  const date = new Date(value + "Z");
  const timestamp = date.getTime() / 1000;

  return timestamp.toString();
};

/**
 * Returns data for date form elements.
 * @param {Object[]} elements
 * @returns {Object[]}
 */
export const getDateData = (elements) =>
  elements.map(({ name: field_name, value }) => ({
    field_name,
    value: formatDateValue(value),
  }));

/**
 * Returns elements as array.
 * @param {string} selector
 * @returns {Object[]}
 */
const getElements = (selector) => (container) =>
  Array.from(container.querySelectorAll(selector));

/**
 * Returns form data for fields in a given container.
 * @param {Object} container - Container DOM Element.
 * @returns {Object[]}
 */
export const getData = (container) => [
  ...getSimpleData(getElements("[data-evalanche-type=simple]")(container)),
  ...getBooleanData(getElements("[data-evalanche-type=boolean]")(container)),
  ...getRadioData(getElements("[data-evalanche-type=radio]")(container)),
  ...getCheckboxData(getElements("[data-evalanche-type=checkbox]")(container)),
  ...getDateData(getElements("[data-evalanche-type=date]")(container)),
];
