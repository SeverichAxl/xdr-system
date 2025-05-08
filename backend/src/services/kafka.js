import { Kafka } from 'kafkajs';
import config from '../config.js';

export class KafkaService {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'xdr-backend',
            brokers: [config.kafka.BROKERS || 'localhost:9092'],
        });
        this.consumer = this.kafka.consumer({ groupId: 'xdr-group' });
    }

    async connect() {
        await this.consumer.connect();
        console.log('Conectado a Kafka');
    }

    async subscribe(topics, callback) {
        await this.consumer.subscribe({ topics, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = JSON.parse(message.value.toString());
                callback({ topic, partition, value });
            },
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
        console.log('Desconectado de Kafka');
    }
}

export default new KafkaService();