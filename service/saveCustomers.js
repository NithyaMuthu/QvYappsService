(function () {
    const request = require('request-promise');
    let CustomerConfig = require('../schema/customerAccessSchema');
    let CustomerShop = require('../schema/customerShopSchema');
    const logger = require('../log/logger');
    let loadQVScripts = function(shopDetails){
        const shopRequestUrl = 'https://' + shopDetails.myshopify_domain + `/admin/api/${process.env.API_VERSION}/script_tags.json`;
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': shopDetails.access_token,
        };
        const scriptContent = {
            "script_tag": {
                "event": "onload",
                "src": process.env.QVYAPPS_JS
            }
        };
        const reqElem = {
            method: 'POST',
            uri: shopRequestUrl,
            body: scriptContent,
            headers: shopRequestHeaders,
            json: true // Automatically stringifies the body to JSON
        };
        request(reqElem)
        .then((shopResponse) => {
            logger.info(`Quick View js file added. ${JSON.stringify(shopResponse)}`);
            // console.log(shopResponse);
            // loadShopifyLandingPage(shopDetails, res);
        })
        .catch((error) => {
            logger.error(`Quick View js file failed to add. ${JSON.stringify(error)}`);
            // console.log(error);
            // res.status(error.statusCode);
        });
    };
    let loadShopifyLandingPage = function(shopDetails, res){
        let redirectUrl = `https://${shopDetails.shop}${process.env.SHOPIFY_APP_URL}`;
        res.redirect(redirectUrl);
    };
    let saveCustomer = function (shopResponse, res) {
        const shop = shopResponse.myshopify_domain;
        const accessToken = shopResponse.access_token;
        if (shop && accessToken) {
            let shopAccessDetails = {
                shop: shop,
                id:shopResponse.id,
                token: accessToken,
                createdAt: new Date(),
                modifiedAt: new Date()
            };
            let newCustomer = new CustomerConfig(shopAccessDetails);
            CustomerConfig.find({shop: shop}, function (err, response) {
                if (err || !(response && response.length > 0)) {
                    newCustomer.save(function (err, res) {
                        if (err) {
                            logger.error(`Unable to add new customer ${shop}. ${JSON.stringify(err)}`);
                            // console.log(err);
                            res.redirect('/404');
                        } else {
                            postProcessCustomerCreate(shopResponse);
                        }
                    });
                } else {
                    CustomerConfig.findOneAndUpdate({shop: shop}, shopAccessDetails, function (err, response) {
                        if (err) {
                            logger.error(`Unable to update customer ${shop}. ${JSON.stringify(err)}`);
                            // console.log('Unsuccessful update');
                            res.redirect('/404');
                        } else {
                            postProcessCustomerCreate(shopResponse);
                            loadShopifyLandingPage(shopAccessDetails, res);
                        }
                    });
                }
            });
        }else{
            // console.log(`Shop and AccessToken not found`);
            logger.error(`Shop and AccessToken not found`);
            res.redirect('/404');
        }
    };
    let postProcessCustomerCreate = function(shopResponse){
        // console.log(`Customer access saved`);
        logger.info(`Customer access token saved for ${shopResponse.myshopify_domain}`);
        setTimeout(function(){
            loadQVScripts(shopResponse);
        }, 1000);
        saveCustomerShopDetails(shopResponse);
    };
    let saveCustomerShopDetails = function(shopResponse){
        const shop = shopResponse.myshopify_domain;
        const accessToken = shopResponse.access_token;
        if (shop && accessToken) {
            let shopDetails = {
                shop: shop,
                token: accessToken,
                id:shopResponse.id,
                name:shopResponse.name,
                email:shopResponse.email,
                domain:shopResponse.domain,
                province:shopResponse.province,
                country:shopResponse.country,
                address1:shopResponse.address1,
                zip:shopResponse.zip,
                city:shopResponse.city,
                shop_owner:shopResponse.shop_owner,
                money_format:shopResponse.money_format,
                money_with_currency_format:shopResponse.money_with_currency_format,
                myshopify_domain:shopResponse.myshopify_domain,
                createdAt: new Date(),
                modifiedAt: new Date()
            };
            let newCustomerShop = new CustomerShop(shopDetails);
            CustomerShop.find({shop: shop}, function (err, response) {
                if (err || !(response && response.length > 0)) {
                    newCustomerShop.save(function (err, res) {
                        if (err) {
                            // console.log(`Unable to save details for ${shop}`);
                            logger.error(`Unable to save details for ${shop}. ${JSON.stringify(err)}`);
                        } else {
                            // console.log(`Shop details saved for ${shop}`);
                            logger.info(`Shop details saved for ${shop}`);
                        }
                    });
                } else {
                    CustomerShop.findOneAndUpdate({shop: shop}, shopDetails, function (err, response) {
                        if (err) {
                            // console.log(`Unable to save details for ${shop}`);
                            logger.error(`Unable to save details for ${shop}. ${JSON.stringify(err)}`);
                        } else {
                            // console.log(`Shop details saved for ${shop}`);
                            logger.info(`Shop details saved for ${shop}`);
                        }
                    });
                }
            });
        }
    };
    module.exports = saveCustomer;
})();
