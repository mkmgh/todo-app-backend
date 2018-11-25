const express = require('express');
const router = express.Router();

const itemController = require("./../controllers/itemController");
const appConfig = require("./../config/appConfig")

const authentication = require('./../middleware/authentication')


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/items`;


    app.post(baseUrl+ '/createItem', authentication.isAuthorized, itemController.createItem);

    /**
     * @apiGroup Items
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/createItem To create item.
     *
     * @apiParam {string} listId listId of the list(Parent of Item). (body params)
     * @apiParam {string} itemName Item name of the item. (body params)
     * @apiParam {boolean} isDone To make item Done or Open.(Default:false) (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

        {
            "error": false,
            "message": "List's Item created successfully",
            "status": 200,
            "data": {
                "listId": "X_cdkpxYp",
                "itemId": "QetWHiP5a",
                "itemName": "Private Item1",
                "createdOn": "2018-09-23T13:50:25.941Z",
                "modifiedOn": "2018-09-23T13:50:25.941Z",
                "isDone": false,
                "_id": "5ba79d4295c88122b440ed73",
                "__v": 0
            }
        }

     * @apiErrorExample {json} Error-Response:
     *
        {
            "error": true,
            "message": "Failed to create item",
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

    app.get(baseUrl + '/:listId/getItemsOfList', itemController.getAllItemsOfList);

    /**
         * @apiGroup Items
         * @apiVersion  1.0.0
         * @api {get} /api/v1/items/:listId/getItemsOfList To get items of list
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "Item found",
                "status": 200,
                "data": [
                    {
                        "listId": "X_cdkpxYp",
                        "itemId": "QetWHiP5a",
                        "itemName": "Private Item1",
                        "createdOn": "2018-09-23T13:50:25.941Z",
                        "modifiedOn": "2018-09-23T13:50:25.941Z",
                        "isDone": false,
                        "_id": "5ba79d4295c88122b440ed73",
                        "__v": 0
                    }
                ]
            }

            
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Item Found",
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

    app.post(baseUrl + '/:itemId/delete', authentication.isAuthorized, itemController.deleteItem);

    /**
         * @apiGroup Items
         * @apiVersion  1.0.0
         * @api {post} /api/v1/items/:itemId/delete To delete single item.
         *
         * @apiParam {string} itemId Item ID of the item. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

                {
                    "error": false,
                    "message": "Item Deleted",
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


    app.put(baseUrl + '/:itemId/edit', authentication.isAuthorized, itemController.editItem);

    /**
         * @apiGroup Items
         * @apiVersion  1.0.0
         * @api {put} /api/v1/items/:itemId/edit To edit details of item
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Item details edited/updated successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */

    app.put(baseUrl + '/:itemId/markItemDone', authentication.isAuthorized, itemController.markDoneItem);

    /**
         * @apiGroup Items
         * @apiVersion  1.0.0
         * @api {put} /api/v1/items/:itemId/markItemDone To make item mark as done
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Task done successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */

    app.get(baseUrl + '/allItems', authentication.isAuthorized, itemController.getAllItems);

    /**
         * @apiGroup Items
         * @apiVersion  1.0.0
         * @api {get} /api/v1/items/allItems To get all Items
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:

            {
                "error": false,
                "message": "All Items Found",
                "status": 200,
                "data": [
                    {
                        "listId": "kdWgdNbvr",
                        "itemId": "qtcX9XSmw",
                        "itemName": "Item1",
                        "createdOn": "2018-09-23T05:42:50.493Z",
                        "modifiedOn": "2018-09-23T05:42:50.493Z",
                        "isDone": false
                    },
                    {
                        "listId": "X_cdkpxYp",
                        "itemId": "QetWHiP5a",
                        "itemName": "Private Item1",
                        "createdOn": "2018-09-23T13:50:25.941Z",
                        "modifiedOn": "2018-09-23T13:50:25.941Z",
                        "isDone": true
                    },
                    ....................
                ]
            }

    */    
    


    app.get(baseUrl + '/:itemId/getItemByItemId', itemController.getItemByItemId);



}// end of setRouter

module.exports = {
    setRouter: setRouter
}