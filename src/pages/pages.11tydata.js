module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.page.title,
      parent: (data) => data.page.parent,
      order: (data) => data.page.order,
    },
  },
};
