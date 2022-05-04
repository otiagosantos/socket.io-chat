var socket = io();

let messages = document.querySelector("#messages");
let form = document.querySelector("#form");
let input = document.querySelector("#input");

let modal = document.querySelector("#modal-container");
let userForm = document.querySelector("#user-form");
let nicknameInput = document.querySelector("#nickname-input");

let LoggedAs;

let userList = [];
let messageList = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value) {
        socket.emit("chat message", {author: LoggedAs, msg: input.value});
        input.value = '';
    }
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(nicknameInput.value) {
        socket.emit("new nickname", nicknameInput.value);
        LoggedAs = nicknameInput.value;
        nicknameInput.value = '';
    }
});

socket.on("chat message", (data) => {
    addNewLineOnChat(data);
});

socket.on("chat event", (data) => {
    addNewLineOnChat(data);
})

socket.on("new nickname", (nickname) => {
    handleNewNickname(nickname)
});

socket.on("message list", (data) => {
    messageList = data.messageList;
    renderMessageList();
})

function renderMessageList() {
    messageList.map(message => {
        addNewLineOnChat(message);
    });
}

function addNewLineOnChat(content) {
    let item = document.createElement('li');
    const d = new Date(content.createdAt);
    const month = d.getMonth();
    const day = d.getDate();
    const h = d.getHours();
    const m = d.getMinutes();

    const now = `${h}:${m}`;
    
    item.textContent = content.author ? `${content.author}: ${content.msg} - ${now}` : content.messages;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

function handleNewNickname(nickname) {
    // modal.hidden = true;
    userList.push(nickname);
}
