module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.page.title,
      parent: 'Posts',
    },
  },
};
