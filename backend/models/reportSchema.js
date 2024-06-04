const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PDFDocument = require('pdfkit');
const { writeToString } = require('@fast-csv/format');
const XLSX = require('xlsx');

const ReportSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['custom', 'scheduled'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

ReportSchema.statics.getScheduledReports = async function () {
  return this.find({ type: 'scheduled' });
};

ReportSchema.statics.getReportData = async function () {
  return this.find({});
};

ReportSchema.statics.exportToPDF = async function (reportData) {
  const doc = new PDFDocument();
  let buffers = [];
  
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  reportData.forEach((report, index) => {
    doc.text(`Report ${index + 1}`);
    doc.text(`User ID: ${report.user_id}`);
    doc.text(`Type: ${report.type}`);
    doc.text(`Content: ${report.content}`);
    doc.text(`Created At: ${report.created_at}`);
    doc.addPage();
  });

  doc.end();
};

ReportSchema.statics.exportToCSV = async function (reportData) {
  return writeToString(reportData, { headers: true });
};

ReportSchema.statics.exportToXLSX = async function (reportData) {
  const ws = XLSX.utils.json_to_sheet(reportData.map(report => ({
    user_id: report.user_id.toString(),
    type: report.type,
    content: report.content,
    created_at: report.created_at
  })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Reports');
  return XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
};

ReportSchema.statics.createCustomReport = async function (reportParams) {
  return this.create(reportParams);
};

module.exports = mongoose.model('Report', ReportSchema);
