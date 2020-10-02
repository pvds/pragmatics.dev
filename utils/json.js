const fs = require('fs');

// Load JSON file as Promise
module.exports = {
  exists(filePath) {
    return fs.existsSync(filePath);
  },
  read(filePath) {
    const file = filePath;
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, content) => {
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
  },
  write(filePath, content) {
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },
};
