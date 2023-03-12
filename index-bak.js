const http = require('http')
const fs = require('fs')
const url = require('url')
 
const server = http.createServer((req,res)=>{
// const pathName = req.url
let myhtml= ''
var {pathName,query} = url.parse(req.url,true);
var id = query.id;
var option = query.option;  
console.log(id);

if(pathName==="/"||pathName==="/home"){
    const indexhtml = fs.readFileSync(__dirname+'/templates/index.html')
    res.end(indexhtml)
    // myhtml= '<h1>Hello Node.js</h1><p style="color:#000">kongruksiam studio | 2021</p>';
}else if(pathName==="/product1" ){
    const indexhtml = fs.readFileSync(__dirname+'/templates/product1.html')
    res.end(indexhtml)
    // myhtml= '<h1>Hello Node.js</h1><p style="color:#000">kongruksiam studio | 2021</p>';
}else{
    res.writeHead(404)
      myhtml= '404'
}
res.end(myhtml)
})
server.listen(8080,'localhost',()=>{
console.log("start server in port 8080")
})