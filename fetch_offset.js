
var kafka = require('kafka-node'),
    client = require('./consumer'),
    offset = new kafka.Offset(client);
    offset.fetch([
        { topic: 'main', maxNum: 5 }
    ], function (err, data) {
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            // console.log(`MKC`)   
        }
    });

    