import express from 'express';
import {
    getLogs,
    getAnomalies,
    createIncident,
    getIncidents,
    getThreatIntel,
} from '../controllers/integration.controller.js';

const router = express.Router();

router.get('/logs', getLogs);
router.get('/anomalies', getAnomalies);
router.post('/incidents', createIncident);
router.get('/incidents', getIncidents);
router.get('/threat-intel', getThreatIntel);

export default router;