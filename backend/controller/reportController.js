  const mongoose = require('mongoose');
  const Report = require('../models/reportSchema');





  const getAllReport = async (req, res) =>{
    const report = await Report.find({})
    return res.status(200).json(report);
  }

  const getReportById = async(req, res)=>{
    const id = req.params.id
    const report = await Report.find({id})

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: 'Invalid ID' });
    }
    return res.status(200).json(report);
  }


  const getScheduledReport = async (req, res) => {
    try {
      const reports = await Report.getScheduledReports();
      res.status(200).json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const exportReportDF = async (req, res) => {
    try {
      const format = req.query.format || 'pdf';
      const reportData = await Report.getReportData();

      let exportData;
      switch (format.toLowerCase()) {
        case 'pdf':
          exportData = await Report.exportToPDF(reportData);
          res.setHeader('Content-Type', 'application/pdf');
          break;
        case 'csv':
          exportData = await Report.exportToCSV(reportData);
          res.setHeader('Content-Type', 'text/csv');
          break;
        case 'xlsx':
          exportData = await Report.exportToXLSX(reportData);
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          break;
        default:
          return res.status(400).json({ message: 'Invalid format' });
      }
      res.setHeader('Content-Disposition', `attachment; filename=report.${format}`);
      res.status(200).send(exportData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const createNewReport = async (req, res) => {
    try {
      const reportParams = req.body;
      const newReport = await Report.createCustomReport(reportParams);
      res.status(201).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = { createNewReport, exportReportDF, getScheduledReport, getAllReport, getReportById };
