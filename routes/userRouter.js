const userRouter = require("express").Router();
const userController = require("../controller/userControllers");

userRouter.get("/", userController.getUserList);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.registered);

module.exports = userRouter;
