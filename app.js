 

var express = require('express');
var app = express();
const router = express.Router()
var path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser')
 
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

   // getting-started.js
   const mongoose = require('mongoose');
   main().catch(err => console.log(err));
   async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/productDB');      
     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/productDB');` if your database has auth enabled
   }
 

  const products = require('./models/product_model');
  const bodyParser = require("body-parser")
  router.use(bodyParser.urlencoded({
      extended:true
  }));


  router.use(cookieParser())
 

  router.get('/', function(req, res) {
    res.status(200)
  
  
 
    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    const exists_sku = products.find({ sku: { $ne: null } } ).then((data) => {
      if(data != null && data != '') {     
         
        res.render('index.ejs',{
          obj:data
        }) 
      }else{
        
        res.writeHead(302, {
          'Location': '/form'
          //add other headers here...
        });
        res.end();
      }
  })
})

router.get('/product/:id', function(req, res) {
 
          products.findOne({_id: req.params.id })
         .then(productdata => {
            console.log(productdata);
            if(productdata != null && productdata != '') {   
              res.render('product.ejs',{
                productdata:productdata
              }) 
            }else{
              res.writeHead(302, {
                'Location': '/form'
                //add other headers here...
              });
              res.end();
            }

            
         })
       .catch(err => {
          console.log(err)
       })
       
  })

  router.get('/form', function(req, res) {
    res.status(200)
    const obj = [];
    res.render('form.ejs',{
      obj:obj
    }) 
  })

  

  router.get('/manage', function(req, res) {
  
    if (req.cookies["adminlogin"]) {
    
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
    }else{
      res.writeHead(302, {
        'Location': '/login'
      });
      res.end();
    }

    
      
  

   
    // var admin_user_model = require('./models/adminusers_model');
    // admin_user_model.create({username : 'Test', password : '12345', email : 'kusumoto.com@gmail.com'}  );
 
    
    
  })

  router.get('/edit/:id', function(req, res) {
 
      products.findOne({_id: req.params.id })
      .then(productdata => {
        console.log(productdata);
        if(productdata != null && productdata != '') {   
          res.render('form_edit.ejs',{
            productdata:productdata
          }) 
        }else{
          res.writeHead(302, {
            'Location': '/form'
          });
          res.end();
        }

        
      })
      .catch(err => {
          console.log(err)
      })

})



  router.get('/delete/:id', function(req, res) {
    res.status(200)
  
    var idtodelete = req.params.id
    // getting-started.js
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/productDB');      
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/productDB');` if your database has auth enabled
    }
  

    const products = require('./models/product_model');
 
    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    const exists_sku = products.findByIdAndDelete(idtodelete ,{useFindAndModify:false}).exec()
    res.writeHead(302, {
      'Location': '/manage'
    });
    res.end();
 
    
  })
  
  var multer = require('multer');
 
 var productimage = ''
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'public/images/products')
      },
      filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // productimage  = file.fieldname + '-' + Date.now()+ '.' +extension
        productimage  =  'image_' + Date.now()+ '.' +extension
        cb(null, productimage)
      }
  });
  
  var upload = multer({ storage: storage });

  router.post('/insertdata',upload.single('image'), function(req, res) {
    res.status(200)
    var sku = req.body.sku;
    var name = req.body.name;
    var price = Number(req.body.price);
    var productimage = req.file.filename;
    var description = req.body.description;
    const obj = [{id:0, sku: sku, name: name, description: description,price:price}];
    // console.log(obj);

    // getting-started.js
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('  ',{
        useNewUrlParser:true,
        useUnifiedTopology:true
      }).catch(err=>console.log(err))
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/productDB');` if your database has auth enabled
    }

 

 

    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    const exists_sku = products.find({ sku: req.body.sku } ).then((data) => {
      if(data != null && data != '') {     
        console.log('existing sku: '+ req.body.sku);
        res.render('form.ejs',{
          obj:obj
        }) 
      }else{
     

        // var productimage = {        
        //       data: fs.readFileSync(path.join(__dirname + '/public/images/products/' + req.file.filename)),
        //       contentType: 'image/png'
        // }

        products.create({sku: sku, name : name, price : price, productimage:productimage, description :description}  );
        console.log('inserted');
        res.writeHead(302, {
          'Location': '/manage'
        });
        res.end();
      }
      
    });

   
  
 
    
    
  })


  router.post('/updatedata',upload.single('image'), function(req, res) {
    res.status(200)
    var sku = req.body.sku;
    var name = req.body.name;
    var price = Number(req.body.price);
    if(req.file){
      var productimage = req.file.filename;
    }else{
      req.body.currentimg
    }
    
    var description = req.body.description;
    const obj = [{id:0, sku: sku, name: name, description: description,price:price}];
    // console.log(obj);

    // getting-started.js
    const mongoose = require('mongoose');
    main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('  ',{
        useNewUrlParser:true,
        useUnifiedTopology:true
      }).catch(err=>console.log(err))
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/productDB');` if your database has auth enabled
    }

 
 
    const exists_sku = products.find({ _id: req.body._id } ).then((data) => {
      if(data != null && data != '') {     
       
        products.updateOne(
                  { "_id": req.body._id}, // Filter
                  {$set: {sku:sku, name: name, price : price, productimage:productimage, description :description}}, // Update
                  {upsert: true} // add document with req.body._id if not exists 

            )
            .then((obj) => {
                    console.log('Updated - ' + obj);
                    res.redirect('/manage')
              })
              .catch((err) => {
                console.log('Error: ' + err);
              })

      }else{
     
 

       
        res.writeHead(302, {
          'Location': '/manage'
          //add other headers here...
        });
        res.end();
      }
      
    });

    
    
    
  })


  router.get('/addadmin', function(req, res) {
    res.status(200)
  
  
 
        var admin_user_model = require('./models/adminusers_model');
        admin_user_model.findOne({username: 'Test'  })
        .then(admindata => {
        if (admindata){

        } else {
         
              admin_user_model.create({username : 'Test', password : '12345', email : 'kusumoto.com@gmail.com'}  );
              res.writeHead(302, {
                'Location': '/login'
              });
              res.end();
              
        }

          
        })
        .catch(err => {
        console.log(err)
        })


  
})

