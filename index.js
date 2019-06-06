const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const bodyParser = require('body-parser');
const saveCustomer = require('./service/saveCustomers');
const customerConfig = require('./service/customerConfig');
const logger = require('./log/logger');
const logRequest = require('./log/httpLogger');
const {
    SHOPIFY_API_SECRET_KEY,
    SHOPIFY_API_KEY,
    TUNNEL_URL,
    API_VERSION,
    ALLOWED_DOMAIN,
} = process.env;
// const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
// const SHOPIFY_API_SECRET_KEY = process.env.SHOPIFY_API_SECRET_KEY;
const scopes = 'write_script_tags';
// const forwardingAddress = "https://2ebcdc22.ngrok.io"; // Replace this with your HTTPS Forwarding address
app.use(bodyParser.json());

app.use(logRequest);
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.all('/api/v1/*', [require('./middleware/validateRequest')]);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
        const state = nonce();
        const redirectUri = TUNNEL_URL + '/shopify/callback';
        const installUrl = 'https://' + shop +
            '/admin/oauth/authorize?client_id=' + SHOPIFY_API_KEY +
            '&scope=' + scopes +
            '&state=' + state +
            '&redirect_uri=' + redirectUri;
        res.cookie('state', state);
        res.redirect(installUrl);
    } else {
        logger.log({
            level: 'info',
            message: ''
        });
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
});
app.get('/shopify/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
    if (state !== stateCookie) {
        return res.status(403).send('Request origin cannot be verified');
    }

    if (shop && hmac && code) {
        const map = Object.assign({}, req.query);
        delete map['signature'];
        delete map['hmac'];
        const message = querystring.stringify(map);
        const providedHmac = Buffer.from(hmac, 'utf-8');
        const generatedHash = Buffer.from(
            crypto
                .createHmac('sha256', SHOPIFY_API_SECRET_KEY)
                .update(message)
                .digest('hex'),
            'utf-8'
        );
        let hashEquals = false;
// timingSafeEqual will prevent any timing attacks. Arguments must be buffers
        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
// timingSafeEqual will return an error if the input buffers are not the same length.
        } catch (e) {
            hashEquals = false;
        }

        if (!hashEquals) {
            return res.status(400).send('HMAC validation failed');
        }

        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        const accessTokenPayload = {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET_KEY,
            code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })
            .then((accessTokenResponse) => {
                // console.log(accessTokenResponse);
                // accessTokenResponse.shop = shop;
                // res.status(200).end(accessTokenResponse);
                const accessToken = accessTokenResponse.access_token;

                const shopRequestUrl = 'https://' + shop + `/admin/api/${API_VERSION}/shop.json`;
                const shopRequestHeaders = {
                    'X-Shopify-Access-Token': accessToken,
                };
                // console.log(`Access token ${accessToken}`);
                request.get(shopRequestUrl, { headers: shopRequestHeaders })
                    .then((shopResponse) => {
                        var respObj = JSON.parse(shopResponse)['shop'];
                        respObj['access_token'] = accessToken;
                        saveCustomer(respObj, res);
                        // res.end(shopResponse);
                    })
                    .catch((error) => {
                        res.status(error.statusCode);
                    });
            })
            .catch((error) => {
                // console.log(error);
                res.status(error.statusCode).send(error);
            });
    } else {
        res.status(400).send('Required parameters missing');
    }
});
app.get('/shopify/auth', (req, res)=>{
    customerConfig.authCustomer(req, res);
});
app.get('/api/v1/shopify/config', (req, res)=>{
    customerConfig.getCustomerConfig(req, res);
});
app.put('/api/v1/shopify/config', (req, res)=>{
    customerConfig.saveCustomerConfig(req, res);
});
app.listen(3000, () => {
    logger.info('Example app listening on port 3000!');
});
