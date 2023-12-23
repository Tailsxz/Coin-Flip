const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const EventEmitter = require('events');


//function to convert obj to JSON format
function JSONIFY(obj) {
  return JSON.stringify(obj);
}
//Function to handle reading and writing of files to response
function readWrite(res, status, file, contentType) {
  fs.readFile(file, (err, data) => {
    res.writeHead(status, { 'Content-Type': contentType });
    res.write(data);
    res.end();
  })
}

function sendRandomNum(res) {
  let randomNum = Math.ceil(Math.random() * 2);
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSONIFY({randomNum}));
}

const server = http.createServer((req, res) => {
  

  const reqURL = url.parse(req.url)
  const page = reqURL.pathname;
  const params = querystring.parse(reqURL.query);
  switch (page) {
    case '/': 
      readWrite(res, 200, 'assets/index.html', 'text/html');
      break;
    case '/assets/normalize.css':
      readWrite(res, 200, 'assets/normalize.css', 'text/css');
      break;
    case '/assets/style.css':
      readWrite(res, 200, 'assets/style.css', 'text/css');
      break;
    case '/assets/main.js':
      readWrite(res, 200, 'assets/main.js', 'text/javascript');
      break;
    case '/api':
      sendRandomNum(res);
      break;
    default:
      readWrite(res, 404, 'assets/404.html', 'text/html');
  }
})

server.listen(process.env.PORT || 1337);

//Playing around with events
let emitter = new EventEmitter();

emitter.on('logging', ({ data }) => console.log(data));

// emitter.addListener('logging', ({ data }) => console.log(data));

//both of these lines do the same thing! on is just shorthand to calling addListener, and much faster to type! Here we can see how destructuring can be very useful. In the "event", haha, that we are passing lots of data when emitting the event, we can have multiple listeners on the same event recieve only the data that listener needs.
let message = 'Hello World';
emitter.emit('logging', { data: message })//here we are passing an object as a second argument to emit, which is a rest parameter of eventArgs, when we emit an event we can pass along data to the event handler, which we will be creating in a second. Since it is a rest parameter you can just pass the args outside of the object. It doesn't matter what value you pass, it will be passed. The use of an object is very useful in the event you want to, rather than pass many arguments with no identifier, pass a single object to which we can encapsulate our data along with keys for that data.
