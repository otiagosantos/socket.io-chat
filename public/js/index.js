const server = io();

let form = document.querySelector("#form");
let input = document.querySelector("#input");
let rooms = document.querySelector("#rooms");
let loggedAs = document.querySelector("#logged-as");
let nicknamePlaces = document.querySelectorAll(".nickname-here");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value) {
        server.emit("new nickname", input.value);
    }
});

function fillNicknamePlaces(nickname) {
    Object.keys(nicknamePlaces).map((key) => {
        nicknamePlaces[key].innerHTML = nickname;
    });
}

function handleNewNickname () {
    rooms.hidden = false;
    loggedAs.hidden = false;
    fillNicknamePlaces(input.value);
}

server.on("new nickname", (nickname) => {
    handleNewNickname(nickname);
})