var http = require("http");
var port = 8686;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function sendJson(req, res, obj) {
  res.writeHeader(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(obj));
}

function sendXml(req, res, obj) {
  res.writeHeader(200, {'Content-Type': 'application/xml'});
  var xml = '';
  for (let key in obj) {
    xml += `<${key}>${obj[key]}</${key}>`;
  }
  res.write(xml);
}

function sendHtml(req, res, obj) {
  res.writeHeader(200, {'Content-Type': 'text/html'});
  var html = '';
  for (let key in obj) {
    html += `<strong>${key}</strong>: ${obj[key]}`;
  }
  res.write(html);
}

function sendText(req, res, obj) {
  res.writeHeader(200, {'Content-Type': 'text/plain'});
  var text = '';
  for (let key in obj) {
    text += `${key}: ${obj[key]}`;
  }
  res.write(text);
}

function send(req, res, obj) {
  switch(req.headers.accept) {
    case 'application/json':
      sendJson(req, res, obj);
      break;
    case 'application/xml':
      sendXml(req, res, obj);
      break;
    case 'text/html':
      sendHtml(req, res, obj);
      break;
    default:
      sendText(req, res, obj);
  }
}

http.createServer(function(req,res){
  console.log('New incoming client request for ' + req.url);
  switch(req.url) { 
    case '/temperature':
      send(req, res, {temperature: + randomInt(1, 40)}); 
      break;
    case '/light':
      send(req, res, {light: + randomInt(1, 100)});
      break;
    case '/humidity':
      send(req, res, {humidity: randomInt(0,100)});
      break;
    default:
      send(req, res, {hello: 'world'});
  }
  res.end();  
}).listen(port);
console.log('Server listening on http:8686');






