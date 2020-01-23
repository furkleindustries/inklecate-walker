import {
  error,
  log,
} from 'colorful-logging';
import {
  start,
} from './start';

const commander = require('commander');

const packageJson = require('../package');

new commander.Command()
  .version(packageJson.version || 'No version detected.')
  .option(
    '-i, --iterations <number>',
    'How many times to run the story.',
  ).arguments('<file>').action((inputFilepath) => {
    try {
      start({
        inputFilepath,
        iterationCount: Number(program.iterations) || 1,
      }).then(log, end);
    } catch (err) {
      end(err);
    }
  }).parse(process.argv);

const end = (err) => {  
  error(err);
  process.exit(1);
};

