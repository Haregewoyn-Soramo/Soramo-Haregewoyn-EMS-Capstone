const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  login_time: {
    type: Date,
    required: true
  },
  logout_time: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
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

// Static function to calculate working hours
AttendanceSchema.statics.calculateWorkingHours = function(loginTime, logoutTime) {
  const millisecondsInHour = 1000 * 60 * 60;
  const hoursWorked = (logoutTime - loginTime) / millisecondsInHour;
  return hoursWorked;
};

// Static function to check login count for a user on a given date
AttendanceSchema.statics.checkLoginCount = async function(userId, date) {
  const loginCount = await this.countDocuments({ user_id: userId, date });
  return loginCount >= 3;
};

// Static function to update logout time 8 hours after login time
AttendanceSchema.statics.updateLogoutTime = function(loginTime) {
  const millisecondsInHour = 1000 * 60 * 60;
  const eightHoursLater = new Date(loginTime.getTime() + 8 * millisecondsInHour);
  return eightHoursLater;
};

module.exports = mongoose.model('Attendance', AttendanceSchema);
