const express = require('express')
const router = express.Router()
const  {createEmpAttendance, DeleteEmpAttendance, updateEmpAttendance, getEmpAttendanceById, employeeAttendance} =require('../controller/attendanceController')


// Get all Attendance (admin only)
// router.get('/', authenticateToken, checkRole(['admin','manager']), getAllAttendance)
router.get('/',  employeeAttendance)


//get user by Id
// router.get('/:id', authenticateToken, checkRole(['admin','manager', 'employee']),getAttendanceById)
router.get('/:id', getEmpAttendanceById)



//create new Attendance
// router.post('/', authenticateToken, checkRole(['admin','manager', 'employee']), createNewAttendance)
router.post('/create', createEmpAttendance)


//delete Attendance
// router.delete('/', authenticateToken, checkRole(['admin']), deleteAttendance)
router.delete('/delete/:id', DeleteEmpAttendance)



//update Attendance
// router.patch('/', authenticateToken, checkRole(['admin','manager']), updateteAttendance)
router.patch('/update/:id', updateEmpAttendance)

module.exports = router