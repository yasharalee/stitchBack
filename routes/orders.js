const express = require('express');
const Order = require('../models/orderschema');
const router = express.Router();
const authenticate = require('../authenticate');




// routes setup
router.options('*',(req, res) => res.sendStatus(200));

router.get('/',authenticate.verifyUser, (req, res, next) => {
    Order.find()
    .populate([
        {
            path: " clientName",
            model: "User",
            select:'firstname lastname'
        }, {
            path: " orderedItems.itemTitle",
            model: "Product",
            select:'itemTitle mainimage'
        }
        
    ])
        .then(Orders => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Orders);
    })
    .catch(err => next(err));
})

router.post('/receive', authenticate.verifyUser, (req, res, next) => {
    
   
    if (req.body) {

        const itemsArrMapping = req.body.itemsAsArr.map(iteminArr => {
            
            const des_op = () => {
                if (iteminArr.designs) {
                    iteminArr.designs.map((eachOne) => {
                        return {
                            design: eachOne.designpath,
                            placement: eachOne.placement,
                            height: eachOne.height,
                            width: eachOne.width,
                            proportionate: eachOne.proportionate,
                        }
                    
                    });
                } else {
                    return {
                        design: null,
                        placement: null,
                        height: null,
                        width: null,
                        proportionate: null
                    }
                }
            }
                return {
                    itemTitle: iteminArr.itemTitle,
                    qty: iteminArr.qty,
                    design: des_op,
                    instruction: iteminArr.instruction
                };
            });
        

        const order = {
            clientName: req.user._id,
            totalValue: req.body.totalValue,
            orderedItems: itemsArrMapping,
            shippingAddress: {
                street1: req.body.street1,
                street2: req.body.street2,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode
            },
            added_desc:req.body.added_desc
        }
        

        const p1 = [
            {
                path: " clientName",
                model: "User",
                select:'firstname lastname'
            }, {
                path: " orderedItems.itemTitle",
                model: "Product",
                select:'itemTitle mainimage'
            }
            
        ]
        
        
        
        Order.create(order)
            .then(order => {
                Order.findById(order._id)
                    .populate(p1)
                    .then(order => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(order);
                    })
            })
            .catch(err => next(err));
    } else {
        const err = new Error('order not found in request body');
        err.status = 404;
        return next(err);
    }
    
});

module.exports = router;