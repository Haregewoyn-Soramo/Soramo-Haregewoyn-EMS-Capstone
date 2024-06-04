const express = require('express')
const router = express.Router()
const {deleteNotification, updateNotification, getNotificationById, getNotification , createNotification} = require('../controller/notificationController')



 // Get all Notification (admin only)
// router.get('/', authenticateToken, getAllNotification)
 router.get('/', getNotification);

// getNotification by id

  router.get('/:id', getNotificationById);
// delete Notification
// router.delete('/', authenticateToken, checkRole(['admin','manager'), deleteNotification)
   router.patch('/update/:id', updateNotification);

// update Notification
// router.patch('/', authenticateToken, checkRole(['admin','manager']), updateteNotification)
   router.delete('/delete/:id', deleteNotification);

// router.post('/', authenticateToken, checkRole(['admin','manager' ]), createNewNotification)
   router.post('/create', createNotification);



   
module.exports = router