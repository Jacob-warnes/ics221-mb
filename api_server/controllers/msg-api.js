const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
  messageModel
    .find()
    .sort( {'_id': -1} )
    .exec( (err, messages) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(messages);
      }
    });
};
//get a single message 
const getSingleMessage = (req, res) => {
  
  if (req.params && req.params.messageid) {
    messageModel
      .findById(req.params.messageid)
      .exec( (err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          console.log("error");
          return;
        }

        // could execute, but didn't find message
        if (!message) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        // found message
        res.status(200).json(message);
      });
  } else {
      // must have a message id
      res.status(404).json({
          "api-msg": "No messageid in request"
      });
  }
};

//change a messages contents 
const editMessage = (req,res) =>{
  

  if (userOwns(req,res)) {
    messageModel
      .findOneAndUpdate({_id:req.params.messageid}, {$set:{msg:req.body.msg}}, {new:true})
      .exec( (err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          console.log("error");
          return;
        }

        // could execute, but didn't find message
        if (!message) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        // found message
        res.status(200).json(message);
      });
  } else {
      // must have a message id
      res.status(404).json({
          "api-msg": "No messageid in request"
      });
  }
};

const deleteMessage = (req,res) =>{
  
  if (userOwns(req,res)) {
    messageModel
      .findOneAndRemove({_id:req.params.messageid})
      .exec( (err, message) => {
        // error in executing function
        if (err) {
          res.status(400).json(err);
          console.log("error");
          return;
        }

        // could execute, but didn't find message
        if (!message) {
          res.status(404).json({
            "api-msg": "messageid not found"
          });
          return;
        }

        // found message
        res.status(200).json(message);
      });
  } else {
      // must have a message id
      res.status(404).json({
          "api-msg": "No messageid in request"
      });
  }
};

//method for determining if user owns the message they are trying to edit
const userOwns = (req,res) =>{
  console.log(req.user._id);
  if(req.params && req.params.messageid){
      return true;
  }
  return false;
}


// POST Request Handler
const addNewMessage = (req, res) => {
  messageModel
 .create( {name:req.user.username, msg:req.body.msg}, (err, message) => {
   if (err) {
     res.status(400).json(err);
   } else {
     res.status(201).json(message);
   }
 });
};

const deleteAll =(req,res)=>{
  messageModel.remove()
  .exec((err,message) => {
      if(err){
        res.status(400).json(err);
        console.log(err);
        return;
      }
      res.status(200).json(message);
  }); 
};

module.exports = {
    getAllMessagesOrderedByLastPosted,
    addNewMessage,
    getSingleMessage,
    editMessage,
    deleteMessage,
    deleteAll
  }