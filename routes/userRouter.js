const userRouter = require("express").Router();
const userController = require("../controller/userControllers");

userRouter.get("/alluser", userController.getUserList);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

module.exports = userRouter;
