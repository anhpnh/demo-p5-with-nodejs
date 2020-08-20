let express = require('express');
let app = express();
app.use(express.static("public"));

let server = require("http").Server(app);
let io = require("socket.io")(server);

io.sockets.on("connection", socket => {
    console.log("We have new client: " + socket.id);
    socket.on("disconnect", () => {
        console.log("Client has disconnected");
    });

    socket.on("client-send-data", (data) => {
        console.log(data);
        socket.broadcast.emit("server-send-data", data);
    });


});

server.listen(process.env.PORT || 3000);
console.log("Server started");