const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

videosController = require('../controllers/videos');

var router = Router();

/* GET videos listing. */
router.get('/', videosController.list);

/* POST videos. */
router.post('/upload', upload.array('videos'), videosController.upload);

router.get('/stream/:videoId', videosController.streamVideo);

module.exports = router;
