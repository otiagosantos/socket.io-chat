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

let tip = document.querySelector(".tip");
let tipMessage = document.querySelector(".tip p");
let typingTimer = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value) {
        socket.emit("chat message", {author: LoggedAs, msg: input.value});

        const d = new Date();
        addNewLineOnChat({author: LoggedAs, msg: input.value, createdAt: d});
        
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


input.addEventListener('keyup', () => {
    socket.emit("user is typing");
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
});

socket.on("user is typing", (data) => {
    handleTip(`${data.nickname} is typing...`);
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
    
    item.textContent = content.author ? `${content.author}: ${content.msg} - ${now}` : `Mensagem "${content.msg}" Não enviada - ${now}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

function handleNewNickname(nickname) {
    // modal.hidden = true;
    userList.push(nickname);
}

function setTipMessage(message) {
    tipMessage.innerHTML = "";
    tipMessage.innerHTML = message;
}

async function handleTip(message) {
    clearTimeout(typingTimer);

    setTipMessage(message);

    startTipAnimation();

    typingTimer = setTimeout(() => {
        endTipAnimation();
    }, 1000);
}

function startTipAnimation() {
    if(tip.classList.contains("end-animation")){
        tip.classList.remove("end-animation");
    }
    tip.hidden = false;
    tip.classList.add("start-animation");
}

function endTipAnimation() {
    if(tip.classList.contains("start-animation")) {
        tip.classList.remove("start-animation");
    }
    tip.classList.add("end-animation");
    setTimeout(() => {
        tip.hidden = true;
    }, 200);
}
