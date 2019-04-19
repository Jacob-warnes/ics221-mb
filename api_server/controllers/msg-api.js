const mongoose = require("mongoose");
const messageModel = mongoose.model("message");

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
  messageModel
    .find()
    .sort({ _id: -1 })
    .exec((err, messages) => {
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
    messageModel.findById(req.params.messageid).exec((err, message) => {
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
const editMessage = (req, res) => {
  console.log("params");
  console.log(req.params);
  if (req.params && req.params.messageid) {
    //find message in db
    messageModel.findById(req.params.messageid, "name", (err, message) => {
      console.log(message);
      if (err || message == null) {
        res.status(404).json({
          "api-msg": "messageid not found"
        });
        return;
      }
      //does message have same owner as the person who made the request
      if (message.name == req.user.username) {
        //upadte message to new content
        messageModel
          .findOneAndUpdate(
            { _id: req.params.messageid },
            { $set: { msg: req.body.msg } },
            { new: true }
          )
          .exec((err, message) => {
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
        res.status(401).json({
          "api-msg": "Message not owned by user"
        });
      }
    });
  } else {
    // must have a message id
    res.status(404).json({
      "api-msg": "No messageid in request"
    });
  }
};

const deleteMessage = (req, res) => {
  if (req.params && req.params.messageid) {
    //find message in db
    messageModel.findById(req.params.messageid, "name", (err, message) => {
      //if no message found
      if (err || message == null) {
        res.status(404).json({
          "api-msg": "messageid not found"
        });
        return;
      }
      //does message have same owner as the person who made the request
      if (message.name == req.user.username) {
        //remove message
        messageModel
          .findOneAndRemove({ _id: req.params.messageid })
          .exec((err, message) => {
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
        res.status(401).json({
          "api-msg": "Message not owned by user"
        });
      }
    });
  } else {
    // must have a message id
    res.status(404).json({
      "api-msg": "No messageid in request"
    });
  }
};

// POST Request Handler
const addNewMessage = (req, res) => {
  messageModel.create(
    { name: req.user.username, msg: req.body.msg },
    (err, message) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(message);
      }
    }
  );
};

const deleteAll = (req, res) => {
  if (req.user.username == process.env.ADMIN) {
    messageModel.remove().exec((err, message) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
        return;
      }
      res.status(200).json(message);
    });
  } else {
    res.status(401).json({ "api-msg": "Not an admin user" });
  }
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage,
  getSingleMessage,
  editMessage,
  deleteMessage,
  deleteAll
};
