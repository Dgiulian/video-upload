const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(path.resolve(__dirname, 'bin', 'ffmpeg.exe'));
ffmpeg.setFfprobePath(path.resolve(__dirname, 'bin', 'ffprobe.exe'));

module.exports = ffmpeg;
