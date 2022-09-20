const { DLQ, failureAdapters } = require('kafkajs-dlq')
const config = require('./config')
const kafka = require('kafka-node')
const client = new kafka.KafkaClient(config.kafka_server);
const dlq = new DLQ(client)

