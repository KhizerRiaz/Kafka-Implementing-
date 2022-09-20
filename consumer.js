const express = require("express");
const router = express.Router();
router.use(express.json());

const kafka = require ('kafka-node');
const bp = require('body-parser');
const config = require('./config');
var Logger = require('./logger')

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient(config.kafka_server);
// const client1 = new kafka.KafkaClient('localhost:9093');

const Producer = kafka.Producer;
const producer = new Producer(client);

arr = []
i = 0

let consumer = new Consumer(
client,
[{ topic: 'dlq' , partition : 0}], //, { topic: 'topic1'}
{
autoCommit: true,
fetchMaxWaitMs: 1000,
fetchMaxBytes: 1024 * 1024,
encoding: 'utf8',
fromOffset: false
}
);

consumer.on('message', async function(message){



console.log('here');
console.log(
'kafka-> ', message
);

// msg = message.value.split(' ')
// msg = msg[msg.length-1]

// arr.push(msg)
// console.log(arr)

// for (i=0 ; i < arr.length ; i++){
//     if (arr[i] == arr[i+1]){
//         let payloads = [
//             {
//             topic: 'dlq',
//             messages: message.value,
//             key : message.key,
//             partition : message.key
//             },
            
//             ];
//             kafka_topic = payloads[0].topic
    
//         producer.on('ready' , async function(){
//             // print('MKC')
//             console.log('MKC')
//             producer.send(payloads,  (err, data) => {
//                 if (err) {
//                 console.log('[kafka-producer -> '+kafka_topic+']: broker failed');
//                 } 
                
//                 else {
//                 console.log('[kafka-producer -> '+kafka_topic+']: broker success');
//                 console.log('data : ' , data);
                
//                 }
                
//                 });
//         })
    
//         // producer.emit('ready');
    
//         producer.on('error', function(err) {
    
//             console.log('MKC');    
//             console.log(err);
//             console.log('[kafka-producer -> '+kafka_topic+']: connection error');
            
//             });

//     }

//     // if(isNan(Number(arr[i]))){
//     //     break
//     // }
// }

    if(message.topic == 'dlq'){
        message.value = JSON.parse(message.value)
        message.value.error = 'Error Resolved'


        producer.send([
            {
            topic: 'main',
            messages:  JSON.stringify(message.value) ,
            partition : 0
            },
            
            ],  (err, data) => {
            if (err) {
            console.log(err)
            console.log('[kafka-producer1 -> '+'DLQ'+']: broker failed');
            } 
            
            else {
            console.log('[kafka-producer -> '+'DLQ'+']: broker success');
            console.log('data : ' , data);
            // console.log('data : ' , km);
            }
            });
    }

})

consumer.on('error', async function(err) {
console.log('error Pakka', err);

Logger.error(err)    

// producer.on('ready', async function() {

//     // print("MKC")
//     let payloads = [
//         {
//         topic: 'dlq',
//         messages: JSON.stringify(err)
//         },
//         // {
//         // topic: 'topic1',
//         // messages: km
//         // }
//         ];

//     producer.send(payloads , (err , message)=>{
//         if (err) {
//             console.log('[kafka-producer -> '+payloads[0]['topic']+']: broker failed\n');
//             console.log(err)
//             } 
            
//             else {
//             console.log('[kafka-producer -> '+payloads[0]['topic']+']: broker success\n');
//             console.log(`Message : ${message}`);
                
//             }
//     })

// });

// producer.emit('ready')

});

consumer.on('offsetOutOfRange', async function (err) {
    console.log(`Index Out of Range : ${err}`)
})

module.exports = client
module.exports = consumer
