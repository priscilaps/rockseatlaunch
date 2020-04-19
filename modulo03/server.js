const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cursos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/62256293?s=400&u=ba02a432034663573e9ceaee2b435e90756a6523&v=4",
        name: "Priscila Pereira Sampaio",
        role: "Web and graphic designer, photographer, and craftswoman.",
        tecnologias: ["HTML","CSS"],
        links: [
            { name: "Facebook", url: "https://www.facebook.com/pritchps" },
            { name: "Instagram", url: "https://www.instagram.com/pritchps" },
            { name: "Site", url: "https://www.priscilasampaio.com.br" }
        ]
    }
    return res.render("sobre", { about })
})

server.get("/conteudos", function(req, res){
    return res.render("conteudos",{ items: cursos })
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function(){
    console.log("server is running")
})