 

var express = require('express');
var app = express();
const router = express.Router()
var path = require('path');
const fs = require('fs')

 
// app.get('/user/:id', function(req, res) {
//     const query = req.query;// query = {sex:"female"}
//     const params = req.params; //params = {id:"000000"}
//     res.send(params.id)  
//   })
  
 
//   app.get('/product/:id', function(req, res) {
//     res.status(200)
//     res.type('text/html')
//     const params = req.params;
//     const id = params.id
//     const indexpath = path.join(__dirname,'templates/product'+id+'.html')
     
//         if (fs.existsSync(indexpath)) {
//           //file exists
//           res.sendFile(indexpath)  
//         }else{
//         res.status(404)
//         }
       
//   })
  

  // const indexpath = path.join(__dirname,'index.ejs')
  // router.get('/', function(req, res) {
  //   res.status(200)
  //   res.type('text/html')
  //   res.sendFile(indexpath)  
  // })
  // router.get('/product/:id', function(req, res) {
  //   res.status(200)
  //   res.type('text/html')
  //   const params = req.params;
  //   const id = params.id
  //   const indexpath = path.join(__dirname,'product'+id+'.html')
  //   res.sendFile(indexpath)  
    
  // })

  
  app.use(router)
  app.use(express.static(path.join(__dirname,'public')))


  app.set('views',path.join(__dirname,'views'))
  app.set('view engine','ejs')

  router.get('/', function(req, res) {
    res.status(200)
    const obj = [{id:1, name: 'Jean-Luc Picard', rank: 'Captain',price:22000},{id:2, name: 'Jean-Luc Picard', rank: 'Captain',price:2000},{id:3, name: 'Jean-Luc Picard', rank: 'Captain',price:5200},{id:4, name: 'Jean-Luc Picard', rank: 'Captain',price:1000}];
    res.render('index.ejs',{
      obj:obj
    }) 
  })

  router.get('/form', function(req, res) {
    res.status(200)
    const obj = [];
    res.render('form.ejs',{
      obj:obj
    }) 
  })

  // router.get('/manage', function(req, res) {
  //   res.status(200)
  //   const obj = [];
  //   res.render('manage.ejs',{
  //     obj:obj
  //   }) 
  // })

  // router.get('/insertdata', function(req, res) {
  //   res.status(200)
  //   const params = req.params;
  //   const name = params.name
  //   const price = params.price
  //   const image = params.image
  //   const description = params.description
  //   console.log(req.query);
  //   const obj = req.query
  //   res.render('form.ejs',{
  //     obj:obj
  //   }) 
  // })

  const bodyParser = require("body-parser")
  router.use(bodyParser.urlencoded({
      extended:true
  }));

  router.get('/manage', function(req, res) {
    res.status(200)
    
   
    // getting-started.js
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');      
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }
  

    const products = require('./models/product_model');
 
    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    const exists_sku = products.find({ sku: { $ne: null } } ).then((data) => {
      if(data != null && data != '') {     
         
        res.render('manage.ejs',{
          obj:data
        }) 
      }else{
        
        res.writeHead(302, {
          'Location': '/form'
          //add other headers here...
        });
        res.end();
      }
      
    });

   
    // var admin_user_model = require('./models/adminusers_model');
    // admin_user_model.create({username : 'Test', password : '12345', email : 'kusumoto.com@gmail.com'}  );
 
    
    
  })


  router.post('/insertdata', function(req, res) {
    res.status(200)
    var sku = req.body.sku;
    var name = req.body.name;
    var price = Number(req.body.price);
    var description = req.body.description;
    const obj = [{id:0, sku: sku, name: name, description: description,price:price}];
    // console.log(obj);

    // getting-started.js
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');      
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }
  

    const products = require('./models/product_model');
 
    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    const exists_sku = products.find({ sku: req.body.sku } ).then((data) => {
      if(data != null && data != '') {     
        console.log('exists sku: '+ req.body.sku);
        res.render('form.ejs',{
          obj:obj
        }) 
      }else{
        products.create({sku: sku, name : name, price : price, description :description}  );
        console.log('inserted');
        res.writeHead(302, {
          'Location': '/manage'
          //add other headers here...
        });
        res.end();
      }
      
    });

   
    // var admin_user_model = require('./models/adminusers_model');
    // admin_user_model.create({username : 'Test', password : '12345', email : 'kusumoto.com@gmail.com'}  );
 
    
    
  })


// Set Port
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
 