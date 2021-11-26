const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');
const Product = require('../models/productschema');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productimages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString()+"_" + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const router = express.Router();

const fileFilelds = [
    {name:'mainimage',maxCount:1},
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1},
]

router.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.fields(fileFilelds), (req, res) => {
        console.log(req.files)

        // const rep = (path) => { replace(/\\/g, "/").substring("public".length) };
        
        // const arrayNames = Object.keys(req.files);
        // const pathes = arrayNames.map((eachArrName) => {
        //     return ([eachArrName] =  req.files[eachArrName][0].path.replace(/\\/g, "/").substring("public".length))
        // })
          


        const product = {
            itemTitle: req.body.itemTitle,
            mainimage: req.files['mainimage'][0].path.replace(/\\/g, "/").substring("public".length),
            image1: req.files['image1'][0].path.replace(/\\/g, "/").substring("public".length),
            image2: req.files['image2'][0].path.replace(/\\/g, "/").substring("public".length),
            image3: req.files['image3'][0].path.replace(/\\/g, "/").substring("public".length),
            image4: req.files['image4'][0].path.replace(/\\/g, "/").substring("public".length),
            qty: req.body.qty
            
        }


        Product.create(product)
            .then(product => {
                Product.findById(product._id)
            
                
                    .then(product => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(product);
                    })
            })
            .catch(err => {
                res.json(err)
            });
            
    })


.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = router;