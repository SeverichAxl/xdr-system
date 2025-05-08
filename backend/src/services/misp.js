import axios from 'axios';
import config from '../config.js';

export class MISPService {
    constructor() {
        this.client = axios.create({
            baseURL: config.misp.URL || 'http://localhost:80',
            headers: {
                Authorization: `Bearer ${config.misp.API_KEY}`,
            },
        });
    }

    async searchIOC(ioc) {
        try {
            const response = await this.client.post('/attributes/restSearch', {
                value: ioc,
                type: ['ip-src', 'ip-dst', 'domain', 'hash'],
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error buscando IOC en MISP: ${error.message}`);
        }
    }
}

export default new MISPService();