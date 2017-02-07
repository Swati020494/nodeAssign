var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var express = require("express");
var router = express.Router();

  
//******************************get data from the url and process its parameters****************
router.get('/data',function(request,response)
 {
	    if(request.query.name!=null)
	    {
			fs.readFile(path.resolve(__dirname + '/../details.json'),'utf8', function (err, data) {	
				if (err) 
					console.log(err);
				else
				{
					var items = JSON.parse(data).items;
					var len = items.length ; 
					var nameOfItems = [];
					for(var i =0 ; i<len ; i++)
					{
						if(lodash.includes(items[i].name,request.query.name))
							nameOfItems.push(items[i]);
					}
					var page = request.query.page;
					var items =  [] ;
					var begin = (page-1)*10 ;
					var end = begin +10 ;
					for(var i=begin;i<end && i<nameOfItems.length;i++)
						items.push(nameOfItems[i]);
					response.writeHead(200, {'Content-Type': 'text/plain'});
					response.write(JSON.stringify(items));
					response.end(); 
				}
			});
		}
		else 
		{
			fs.readFile(path.resolve(__dirname + '/../details.json'),'utf8', function (err, data) 
			{	
				if (err) 
					console.log(err);
				else
				{
					response.writeHead(200, {'Content-Type': 'text/plain'});
					response.write(data);
					response.end();
				}
			});
		}
});
module.exports = router ; 