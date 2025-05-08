import { Client } from '@opensearch-project/opensearch';
import config from '../config.js';

export class OpenSearchService {
    constructor() {
        this.client = new Client({
            node: config.opensearch.URL || 'http://localhost:9200',
        });
    }

    async search(index, query) {
        try {
            const response = await this.client.search({
                index,
                body: query,
            });
            return response.body.hits;
        } catch (error) {
            throw new Error(`Error en OpenSearch: ${error.message}`);
        }
    }

    async indexDocument(index, document) {
        try {
            await this.client.index({
                index,
                body: document,
            });
        } catch (error) {
            throw new Error(`Error indexando en OpenSearch: ${error.message}`);
        }
    }
}

export default new OpenSearchService();