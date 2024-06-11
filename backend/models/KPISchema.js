const mongoose = require('mongoose');
const { calculateKPI } = require('../utils/calculateKPI');
const Schema = mongoose.Schema;

const KPISchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  hours_worked: {
    type: Number,
    required: true
  },
  quality_of_work: {
    accuracy_completeness: { type: Number, required: true },
    timeliness: { type: Number, required: true },
    adherence_guidelines: { type: Number, required: true }
  },
  kpi_score: {
    type: Number,
    required: true,
  },
  monthly_kpi: {
    type: Number,
    required: false
  },
  yearly_kpi: {
    type: Number,
    required: false
  },
  six_months_kpi: {
    type: Number,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

KPISchema.virtual('timeString').get(function() {
  return this.date.toTimeString().split(' ')[0];
})

KPISchema.pre('save', async function (next) {
  if (this.isModified('tasks') || this.isNew) {
    this.kpi_score = await calculateKPI(this);
  }
  next();
});

module.exports = mongoose.model('KPI', KPISchema);
