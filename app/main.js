const net = require("net");
const HttpHeader = require("./parseHttpRequest");
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (req) => {
    console.log(req.toString());
    const httpHeader = new HttpHeader(req.toString());
    if (httpHeader.path === "/") socket.write("HTTP/1.1 200 OK\r\n\r\n");
    else if (httpHeader.path.match(new RegExp("echo"))) {
      const content = httpHeader.path.substring(6);
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}\r\n`
      );
    } else if (httpHeader.path.match(new RegExp("user-agent"))) {
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${httpHeader["User-Agent"].length}\r\n\r\n${httpHeader["User-Agent"]}\r\n`
      );
    } else socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    socket.end();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
