const kafka = require ('kafka-node');
const bp = require('body-parser');
const config = require('./config');

const client = new kafka.KafkaClient(config.kafka_server);
const kafka_topic = config.kafka_topic

const Producer = kafka.Producer;
const producer = new Producer(client);

let payloads = [
    {
    topic: kafka_topic,
    messages:  'B',
    // partition : km.key
    },
    
    ];

let payloads1 = [
    {
    topic: kafka_topic,
    messages:  'A',
    // partition : km.key
    },
    
    ];

producer.on('ready', async function() {

    // for (i = 0 ; i < 10 ; i++){
        
        // Producer side – what if message fails to get logged or any exception occurs
            producer.send(payloads,  (err, data) => {
                if (err) {
                console.log('[kafka-producer -> '+kafka_topic+']: broker failed');
                } 
                
                else {
                console.log('[kafka-producer -> '+kafka_topic+']: broker success');
                console.log('data : ' , data);
                // console.log('data : ' , km);
                
                }
                
                });

            producer.send(payloads1,  (err, data) => {
                if (err) {
                console.log('[kafka-producer1 -> '+kafka_topic+']: broker failed');
                } 
                
                else {
                console.log('[kafka-producer -> '+kafka_topic+']: broker success');
                console.log('data : ' , data);
                // console.log('data : ' , km);
                
                }
                
                });
                // setTimeout(() => {}, 5000);

            // }
});

