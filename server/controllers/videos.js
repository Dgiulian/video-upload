const path = require('path');
const fse = require('fs-extra');

const { AsyncRay } = require('async-ray');
const { Videos } = require('../models/videos');

const { getVideoMetadata, takeVideoScreenshot } = require('../utils/videos');

module.exports.list = async (req, res) => {
  const videos = await Videos.find();
  res.json(videos);
};

module.exports.getById = async (req, res) => {};

module.exports.upload = async (req, res) => {
  const { files } = req;

  /*
   { fieldname: 'videos',
    originalname: '004 Shortcomings of RESTful Routing.mp4',
    encoding: '7bit',
    mimetype: 'video/mp4',
    destination: 'uploads/',
    filename: 'ba593bb0ea2c76f17b1eba85d6307175',
    path: 'uploads\\ba593bb0ea2c76f17b1eba85d6307175',
    size: 13271728 }
  */

  const savedFiles = await Promise.all(
    files.map(async (file) => {
      //return getVideoMetadata(file.path);
      // takeVideoScreenshot

      const video = Videos({
        title: file.originalname,
        path: file.path,
      });
      const savedVideo = await video.save();
      return savedVideo;
    })
  );

  res.json({ files: savedFiles });
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

module.exports.delete = async (req, res) => {};
