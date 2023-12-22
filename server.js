const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const querystring = require('querystring');


//function to convert obj to JSON format
function JSONIFY(obj) {
  return JSON.stringify(obj);
}

const server = http.createServer((req, res) => {
  //Function to handle reading and writing of files to response
  function readWrite(file, contentType) {
    fs.readFile(file, (err, data) => {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    })
  }

  const reqURL = url.parse(req.url)
  const page = reqURL.pathname;
  const params = querystring.parse(reqURL.query);
  console.log(params);

  switch (page) {
    case '/': 
    readWrite('assets/index.html', 'text/html');
  }
})

server.listen(process.env.PORT || 1337);