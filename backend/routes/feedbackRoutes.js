const express = require('express')
const router = express.Router()
const {createEmpFeedback, DeleteEmpFeedback, updateEmpFeedback, getEmpFeedbackById, employeeFeedback} = require('../controller/feedbackController')



// Get all feedback (admin only)
// router.get('/', authenticateToken, checkRole(['admin', 'manager']), getAllFeedback)
   router.get('/',employeeFeedback )


//get user by Id
// router.get('/:id', authenticateToken, checkRole(['admin','manager', 'employee']),getFeedbackById)
 router.get('/:id', getEmpFeedbackById)


//create new Feedback
// router.post('/', authenticateToken, checkRole(['admin','manager', 'employee' ]), createNewFeedback)
router.post('/create', createEmpFeedback)


//delete Feedback
// router.delete('/', authenticateToken, checkRole(['admin']), deleteFeedback)
router.delete('/delete/:id',   DeleteEmpFeedback)


//update Feedback
// router.patch('/', authenticateToken, checkRole(['admin','manager', 'employee']), updateteFeedback)
router.patch('/update/:id', updateEmpFeedback)

module.exports = router