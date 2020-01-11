const { inklecate } = require('inklecate');

module.exports = (inputFilepath) => inklecate({
  inputFilepath,
  countAllVisits: true,
  glob: false,
  keepRunning: false,
  isPlaying: false,
});
