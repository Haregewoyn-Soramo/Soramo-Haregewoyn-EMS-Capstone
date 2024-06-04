const express = require('express')
const router = express.Router()
const {createNewReport, exportReportDF, getScheduledReport} = require('../controller/reportController')




// Get scheduled reports.
// router.get('/scheduled', authenticateToken, checkRole(['admin', 'manager']), getScheduledReport)
   router.get('/export', exportReportDF )

// Export reports in different formats.
// router.get('/export', authenticateToken, checkRole(['admin','manager']),exportReportDF)
   router.get('/scheduled', getScheduledReport )


//  Generate custom reports.
// router.post('/custom', authenticateToken, checkRole(['admin','manager']), createNewReport)
   router.post('/custom', createNewReport )


module.exports = router