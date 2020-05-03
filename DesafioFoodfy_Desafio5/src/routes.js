const express = require('express')
const routes = express.Router()
const chefs = require('./app/controllers/chefs')
const recipes = require('./app/controllers/recipes')


routes.get("/", function(req, res){
    return res.redirect("/chefs")
})

routes.get("/chefs", chefs.index)
routes.get("/chefs/create", chefs.create)
routes.get('/chefs/:id', chefs.show)
routes.get('/chefs/:id/edit', chefs.edit)
routes.post("/chefs", chefs.post )
routes.put("/chefs", chefs.put )
routes.delete("/chefs", chefs.delete )




routes.get("/recipes", recipes.index)
routes.get("/recipes/create", recipes.create)
routes.get('/recipes/:id', recipes.show)
routes.get('/recipes/:id/edit', recipes.edit)
routes.post("/recipes", recipes.post )
routes.put("/recipes", recipes.put )
routes.delete("/recipes", recipes.delete )

module.exports = routes


/*


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


*/