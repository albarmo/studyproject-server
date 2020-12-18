const router = require("express").Router();
const userRouter = require("./userRouter");

router.get("/test/user", (req, res) => {
  res.status(200).json({ user_router_status: "running" });
});

router.use("/user", userRouter);

module.exports = router;
