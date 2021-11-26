const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/designs');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString()+"_" + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();


const fileFilelds = [
    {name:'front_Side',maxCount:1},
    {name:'left_side',maxCount:1},
    {name:'right_side',maxCount:1},
    {name:'back_side',maxCount:1},
    
]


uploadRouter.route('/')
.options((req, res) => res.sendStatus(200))
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
    .post(authenticate.verifyUser, upload.fields(fileFilelds), (req, res) => {

        
        const designsPathes = {};

        req.files['front_Side'] ? designsPathes.front_Side = req.files['front_Side'][0].path.replace(/\\/g, "/").substring("public".length) : 

        req.files['left_side'] ? designsPathes.left_side = req.files['left_side'][0].path.replace(/\\/g, "/").substring("public".length):

        req.files['right_side'] ? designsPathes.right_side = req.files['right_side'][0].path.replace(/\\/g, "/").substring("public".length):

        req.files['back_side'] ? designsPathes.back_side = req.files['back_side'][0].path.replace(/\\/g, "/").substring("public".length): designsPathes.empty = true


    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(designsPathes);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;