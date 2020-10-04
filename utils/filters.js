const { DateTime } = require('luxon');

module.exports = {
  /**
   * Format date to given format
   * @param {Date} date
   * @param {string} format
   * @return {string}
   */
  dateToFormat: (date, format) =>
    DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format)),

  /**
   * Format date to ISO format
   * @param {Date} date
   * @return {string}
   */
  dateToISO: (date) =>
    DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    }),

  /**
   * Obfuscate string
   * @param {string} str
   * @return {string}
   */
  obfuscate: (str) => {
    const chars = [];
    for (let i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  /**
   * Check whether entry has components of a specific type
   * @param {Array} components
   * @param {string} type
   * @return {[]}
   */
  componentsOfType: (components, type) => {
    let filtered = [];
    filtered = components?.filter(function (component) {
      if (component.sys.contentType.sys.id === type) {
        return component;
      }
    });

    return filtered;
  },
};
