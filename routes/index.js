const router = require("express").Router();
const userRouter = require("./userRouter");
const courseRouter = require("./courseRouter");
const facultyRouter = require("./facultyRouter");

router.get("/test/user", (req, res) => {
  res.status(200).json({ user_router_status: "running" });
});

router.use("/user", userRouter);
router.use("/course", courseRouter);
router.use("/faculty", facultyRouter);

module.exports = router;
