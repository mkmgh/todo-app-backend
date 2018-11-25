const mongoose = require('mongoose');
const shortid = require('shortid');

//Libraries
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib');
const check = require('../library/checkLib');

//Models
const ListModel = mongoose.model('ListModel');
const ItemModel = mongoose.model('ItemModel');
const SubItemModel = mongoose.model('SubItemModel');


/**
 * function to create the SubItem(subTask).
 */
let createSubItem = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.itemId) || check.isEmpty(req.body.subItemName)) {
                logger.error('Parameters Missing', 'createSubItem : Validate Params()', 5);
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

                let newSubItem = new SubItemModel({
            
                    itemId : req.body.itemId,
                    subItemId : shortid.generate(),
                    subItemName : req.body.subItemName
                    
                }) // end new list model
            
                newSubItem.save((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to create sub-item', 500, null)
                        res.send(apiResponse)
                    } else {
                      
                        console.log(result)
                        resolve(result)
                    
                    }

                }) // end new sub-item save

        })//end promise

        
    }//end

    
    validateParams()
        .then(saveSubItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, `Item's sub-item created successfully`, 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)

        })


}


/**
 * function to get sub-items from item using itemId
 */
let getAllSubItemsOfItem = (req, res) => {

    if (check.isEmpty(req.params.itemId)) {
        logger.error("itemId is missing", "Sub-Item Controller: getAllSubItemsOfItem", 10);
        let apiResponse = response.generate(true, "itemId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        SubItemModel.find({ itemId : req.params.itemId }, (err, subItemDetails) => {

            if (err) {
                logger.error('Failed to find sub-item', "Sub-Item Controller: getAllSubItemsOfItem", 10);
                let apiResponse = response.generate(true, "failed to find the Sub-Item", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(subItemDetails)) {
                logger.error("No Sub-Item Found", "Sub-Item Controller: getAllSubItemsOfItem", 10);
                let apiResponse = response.generate(true, "No Sub-Item Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Sub-Item found", "Sub-Item Controller: getAllSubItemsOfItem", 10);
                let apiResponse = response.generate(false, "Sub-Item found", 200, subItemDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getAllSubItemsOfItem


/**
 * function to delete sub-item.
 */
let deleteSubItem = (req, res) => {

    SubItemModel.remove({ 'subItemId': req.params.subItemId }, (err, result) => {
        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No sub-item Found', 'Sub-Item Controller : deleteSubItem')
            let apiResponse = response.generate(true, 'No Sub-Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Sub-Item deleted", "Sub-Item Controller : deleteSubItem")
            let apiResponse = response.generate(false, 'Sub-Item Deleted', 200, result)
            res.send(apiResponse)
        }
    })
}//end deleteSubItem

/**
 * function to edit Sub-Item.
 */
let editSubItem = (req, res) => {

    let options = req.body;
    console.log(options);
    SubItemModel.update({ 'subItemId': req.params.subItemId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to edit sub-item', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No sub-item Found', 'Sub-Item Controller : editSubItem')
            let apiResponse = response.generate(true, 'No Sub-Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Sub-Item details edited/updated ', 'Sub-Item Controller : editSubItem')
            let apiResponse = response.generate(false, 'Sub-Item details edited/updated successfully', 200, result)
            res.send(apiResponse)
        }
    })

}//end editSubItem


/**
 * function to get All Items(tasks).
 */
let getAllSubItems = (req, res) => {
    SubItemModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Failed to find sub items details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No sub-Items Found', 'Items Controller : getAllSubItems')
                let apiResponse = response.generate(true, 'No sub-items Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('All sub-items Found', 'Items Controller : getAllSubItems')
                let apiResponse = response.generate(false, 'All Sub Items Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all Items




/**
 * function to edit Sub-Item as mark done.
 */
let markDoneSubItem = (req, res) => {

    let options = req.body;
    console.log(options);
    SubItemModel.update({ 'subItemId': req.params.subItemId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Sub-Item failed to Mark as Done', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Sub-item Found', 'Sub-Item Controller : markDoneSubItem')
            let apiResponse = response.generate(true, 'No Sub-Item Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Sub-Item details edited/updated ', 'Sub-Item Controller : markDoneSubItem')
            let apiResponse = response.generate(false, 'Sub-Task done successfully', 200, result)
            res.send(apiResponse)
        }
    })

}//end editItem




module.exports={
    createSubItem: createSubItem,
    getAllSubItemsOfItem: getAllSubItemsOfItem,
    deleteSubItem : deleteSubItem,
    editSubItem : editSubItem,

    markDoneSubItem: markDoneSubItem,

    
    getAllSubItems:getAllSubItems

}