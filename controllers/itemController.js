const mongoose = require('mongoose');
const shortid = require('shortid');

//Libraries
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib');
const check = require('../library/checkLib');

//Models
const ListModel = mongoose.model('ListModel');
const ItemModel = mongoose.model('ItemModel');

/**
 * function to create the Item(task).
 */
let createItem = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.itemName) || check.isEmpty(req.body.listId)) {
                logger.error('Parameters Missing', 'createItem : Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {
                resolve()
            }
        });
    }//end validate params

    let saveItem = () => {
        return new Promise((resolve, reject) => {

                let newItem = new ItemModel({
            
                    listId : req.body.listId, 
                    itemId : shortid.generate(),
                    //((req.body.itemId==(''))?(shortid.generate()):(req.body.itemId)),
                    itemName : req.body.itemName
                    
                }) // end new list model
            
                newItem.save((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to create item', 500, null)
                        res.send(apiResponse)
                    } else {
                      
                        console.log(result)
                        resolve(result)
                    
                    }

                }) // end new item save

        })//end promise

        
    }//end

    
    validateParams()
        .then(saveItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, `List's Item created successfully`, 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)

        })


}//end createItem

/**
 * function to get all items of list using listId
 */
let getAllItemsOfList = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.error("listId is missing", "Item Controller: getAllItemsOfList", 10);
        let apiResponse = response.generate(true, "listId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        ItemModel.find({ listId : req.params.listId }, (err, itemDetails) => {

            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find Item', "Item Controller: getAllItemsOfList", 10);
                let apiResponse = response.generate(true, "failed to find the Item", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(itemDetails)) {
                logger.error("No Item Found", "Item Controller: getAllItemsOfList", 10);
                let apiResponse = response.generate(true, "No Item Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Item found", "Item Controller: getAllItemsOfList", 10);
                let apiResponse = response.generate(false, "Item found", 200, itemDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getAllItemsOfList

/**
 * function to delete Item.
 */
let deleteItem = (req, res) => {

    ItemModel.remove({ 'itemId': req.params.itemId }, (err, result) => {
        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No item Found', 'Item Controller : deleteItem')
            let apiResponse = response.generate(true, 'No Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Item deleted", "Item Controller : deleteItem")
            let apiResponse = response.generate(false, 'Item Deleted', 200, result)
            res.send(apiResponse)
        }
    })
}//end deleteItem

/**
 * function to edit Item.
 */
let editItem = (req, res) => {

    //let options = req.body;
    //console.log(options);
    console.log(req.params.itemId);
    ItemModel.update({ 'itemId': req.params.itemId }, {'itemName': req.body.itemName}, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to edit item', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No item Found', 'Item Controller : editItem')
            let apiResponse = response.generate(true, 'No Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Item details edited/updated ', 'Item Controller : editItem')
            let apiResponse = response.generate(false, 'Item details edited/updated successfully', 200, result)
            res.send(apiResponse)
        }
    })

}//end editItem


//Below functionality is for trail purpose

/**
 * function to get All Items(tasks).
 */
let getAllItems = (req, res) => {
    ItemModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Failed to find items details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Items Found', 'Items Controller : getAllItems')
                let apiResponse = response.generate(true, 'No items Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('All items Found', 'Items Controller : getAllItems')
                let apiResponse = response.generate(false, 'All Items Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all Items


/**
 * function to get single item.
 */
let getItemByItemId = (req, res) => {

    if (check.isEmpty(req.params.itemId)) {
        logger.error("itemId is missing", "Item Controller: getItemByItemId", 10);
        let apiResponse = response.generate(true, "itemId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        ItemModel.findOne({ itemId: req.params.itemId }, (err, itemDetails) => {

            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find item', "Item Controller: getItemByItemId", 10);
                let apiResponse = response.generate(true, "failed to find the Item", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(itemDetails)) {
                logger.error("No Item Found", "Item Controller: getItemByItemId", 10);
                let apiResponse = response.generate(true, "No Item Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Item found", "Item Controller: getItemByItemId", 10);
                let apiResponse = response.generate(false, "List found", 200, itemDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getListByListId




/**
 * function to edit Item as mark done.
 */
let markDoneItem = (req, res) => {

    let options = req.body;
    console.log(options);
    ItemModel.update({ 'itemId': req.params.itemId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Item failed to Mark as Done', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No item Found', 'Item Controller : markDoneItem')
            let apiResponse = response.generate(true, 'No Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Item details edited/updated ', 'Item Controller : markDoneItem')
            let apiResponse = response.generate(false, 'Task done successfully', 200, result)
            res.send(apiResponse)
        }
    })

}//end editItem




/**
 * function to get items of user(adder).
 */

/* 
let getItemsByadderId = (req, res) => {

    if (check.isEmpty(req.params.adderId)) {
        logger.error("adderId is missing", "Item Controller: getItemsByadderId", 10);
        let apiResponse = response.generate(true, "adderId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        ItemModel.find({ adderId : req.params.adderId }, (err, itemDetails) => {

            if (err) {
                logger.error('Failed to find Item', "Item Controller: getItemsByadderId", 10);
                let apiResponse = response.generate(true, "failed to find the Item", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(itemDetails)) {
                logger.error("No Item Found", "Item Controller: getItemsByadderId", 10);
                let apiResponse = response.generate(true, "No Item Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Item found", "Item Controller: getItemsByadderId", 10);
                let apiResponse = response.generate(false, "Item found", 200, itemDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getListByListId

*/


module.exports={

    createItem:createItem,
    getAllItemsOfList:getAllItemsOfList,
    deleteItem:deleteItem,
    editItem:editItem,

    markDoneItem: markDoneItem,

    getAllItems:getAllItems,
    getItemByItemId:getItemByItemId
}