const http=require('http');
const fs=require('fs');
let projectContent="";
let homeContent="";
let registrationContent="";
fs.readFile("home.html",(error,home)=>{
    if (error){
        throw error;
    }
    homeContent=home;
});
fs.readFile("project.html",(error,project)=>{
    if (error){
        throw error;

    }
    projectContent=project;

});
fs.readFile("registration.html",(error,registration)=>{
    if (error){
        throw error;
    }
    registrationContent=registration;
});
http
    .createServer((request,response)=>{
        url=request.url;
        response.writeHeader(200,{content:"text/html"});
        switch(url){
            case "/project":
                response.write(projectContent);
                response.end();
                break;
            case "/registration.html":
                response.write(registrationContent);
                response.end();
                break;
            default:
                response.write(homeContent);
                response.end();
                break;
            }
        })
    .listen(3000);