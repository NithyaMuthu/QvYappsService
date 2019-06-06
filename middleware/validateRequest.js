let jwt = require('jsonwebtoken');
let Customer = require('../schema/customerAccessSchema');

module.exports = function(req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    if(req.method === 'OPTIONS') next();

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.JWTSIGNSECRET, (err, decoded) => {
            if (err) {
                Customer.find({shop: token}, function (err, response) {
                    if (err || !(response && response.length > 0)) {
                        // console.log('Shop not found');
                        res.status(401);
                        res.message('Invalid Request.');
                    } else{
                        next();
                    }
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
