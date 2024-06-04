    const mongoose = require('mongoose')
    const Attendance = require('../models/attendanceSchema')


    const employeeAttendance = async(req, res) =>{
      try {
        const empAttendance = await Attendance.find({})
        res.status(200).json(empAttendance)

      } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Internal server error'})
      }
    }

    const getEmpAttendanceById = async(req, res) =>{

      try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid ID'})
        }
      
        const empAttendance = await Attendance.findById(id)
        if (!empAttendance) {
          return res.status(404).json({ msg: 'Attendance not found' });
        }
        res.status(200).json(empAttendance)

      } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Internal server error'})
      }
    }

    const updateEmpAttendance = async (req, res) => {
      try {
        const id = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ msg: 'Invalid ID' });
        }
    
        // Extract login_time from the request body
        const { login_time } = req.body;
    
        // Check if login_time is a valid Date object
        if (!(login_time instanceof Date && !isNaN(login_time))) {
          return res.status(400).json({ msg: 'Invalid login_time' });
        }
    
        // Fetch the attendance document by ID
        const attendance = await Attendance.findById(id);
    
        if (!attendance) {
          return res.status(404).json({ msg: 'Could not find Employee Attendance' });
        }
    
        // Update the logout time using the static function defined in the schema
        const updatedLogoutTime = Attendance.updateLogoutTime(login_time);
    
        // Update the logout_time field in the document
        attendance.logout_time = updatedLogoutTime;
    
        // Save the updated document
        const updatedAttendance = await attendance.save();
    
        res.status(200).json({ msg: 'Employee Attendance updated successfully', updatedAttendance });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      }
    };
    

    const DeleteEmpAttendance = async (req, res) => {
      try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ msg: 'Invalid ID' });
        }

        const deleteEmp = await Attendance.findByIdAndDelete(id);

        if (!deleteEmp) {
          return res.status(404).json({ msg: 'Could not find Employee Attendance' });
        }

        res.status(200).json({ msg: 'Employee Attendance deleted successfully', deleteEmp });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      }
    };


    //create new Attendance
    const createEmpAttendance = async (req, res) => {
      try {
        const { user_id, login_time, logout_time, date} = req.body;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
          return res.status(400).json({ msg: 'Invalid user_id' });
        }
      
        const empAttendance = new Attendance({
          user_id: new mongoose.Types.ObjectId(user_id),
          login_time: new Date(login_time),
          logout_time: new Date(logout_time),
          date: new Date(date),
        });

        const exceedLoginCount = await Attendance.checkLoginCount(user_id, date);

        if(exceedLoginCount){
          return res.status(400).json({ msg: 'employee attendance already registered'});
        }
        await empAttendance.save();
        res.status(200).json({ msg: 'Employee Attendance created successfully', empAttendance });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      }
    };




    module.exports = {createEmpAttendance, DeleteEmpAttendance, updateEmpAttendance, getEmpAttendanceById, employeeAttendance}