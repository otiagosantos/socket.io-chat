const { Router } = require("express");

const router = Router();

const viewPath = (file) => {
    return `${__dirname}/src/view/${file}`;
}

// router.get('/', (req, res) => {
//     res.sendFile(viewPath('index.html'));
// })

router.get("/", (req, res) => {
    res.sendFile(viewPath('chat.html'));
});


module.exports = { router }