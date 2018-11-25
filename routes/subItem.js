const express = require('express');
const router = express.Router();

const subItemController = require("./../controllers/subItemController");
const appConfig = require("./../config/appConfig")

const authentication = require('./../middleware/authentication')


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/subItems`;

    app.post(baseUrl+ '/createSubItems', authentication.isAuthorized, subItemController.createSubItem);

    /**
     * @apiGroup SubItems
     * @apiVersion  1.0.0
     * @api {post} /api/v1/subItems/createSubItems To create sub-item.
     *
     * @apiParam {string} itemId itemId of the item(Parent of Sub-Item). (body params)
     * @apiParam {string} subItemName Sub-Item name of the SubItem. (body params)
     * @apiParam {boolean} isDone To make sub-item Done or Open.(Default:false) (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

        {
            "error": false,
            "message": "Item's sub-item created successfully",
            "status": 200,
            "data": {
                "itemId": "QetWHiP5a",
                "subItemId": "pVYv-3GOA",
                "subItemName": "Sub-Item1",
                "createdOn": "2018-09-23T13:50:26.069Z",
                "modifiedOn": "2018-09-23T13:50:26.069Z",
                "isDone": false,
                "_id": "5ba7a25e95c88122b440ed74",
                "__v": 0
            }
        }

     * @apiErrorExample {json} Error-Response:
     *
        {
            "error": true,
            "message": "Failed to create sub-item",
            "status": 500,
            "data": null
        }

     * @apiErrorExample {json} Error-Response:
     *
        {
            "error": true,
            "message": "parameters missing.",
            "status": 500,
            "data": null
        }


    */

    app.get(baseUrl + '/:itemId/getSubItemsOfItem', subItemController.getAllSubItemsOfItem);

    /**
         * @apiGroup SubItems
         * @apiVersion  1.0.0
         * @api {get} /api/v1/subItems/:itemId/getSubItemsOfItem To get sub-items of items
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "Sub-Item found",
                "status": 200,
                "data": [
                    {
                        "itemId": "QetWHiP5a",
                        "subItemId": "pVYv-3GOA",
                        "subItemName": "Sub-Item1",
                        "createdOn": "2018-09-23T13:50:26.069Z",
                        "modifiedOn": "2018-09-23T13:50:26.069Z",
                        "isDone": false,
                        "_id": "5ba7a25e95c88122b440ed74",
                        "__v": 0
                    }
                ]
            }

            
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Sub-Item Found",
                "status": 500,
                "data": null
            }

         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "itemId is missing",
                "status": 500,
                "data": null
            }


    */

    app.post(baseUrl + '/:subItemId/delete', subItemController.deleteSubItem);

    /**
         * @apiGroup SubItems
         * @apiVersion  1.0.0
         * @api {post} /api/v1/subItems/:subItemId/delete To delete single sub-item.
         *
         * @apiParam {string} subItemId Sub-Item ID of the sub-item. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "Sub-Item Deleted",
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
                    "message": "No Sub-Item Found",
                    "status": 404,
                    "data": null
                }

    */

    app.put(baseUrl + '/:subItemId/edit', authentication.isAuthorized, subItemController.editSubItem);

    /**
         * @apiGroup SubItems
         * @apiVersion  1.0.0
         * @api {put} /api/v1/subItems/:subItemId/edit To edit details of sub-item
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Sub-Item details edited/updated successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */

    app.put(baseUrl + '/:subItemId/markSubItemDone', authentication.isAuthorized, subItemController.markDoneSubItem);

    /**
         * @apiGroup SubItems
         * @apiVersion  1.0.0
         * @api {put} /api/v1/subItems/:subItemId/markSubItemDone To make sub-item mark as done
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Sub-Task done successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */    


    app.get(baseUrl + '/allSubItems', authentication.isAuthorized, subItemController.getAllSubItems);

    /**
         * @apiGroup SubItems
         * @apiVersion  1.0.0
         * @api {get} /api/v1/subItems/allSubItems To get all Sub-Items
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All Sub Items Found",
                "status": 200,
                "data": [
                    {
                        "itemId": "lSxsmB1Gu",
                        "subItemId": "DILCqc-EM",
                        "subItemName": "Sub-Item1",
                        "createdOn": "2018-09-19T15:33:59.865Z",
                        "modifiedOn": "2018-09-19T15:33:59.865Z",
                        "isDone": false
                    },
                    {
                        "itemId": "XNQ75qsoE",
                        "subItemId": "iW5FZs94O",
                        "subItemName": "Sub-Item1",
                        "createdOn": "2018-09-21T04:56:56.027Z",
                        "modifiedOn": "2018-09-21T04:56:56.027Z",
                        "isDone": false
                    },
                    {
                        "itemId": "QetWHiP5a",
                        "subItemId": "pVYv-3GOA",
                        "subItemName": "Sub-Item1",
                        "createdOn": "2018-09-23T13:50:26.069Z",
                        "modifiedOn": "2018-09-23T13:50:26.069Z",
                        "isDone": false
                    },
                    ...............
                ]
            }

    */    
    


}// end of setRouter

module.exports = {
    setRouter: setRouter
}