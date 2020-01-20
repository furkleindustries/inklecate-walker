import {
  compileInk,
} from './compileInk';
import {
  readFile,
} from 'fs-extra';
import {
  Story,
} from 'inkjs';
import {
  walk,
} from './walk';

export const start = ({
  inputFilepath,
  iterationCount = 1,
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
