const { Videos } = require('../models/videos');
const { AsyncRay } = require('async-ray');
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
      return getVideoMetadata(file.path);
      // takeVideoScreenshot

      /* const video = Videos({
        title: file.originalname,
      });
      const savedVideo = await video.save();
      return savedVideo; */
    })
  );

  res.json({ files: savedFiles });
};

module.exports.delete = async (req, res) => {};
