const ffmpeg = require('../ffmpeg');
const { promisify } = require('util');
const ffprobe = promisify(ffmpeg.ffprobe);

module.exports.getVideoMetadata = async function (fileName) {
  try {
    if (!fileName) {
      return Promise.reject('No input file');
    }
    return ffprobe(fileName);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports.takeVideoScreenshot = function ({ fileName, output }) {
  if (!fileName) return Promise.reject('No input file');
  if (!output) return Promise.reject('No output file');

  return new Promise((resolve, reject) =>
    ffmpeg(fileName)
      .screenshots({
        timemarks: ['50%'],
        filename: output,
        //folder,
      })
      .on('error', function (err) {
        reject('An error occurred: ' + err.message);
      })
      .on('end', function () {
        resolve('Processing finished !');
      })
  );
};
