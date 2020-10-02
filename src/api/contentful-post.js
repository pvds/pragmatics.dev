const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
const loadJSON = require('../../utils/json');

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

module.exports = async () => {
  const localFilePath = path.resolve(__dirname, 'cache', 'posts.json');

  // Only make API call if local json file does not exist OR in production environment
  if (!fs.existsSync(localFilePath) || process.env.ELEVENTY_ENV === 'production') {
    return client
      .getEntries({ content_type: 'post', order: 'sys.createdAt' })
      .then(function (response) {
        const formattedResponse = response.items.map(function (post) {
          post.fields.date = new Date(post.sys.updatedAt);
          return post.fields;
        });

        // Write response to json file
        fs.writeFile(localFilePath, JSON.stringify(response), function (err) {
          if (err) {
            console.error(err);
          }
        });

        return formattedResponse;
      })
      .catch(console.error);
  } else {
    // Return local JSON file as a Promise
    return loadJSON(localFilePath)
      .then((response) => {
        return response.items.map((page) => {
          page.fields.date = new Date(page.sys.updatedAt);
          return page.fields;
        });
      })
      .catch(console.error);
  }
};
