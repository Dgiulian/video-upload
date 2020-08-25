const path = require('path');
const fse = require('fs-extra');

const { Videos } = require('../models/videos');

const { getVideoMetadata, takeVideoScreenshot } = require('../utils/videos');

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

    await takeVideoScreenshot({
      fileName: file.path,
      output: path.resolve('public', 'screenshots', screenshotName),
    });

    const video = Videos({
      title: file.originalname,
      path: file.path,
      extension,
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
