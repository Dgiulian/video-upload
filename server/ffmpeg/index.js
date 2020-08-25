const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

if (process.env.NODE_ENV === 'production') {
  ffmpeg.setFfmpegPath(path.resolve('/usr/bin/ffmpeg'));
  ffmpeg.setFfprobePath(path.resolve('/usr/bin/ffprobe'));
} else {
  ffmpeg.setFfmpegPath(path.resolve(__dirname, 'bin', 'ffmpeg.exe'));
  ffmpeg.setFfprobePath(path.resolve(__dirname, 'bin', 'ffprobe.exe'));
}

module.exports = ffmpeg;
