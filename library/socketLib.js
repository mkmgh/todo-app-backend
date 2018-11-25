const socketio = require('socket.io');
const tokenLib = require('./tokenLib');

//importing redisLibrary
const redisLib = require("./redisLib");


const mongoose = require('mongoose');
const shortid = require("shortid")
const UserModel = mongoose.model('UserModel')

let setServer = (server) => {

    let io = socketio.listen(server);
    let myio = io.of('')
    let allOnlineUsers = [];

    myio.on('connection', function(socket){

        //verifying user
        socket.emit("verify-user", "Please Provide AuthToken For Verification")

        socket.on("set-user", (authToken)=>{
            tokenLib.verifyClaimsWithoutSecret(authToken, (err, userdata)=>{
                if(err){
                    socket.emit('auth-error', "Please Provide Correct Details")
                }else{
                    console.log("User is verified");
                    let currentUser = userdata.data;
                    socket.id=currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId;
                    let value = fullName;                  

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsersDB", key, value, (err, allOnlineUsers) => {
                        if (err) {
                            logger.error(err.message, "socketLib:SetANewOnlineUserInHash", 10);
                        }
                        else {

                            redisLib.getAllUsersInAHash('onlineUsersDB', (err, result) => {
                                
                                if (err) {
                                    console.log(err);
                                }
                                else {

                                    //placing every user in one global room
                                    socket.join("globalRoom");

                                    //myio.to("globalRoom").emit("onlineUsersTodoList",result)
                                    socket.broadcast.emit('onlineUsersTodoList', result);
                                    console.log(result);
                                }
                            });

                        }
                    });//end setNewOnlineUsersInHash

                    socket.fullName = fullName;
                }
            })

        })

        socket.on("disconnect", ()=>{
            console.log("disconnect listened")
            if (socket.id) {
                redisLib.deleteUserFromHash('onlineUsersDB', socket.id);
                redisLib.getAllUsersInAHash('onlineUsersDB', (err, result) => {
                    if (err) {
                        logger.error(err.message, "socketLib:getAllUsersInAHash", 10);
                    }
                    else {
                        socket.leave("globalRoom");
                        //myio.to("globalRoom").emit('onlineUsersTodoList', result);
                        socket.broadcast.emit('onlineUsersTodoList', result);
                        console.log(result);

                    }
                });//end getAllUsersInAHash
            }

        })



        //Creating A New List: 
        socket.on("createList", (userName) => {
            console.log("List added by "+userName)

            socket.broadcast.emit('createList-res', userName + " created A New List");

        })

        //Delete List

        socket.on("deleteList",(userName)=>{
            console.log("List deleted by "+userName)
            socket.broadcast.emit('deleteList-res', userName + " deleted A List");
        })

        //Update List

        socket.on("updateList",(userName)=>{
            console.log("List updated by "+userName)
            socket.broadcast.emit('updateList-res',userName + " updated A list")
        })

        //Create Item

        socket.on("createItem",(userName)=>{
            console.log("Item added by "+userName)
            socket.broadcast.emit("createItem-res",userName + " added A Item")
        })


        //Delete Item

        socket.on("deleteItem",(userName)=>{
            console.log("Item deleted by "+userName)
            socket.broadcast.emit("deleteItem-res",userName + " deleted A Item")
        })

        //Update Item

        socket.on("updateItem",(userName)=>{
            socket.broadcast.emit("updateItem-res", userName + " updated A Item")
        })

        //Mark done Item

        socket.on("markDoneItem",(userName)=>{
            socket.broadcast.emit("markDoneItem-res", userName+" Marked as Done A Item");
        })

        //mark open Item

        socket.on("markOpenItem",(userName)=>{
            socket.broadcast.emit("markOpenItem-res",userName+" Marked as Open A Item")
        })


        //Undo Item
        socket.on("undoItem",(userName)=>{
            socket.broadcast.emit("undoItem-res", userName + " Undo A Item")
        })
        



        //create subItem

        socket.on("createSubItem",(userName)=>{
            socket.broadcast.emit("createSubItem-res", userName+" added A Sub-Item")
        })

        //delete subItem
        socket.on("deleteSubItem",(userName)=>{
            socket.broadcast.emit("deleteSubItem-res", userName+" deleted A Sub-Item" )
        })

        //update subItem
        socket.on("updateSubItem",(userName)=>{
            socket.broadcast.emit("updateSubItem-res", userName+" updated A Sub-Item")
        })

        //mark done subItem
        socket.on("markDoneSubItem",(userName)=>{
            socket.broadcast.emit("markDoneSubItem-res",userName+" marked as done A Sub-Item")
        })

        //mark open subItem
        socket.on("markOpenSubItem",(userName)=>{
            socket.broadcast.emit("markOpenSubItem-res",userName+" marked as done A Sub-Item")
        })
        

        //Undo Item
        socket.on("undoSubItem",(userName)=>{
            socket.broadcast.emit("undoSubItem-res", userName + " Undo A Sub-Item")
        })
        
        
        //CLear Undos for Item and subItems
        socket.on("clearUndos",(userName)=>{
            socket.broadcast.emit("clearUndos-res", userName + " cleared undos");
        })
        


         /**
         * Reveive and send friend request sockets event
         */

         //Receiving Request:

        socket.on('request', (data) => {
            UserModel.findOne({ "userId": data.receiverId }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //Checking Request Already Present Or Not:

                    for (x of result.requests) {
                        if (x.senderId == data.senderId) {
                            return socket.emit("reqAlreadySent", "Request Sent Already");
                        }
                        else { }
                    }
                    //Checking IF User Is Already Friend:
                    for (x of result.friends) {
                        if (x.friendId == data.senderId) {
                            return socket.emit("alreadyFriend", "User Already A Friend");
                        }
                    }

                    //Saving Requests:

                    let socketdata = {
                        receiverId: data.receiverId,
                        senderId: data.senderId,
                        senderName: data.senderName,
                        action:"Request"
                    }

                    result.requests.push(socketdata)
                    socket.emit("savereq", "Request Sent");
                    console.log("friend request sent")
                    //socket.broadcast.emit(socketdata.receiverId, socketdata.senderName+" sent you friend request");
                    socket.broadcast.emit(socketdata.receiverId, socketdata);
                    result.save((err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                        }
                    })
                }
            })
        })

        //Rejecting Request
        socket.on("reject", (data) => {
            console.log(data)
            UserModel.findOne({ "userId": data.receiverId }, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    for (x of result.requests) {
                        if (x.senderId == data.senderId) {
                            var index = result.requests.indexOf(x);
                            result.requests.splice(index, 1)
                        }
                        else { }
                    }

                }
                result.save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result);
                        socket.emit("rejecting", "Request Rejected");
                        //socket.broadcast.emit(data.senderId, data.receiverName+" rejected your request");
                        socket.broadcast.emit(data.senderId, data);
                    }
                })

            })


        })
        
        //Accepting Request
        socket.on("accept", (data) => {
            console.log(data);
            UserModel.findOne({ "userId": data.receiverId }, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let socketdata = {
                        friendName: data.senderName,
                        friendId: data.senderId
                    }
                    result.friends.push(socketdata);

                    for (x of result.requests) {
                        if (x.senderId == data.senderId) {
                            var index = result.requests.indexOf(x);
                            result.requests.splice(index, 1)
                        }
                        else { }
                    }
                    result.save((error, result) => {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            console.log(result)
                        }
                    })

                }
            })
            UserModel.findOne({ "userId": data.senderId }, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let socketdata = {
                        friendId: data.receiverId,
                        friendName: data.receiverName,
                        action:'Accept'
                    }
                    result.friends.push(socketdata);
                    result.save((error, result) => {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            console.log(result);
                            socket.emit("accepting", "Request Accepted");
                            //socket.broadcast.emit(data.senderId, socketdata.friendName+" accepted your request");
                            socket.broadcast.emit(data.senderId, socketdata);
                        }
                    })
                }

            })
        })

        //Removing From FriendList:
        socket.on("unfriend", (data) => {
            UserModel.findOne({ "userId": data.myId }, (err, result) => {
                if (err) {
                    console.log("Error Occured")
                    console.log(err)
                }
                else {
                    for (x of result.friends) {
                        if (x.friendId == data.friendId) {
                            var index = result.friends.indexOf(x);
                            result.friends.splice(index, 1)
                        }
                        result.save((err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Friend Removed")
                            }
                        })
                    }
                }
            })
            UserModel.findOne({ "userId": data.friendId }, (err, result) => {
                if (err) {
                    console.log("Error Occured")
                    console.log(err)
                }
                else {

                    for (x of result.friends) {
                        if (x.friendId == data.myId) {
                            var index = result.friends.indexOf(x);
                            result.friends.splice(index, 1)
                        }

                    }
                    result.save((err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("Friend Removed")
                            socket.emit("removed", "Friend Removed");

                            //socket.broadcast.emit(data.friendId, data.myName+" removed you from friend list");
                            socket.broadcast.emit(data.friendId, data);

                        }
                    })
                }
            })
        })
        
    })

}

module.exports = {
    setServer : setServer
}