const facultyRouter = require("express").Router();
const facultyControllers = require("../controller/facultyControllers");

facultyRouter.get("/", facultyControllers.getAllFaculty);
facultyRouter.post("/", facultyControllers.addFaculty);
facultyRouter.put("/:id", facultyControllers.updateFaculty);
facultyRouter.delete("/:id", facultyControllers.deletFaculty);

module.exports = facultyRouter;
