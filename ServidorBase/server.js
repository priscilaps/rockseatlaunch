const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cursos = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    return res.render("index")
})

server.get("/sobre", function(req, res){
    return res.render("sobre")
})

server.get("/receitas", function(req, res){
    return res.render("receitas")
})

server.listen(5000, function(){
    console.log("server is running")
})

