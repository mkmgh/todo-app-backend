const mongoose = require('mongoose');
const shortid = require('shortid');

//Libraries
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib');
const check = require('../library/checkLib');

//Models
const ListModel = mongoose.model('ListModel');
const ItemModel = mongoose.model('ItemModel');
const ItemHistoryModel = mongoose.model('ItemHistoryModel');



/**
 * function to save the Item(task) in history.
 */
let saveHistoryItem = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if ( check.isEmpty(req.body.listId) || check.isEmpty(req.body.itemId) || check.isEmpty(req.body.itemName) || check.isEmpty(req.body.isDone) || check.isEmpty(req.body.operationName) ) {
                logger.error('Parameters Missing', 'saveHistoryItem : Validate Params()', 5);
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

                let newItem = new ItemHistoryModel({
                   // historyItemId:shortid.generate(),
                    listId : req.body.listId,
                    itemId : req.body.itemId,
                    itemName : req.body.itemName,
                    isDone : req.body.isDone,
                    operationName : req.body.operationName
                    
                }) // end new item model
            
                newItem.save((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to save item', 500, null)
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
            let apiResponse = response.generate(false, `Item saved in history successfully`, 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)

        })


}//end saveHistoryItem


/**
 * get last Item
 */

 //method for getting items for undo function
let getLastItem=(req,res)=>{

    let validateParams = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.params.listId)) {
                logger.error('Parameters Missing', 'getLastItem:Validate Params()', 5);
                let apiResponse = response.generate(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {

                resolve();
            }
        });
    }//end validate params


    let findHistoryItem=()=>{
        return new Promise((resolve, reject) => {
            ItemHistoryModel.findOne({'listId':req.params.listId})
                .lean()
                .sort([['_id', -1]])
                .select(' -__v')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item History Controller: getLastItem', 10)
                        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Items History Found', 'Item History Controller:getLastItem', 10)
                        let apiResponse = response.generate(true, 'No Items History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('Item History Found')
                        resolve(result)

                    }

                });
        });
      
    }//end
    




    validateParams()
    .then(findHistoryItem)
    .then((result) => {
        let apiResponse = response.generate(false, 'Last item of list Found', 200, result)
        res.send(apiResponse)
    })
    .catch((error) => {
        res.send(error)
    })

}//end


/**
 * function to delete Item from history.
 */
let deleteItemFromHistory = (req, res) => {

    ItemHistoryModel.deleteOne({ 'itemId': req.params.itemId,"itemName": req.body.itemName}, (err, result) => {
        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No item Found', 'Item Controller : deleteItemHistory')
            let apiResponse = response.generate(true, 'No Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Item deleted", "Item Controller : deleteItemHistory")
            let apiResponse = response.generate(false, 'Item Deleted from history', 200, result)
            res.send(apiResponse)
        }
    })
}//end deleteItem


/**
 * function to get all Item history
 */

let getAllItemsHistory =(req,res) => {

    ItemHistoryModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to get items history', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Items Found', 'Items Controller : getAllItems')
            let apiResponse = response.generate(true, 'No history items Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('All items Found', 'Items Controller : getAllItems')
            let apiResponse = response.generate(false, 'All History Items Found', 200, result)
            res.send(apiResponse)
        }
    })


}//end getAllItemsHistory


/**
 * function to clear all undo Item history
 */

let clearItemUndoHistory =(req,res) => {

    ItemHistoryModel.remove()
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to clear undos', 500, null)
            res.send(apiResponse)
        } else {
            logger.info('Item history cleared', 'Items history Controller : clearItemUndoHistory')
            let apiResponse = response.generate(false, 'All Items Undos cleared', 200, result)
            res.send(apiResponse)
        }
    })


}//end clearItemUndoHistory



module.exports={

    saveHistoryItem:saveHistoryItem,
    getAllItemsHistory:getAllItemsHistory,
    getLastItem:getLastItem,
    deleteItemFromHistory:deleteItemFromHistory,
    clearItemUndoHistory:clearItemUndoHistory
}

