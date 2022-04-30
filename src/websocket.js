const { io } = require("./http");

class User {
    nickname = '';
    constructor(nickname) {
        this.nickname = nickname;
    }
}

class Message {
    user;
    text = '';
    dateTime;
}

class Chat {
    id = '';
}

let userList = [];
let chatMessages = [];
let chatList = [];

io.on("connection", (socket) => {
    socket.broadcast.emit("chat event", "someone conected");

    socket.on("disconnect", () => {
        socket.broadcast.emit("chat event", "someone disconected");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("new nickname", (nickname) => {
        let user = new User(nickname);

        

        userList.push(user);
    })
});
