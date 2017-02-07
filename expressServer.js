var express = require('express');
var app = express();
var index = require('./routes/index');
var loadstatic = require('./routes/loadstatic');
app.use(express.static('public'));
app.get('/',loadstatic);
app.get('/data', index);

app.listen(8080,function()
{
    console.log("listening on port 8080");
});