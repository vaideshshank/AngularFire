const express=require('express');
const bodyParser=require('body-parser');
const main=require('./endpoints/main.js');
const ejs=require('ejs');
const fs=require('fs');
const app=express();

app.set('view-engine','ejs');
const endpoints={
	data: main.data,
	dataPreloaded: main.dataPreloaded,
	temperature : main.temperature,
	home : main.home
}


/*
app.use('/ejs',function(req,res,next){
	res.send("<h1>Under construction</h1><h4>We are working on it</h4>");
})*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(function(req,res,next){
	let time=new Date();
	let str=`Time : ${time.toString()}, Method : ${req.method}, URL : ${req.url}\r\n`;
	console.log(str);
	fs.appendFile('logs/logs.txt',str,function(err){
		if(err) console.log("Error appending file");
		
		else {next();}
	})	
})


//app endpoints
app.get('/',endpoints.home);
app.get('/api/dataPreloaded',endpoints.dataPreloaded);
app.post('/api/data',endpoints.data);
app.post('/api/temperature',endpoints.temperature);
app.get('/api/ejs',(req,res)=>{
	var x=['vaidesh','shankar','rljcerehj'];
	var htmlTemplate=ejs.render('<h1>HOME</h1><br><%= people.join("-") %>',{people:x});
	
	res.send(htmlTemplate);
})

app.listen(3000,function(err){
	if(err) throw(err);
	console.log('Connected to 3000')
})






















/*request({
	url:`http://api.ipstack.com/142.93.210.160?access_key=db8b6c49b48c7768d4fca21c441a80dd&format=1`,
	json:true
},function(err,res,body){
	if(err) throw err;
	if(res.statusCode==200){
		console.log(JSON.stringify(body,undefined,2));
	}
})
*/



/*const yargs=require('yargs');

const argv=yargs
	.option('address',{
		alias : 'ip',
		
	})
	.argv;

var encode=encodeURIComponent(argv.address);
console.log(argv.address);*/
/*if(argv){
	request({
		url:`http://api.ipstack.com/${encode}?access_key=db8b6c49b48c7768d4fca21c441a80dd&format=1`,
		json:true
		},function(err,res,body){
		if(err) throw err;
		if(res.statusCode==200){
			console.log(JSON.stringify(body,undefined,2));
		}
	}) 
}*/
