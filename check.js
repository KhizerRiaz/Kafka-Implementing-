// let payloads = [
//     {
//     topic: 'dlq',
//     messages: JSON.stringify(err)
//     },
//     // {
//     // topic: 'topic1',
//     // messages: km
//     // }
    
//     ];

// console.log(payloads[0]['topic'])

// arr = [0,1]

// for (i=0 ; i < arr.length-2 ; i++){
//     // if (i==1){
//     //     break
//     // }
// }

// if (arr.length-2 == i){
//     console.log('x')
// } 
// const kafka = require ('kafka-node');
// KeyedMessage = kafka.KeyedMessage;
// km = new KeyedMessage('key', 'message')

// console.log(km.key)

// var x = 'abc'
// x+=' '
// x+= String(5)

// x = x.split(' ')
// console.log(isNaN(Number(x[x.length-2])))

// const kafka = require ('kafka-node');
// const bp = require('body-parser');
// const config = require('./config');

// const client = new kafka.KafkaClient(config.kafka_server);
// const Producer = kafka.Producer;
// const producer = new Producer(client);

// let payloads = [
//     {
//     topic: 'main',
//     messages:  km,
//     partition : km.key
//     },
    
//     ];
// kafka_topic = 'dlq'
// producer.send([
//     {
//     topic: 'dlq',
//     messages:  'maki',
//     // partition : km.key
//     },
    
//     ],  (err, data) => {
//     if (err) {
//     console.log('[kafka-producer1 -> '+kafka_topic+']: broker failed');
//     } 
    
//     else {
//     console.log('[kafka-producer -> '+'DLQ'+']: broker success');
//     console.log('data : ' , data);
//     // console.log('data : ' , km);
    
//     }
    
//     });

// try
// {let payloads = [
//     {
//     topic: 'abc',
//     messages:  'abc',
//     partition : 'abc'
//     },];

//     // payloads = payloads[0]
//     payloads = JSON.stringify(payloads)
//     payloads = JSON.parse(payloads)
//     console.log(payloads)}

// catch(err){
//     console.log(err)
// }
// console.log('ABC')

if(1 && 1){
    console.log('AB')
}