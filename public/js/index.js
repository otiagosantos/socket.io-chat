var socket = io();

let messages = document.querySelector("#messages");
let form = document.querySelector("#form");
let input = document.querySelector("#input");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value) {
        socket.emit("chat message", input.value);
        input.value = '';
    }
});

socket.on("chat message", (msg) => {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});