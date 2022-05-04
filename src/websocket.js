const { Server } = require("socket.io");
const { io } = require("./http");

class User {
    id;
    nickname;
    constructor(id, nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}

let userList = [];
let messageList = [];

io.on("connection", (socket) => {
    // socket.broadcast.emit("chat event", {"someone conected"});

    socket.emit("message list", {messageList});

    socket.on("disconnect", () => {
        const outUser = userList.find(user => user.id == socket.id);

        if(outUser) {
            socket.broadcast.emit("chat event", `${outUser.nickname} disconected`);
            const index = userList.indexOf(outUser);
            userList.slice(index, 1);
        }
    });

    socket.on("chat message", (data) => {
        const d = new Date();

        data.createdAt = d;
        
        if(userList.find(user => user.nickname == data.author)) {
            socket.broadcast.emit("chat message", {author: data.author, msg: data.msg, createdAt: data.createdAt});
            messageList.push(data);
        } else {
            data = {
                author: 'Server',
                msg: 'Nickname não registrado corretamente.',
                createdAt: d
            };
            socket.emit('chat message', data);            
        }
    })

    socket.on("new nickname", (nickname) => {
        socket.emit("new nickname", nickname);

        let userExists = userList.find(user => user.nickname == nickname);

        if(userExists) {
            let index = userList.indexOf(userExists);
            userExists.id = socket.id;
            userList[index] = userExists;
        } else {
            const user = new User(socket.id, nickname);
            userList.push(user);
        }
    })
});
