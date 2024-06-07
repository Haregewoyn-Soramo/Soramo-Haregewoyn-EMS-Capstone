const mongoose = require('mongoose')
const Tasks = require('../models/taskSchema')


const employeeTasks = async(req, res) =>{
  try {
    const empTasks = await Tasks.find({})
    res.status(200).json(empTasks)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const getEmpTasksById = async(req, res) =>{

  try {
    const id = req.params.id
     if (!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({msg: 'Invalid ID'})
    }
   
    const empTasks = await Tasks.findById(id)
    if (!empTasks) {
      return res.status(404).json({ msg: 'Tasks not found' });
    }
    res.status(200).json(empTasks)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const updateEmpTasks = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const updateEmp = await Tasks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updateEmp) {
      return res.status(404).json({ msg: 'Could not find Employee Tasks' });
    }

    res.status(200).json({ msg: 'Employee Tasks updated successfully', updateEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};

const DeleteEmpTasks = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const deleteEmp = await Tasks.findByIdAndDelete(id);

    if (!deleteEmp) {
      return res.status(404).json({ msg: 'Could not find Employee Tasks' });
    }

    res.status(200).json({ msg: 'Employee Tasks deleted successfully', deleteEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};


//create new Tasks
const createEmpTasks = async (req, res) => {
  try {
    const { user_id, deadline,  title, description, status,  priority} = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ msg: 'Invalid user_id' });
    }

    const empTasks = new Tasks({
      user_id: new mongoose.Types.ObjectId(user_id),
      deadline,
      title,
      description,
      status,
      priority
    });

    await empTasks.save();
    res.status(200).json({ msg: 'Employee Tasks created successfully', empTasks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};




module.exports = {createEmpTasks, DeleteEmpTasks, updateEmpTasks, getEmpTasksById, employeeTasks}