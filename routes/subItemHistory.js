const express = require('express');
const router = express.Router();

const subItemHistoryController = require("./../controllers/subItemHistoryController");
const appConfig = require("./../config/appConfig")

const authentication = require('./../middleware/authentication')


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/subItemsHistory`;

    app.post(baseUrl + '/saveHistorySubItem', authentication.isAuthorized, subItemHistoryController.saveHistorySubItem);

    /**
     * @apiGroup SubItems-History
     * @apiVersion  1.0.0
     * @api {post} /api/v1/subItemsHistory/saveHistorySubItem To save sub-item in History.
     *
     * @apiParam {string} itemId itemId of the Item(Parent of Sub-Item). (body params)
     * @apiParam {string} subItemId subItemId of the SubItem. (body params)
     * @apiParam {string} subItemName SubItem name of the sub-item. (body params)
     * @apiParam {boolean} isDone To make item Done or Open.(Default:false). (body params)
     * @apiParam {string} operationName To identify action performed on Sub-Item. (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

        {
            "error": false,
            "message": "Sub-Item saved in history successfully",
            "status": 200,
            "data": {
                "itemId": "X_cdkpxYp",
                "subItemId": "QetWHiP5a",
                "subItemName": "Private SubItem1",
                "createdOn": "2018-09-23T13:50:25.941Z",
                "modifiedOn": "2018-09-23T13:50:25.941Z",
                "isDone": false,
                 "operationName" : "Create",
                "_id": "5ba79d4295c88122b440ed73",
                "__v": 0
            }
        }

     * @apiErrorExample {json} Error-Response:
     *
        {
            "error": true,
            "message": "Failed to save sub-item",
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

    app.get(baseUrl + '/getAllSubItemsHistory', subItemHistoryController.getAllSubItemsHistory);

    /**
         * @apiGroup SubItems-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/subItemsHistory/getAllSubItemsHistory To get all Sub-Items History
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "All History Sub-Items Found",
                    "status": 200,
                    "data": [
                        {
                            "itemId": "norXKAeas",
                            "subItemId": "VdadL46Da",
                            "subItemName": "Sub-item1",
                            "createdOn": "2018-09-25T17:32:07.021Z",
                            "modifiedOn": "2018-09-25T17:32:07.021Z",
                            "isDone": false,
                            "operationName": "Delete"
                        },
                        ....................
                    ]
                }

 
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No history sub-items Found",
                "status": 404,
                "data": null
            }

    */    


    app.get(baseUrl + '/:itemId/getLastSubItem', authentication.isAuthorized, subItemHistoryController.getLastSubItem);

    /**
         * @apiGroup SubItems-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/subItemsHistory/:itemId/getLastSubItem To get last-sub-item.
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "Last sub-item of item Found",
                "status": 200,
                "data": {
                    "_id": "5baa7b6c32209c0ab82da741",
                    "itemId": "norXKAeas",
                    "subItemId": "iALy9fKhc",
                    "subItemName": "Sub1",
                    "createdOn": "2018-09-25T17:32:07.021Z",
                    "modifiedOn": "2018-09-25T17:32:07.021Z",
                    "isDone": false,
                    "operationName": "Create"
                }
            }

            
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Sub-Items History Found",
                "status": 500,
                "data": null
            }

         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "listId is missing",
                "status": 500,
                "data": null
            }


    */



    app.post(baseUrl + '/:subItemId/deleteSubItemFromHistory', authentication.isAuthorized, subItemHistoryController.deleteSubItemFromHistory);
 
    /**
         * @apiGroup SubItems-History
         * @apiVersion  1.0.0
         * @api {post} /api/v1/subItemsHistory/:subItemId/deleteSubItemFromHistory To delete single sub-item from History.
         *
         * @apiParam {string} subItemId SubItem ID of the subitem. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "Sub-Item Deleted from history",
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
 


    app.get(baseUrl + '/clearSubItemUndoHistory', authentication.isAuthorized, subItemHistoryController.clearSubItemUndoHistory);

    /**
         * @apiGroup SubItems-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/subItemsHistory/clearSubItemUndoHistory To clear/delete undos for sub-item.
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All Sub-Items Undos cleared",
                "status": 200,
                "data": {
                    "n": 0,
                    "ok": 1
                }
            }

            
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "Failed to clear undos",
                "status": 500,
                "data": null
            }

    */    



}// end of setRouter

module.exports = {
    setRouter: setRouter
}