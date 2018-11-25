const mongoose = require('mongoose');
const shortid = require('shortid');

//Libraries
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib');
const check = require('../library/checkLib');

//Models
const ListModel = mongoose.model('ListModel');
const ItemModel = mongoose.model('ItemModel');
const SubItemHistoryModel = mongoose.model('SubItemHistoryModel');



/**
 * function to save the Sub-Item(sub-task) in history.
 */
let saveHistorySubItem = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if ( check.isEmpty(req.body.itemId) || check.isEmpty(req.body.subItemId) || check.isEmpty(req.body.subItemName) || check.isEmpty(req.body.isDone) || check.isEmpty(req.body.operationName) ) {
                logger.error('Parameters Missing', 'saveHistorySubItem : Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {
                resolve()
            }
        });
    }//end validate params

    let saveSubItem = () => {
        return new Promise((resolve, reject) => {

                let newSubItem = new SubItemHistoryModel({
                   // historyItemId:shortid.generate(),
                   itemId : req.body.itemId,
                   subItemId : req.body.subItemId,
                   subItemName : req.body.subItemName,
                   isDone : req.body.isDone,
                   operationName : req.body.operationName
                    
                }) // end new sub-item model
            
                newSubItem.save((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to save sub-item', 500, null)
                        res.send(apiResponse)
                    } else {
                      
                        console.log(result)
                        resolve(result)
                    
                    }

                }) // end new item save

        })//end promise

        
    }//end

    
    validateParams()
        .then(saveSubItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, `Sub-Item saved in history successfully`, 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)

        })


}//end saveHistorySubItem


/**
 * get last Sub-Item
 */

 //method for getting sub-items for undo function
let getLastSubItem=(req,res)=>{

    let validateParams = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.params.itemId)) {
                logger.error('Parameters Missing', 'getLastSubItem:Validate Params()', 5);
                let apiResponse = response.generate(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {

                resolve();
            }
        });
    }//end validate params


    let findHistorySubItem=()=>{
        return new Promise((resolve, reject) => {
            SubItemHistoryModel.findOne({'itemId':req.params.itemId})
                .lean()
                .sort([['_id', -1]])
                .select(' -__v')
                .exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Sub-Item History Controller: getLastSubItem', 10)
                        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Sub-Items History Found', 'Sub-Item History Controller:getLastSubItem', 10)
                        let apiResponse = response.generate(true, 'No Sub-Items History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log('Sub-Item History Found')
                        resolve(result)

                    }

                });
        });
      
    }//end
    




    validateParams()
    .then(findHistorySubItem)
    .then((result) => {
        let apiResponse = response.generate(false, 'Last sub-item of item Found', 200, result)
        res.send(apiResponse)
    })
    .catch((error) => {
        res.send(error)
    })

}//end


/**
 * function to delete Sub-Item from history.
 */
let deleteSubItemFromHistory = (req, res) => {

    SubItemHistoryModel.deleteOne({ 'subItemId': req.params.subItemId,"subItemName": req.body.subItemName}, (err, result) => {
        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Sub-item Found', 'Sub-Item Controller : deleteSubItemHistory')
            let apiResponse = response.generate(true, 'No Sub-Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Sub-Item deleted", "Sub-Item Controller : deleteSubItemHistory")
            let apiResponse = response.generate(false, 'Sub-Item Deleted from history', 200, result)
            res.send(apiResponse)
        }
    })
}//end deleteSub-Item


/**
 * function to get all Sub-Item history
 */

let getAllSubItemsHistory =(req,res) => {

    SubItemHistoryModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to get sub-items history', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Sub-Items Found', 'Sub-Items Controller : getAllSubItemsHistory')
            let apiResponse = response.generate(true, 'No history sub-items Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('All sub-items Found', 'Sub-Items Controller : getAllSubItems')
            let apiResponse = response.generate(false, 'All History Sub-Items Found', 200, result)
            res.send(apiResponse)
        }
    })


}//end getAllSubItemsHistory


/**
 * function to clear all undo Sub-Item history
 */

let clearSubItemUndoHistory =(req,res) => {

    SubItemHistoryModel.remove()
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to clear undos', 500, null)
            res.send(apiResponse)
        } else {
            logger.info('Item history cleared', 'Items history Controller : clearItemUndoHistory')
            let apiResponse = response.generate(false, 'All Sub-Items Undos cleared', 200, result)
            res.send(apiResponse)
        }
    })


}//end clearItemUndoHistory





module.exports={

    saveHistorySubItem:saveHistorySubItem,
    getAllSubItemsHistory:getAllSubItemsHistory,
    getLastSubItem:getLastSubItem,
    deleteSubItemFromHistory:deleteSubItemFromHistory,
    clearSubItemUndoHistory:clearSubItemUndoHistory
}

