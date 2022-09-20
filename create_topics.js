var kafka = require('kafka-node');
var client = new kafka.KafkaClient();
 
var topicsToCreate = [{
  topic: 'main',
  partitions: 2,
  replicationFactor: 1
},
{
    topic: 'dlq',
    partitions: 2,
    replicationFactor: 1
  }];
 
client.createTopics(topicsToCreate, (err, result) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(`Success : ${result}`)
    }
});