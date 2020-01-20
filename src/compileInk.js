import {
  inklecate,
} from 'inklecate';

export const compileInk = (inputFilepath) => (
  new Promise((resolve, reject) => {
    try {
      return resolve(inklecate({
        inputFilepath,
        countAllVisits: true,
        glob: false,
        keepRunning: false,
        isPlaying: false,
      }));
    } catch (err) {
      return reject(err);
    }
  })
);
