var express = require('express');
var app = express();
var kafka = require('kafka-node');

app.use(express.json());

const producer = require("./producer.js");
app.use("/producer", producer);

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listening on port ${port}...`));
