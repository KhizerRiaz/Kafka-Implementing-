// Getting and Processing the message


var Logger = require('./logger')
const kafka = require ('kafka-node');
const bp = require('body-parser');
const config = require('./config');
// const producer = require('./producer');
// var Logger = require('./logger')

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient(config.kafka_server);

const Producer = kafka.Producer;
const producer = new Producer(client);

let  offset = new kafka.Offset(client)

let consumer = new Consumer(
client,
[{ topic: 'main' , partition : 0}
// , {topic : 'dlq'}
],
{
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    fromOffset: false
}
);

arr = []
// i = 0

async function func(){
    console.log('xD')
}

client.on('error', function(error)
  {
    console.log('client error', error);
  });


consumer.on('error', function(err) {
console.log('error Pakka', err);

Logger.error(JSON.stringify(err))    

});


consumer.on('message', async function(message){

console.log('here');
console.log(
'kafka-> ', message
);

// if (typeof(message.value) == 'string' && message.topic == 'main'){
//    dict = {message : message.value , error : 'Data Type Mismatch'}
//     producer.send([
//         {
//         topic: 'dlq',
//         messages:  dict,
//         partition : 0
//         },
        
//         ],  (err, data) => {
//         if (err) {
//         console.log('[kafka-producer1 -> '+kafka_topic+']: broker failed');
//         } 
        
//         else {
//         console.log('[kafka-producer -> '+'DLQ'+']: broker success');
//         console.log('data : ' , data);
//         // console.log('data : ' , km);
//         }
//         });
// }

    if(message.topic == 'main' && message.key != null){
        try{
            
            arr.push(message)
            
            // console.log('i',i)
            console.log(arr.length)
    if(arr[arr.length - 1].value == arr[arr.length - 2].value && arr[arr.length - 1].key == arr[arr.length - 2].key && arr.length > 1){
        
        // delete the offset
        // Logger.error(JSON.stringify({error : 'Repition of messages' , message : arr[arr.length - 1].value , topic : arr[arr.length - 1].topic , partition : arr[arr.length - 1].partition , same_offsets : [arr[arr.length - 2].offset , arr[arr.length - 1].offset]}))
        
        console.log('Duplication of mesgs . Replicating it to DLQ')
        Logger.error(JSON.stringify({message : message.value , error : 'Repition of messages' , offset : message.offset , topic : message.topic , partition : message.partition})) 
        
        producer.send([
            {
            topic: 'dlq',
            messages:  JSON.stringify({message : message.value , error : 'Repition of messages' , offset : message.offset , topic : message.topic , partition : message.partition}),
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
    // i += 1
            msg = JSON.parse(message)
            // console.log('MBKC')
        }

        catch(err){
// console.log(err)

console.log('Not in json format . Replicating it to DLQ')

dict = {message : message.value , error : 'Not in JSON format' , offset : message.offset , topic : message.topic , partition : message.partition}
dict = JSON.stringify(dict)

Logger.error(JSON.stringify({message : message.value , error : 'Not in JSON format' , offset : message.offset , topic : message.topic , partition : message.partition}))
    producer.send([
        {
        topic: 'dlq',
        messages:  JSON.stringify({message : message.value , error : 'Not in JSON format' , offset : message.offset , topic : message.topic , partition : message.partition}),
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
    }

})

// Consumer then process the data
consumer.pauseTopics([
    { topic: 'main' , partition : 0}
    
]);

consumer.commit((error , data) => {
    if (error){
        console.log(error)
    }

    else{
        console.log(data)
        
        if (data == 'Nothing to be committed' || data == 'Offset committing'){
            
            //Do the Work
            
            consumer.resumeTopics([
                { topic: 'main' , partition : 0}
            ]);
        }

    };
})

consumer.on('offsetOutOfRange', async function (err) {

    console.log('Index Out of Range ' , err)
    Logger.error(JSON.stringify(err))

})

// const produce = async () => {
// 	await producer.connect()
// 	let i = 0

// 	// after the produce has connected, we start an interval timer
// 	setInterval(async () => {
// 		try {
// 			// send a message to the configured topic with
// 			// the key and value formed from the current value of `i`
// 			await producer.send({
// 				topic,
// 				messages: [
// 					{
// 						key: String(i),
// 						value: "this is message " + i,
// 					},
// 				],
// 			})

// 			// if the message is written successfully, log it and increment `i`
// 			console.log("writes: ", i)
// 			i++
// 		} catch (err) {
// 			console.error("could not write message " + err)
// 		}
// 	}, 1000)
// }
