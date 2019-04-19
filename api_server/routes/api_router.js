const express = require("express");
const api_router = express.Router();
const passport = require("passport");

const msgAPIController = require("../controllers/msg-api");
const userAPIController = require("../controllers/user-api");
//Get all msgs and add a new mgs
api_router
  .route("/msgs")
  .get(msgAPIController.getAllMessagesOrderedByLastPosted)
  .post(
    passport.authenticate("basic", { session: false }),
    msgAPIController.addNewMessage
  )
  .delete(
    passport.authenticate("basic", { session: false }),
    msgAPIController.deleteAll
  );

//Get single msg, update a message and delete a message
api_router
  .route("/msgs/:messageid")
  .get(msgAPIController.getSingleMessage)
  .put(
    passport.authenticate("basic", { session: false }),
    msgAPIController.editMessage
  )
  .delete(
    passport.authenticate("basic", { session: false }),
    msgAPIController.deleteMessage
  );
//Is this right?
api_router.post("/users", userAPIController.registerNewUser);
api_router.get(
  "/users/login",
  passport.authenticate("basic", { session: false }),
  userAPIController.loginUser
);

module.exports = api_router;
