const fs = require('fs')
const data = require("../data.json")

exports.admIndex = function(req, res){
    return res.render("admin/recipes/index", { items: data.recipes })
}
exports.show = function(req, res){
    
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita não encontrada.")

    const recipe = {
        ...foundRecipe
    }
    return res.render("admin/recipes/show", { item: recipe })
}
exports.create = function(req, res){
    return res.render("admin/recipes/create")
}
exports.post = function(req, res){
    const keys = Object.keys(req.body)
    
    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos.")
        }
            
    }

    let {image, title, author, ingredients, preparation, information} = req.body

    let id = Number(data.recipes.length)

        data.recipes.push({
            id,
            image,
            title,
            author,
            ingredients,
            preparation,
            information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/admin/recipes")
    })
}
exports.edit = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita não encontrada.")

    const recipe = {
        ...foundRecipe,
    }
    return res.render('admin/recipes/edit', { recipe: recipe })
}
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if ( recipe.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Receita não encontrada.")

    const recipe = {
        ...foundRecipe,
        ...req.body, 
        id: Number(req.body.id)
    }
    
    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/admin/recipes/${id}`)
    }) 
}
exports.delete = function(req, res){
    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })
    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/admin/recipes`)
    })  
}

exports.index = function(req, res){
    let i = 0; 
    let popularRecipes = []
    for ( recipe of data.recipes ) {
        popularRecipes[i] = {
            ...recipe
        }
        i++  
        if (i==6){
            return res.render("index", { items: popularRecipes })
        }      
    }
}
exports.list = function(req, res){
    return res.render("receitas", { items: data.recipes })
}
exports.open = function (req, res) {
    const recipes = data.recipes; // Array de receitas carregadas do data.json
    const recipeIndex = req.params.index;
    return res.render("receita",{ item: recipes[recipeIndex] })
}