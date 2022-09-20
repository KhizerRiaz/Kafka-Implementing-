const config = require('./config')
var kafka = require('kafka-node'),
    client = new kafka.KafkaClient(config.kafka_server),
    offset = new kafka.Offset(client);

    var partition_key = 0
var partition = 0;
    var topic = 'main';

    offset.fetchLatestOffsets([topic], function (error, offsets) {
        if (error)
            {return handleError(error);}
        else{
            console.log(offsets)
        } 
        partition_key = offsets[topic][partition];
    });
    var partition_key
    // Latest -> Earliest