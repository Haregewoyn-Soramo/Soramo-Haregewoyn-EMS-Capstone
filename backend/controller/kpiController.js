const mongoose = require('mongoose')
const KPI = require('../models/KPISchema')


const employeeKPI = async(req, res) =>{
  try {
    const empKPI = await KPI.find({})
    res.status(200).json(empKPI)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const getEmpKPIById = async(req, res) =>{

  try {
    const id = req.params.id
     if (!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({msg: 'Invalid ID'})
    }
   
    const empKPI = await KPI.findById(id)
    if (!empKPI) {
      return res.status(404).json({ msg: 'KPI not found' });
    }
    res.status(200).json(empKPI)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const updateEmpKPI = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const updateEmp = await KPI.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updateEmp) {
      return res.status(404).json({ msg: 'Could not find Employee KPI' });
    }

    res.status(200).json({ msg: 'Employee KPI updated successfully', updateEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};

const DeleteEmpKPI = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const deleteEmp = await KPI.findByIdAndDelete(id);

    if (!deleteEmp) {
      return res.status(404).json({ msg: 'Could not find Employee KPI' });
    }

    res.status(200).json({ msg: 'Employee KPI deleted successfully', deleteEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};


//create new KPI
const createEmpKPI = async (req, res) => {
  try {
    const { user_id, date, task_completed, hours_worked, quality_of_work, customer_feedback } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(404).json({ msg: 'Invalid user_id' });
    }

    const empKPI = new KPI({
      user_id: new mongoose.Types.ObjectId(user_id),
      date,
      task_completed,
      hours_worked,
      quality_of_work,
      customer_feedback,
      created_at: new Date(),
      updated_at: new Date()
    });

    await empKPI.save();
    res.status(200).json({ msg: 'Employee KPI created successfully', empKPI });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};




module.exports = {createEmpKPI, DeleteEmpKPI, updateEmpKPI, getEmpKPIById, employeeKPI}