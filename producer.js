// 1 : Producer side – what if message fails to get logged or any exception occurs
const express = require("express");
const router = express.Router();
router.use(express.json());

const kafka = require ('kafka-node');
const bp = require('body-parser');
const config = require('./config');


router.post('/' , async(req , res)=>{

    KeyedMessage = kafka.KeyedMessage;
    const client = new kafka.KafkaClient(config.kafka_server);
    var offset = new kafka.Offset(client);
    const Producer = kafka.Producer;
    const producer = new Producer(client);

    msg = req.body.message
    const partition = req.body.partition
    const kafka_topic = req.body.topic

    km = new KeyedMessage(partition , msg);

    let payloads = [
        {
        topic: kafka_topic,
        messages:  km,
        partition : km.key
        },];
        // payloads = JSON.stringify(payloads)

    offset.fetchLatestOffsets([kafka_topic], function (error, offsets) {
        if (error)
            {
                // return handleError(error);
                console.log(error)
            }
        else{
            
            console.log(offsets)
            partition_key = offsets[kafka_topic]['0']
            console.log(partition_key)
        } 
        // console.log(offsets[topic][partition]);
    });
    // msg += ' '
    // msg += String(partition_key)
    
    console.log(kafka_topic);
    
    // 9092 : topic1
    // 9093 : topic2

    producer.on('ready', async function() {
        // console.log('km' , km)
        producer.send(payloads,  (err, data) => {
            if (err) {
            console.log('[kafka-producer -> '+kafka_topic+']: broker failed');
            
            producer.send([
                {
                topic: 'dlq',
                messages:  {msg : payloads[0]['messages'] , error : err},
                partition : 0
                },
                
                ],  (err, data) => {
                if (err) {
                console.log('[kafka-producer1 -> '+'DLQ'+']: broker failed');
                } 
                
                else {
                console.log('[kafka-producer -> '+'DLQ'+']: broker success');
                console.log('data : ' , data);
                res.json({Topic : 'DLQ', Data : data})
                }
                
                });
    
            } 
            
            else {
            console.log('[kafka-producer -> '+kafka_topic+']: broker success');
            console.log('data : ' , data);
            res.json({Topic : 'main', Data : data})
            // console.log('data : ' , km);
            }
            });
    });
    
    producer.on('error', function(err) {
        producer.send([
            {
            topic: 'dlq',
            messages:  {msg : payloads[0]['messages'] , error : err},
            partition : 0
            },
            
            ],  (err, data) => {
            if (err) {
            console.log('[kafka-producer1 -> '+kafka_topic+']: broker failed');
            } 
            
            else {
            console.log('[kafka-producer -> '+'DLQ'+']: broker success');
            console.log('data : ' , data);
            // console.log('data : ' , km);
            }
            res.send(data)
            });
            
       
        console.log(err);
        console.log('[kafka-producer -> '+kafka_topic+']: connection error');
    
        });
    

})





// module.exports = producer

// }

module.exports = router;