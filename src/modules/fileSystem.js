const fs = require("fs");

const createFile = (name, content) => {

  fs.writeFile(name, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
console.log(`success created ${name} file`)
};

const readFile = (name) => {
    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
  };


module.exports = { createFile ,readFile};