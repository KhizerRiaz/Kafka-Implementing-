const config = require('./config');
const kafka = require('kafka-node')
const client = new kafka.KafkaClient(config.kafka_server);
const admin = new kafka.Admin(client);

admin.listTopics((err, res) => {
  console.log('topics', res);
});


