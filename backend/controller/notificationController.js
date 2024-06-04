    const mongoose = require('mongoose')
    const Notification = require('../models/notificationSchema')

  

    //get all notifications
    const getNotification = async(req, res) =>{
      try {  
        
        const notification = await Notification.find({}).sort({ created_at: -1 })
        if(!notification || notification.length === 0){
        res.status(404).json({msg:'There are no notifications'})
        }
    
        res.status(200).json(notification)
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }



    //get notification by id
    const getNotificationById = async (req, res) => {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ error: 'Invalid ID' });
      }
      try {
         const notification = await Notification.findById(id);
         if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
         }
         res.status(200).json(notification);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   };
    

    // update notification
    const updateNotification = async (req, res) => {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ error: 'Invalid ID' });
      }
      try {
         const notification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
         if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
         }
         res.status(200).json(notification);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   };


    //delete notification
    const deleteNotification = async (req, res) => {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ error: 'Invalid ID' });
      }
      try {
         const notification = await Notification.findByIdAndDelete(id);
         if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
         }
         res.status(200).json({ msg: 'Notification deleted', notification });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   };


    // create new notification
    const createNotification = async( req, res) => {
      try {

        const newNotification = await Notification.create(req.body)
        res.status(200).json(newNotification)
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

module.exports = {deleteNotification, updateNotification, getNotificationById, getNotification, createNotification}