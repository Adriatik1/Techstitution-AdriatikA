var express = require("express");
var bodyParser= require("body-parser");
var path= require("path");
var app=express();

// app.use("*/css",express.static('css'));
// app.use("*/js",express.static('js'));

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/*app.get('/',function(req,res){
    
});*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const MongoClient= require('mongodb').MongoClient;
const mongoURL='mongodb://localhost:27017/techstitution';
const ObjectId=require('mongodb').ObjectId;
MongoClient.connect(mongoURL, function(err, database){
	
	if(err){
		console.log(err);
	}else{
		console.log('MongoDB Connected!');

	}
	qkmk=database.collection('qkmk');

});



app.get('/',function(req,res) {
  var title='Your string goes here!';
            res.render('index', {title: title});

 });

app.get('/show', function(req,res){
	var title="Lista me te dhena";
	qkmk.find({}).toArray(function(err,docs){
		if(err){
			console.log(err);
		}
		res.render('show',
		{title: title, docs:docs});
});
});

app.post('/add',function(req,res){
	var data=req.body;
	qkmk.insert(data,function(err,results){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
});

app.get('/edit/:id',function(req,res){
	var title="edito te dhenat";
	var id =ObjectId(req.params.id);
qkmk.findOne({_id:id}, function(err, result){
	if(err){
		console.log(err);
	}
	res.render('edit', {title:title,doc:result})
});
});


app.post('/update/:id',function(req,res){
    var data = req.body;
    var id = ObjectId(req.params.id)
    qkmk.updateOne( {_id:id},
    {$set:data}, function(err,result){
        if(err){
            console.log(err);
        }
        res.redirect('/show');
    });
});
app.get('/delete/:id',function(req,res){
    var data = req.body;
    var id =ObjectId(req.params.id)
    qkmk.deleteOne( {_id:id},function(err,result){
            if(err){
                console.log(err);
            }
            res.redirect('/show');
        });
});
/*app.get('/exercise',function(req,res){
	var dataJson={"id":1,
		"project": "techstitution"};
		res.render('exercise',{data: dataJson});

});*/





app.get('/exercise',function(req,res){
	var projects=[{id:1, name:"lirim"},
					{id:2, name:"lirimi"},
					{id:3, name:"lirim maloku"},
					];
					
					var projects1=[{nr:1,emri:"adriatik"},
									{nr:2,emri:"lirim"},];
					res.render('exercise',{projects:projects},{projects1:projects1}); 
});


app.get('*',function(req,res){
	res.send('Not Found!');
});


app.listen(3001,function(){
    console.log('Navigate to http://localhost:3001');
});