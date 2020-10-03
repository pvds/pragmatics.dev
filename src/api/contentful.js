const contentful = require('contentful');

module.exports = {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  client: contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CTFL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CTFL_ACCESSTOKEN,
  }),
  format: (response) =>
    response.items.map(function (entry) {
      entry.fields.date = new Date(entry.sys.updatedAt);
      return entry.fields;
    }),
};
