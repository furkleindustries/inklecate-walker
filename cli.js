const start = require('./src/start');
const commander = require('commander');

const packageJson = require('./package');

const program = new commander.Command();

program
  .version(packageJson.version || 'No version detected.')
  .option(
    '-i, --iterations <number>',
    'How many times to run the story.',
  )
  .arguments('<file>').action((inputFilepath) => {
    try {
      start({
        inputFilepath,
        iterationCount: Number(program.iterations) || 1,
      }).then(
        async (tree) => {
          console.log(JSON.stringify(tree, null, 2));
        },

        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })
  .parse(process.argv);
