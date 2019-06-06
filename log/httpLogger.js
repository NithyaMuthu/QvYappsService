(function(){
    const logger = require('./logger');
    const uid = require('gen-uid');
    const getLoggerLevelForStatusCode = (statusCode) => {
        if (statusCode >= 500) {
            return 'error';
        }
        if (statusCode >= 400) {
            return 'warn';
        }

        return 'info';
    };

    const logRequestStart = (req, res, next) => {
        req.requestId = uid.token(true).substr(0, 8);
        req.apiClient = {
            version: req.get('X-ClientVersion'),
            platformVersion: req.get('X-ClientPlatformVersion'),
            device: req.get('X-ClientDevice'),
            locale: req.get('X-ClientLocale')
        };
        let imprintParts = [`[Id: ${req.requestId}]`];
        imprintParts.push(req.method);
        imprintParts.push(req.originalUrl);
        if(req.query.shop) {
            imprintParts.push(`[Customer: ${req.query.shop}]`)
        }
        if(req.body){
            imprintParts.push(`[Request: ${JSON.stringify(req.body)}]`);
        }
        if (req.apiClient) {
            imprintParts.push(`${req.apiClient.device || ''} ${req.apiClient.platformVersion || ''}`);

            if (req.apiClient.version) {
                imprintParts.push(`#${req.apiClient.version}`)
            }
            if (req.apiClient.locale) {
                imprintParts.push(`${req.apiClient.locale} locale`)
            }
        }

        const requestImprint = imprintParts.filter(x => !!x).join(', ');
        logger.info(`${requestImprint}`);

        let oldWrite = res.write,
            oldEnd = res.end;

        let respChunks = [];

        res.write = function (chunk) {
            respChunks.push(new Buffer.from(chunk));

            oldWrite.apply(res, arguments);
        };

        res.end = function (chunk) {
            if (chunk)
                respChunks.push(new Buffer.from(chunk));

            oldEnd.apply(res, arguments);
        };
        const cleanup = () => {
            res.removeListener('finish', logFn);
            res.removeListener('close', abortFn);
            res.removeListener('error', errorFn);
        };

        const logFn = () => {
            cleanup();
            let resImprintParts = [`[Id: ${req.requestId}]`];
            resImprintParts.push(res.statusCode);
            if(res.statusMessage){
                resImprintParts.push(res.statusMessage);
            }
            if(respChunks && respChunks.length > 0){
                let resBody = Buffer.concat(respChunks).toString('utf8');
                resImprintParts.push(`[Response: ${resBody}]`);
            }
            resImprintParts.push(`${res.get('Content-Length') || 0}b sent`);
            const logResponseImprint = resImprintParts.filter(x => !!x).join(', ');
            const logLevel = getLoggerLevelForStatusCode(res.statusCode);
            logger[logLevel](`${logResponseImprint}`);
        };

        const abortFn = () => {
            cleanup();
            logger.warn('Request aborted by the client');
        };

        const errorFn = err => {
            cleanup();
            logger.error(`Request pipeline error: ${err}`);
        };

        res.on('finish', logFn); // successful pipeline (regardless of its response)
        res.on('close', abortFn); // aborted pipeline
        res.on('error', errorFn); // pipeline internal error

        next();
    };
    module.exports = logRequestStart;
})();
