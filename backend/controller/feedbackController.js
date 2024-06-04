const mongoose = require('mongoose')
const Feedback = require('../models/feedbackSchema')


const employeeFeedback = async(req, res) =>{
  try {
    const empFeedback = await Feedback.find({})
    res.status(200).json(empFeedback)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const getEmpFeedbackById = async(req, res) =>{

  try {
    const id = req.params.id
     if (!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({msg: 'Invalid ID'})
    }
   
    const empFeedback = await Feedback.findById(id)
    if (!empFeedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(200).json(empFeedback)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Internal server error'})
  }
}

const updateEmpFeedback = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const updateEmp = await Feedback.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updateEmp) {
      return res.status(404).json({ msg: 'Could not find Employee Feedback' });
    }

    res.status(200).json({ msg: 'Employee Feedback updated successfully', updateEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};

const DeleteEmpFeedback = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const deleteEmp = await Feedback.findByIdAndDelete(id);

    if (!deleteEmp) {
      return res.status(404).json({ msg: 'Could not find Employee Feedback' });
    }

    res.status(200).json({ msg: 'Employee Feedback deleted successfully', deleteEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};


//create new Feedback
const createEmpFeedback = async (req, res) => {
  try {
    const { user_id, manager_id, feedback_text, rating} = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ msg: 'Invalid user_id' });
    }
    
    if (!mongoose.Types.ObjectId.isValid (manager_id)) {
      return res.status(400).json({ msg: 'Invalid manager_id' });
    }

    const empFeedback = new Feedback({
      user_id: new mongoose.Types.ObjectId(user_id),
      manager_id: new mongoose.Types.ObjectId(manager_id),
      feedback_text,
      rating,
    });

    await empFeedback.save();
    res.status(200).json({ msg: 'Employee Feedback created successfully', empFeedback });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};




module.exports = {createEmpFeedback, DeleteEmpFeedback, updateEmpFeedback, getEmpFeedbackById, employeeFeedback}