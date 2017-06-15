var fs = require('fs');

var loremipsum = fs.readFileSync('loremipsum.txt');

var http = require('http');

console.log('Starting server');

http.createServer(function (request, response) {

    let numChunks = 0;
    console.log('Got a request');
    console.log(`Content length header: ${request.headers['content-length']}`);

    request.on('abort', () => {
        console.log('#### request abort ...')
    });

    request.on('aborted', () => {
        console.log('#### request aborted ... ');
    });

    request.on('end', () => {
        console.log('#### request end ... ');
        response.end();
    });

    request.on('close', () => {
        console.log('#### request close ... ');
    });

    request.on('data', (chunk) => {
      numChunks++;
      console.log(`Received chunk # ${numChunks}, ${chunk.length} bytes of data.`);
      response.write('.');
    });

    response.on('close', () => {
        console.log('%%%% response close ...');
    });
    response.on('finish', () => {
        console.log('%%%% response finish ...');
    });
    response.on('end', () => {
        console.log('%%%% response end ...');
    });
    request.on('error', e => {
        console.error(`#### request error: ${e.message}`);
    });

    response.on('error', e => {
        console.error(`%%%% response error: ${e.message}`);
    });

    if(request.url.indexOf('lorem') > -1) {
        response.write(loremipsum);
    }
    response.end();
}).listen(8080);
