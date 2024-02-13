const http = require("http");
const fs = require('fs');

const server = http.createServer((req,res) =>{
    // console.log(req.url,req.method,req.headers);
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>This is a webpage </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST'){ //redirecting to home page
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        // fs.writeFileSync('message.txt','dummy text file');
        res.statusCode = 302;
        res.setHeader('location','/')
        return res.end();
    }
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>This is a webpage </title></head>');
    res.write('<body>Hello world</body>');
    res.write('</html>');
    res.end();

})

server.listen(4200);

