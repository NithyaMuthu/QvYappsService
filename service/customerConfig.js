(function(){
    let jwt = require('jsonwebtoken');
    let Customer = require('../schema/customerAccessSchema');
    let CustomerShop = require('../schema/customerShopSchema');
    const qvCommonConfigData = require('./yqv_common_config');
    const logger = require('../log/logger');
    let customerConfig  = {
        getCustomerConfig: function(req, res){
            const shop = req.query.shop;
            if(shop) {
                Customer.find({shop: shop}, function (err, response) {
                    if (err || !(response && response.length > 0)) {
                        // console.log('Shop not found');
                        res.status(400);
                        res.message('Invalid Request. Shop not found');
                    } else {
                        let shopConfig = {
                            config: customerConfig.generateFullConfig(response[0].config)
                        };
                        res.status(200);
                        res.json(shopConfig);
                    }
                });
            }
        },
        generateFullConfig: function(customConfig){
            let configObj = qvCommonConfigData;
            if(customConfig && Object.keys(customConfig).length > 0){
                for(let prop in customConfig){
                    if(customConfig.hasOwnProperty(prop) ){
                        configObj[prop] = customConfig[prop];
                    }
                }
            }
            return configObj;
        },
        getDeltaConfig:function(customConfig){
            let deltaConfig = undefined;
            if(customConfig && Object.keys(customConfig).length > 0){
                deltaConfig = {};
                for (let prop in customConfig) {
                    if (customConfig.hasOwnProperty(prop) && customConfig[prop] !== qvCommonConfigData[prop]) {
                        deltaConfig[prop] = customConfig[prop];
                    }
                }
            }
            return deltaConfig;
        },
        saveCustomerConfig: function(req, res){
            const shop = req.query.shop;
            const config = req.body.config;
            if(shop && config) {
                // let shopDetails = {
                //     shop: shop
                // };
                // let newCustomer = new Customer(shopDetails);
                Customer.find({shop: shop}, function (err, response) {
                    if (err || !(response && response.length > 0)) {
                        // console.log('Shop not found');
                        res.status(400);
                        res.message('Invalid Request. Shop not found');
                    } else {
                        let deltaConfig = customerConfig.getDeltaConfig(config);
                        if(deltaConfig && Object.keys(deltaConfig).length > 0){
                            let shopConfig = {
                                config: deltaConfig,
                                modifiedAt: new Date()
                            };
                            Customer.findOneAndUpdate({shop: shop}, shopConfig, function (err, response) {
                                if (err) {
                                    // console.log('Unsuccessful update');
                                    logger.error(`Unsuccessful update for customer ${shop}`);
                                    res.redirect('/404');
                                } else {
                                    // console.log('Updated ' + shop + ' successfully');
                                    res.status(200);
                                    res.json({'message': 'Updated successfully'});
                                }
                            });
                        }else{
                            res.status(200);
                            res.json({'message': 'Updated successfully'});
                        }
                    }
                });
            } else {
                res.status(400).send({message:'Shop name or configuration data is missing'});
            }
        },
        authCustomer: function(req, res){
            const shop = req.query.shop;
            // const shopId = req.query.id;
            if(shop) {
                CustomerShop.find({shop: shop}, function (err, response) {
                    if (err || !(response && response.length > 0)) {
                        // console.log('Shop not found');
                        res.status(400);
                        res.message(`Invalid Request. Shop not found for ${shop}`);
                    } else {
                        let shopDetails = response[0];
                        var token=jwt.sign({shop:shop},process.env.JWTSIGNSECRET,{expiresIn:'24h'});
                        res.status(200).json({
                            shop: shopDetails.shop,
                            name: shopDetails.name,
                            email: shopDetails.email,
                            domain: shopDetails.domain,
                            token: token
                        });
                    }
                });
            } else {
                res.status(400).send({message:'Shop name is missing'});
            }
        }
    };
    module.exports = customerConfig;
})();
