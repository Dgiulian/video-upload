const ffmpeg = require('../ffmpeg');
const { promisify } = require('util');
const ffprobe = promisify(ffmpeg.ffprobe);

module.exports.getVideoMetadata = async function (fileName) {
  try {
    if (!fileName) {
      return Promise.reject(null);
    }
    return ffprobe(fileName);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports.takeVideoScreenshot = function (
  fileName,
  { output = '', time }
) {
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
