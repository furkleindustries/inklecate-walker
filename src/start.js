const compileInk = require('./compileInk');
const { readFile } = require('fs-extra');
const { Story } = require('inkjs');
const walk = require('./walk');

module.exports = ({
  inputFilepath,
  iterationCount,
  overloads = {},
}) => new Promise(async (resolve, reject) => {
  let json;
  try {
    if (/ink$/i.test(inputFilepath)) {
      json = (await compileInk(inputFilepath)).storyContent;
    } else {
      json = (await readFile(inputFilepath, 'utf8')).trim();
    }
  } catch (err) {
    return reject(err);
  }

  const story = new Story(json);

  let tree;
  try {
    tree = await walk({
      iterationCount,
      inputFilepath,
      overloads,
      story,
    });
  } catch (err) {
    return reject(err);
  }

  return resolve(tree);
});
