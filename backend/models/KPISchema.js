const mongoose = require('mongoose');
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
  task_completed: {
    type: Number,
    required: true
  },
  hours_worked: {
    type: Number,
    required: true
  },
  quality_of_work: {
    type: Number,
    required: true
  },
  customer_feedback: {
    type: Number,
    required: true
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

module.exports = mongoose.model('KPI', KPISchema);
