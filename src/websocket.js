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
    socket.emit("update userList", userList);

    socket.on("disconnect", () => {
        console.log("disconnect id: "+socket.id)
        const outUser = userList.find(user => user.id == socket.id);

        if(outUser) {
            const index = userList.indexOf(outUser);
            userList.splice(index, 1);
            io.emit("update userList", userList);
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
        let userExists = userList.find(user => user.nickname == nickname);

        if(userExists) {
            let index = userList.indexOf(userExists);
            userExists.id = socket.id;
            userList[index] = userExists;
        } else {
            const user = new User(socket.id, nickname);
            userList.push(user);
        }

        io.emit("update userList", userList);
    });

    socket.on("user is typing", () => {
        const referredUser = userList.find(user => user.id == socket.id);
        if(referredUser){
            socket.broadcast.emit("user is typing", {nickname: referredUser.nickname});
        }
        
    });
});