 

var express = require('express');
var app = express();
 
const fs = require('fs')


 
app.get('/user/:id', function(req, res) {
    const query = req.query;// query = {sex:"female"}
    const params = req.params; //params = {id:"000000"}
    res.send(params.id)  
  })
  
 
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
  
  const router = express.Router()
  var path = require('path');
  const indexpath = path.join(__dirname,'public/index.html')
  router.get('/', function(req, res) {
    res.status(200)
    res.type('text/html')
    res.sendFile(indexpath)  
  })
  router.get('/product/:id', function(req, res) {
    res.status(200)
    res.type('text/html')
    const params = req.params;
    const id = params.id
    const indexpath = path.join(__dirname,'product'+id+'.html')
    res.sendFile(indexpath)  
    
  })

  
  app.use(router)
  app.use(express.static(path.join(__dirname,'public')))

// Set Port
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
 