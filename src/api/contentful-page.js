const path = require('path');
const contentful = require('contentful');
const json = require('../../utils/json');

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

const formatResponse = (response) =>
  response.items.map(function (entry) {
    entry.fields.date = new Date(entry.sys.updatedAt);
    return entry.fields;
  });

module.exports = async () => {
  const cache = path.resolve(__dirname, 'cache', 'pages.json');

  // Only make API call if local json file does not exist OR in production environment
  if (!json.exists(cache) || process.env.ELEVENTY_ENV === 'production') {
    return client
      .getEntries({ content_type: 'page', order: 'sys.createdAt' })
      .then(function (response) {
        json.write(cache, JSON.stringify(response));
        return formatResponse(response);
      })
      .catch(console.error);
  } else {
    // Return local JSON file as a Promise
    return json
      .read(cache)
      .then((response) => {
        return formatResponse(response);
      })
      .catch(console.error);
  }
};
