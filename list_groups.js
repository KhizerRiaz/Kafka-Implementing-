const kafka = require('kafka-node')
const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client); // client must be KafkaClient
admin.listGroups((err, res) => {
  console.log('consumerGroups', res);
});