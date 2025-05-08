import OpenSearchService from '../services/opensearch.js';
import TheHiveService from '../services/thehive.js';
import MISPService from '../services/misp.js';

export const getLogs = async (req, res, next) => {
    try {
        const { index = 'suricata-*', from, size = 10 } = req.query;
        const query = {
            query: {
                match_all: {},
            },
            from: parseInt(from) || 0,
            size: parseInt(size),
        };
        const result = await OpenSearchService.search(index, query);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const getAnomalies = async (req, res, next) => {
    try {
        const result = await OpenSearchService.search('anomalies-*', {
            query: {
                match_all: {},
            },
        });
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const createIncident = async (req, res, next) => {
    try {
        const { title, description, severity, tlp, tags } = req.body;
        const incident = await TheHiveService.createCase({
            title,
            description,
            severity,
            tlp,
            tags,
        });
        res.json({ success: true, data: incident });
    } catch (error) {
        next(error);
    }
};

export const getIncidents = async (req, res, next) => {
    try {
        const incidents = await TheHiveService.getCases();
        res.json({ success: true, data: incidents });
    } catch (error) {
        next(error);
    }
};

export const getThreatIntel = async (req, res, next) => {
    try {
        const { ioc } = req.query;
        if (!ioc) {
            return res.status(400).json({ error: 'IOC requerido' });
        }
        const result = await MISPService.searchIOC(ioc);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};