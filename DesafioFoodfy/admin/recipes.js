const fs = require('fs')
const bdRecipes = require("./data")



exports.index = function(req, res){

}
exports.show = function(req, res){

}
exports.create = function(req, res){

}
exports.edit = function(req, res){

}
exports.post = function(req, res){

}
exports.put = function(req, res){

}
exports.delete = function(req, res){

}

exports.index = function(req, res){
    let i = 0; 
    let popularRecipes = []
    while ( i < 6 ) {
        popularRecipes[i] = bdRecipes[i]
        i++
    }
    return res.render("index", { items: popularRecipes })
}
exports.list = function(req, res){
    return res.render("receitas", { items: bdRecipes })
}
exports.open = function (req, res) {
    const recipes = bdRecipes; // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;
    return res.render("receita",{ item: recipes[recipeIndex] })
}