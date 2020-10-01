module.exports = {
  /**
   * Content block
   * @param {string} content
   * @param {Object} options
   * @return {string}
   */
  contentBlock: (content, options = {}) => {
    const { fields = {}, classes = '' } = options;
    const titleHTML = !fields.title ? '' : `<h2 class="content-block__title">${fields.title}</h2>`;
    return `
      <section class="content-block ${classes}">
        ${titleHTML}
        <div class="content-block__main plain-text">${content}</div>
      </section>`;
  },
};
