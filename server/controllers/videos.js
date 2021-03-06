const path = require('path');
const fse = require('fs-extra');

const { Videos } = require('../models/videos');

const {
  getVideoMetadata,
  takeVideoScreenshot,
  getMetadataExtractor,
} = require('../utils/videos');

module.exports.list = async (req, res) => {
  const videos = await Videos.find();
  res.json(videos);
};

module.exports.getById = async (req, res) => {};

module.exports.upload = async (req, res) => {
  const { file } = req;

  try {
    if (!file) {
      throw new Error('No file selected');
    }

    const metadata = await getVideoMetadata(file.path);
    const screenshotName = `${file.filename}.png`;
    const extension = path.extname(file.originalname);

    const video_codec = getMetadataExtractor('video', 'codec_name')(metadata);
    const duration = getMetadataExtractor('video', 'duration')(metadata);
    const width = getMetadataExtractor('video', 'width')(metadata);
    const height = getMetadataExtractor('video', 'height')(metadata);
    const audio_codec = getMetadataExtractor('audio', 'codec_name')(metadata);

    await takeVideoScreenshot({
      fileName: path.resolve(file.path),
      output: `%f.png`,
    });

    const video = Videos({
      title: file.originalname,
      path: file.path,
      extension,
      video_codec,
      audio_codec,
      duration,
      width,
      height,
      screenshot: screenshotName,
    });
    const savedVideo = await video.save();
    res.json({ files: savedVideo });
  } catch (error) {
    res.json({ error: true, message: error });
  }
};

module.exports.streamVideo = async (req, res) => {
  try {
    const video = await Videos.findById(req.params.videoId);

    console.log(video);
    // Set
    res.set('Content-type', 'video/mp4');
    res.set('accept-ranges', 'bytes');
    const readable = fse.createReadStream(path.resolve(video.path));
    readable.pipe(res);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: true, message: 'Could not load video' });
  }
};

module.exports.delete = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    res.json({ error: true, message: 'Video not found' });
  }
  try {
    const video = await Videos.findOneAndDelete({ _id: videoId });
    res.json({ video });
  } catch (error) {
    console.error(error);
  }
};
