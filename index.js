const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conection = require("./database/database");
const loginModel = require("./database/Login.js");
const userBd = [];

conection
    .authenticate()
    .then(() => {
        console.log("authenticated");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Quando o formulario der o POST
app.post("/usuario", (req, res) => {
    const { email, senha, confirmar } = req.body;
    loginModel
        .create({
            email: email,
            senha: senha,
            confirmar: confirmar,
        })
        .then(() => {
            res.redirect("/");
        });
});

//Definindo a view engine para ser usado no node
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.get("/", (req, res) => {
    loginModel.findAll({ raw: true }).then((l) => {
        console.log(l);
    });
    res.render("home");
});
app.post("/entrar", (req, res) => {
    const { inputEmail, inputPassword } = req.body;

    loginModel
        .findAll({ raw: true })
        .then((l) => {
            l.forEach((element) => {
                if (element.email === req.body.inputEmail && element.password === req.body.inputPassword) {
                    res.redirect("/");
                } else {
                    res.redirect("/errorUserLogin");
                }
                userBd.push(element);
            });
        })
        .then((l) => {
            console.log("Entrou");
        });
});

//Criação da rota
app.get("/errorUserLogin", (req, res) => {
    // O arquivo deve estar dentro da pasta views, para o express reconhecelo
    res.render("errorUserLogin");
});

app.listen(3000, () => {
    console.log("Servidor onlini!!");
});
