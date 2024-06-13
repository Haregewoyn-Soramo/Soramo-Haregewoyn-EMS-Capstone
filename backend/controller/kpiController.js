const mongoose = require('mongoose');
const KPI = require('../models/KPISchema');
const { calculateKPI, calculateSixMonthKPI, calculateYearlyKPI, calculateMonthlyKPI } = require('../utils/calculateKPI');

const employeeKPI = async (req, res) => {
  try {
    const empKPI = await KPI.find({});
    res.status(200).json(empKPI);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getEmpKPIById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const empKPI = await KPI.findById(id);
    if (!empKPI) {
      return res.status(404).json({ msg: 'KPI not found' });
    }
    res.status(200).json(empKPI);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getAggregateKPIs = async (req, res) => {
  try {
    const kpis = await KPI.find();
    const monthlyKPI = await calculateMonthlyKPI(kpis);
    const yearlyKPI = calculateYearlyKPI(Array(12).fill(monthlyKPI));
    const sixMonthKPI = calculateSixMonthKPI(Array(6).fill(monthlyKPI));
    res.status(200).json({ monthlyKPI, yearlyKPI, sixMonthKPI });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getAggregateKPIsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const kpis = await KPI.find({ user_id: id });
    const monthlyKPI = await calculateMonthlyKPI(kpis);
    const yearlyKPI = calculateYearlyKPI(Array(12).fill(monthlyKPI));
    const sixMonthKPI = calculateSixMonthKPI(Array(6).fill(monthlyKPI));
    res.status(200).json({ monthlyKPI, yearlyKPI, sixMonthKPI });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateEmpKPI = async (req, res) => {
  try {
    const id = req.params.id;
console.log("Hhit ")
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: 'Invalid ID' });
    }

    const updateEmp = await KPI.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
console.log("'found",updateEmp)
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

const createEmpKPI = async (req, res) => {
  try {
    const { user_id, date, tasks, hours_worked, quality_of_work } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(404).json({ msg: 'Invalid user_id' });
    }
    const existingKPI = await KPI.findOne({ user_id, date });
    if(existingKPI){
      return res.status(404).json({ msg: 'KPI already exists for this day' });
    }

    const empKPI = new KPI({
      user_id: new mongoose.Types.ObjectId(user_id),
      date,
      tasks,
      hours_worked,
      quality_of_work,
    });

    try {
      // Calculate KPI score
      empKPI.kpi_score = await calculateKPI(empKPI);

      // Save the new KPI document
      const newKPI = await empKPI.save();
      res.status(200).json({ msg: 'Employee KPI created successfully', newKPI });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};

module.exports = { createEmpKPI, DeleteEmpKPI, updateEmpKPI, getEmpKPIById, employeeKPI, getAggregateKPIs, getAggregateKPIsById };
