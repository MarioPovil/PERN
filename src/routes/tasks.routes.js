const {Router} = require('express')
const pool = require('../db')
const router = Router()
const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controller')

router.get('/', getAllTasks )

router.get('/task/:id', getTask)

router.post('/task', createTask)

router.delete('/task/delete', deleteTask)

router.put('/task/update/:id', updateTask)

module.exports = router;