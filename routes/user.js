const express = require('express');
const router = express.Router();

const userController = require("./../controllers/userController");
const appConfig = require("./../config/appConfig")

const authentication = require('./../middleware/authentication')



let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.post(`${baseUrl}/signup`, userController.signUpFunction);


    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup To Signup user.
     *
     * @apiParam {string} firstName First name of the user. (body params)
     * @apiParam {string} lastName Last name of the user. (body params)
     * @apiParam {string} password Password of ToDo account. (body params)
     * @apiParam {string} email Email ID of the user. (body params)
     * @apiParam {number} mobileNumber Mobile number of the user. (body params)
     * @apiParam {string} country Country of the user. (body params)
     * @apiParam {boolean} userVerificationStatus For email verification of the user.(Default : false) 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

                    {
                        "error": false,
                        "message": "User created",
                        "status": 200,
                        "data": {
                            "userId": "String",
                            "firstName": "String",
                            "lastName": "String",
                            "password": "String"
                            "email": "String",
                            "mobileNumber": Number,
                            "country": "String"
                            "userVerificationStatus": false,
                            "country": [],
                            "friends": [],
                            "createdOn": "Date",                                    
                            "_id": "5b816074f0fdc921608c6660",
                            "__v": 0
                        }
                    }


        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "Failed to create new User",
                "status": 500,
                "data": null
            }

        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "User Already Present With this Email",
                "status": 403,
                "data": null
            }

    */

    app.get(`${baseUrl}/:userId/verifyUser`, userController.verifyUser);

    
    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/verifyUser for the email verification of user.
         *
         * @apiParam {string} userId UserId of the user. (route params)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "user found & verified",
                "status": 200,
                "data": "User Verified Successfully"
            }

    */

    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/login Login.
         *
         * @apiParam {string} email Email of the user. (body params) (required)
         * @apiParam {string} password Password of the user. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
        
            {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9DkxLXVuZGVmaW5lZCIsImNvdW50cnkiOiJJTiIsInVzZXJWZXJpZmljYXRpb25TdGF0dXMiOnRydWUsInJlcXVlc3RzIjpbXSwiZnJpZW5kcyI6W3siZnJpZW5kSWQiOiJTS294WTYzZTUiLCJmcmllbmROYW1lIjoiUmFqdSBSYXN0b2dpIiwiYWN0.",
                "userDetails": {
                    "userId": "eKOTSdkn7",
                    "firstName": "Mayur",
                    "lastName": "Mahamune",
                    "email": "mayurmahamune7@gmail.com",
                    "mobileNumber": " 91-7276789024",
                    "country": "IN",
                    "userVerificationStatus": true,
                    "requests": [],
                    "friends": [
                        {
                            "friendId": "SKoxY63e5",
                            "friendName": "Raju Rastogi",
                            "action": "Accept"
                        }
                    ]
                }
            }
            }




        * @apiErrorExample {json} Error-Response:
        *
        *       {
                    "error": true,
                    "message": "Login Failed",
                    "status": 500,
                    "data": null
                }

        * @apiErrorExample {json} Error-Response:
            *
            *   {
                    "error": true,
                    "message": "Wrong Password.Login Failed",
                    "status": 400,
                    "data": null
                }

    */

    app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/forgotPassword Forgot Password.
         *
         * @apiParam {string} email Email of the user. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "User Details Found",
                "status": 200,
                "data": "Mail sent successfully"
            }
            
        * @apiErrorExample {json} Error-Response:
        *
        *       
            {
                "error": true,
                "message": "User email address is missing",
                "status": 500,
                "data": null
            }

        * @apiErrorExample {json} Error-Response:
        *
        *       
            {
                "error": true,
                "message": "failed to find the user with given email",
                "status": 500,
                "data": null
            }                    
        * @apiErrorExample {json} Error-Response:
        *
        *       
            {
                "error": true,
                "message": "No user Details Found",
                "status": 500,
                "data": null
            }
    */

    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/resetPassword Reset Password Link.
         *
         * @apiParam {string} email Email of the user. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Mail sent Successfully",
                "status": 200,
                "data": "Password reset successful"
            }
            
        * @apiErrorExample {json} Error-Response:
        *
        *       
            {
                "error": true,
                "message": "User-ID parameter is missing",
                "status": 500,
                "data": null
            }

        * @apiErrorExample {json} Error-Response:
        *
        *       
            {
                "error": true,
                "message": "Password is missing",
                "status": 500,
                "data": null
            }
    */

    app.get(`${baseUrl}/view/allUsers`, authentication.isAuthorized, userController.getAllUser);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/view/allUsers To get All users
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All User Details Found",
                "status": 200,
                "data": [
                    {
                        "userId": "eKOTSdkn7",
                        "firstName": "Mayur",
                        "lastName": "Mahamune",
                        "password": "$2b$10$fQHYrFiuqMhDkRZDOCWPeuRAu25vEDAmdTYOrFhw.3CSdSJS/GL2e",
                        "email": "mayurmahamune7@gmail.com",
                        "mobileNumber": " 91-7276789024",
                        "country": "IN",
                        "userVerificationStatus": true,
                        "requests": [],
                        "friends": [
                            {
                                "friendId": "SKoxY63e5",
                                "friendName": "Raju Rastogi",
                                "action": "Accept"
                            }
                        ],
                        "createdOn": "2018-09-19T06:40:15.000Z"
                    },
                    ..........
                ]
            }

    */

    app.get(`${baseUrl}/:userId/userDetails`, userController.getSingleUser);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/userDetails To get details of user
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "User Details Found",
                "status": 200,
                "data": {
                    "userId": "eKOTSdkn7",
                    "firstName": "Mayur",
                    "lastName": "Mahamune",
                    "email": "mayurmahamune7@gmail.com",
                    "mobileNumber": " 91-undefined",
                    "country": "IN",
                    "userVerificationStatus": true,
                    "requests": [],
                    "friends": [
                        {
                            "friendId": "SKoxY63e5",
                            "friendName": "Raju Rastogi",
                            "action": "Accept"
                        }
                    ],
                    "createdOn": "2018-09-19T06:40:15.000Z"
                }
            }

    */

    app.put(`${baseUrl}/:userId/edit`, userController.editUser);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {put} /api/v1/users/:userId/edit To edit details of user
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "User details edited",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }

    */

    app.put(`${baseUrl}/:userId/deleteUser`, userController.editUser);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {put} /api/v1/users/:userId/deleteUser To delete single user.
         *
         * @apiParam {string} userId User ID of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "Deleted the user successfully",
                    "status": 200,
                    "data": {
                        "n": 1,
                        "ok": 1
                    }
                }
            * @apiErrorExample {json} Error-Response:
            *
                {
                    "error": true,
                    "message": "No User Found",
                    "status": 404,
                    "data": null
                }

    */

    app.post(`${baseUrl}/logout`, userController.logout);

    /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/logout Logout.
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "Logged Out Successfully",
                "status": 200,
                "data": null
            }                 

    */


}// end of setRouter

module.exports = {
    setRouter: setRouter
}