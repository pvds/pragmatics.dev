module.exports = {
  /**
   * Content block
   * @param {string} content
   * @param {Object} options
   * @return {string}
   */
  contentBlock: (content, options = {}) => {
    const { fields = {}, classes = '' } = options;
    const titleHTML =
      fields.title && fields.showTitle
        ? `<h2 class="content-block__title">${fields.title}</h2>`
        : '';
    return `
      <div class="content-block ${classes}">
        ${titleHTML}
        <div class="content-block__main plain-text">${content}</div>
      </div>`;
  },
  contentSection: (content, options = {}) => {
    const { classes = '' } = options;
    return `
      <section class="content-section ${classes}">
        <div class="content-section__inner">
            ${content}
        </div>
      </section>`;
  },
};
