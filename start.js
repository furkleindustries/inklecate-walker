const compileInk = require('./compileInk');
const { readFile } = require('fs-extra');
const { Story } = require('inkjs');
const walk = require('./walk');

module.exports = async (inputFilepath) => {
  let json;
  if (/ink$/i.test(inputFilepath)) {
    json = (await compileInk(inputFilepath)).storyContent;
  } else {
    json = (await readFile(inputFilepath, 'utf8')).trim();
  }

  const story = new Story(json);

  return walk(story);
};
