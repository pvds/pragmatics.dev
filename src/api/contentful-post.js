const path = require('path');
const contentful = require('./contentful');
const json = require('../../utils/json');

module.exports = async () => {
  const cache = path.resolve(__dirname, 'cache', 'posts.json');

  // Only make API call if local json file does not exist OR in production environment
  if (!json.exists(cache) || process.env.ELEVENTY_ENV === 'production') {
    return contentful.client
      .getEntries({ content_type: 'post', order: 'sys.createdAt' })
      .then(function (response) {
        json.write(cache, JSON.stringify(response));
        return contentful.format(response);
      })
      .catch(console.error);
  } else {
    // Return local JSON file as a Promise
    return json
      .read(cache)
      .then((response) => {
        return contentful.format(response);
      })
      .catch(console.error);
  }
};
