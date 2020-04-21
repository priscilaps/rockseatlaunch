const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const bdRecipes = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    let i = 0; 
    let popularRecipes = []
    while ( i < 6 ) {
        popularRecipes[i] = bdRecipes[i]
        i++
    }
    return res.render("index", { items: popularRecipes })
})

server.get("/sobre", function(req, res){
    return res.render("sobre")
})

server.get("/receitas", function(req, res){
    return res.render("receitas", { items: bdRecipes })
})

server.get("/receita/:index", function (req, res) {
    const recipes = bdRecipes; // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;
    return res.render("receita",{ item: recipes[recipeIndex] })
})

server.listen(5000, function(){
    console.log("server is running")
})

