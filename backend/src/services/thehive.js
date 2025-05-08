import axios from 'axios';
import config from '../config.js';

export class TheHiveService {
    constructor() {
        this.client = axios.create({
            baseURL: config.thehive.URL || 'http://localhost:9000',
            headers: {
                Authorization: `Bearer ${config.thehive.API_KEY}`,
            },
        });
    }

    async createCase(alert) {
        try {
            const response = await this.client.post('/api/v1/case', {
                title: alert.title,
                description: alert.description,
                severity: alert.severity || 2,
                tlp: alert.tlp || 2,
                tags: alert.tags || ['xdr'],
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error creando caso en TheHive: ${error.message}`);
        }
    }

    async getCases() {
        try {
            const response = await this.client.get('/api/v1/case');
            return response.data;
        } catch (error) {
            throw new Error(`Error listando casos en TheHive: ${error.message}`);
        }
    }
}

export default new TheHiveService();