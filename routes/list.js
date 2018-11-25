const express = require('express');
const router = express.Router();

const listController = require("./../controllers/listController");
const appConfig = require("./../config/appConfig")

const authentication = require('./../middleware/authentication')


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/lists`;

    app.post(baseUrl+ '/createList', authentication.isAuthorized, listController.createList);

    /**
     * @apiGroup Lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/lists/createList To create list.
     *
     * @apiParam {string} userId UserId of the user. (body params)
     * @apiParam {string} listName List name of the list. (body params)
     * @apiParam {string} creator Name of the list creator. (body params)
     * @apiParam {boolean} private To identify property of list(Public or Private). (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

                    {
                        "error": false,
                        "message": "TO-Do-List created successfully",
                        "status": 200,
                        "data": {
                            "listId": "CcvsI9xtn"
                            "userId": "eKOTSdkn7"
                            "listName": "Public List2"
                            "creator": "Mayur Mahamune"
                            "private": false
                            "createdOn": "2018-09-23T11:50:23.820Z"
                            "modifiedOn": "2018-09-23T11:50:23.820Z"
                        }
                    }


        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "Failed to create list",
                "status": 500,
                "data": null
            }
    */


    app.get(baseUrl + '/:userId/getAllListsOfUser', listController.getAllListsOfUser);

    /**
         * @apiGroup Lists
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:userId/getAllListsOfUser To get lists of user
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "List found",
                "status": 200,
                "data": [
                    {
                        "createdOn": "2018-09-20T05:42:07.421Z",
                        "modifiedOn": "2018-09-20T05:42:07.421Z",
                        "_id": "5ba3357f6e6c410df889288d",
                        "listId": "RszfSE0Nj",
                        "listName": "Public List1",
                        "userId": "eKOTSdkn7",
                        "creator": "Mayur Mahamune",
                        "private": false,
                        "__v": 0
                    },
                    {
                        "createdOn": "2018-09-20T06:44:28.957Z",
                        "modifiedOn": "2018-09-20T06:44:28.957Z",
                        "_id": "5ba3447c709c2b0a4826d2b9",
                        "listId": "X_cdkpxYp",
                        "listName": "Private List1",
                        "userId": "eKOTSdkn7",
                        "creator": "Mayur Mahamune",
                        "private": true,
                        "__v": 0
                    },
                    ............
                ]
            }

    */    


    app.post(baseUrl + '/:listId/delete', authentication.isAuthorized, listController.deleteList);
    /**
         * @apiGroup Lists
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/:listId/delete To delete single list.
         *
         * @apiParam {string} listId List ID of the list. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "List Deleted",
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
                    "message": "No List Found",
                    "status": 404,
                    "data": null
                }

    */

    app.put(baseUrl + '/:listId/edit', authentication.isAuthorized, listController.editList);

    /**
         * @apiGroup Lists
         * @apiVersion  1.0.0
         * @api {put} /api/v1/lists/:listId/edit To edit details of list
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "List details edited/updated successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */


    app.get(baseUrl + '/allLists', authentication.isAuthorized, listController.getAllList);

    /**
         * @apiGroup Lists
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/allLists To get all lists
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All List Found",
                "status": 200,
                "data": [
                    {
                        "createdOn": "2018-09-20T05:42:07.421Z",
                        "modifiedOn": "2018-09-20T05:42:07.421Z",
                        "listId": "RszfSE0Nj",
                        "listName": "Public List1",
                        "userId": "eKOTSdkn7",
                        "creator": "Mayur Mahamune",
                        "private": false
                    },
                    {
                        "createdOn": "2018-09-20T06:44:28.957Z",
                        "modifiedOn": "2018-09-20T06:44:28.957Z",
                        "listId": "X_cdkpxYp",
                        "listName": "Private List1",
                        "userId": "eKOTSdkn7",
                        "creator": "Mayur Mahamune",
                        "private": true
                    },
                    {
                        "createdOn": "2018-09-20T17:33:50.336Z",
                        "modifiedOn": "2018-09-20T17:33:50.336Z",
                        "listId": "lpYuD5WBL",
                        "listName": "List1",
                        "userId": "SKoxY63e5",
                        "creator": "Raju Rastogi",
                        "private": true
                    },
                    ................
                ]
            }

    */    


    app.get(baseUrl + '/:listId/getListByListId', listController.getListByListId);


}// end of setRouter

module.exports = {
    setRouter: setRouter
}