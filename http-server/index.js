const http=require('http')
const fs=require('fs')
fs.readFile("home.html",(error,home)=>{
    if (error){
        throw error;
    }
    http
    .createServer((request,response)=>{
        response.writeHeader(200,{"Content-Type":"text/HTML"});
        response.write(home);
        response.end(); 
    })
    .listen(3000);

});