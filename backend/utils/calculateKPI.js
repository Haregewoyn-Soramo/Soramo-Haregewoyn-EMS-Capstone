const Task = require('../models/taskSchema'); 

const calculateKPI = async (kpi) => {
  const taskWeight = 0.4;
  const hoursWeight = 0.3;
  const qualityWeight = 0.3;

  // Fetch tasks from the database
  const tasks = await Task.find({ '_id': { $in: kpi.tasks } });

  const taskScore = tasks.reduce((sum, task) => sum + (task.status === 'completed' ? 100 : 0), 0) / tasks.length;
  const hoursScore = Math.min(((kpi.hours_worked / 8) * 100), 100);
  const qualityScore = ((kpi.quality_of_work.accuracy_completeness) * 0.4 + (kpi.quality_of_work.timeliness * 0.3) + 
  (kpi.quality_of_work.adherence_guidelines * 0.3));

  const totalScore = (taskScore * taskWeight) + (hoursScore * hoursWeight) + (qualityScore * qualityWeight);
  return totalScore;
}

const calculateMonthlyKPI = async (kpis) => {
  const totalKPI = (await Promise.all(kpis.map(async (kpi) => await calculateKPI(kpi)))).reduce((sum, kpi) => sum + kpi, 0);
  return totalKPI / kpis.length;
};

const calculateYearlyKPI = (MonthlyKPIs) => {
  const totalKPI = MonthlyKPIs.reduce((sum, kpi) => sum + kpi, 0);
  return totalKPI / 12;
}

const calculateSixMonthKPI = (MonthlyKPIs) => {
  const totalKPI = MonthlyKPIs.reduce((sum, kpi) => sum + kpi, 0);
  return totalKPI / 6;
}

module.exports = { calculateKPI, calculateSixMonthKPI, calculateYearlyKPI, calculateMonthlyKPI };
