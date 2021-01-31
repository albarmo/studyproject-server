const courseRouter = require('express').Router()
const courseControllers =  require('../controller/courseControllers')

courseRouter.get('/', courseControllers.getAllCourse)
courseRouter.post('/', courseControllers.addCourse)
courseRouter.put('/:id', courseControllers.updateCourse)
courseRouter.delete('/:id', courseControllers.deleteCourse)

module.exports = courseRouter