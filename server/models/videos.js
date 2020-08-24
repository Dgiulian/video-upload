const { Schema, model } = require('mongoose');

const videosSchema = new Schema({
  title: String,
  audio_codec: String,
  video_codec: String,
  duration: Number,
  screenshot: String,
  width: Number,
  height: Number,
});
const Videos = model('Videos', videosSchema);
module.exports = { Videos };
