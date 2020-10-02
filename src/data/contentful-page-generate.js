const fs = require('fs');
const path = require('path');
const contentfulDataPath = path.resolve(__dirname, 'contentful-page.json');

const contentful = require('contentful');
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

module.exports = async () => {
  console.info('Environment:', process.env.ELEVENTY_ENV);
  console.info('JSON data exists:', fs.existsSync(contentfulDataPath));
  if (
    process.env.ELEVENTY_ENV === 'production' ||
    (process.env.ELEVENTY_ENV === 'development' && !fs.existsSync(contentfulDataPath))
  ) {
    console.info('get data from contentful');
    return client
      .getEntries({ content_type: 'page', order: 'sys.createdAt' })
      .then(function (response) {
        const formattedResponse = response.items.map(function (page) {
          page.fields.date = new Date(page.sys.updatedAt);
          return page.fields;
        });

        fs.writeFile(contentfulDataPath, JSON.stringify(formattedResponse), function (err) {
          console.info('write pages to json successful!');
          if (err) {
            console.error(err);
          }
        });

        return formattedResponse;
      })
      .catch(console.error);
  }
};
