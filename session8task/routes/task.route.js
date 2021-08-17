const express = require('express')
const router = new express.Router()
const dataController = require('../app/controller/data.controller')

router.post('/',dataController.addTask)
router.get('/allTasks', dataController.getAllTasks)
router.get('/allTasks/:id', dataController.getSingle)
router.delete('/deleteTask/:id', dataController.deleteTask)
router.patch('/editTask/:id', dataController.editTask)

module.exports = router