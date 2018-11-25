const express = require('express');
const router = express.Router();

const itemHistoryController = require("./../controllers/itemHistoryController");
const appConfig = require("./../config/appConfig")
const authentication = require('./../middleware/authentication')


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/itemsHistory`;

    app.post(baseUrl + '/saveHistoryItem', authentication.isAuthorized, itemHistoryController.saveHistoryItem);

    /**
     * @apiGroup Items-History
     * @apiVersion  1.0.0
     * @api {post} /api/v1/itemsHistory/saveHistoryItem To save item in History.
     *
     * @apiParam {string} listId listId of the list(Parent of Item). (body params)
     * @apiParam {string} itemId itemId of the Item. (body params)
     * @apiParam {string} itemName Item name of the item. (body params)
     * @apiParam {boolean} isDone To make item Done or Open.(Default:false). (body params)
     * @apiParam {string} operationName To identify action performed on Item. (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

        {
            "error": false,
            "message": "Item saved in history successfully",
            "status": 200,
            "data": {
                "listId": "X_cdkpxYp",
                "itemId": "QetWHiP5a",
                "itemName": "Private Item1",
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
            "message": "Failed to save item",
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


    app.get(baseUrl + '/getAllItemsHistory', itemHistoryController.getAllItemsHistory);

    /**
         * @apiGroup Items-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/itemsHistory/getAllItemsHistory To get all Items History
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All History Items Found",
                "status": 200,
                "data": [
                    {
                        "listId": "0APE8GnLZ",
                        "itemId": "srF1_WnkR",
                        "itemName": "Public Item2",
                        "createdOn": "2018-09-25T17:32:07.009Z",
                        "modifiedOn": "2018-09-25T17:32:07.009Z",
                        "isDone": false,
                        "operationName": "Create"
                    },
                    {
                        "listId": "0APE8GnLZ",
                        "itemId": "9mUyx_qTa",
                        "itemName": "Public Item3",
                        "createdOn": "2018-09-25T17:32:07.009Z",
                        "modifiedOn": "2018-09-25T17:32:07.009Z",
                        "isDone": false,
                        "operationName": "Create"
                    },
                    {
                        "listId": "0APE8GnLZ",
                        "itemId": "9mUyx_qTa",
                        "itemName": "Public Item3",
                        "createdOn": "2018-09-25T17:32:07.009Z",
                        "modifiedOn": "2018-09-25T17:32:07.009Z",
                        "isDone": false,
                        "operationName": "Delete"
                    },
                    ................
                ]
            }

    */    


    app.get(baseUrl + '/:listId/getLastItem', authentication.isAuthorized, itemHistoryController.getLastItem);

    /**
         * @apiGroup Items-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/itemsHistory/:listId/getLastItem To get last-items of list
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "Last item of list Found",
                "status": 200,
                "data": {
                    "_id": "5baa73af32209c0ab82da739",
                    "listId": "0APE8GnLZ",
                    "itemId": "Krwx9uwll",
                    "itemName": "Item1",
                    "createdOn": "2018-09-25T17:32:07.009Z",
                    "modifiedOn": "2018-09-25T17:32:07.009Z",
                    "isDone": false,
                    "operationName": "Create"
                }
            }

            
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Items History Found",
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


    app.post(baseUrl + '/:itemId/deleteFromHistory', authentication.isAuthorized, itemHistoryController.deleteItemFromHistory);


    /**
         * @apiGroup Items-History
         * @apiVersion  1.0.0
         * @api {post} /api/v1/itemsHistory/:itemId/deleteFromHistory To delete single item from History.
         *
         * @apiParam {string} itemId Item ID of the item. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "Item Deleted from history",
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
                    "message": "No Item Found",
                    "status": 404,
                    "data": null
                }

    */




    app.get(baseUrl + '/clearItemUndoHistory', authentication.isAuthorized, itemHistoryController.clearItemUndoHistory);

    /**
         * @apiGroup Items-History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/itemsHistory/clearItemUndoHistory To clear/delete undos for item.
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All Items Undos cleared",
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