import axios from 'axios';
import config from '../config.js';

export class CortexService {
    constructor() {
        this.client = axios.create({
            baseURL: config.cortex.URL || 'http://localhost:9001',
            headers: {
                Authorization: `Bearer ${config.cortex.API_KEY}`,
            },
        });
    }

    async runAnalyzer(analyzerId, data) {
        try {
            const response = await this.client.post(`/api/analyzer/${analyzerId}/run`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error ejecutando analizador en Cortex: ${error.message}`);
        }
    }
}

export default new CortexService();