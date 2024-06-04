const express = require('express')
const router = express.Router()
const { authenticateToken, checkRole } = require('../middleware/roleChecking');
const mongoose = require('mongoose')
const  {updateUser, deleteUser, createNewUser, getUsersById ,  getAllUsers} = require('../controller/userController')


// router.get('/', (req, res) =>{
//   res.send('welcome to users pge')
// })



//Get all users (admin only)
// router.get('/', authenticateToken, checkRole(['admin']), getAllUsers)
router.get('/', getAllUsers)


//get user by Id
//  router.get('/:id', authenticateToken, checkRole(['admin','manager', 'employee']),getUsersById)
 router.get('/:id',getUsersById)


// create new users
// router.post('/register', authenticateToken, checkRole(['admin']), createNewUser)
router.post('/register', createNewUser)


 //delete user
// router.delete('/:id', authenticateToken, checkRole(['admin',]), deleteUser)
router.delete('/delete/:id', deleteUser)


 //update user
// router.patch('/:id', authenticateToken, checkRole(['admin','manager']), updateUser)
router.patch('/update/:id', updateUser)

module.exports = router