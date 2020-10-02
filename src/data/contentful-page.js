const fs = require('fs');
const path = require('path');
const contentfulDataPath = path.resolve(__dirname, '../api/pages.json');

const contentful = require('contentful');

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

// Load JSON file as Promise
// TODO move this function to `utils`
const loadJSON = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(content));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

module.exports = async () => {
  // Only make API call if local json file does not exist OR in production environment
  if (!fs.existsSync(contentfulDataPath) || process.env.ELEVENTY_ENV === 'production') {
    return client
      .getEntries({ content_type: 'page', order: 'sys.createdAt' })
      .then(function (response) {
        const formattedResponse = response.items.map(function (page) {
          page.fields.date = new Date(page.sys.updatedAt);
          return page.fields;
        });

        // Write response to json file
        fs.writeFile(contentfulDataPath, JSON.stringify(response), function (err) {
          if (err) {
            console.error(err);
          }
        });

        return formattedResponse;
      })
      .catch(console.error);
  } else {
    // Return local JSON file as a Promise
    return loadJSON(contentfulDataPath)
      .then((response) => {
        return response.items.map((page) => {
          page.fields.date = new Date(page.sys.updatedAt);
          return page.fields;
        });
      })
      .catch(console.error);
  }
};
