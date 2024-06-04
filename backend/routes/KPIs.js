const express = require('express');
const path = require('path');
const router = express.Router();
const {createEmpKPI, DeleteEmpKPI, updateEmpKPI, getEmpKPIById, employeeKPI} = require('../controller/kpiController')

// Get all KPIs (admin and Managers only)
// router.get('/', authenticateToken, checkRole(['admin', 'manager']), getAllKPIs)
router.get('/', employeeKPI )
  
 //get KPI by Id
// router.get('/:id', authenticateToken, checkRole(['admin','manager', 'employee']),getKPIssById)
router.get('/:id', getEmpKPIById )


//create new KPI
// router.post('/', authenticateToken, checkRole(['admin', 'manager']), createNewKPIs)
router.post('/create', createEmpKPI )


//delete KPI
// router.delete('/', authenticateToken, checkRole(['admin','manager']), deleteKPIs)
router.delete('/delete/:id', DeleteEmpKPI )


//update KPI
// router.patch('/', authenticateToken, checkRole(['admin','manager']), updateteKPIs)
router.patch('/update/:id', updateEmpKPI )

module.exports = router;

