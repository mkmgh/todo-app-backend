const mongoose = require('mongoose');
const shortid = require('shortid');

//Libraries
const response = require('./../library/responseLib')
const logger = require('./../library/loggerLib');
const check = require('../library/checkLib');

//Models
const ListModel = mongoose.model('ListModel');
//const ItemModel = mongoose.model('ItemModel');


/**
 * function to create the List.
 */
let createList = (req, res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if(check.isEmpty(req.body.userId) || check.isEmpty(req.body.listName) || check.isEmpty(req.body.creator) || check.isEmpty(req.body.private)) {
                logger.error('Parameters Missing', 'createList:Validate Params()', 5);
                let apiResponse = response.generateResponse(true, 'parameters missing.', 403, null);
                reject(apiResponse)
            }
            else {
                resolve()
            }
        });
    }//end validate params

    let saveList = () => {
        return new Promise((resolve, reject) => {

                let newList = new ListModel({
            
                    listId : shortid.generate(),
                    listName : req.body.listName,
                    userId : req.body.userId,
                    creator: req.body.creator,
                    private: req.body.private               
                    
                }) // end new list model
            
                newList.save((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(`Error occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to create list', 500, null)
                        res.send(apiResponse)
                    } else {
                      
                        console.log(result)
                        resolve(result)
                    
                    }

                }) // end new product save

        })//end promise

        
    }//end

    
    validateParams()
        .then(saveList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'TO-Do-List created successfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            res.send(err)

        })


}//end createList


/**
 * function to get lists of user.
 */
let getAllListsOfUser = (req, res) => {

    if (check.isEmpty(req.params.userId)) {
        logger.error("userId is missing", "List Controller: getAllListsOfUser", 10);
        let apiResponse = response.generate(true, "userId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        ListModel.find({ userId : req.params.userId }, (err, listDetails) => {

            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find list', "List Controller: getAllListsOfUser", 10);
                let apiResponse = response.generate(true, "failed to find the List", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(listDetails)) {
                logger.error("No List Found", "List Controller: getAllListsOfUser", 10);
                let apiResponse = response.generate(true, "No List Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("List found", "List Controller: getAllListsOfUser", 10);
                let apiResponse = response.generate(false, "List found", 200, listDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getAllListsOfUser


/**
 * function to delete list using ListId.
 */
let deleteList = (req, res) => {

    ListModel.remove({ 'listId': req.params.listId }, (err, result) => {
        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No List Found', 'List Controller : deleteList')
            let apiResponse = response.generate(true, 'No List Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("List deleted", "List Controller : deleteList")
            let apiResponse = response.generate(false, 'List Deleted', 200, result)
            res.send(apiResponse)
        }
    })
}


/**
 * function to edit List using ListId.
 */
let editList = (req, res) => {

    let options = req.body;
    console.log(options);
    ListModel.update({ 'listId': req.params.listId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to edit list', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No list Found', 'List Controller : editList')
            let apiResponse = response.generate(true, 'No list Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('List details edited/updated ', 'List Controller : editList')
            let apiResponse = response.generate(false, 'List details edited/updated successfully', 200, result)
            res.send(apiResponse)
        }
    })

}





//below functionality for trial purpose

/**
 * function to get All List.
 */
let getAllList = (req, res) => {
    ListModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Failed to find lists details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No List Found', 'List Controller : getAllList')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('All List Found', 'List Controller : getAllList')
                let apiResponse = response.generate(false, 'All List Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all product



/**
 * function to get single list using listId.
 */
let getListByListId = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.error("listId is missing", "List Controller: getListByListId", 10);
        let apiResponse = response.generate(true, "listId is missing", 500, null);
        reject(apiResponse);
    }
    else {
        ListModel.findOne({ listId: req.params.listId }, (err, listDetails) => {

            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find list', "List Controller: getListByListId", 10);
                let apiResponse = response.generate(true, "failed to find the List", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(listDetails)) {
                logger.error("No List Found", "List Controller: getListByListId", 10);
                let apiResponse = response.generate(true, "No List Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("List found", "List Controller: getListByListId", 10);
                let apiResponse = response.generate(false, "List found", 200, listDetails);
                res.send(apiResponse);

            }

        });
    }

}//end getListByListId





module.exports={

    createList : createList,
    getAllListsOfUser : getAllListsOfUser,
    deleteList : deleteList,
    editList : editList,



    getAllList : getAllList,
    getListByListId : getListByListId
}