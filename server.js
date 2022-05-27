const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const Cors = require("cors")

app.use(express.json());
app.use(Cors());


app.get('/', (req, res) => res.status(200).send("Hello Programmers"));


/* io.on("connection", function (socket) {
	socket.on("sender-join", function (data) {
		socket.join(data.uid);
	});
	socket.on("receiver-join", function (data) {
		socket.join(data.uid);
		socket.in(data.sender_uid).emit("init", data.uid);
	});
	socket.on("file-meta", function (data) {
		socket.in(data.uid).emit("fs-meta", data.metadata);
	});
	socket.on("fs-start", function (data) {
		socket.in(data.uid).emit("fs-share", {});
	});
	socket.on("file-raw", function (data) {
		socket.in(data.uid).emit("fs-share", data.buffer);
	})
}); */

app.listen(8001, () => {
	console.log("Server is Running");
});