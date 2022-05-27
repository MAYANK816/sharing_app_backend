import express from "express";
import Cors from 'cors';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const port = process.env.PORT || 8001;
app.use(express.json());
app.use(Cors());

app.get('/', (req, res) => res.status(200).send("Hello Programmers"));
const server = app.listen(port, function () {
	console.log(`Listening on port ${port}`);
	console.log(`http://localhost:${port}`);
});

const io = new Server(server, {
	cors: {
		origin: "*"
	}
});

io.on("connection", function (socket) {
	console.log(socket._error);
	console.log("Connected");
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
});
