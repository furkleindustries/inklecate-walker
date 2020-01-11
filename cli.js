const start = require('./start');
const commander = require('commander');

const packageJson = require('./package');

const program = new commander.Command();

program.version(packageJson.version || 'No version detected.');

program.arguments('<file>').action((inputFilepath) => {
  start(inputFilepath).then((tree) => {
    console.log(JSON.stringify(tree, null, 2))
  });
});

program.parse(process.argv);