router.get('/login', function(req, res) {
  res.status(200)
  if (req.cookies["adminlogin"]) {
    res.writeHead(302, {
      'Location': '/manage'
    });
    res.end();
  }else{
    const obj = [];
    res.render('login.ejs',{
      obj:obj
    }) 
  }
  
})

router.get('/logout', function(req, res) {
  res.status(200)
  res.clearCookie("username");
  res.clearCookie("adminlogin");
    res.writeHead(302, {
      'Location': '/manage'
    });
    res.end();
  
  
})

router.post('/loginaction', function(req, res) {
  res.status(200)

  var username = req.body.username
  var password = req.body.password
  console.log(username);
  var admin_user_model = require('./models/adminusers_model');
  admin_user_model.findOne({username: username  })
  .then(admindata => {
    if (admindata && admindata.password != password ){
      console.log("Password is incorrect.");
      res.cookie('username','',{maxAge:10000*60*24})
      res.cookie('adminlogin',false,{maxAge:10000*60*24})
      const obj = [{err:'Password is incorrect.'}];
      res.render('login.ejs',{
        obj:obj
      }) 
    }else if (admindata && admindata.password == password){
      console.log('User and password is correct')
      res.cookie('username',username,{maxAge:10000*60*24})
      res.cookie('login',true,{maxAge:10000*60*24})
      res.writeHead(302, {
        'Location': '/manage'
      });
      res.end();
    
    } else {
      console.log("Credentials wrong");
      res.cookie('username','',{maxAge:10000*60*24})
      res.cookie('login',false,{maxAge:10000*60*24})
      const obj = [{err:'Credentials wrong 1',username1:username }];
      res.render('login.ejs',{
        obj:obj
      }) 
    }      

     

     
  })
  .catch(err => {
    console.log(err)
  })

   
})


// Set Port
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
 