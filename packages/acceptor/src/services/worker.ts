import express from 'express';

import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import { logger } from "..//utils/logger";

export
const app = express();

// function badRequest(res) {
//     responseHeader['Content-length'] = forbiddenData.length;
//     res.writeHead(403, responseHeader);
//     res.write(forbiddenData);
//     res.end('');
// }

const logErrors = (err, req, res, next) => {
    logger.info('=========================');
    logger.error(err);
    logger.info(req.get('User-Agent'));
    logger.info('=========================');
    res.status(500);
    res.json({ error: 'json parser error' });
    return;
};

/**
 * middlewares
 * */

// 最大
const multipartMiddleware = multipart({
    maxFilesSize: 10 * 10 * 1024
});

app.use(multipartMiddleware);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: 10 * 1024 * 1024
    })
);

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  

/**
 * controller
 * */

app.use(function(req){

})