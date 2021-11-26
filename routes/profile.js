const express = require('express');
const authenticate = require('../authenticate');
const Profile = require('../models/profileschema');

const router = express.Router();

router.route('/')

    .get(authenticate.verifyUser, (req, res, next) => {
        Profile.findOne({ personId: req.user._id })
            .populate('firstname lastname phonenum email preferredContactMethode username')
            .then(person => {
                if (person) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(person)
                } else {
                    err.statue = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })




    .post(authenticate.verifyUser, (req, res, next) => {
        if (req.body) {
            const profile = {};
           const pr = req.body;
           if (pr.avatar) {
               profile.avatar = pr.avatar
           }
           if (pr.phone) {
               profile.phone = pr.phone
           }
           if (pr.company_name) {
               profile.company_name = pr.company_name
           }
           if (pr.designs) {
               profile.designs = [...profile.designs, pr.designs]
           }
           if (pr.preffered_contact) {
            profile.preffered_contact = pr.preffered_contact
            };
            profile.personId = req.user._id
            profile.firstname = req.user._id
            profile.lastname = req.user._id
            profile.email = req.user._id

            const pops = [{
                path: 'firstname',
                model: 'User',
                select:'firstname'
            
            },{
                path: 'lastname',
                model: 'User',
                select:'lastname'
            
            },{
                path: 'email',
                model: 'User',
                select:'email'
            
            },
            {
                path: 'pastorders',
                model: 'Order',
                    
            }]

            Profile.create(profile)
            .then(profile => {
                Profile.findById(profile._id)
                    .populate(pops)
                    .then(profile => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(profile);
                    })
            })
            .catch(err => next(err));
           
        } else {
            const err = new Error('no information in body')
           err=> res.json(err)
        };
        
    })



    .put(authenticate.verifyUser, (req, res, next) => {
        
    })

module.exports = router;
    

