const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const request = require('request');
const Auth = mongoose.model('AuthModel');

const logger = require('./../library/loggerLib');
const response = require('./../library/responseLib');
const token = require('./../library/tokenLib');
const check = require('./../library/checkLib');

let isAuthorized = (req, res, next) => {

    if(req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')){
        Auth.findOne({authToken: req.params.authToken || req.body.authToken || req.query.authToken || req.header('authToken')},(err, authDetails) => {
            if(err){
                console.log(err);
                logger.error(err.message, 'AuthorizationMiddleware',10);
                let apiResponse = response.generate(true,'Failed to Authorized',500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(authDetails)){
                logger.error('No Authorization Token is present','Authorization Middleware',10);
                let apiResponse = response.generate(true,'Invalid or Expired Token', 404, null);
                res.send(apiResponse);
            }
            else{
                token.verifyToken(authDetails.authToken,authDetails.tokenSecret,(err,decoded) => {
                    if(err){
                        logger.error(err.message,"Authorization Middleware",10);
                        let apiResponse = response.generate(true,'Failed to Authorized',500, null);
                        res.send(apiResponse);
                    }
                    else{
                        req.user = {userId: decoded.data.userId};
                        next();
                    }
                });//end verifyToken
            }
        });
    }
    else{
        logger.error('AuthorizationToken Missing','Authorization Middleware',10);
        let apiResponse = response.generate(true,'Authorization token is missing in request',400,null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthorized :isAuthorized
}