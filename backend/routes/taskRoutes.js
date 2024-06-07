const express = require('express');
const path = require('path');
const router = express.Router();
const {createEmpTasks, DeleteEmpTasks, updateEmpTasks, getEmpTasksById, employeeTasks} = require('../controller/tasksController')

// Get all Tasks (admin and Managers only)
// router.get('/', authenticateToken, checkRole(['admin', 'manager']), getAllTasks)
router.get('/', employeeTasks )
  
 //get Task by Id
// router.get('/:id', authenticateToken, checkRole(['admin','manager', 'employee']),getTaskById)
router.get('/:id', getEmpTasksById )


//create new Task
// router.post('/', authenticateToken, checkRole(['admin', 'manager']), createNewTasks)
router.post('/create', createEmpTasks)


//delete Task
// router.delete('/', authenticateToken, checkRole(['admin','manager']), deleteTasks)
router.delete('/delete/:id', DeleteEmpTasks)


//update Task
// router.patch('/', authenticateToken, checkRole(['admin','manager']), updateteTasks)
router.patch('/update/:id', updateEmpTasks )

module.exports = router;

