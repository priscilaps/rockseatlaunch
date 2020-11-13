const recipe = require('../models/recipe')
const File = require('../models/file')

const { date } = require('../../lib/utils')

module.exports = {
    index(req,res){
        let { filter, page, limit } = req.query
        page = page || 1
        limit = limit || 10
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipe){
                const pagination = {
                    total: Math.ceil( recipe[0].total / limit ),
                    limit: limit,
                    page
                }
                return res.render("admin/recipes/index", { items: recipe, pagination, filter })
            }
        }

        recipe.paginate(params)

    },
    create(req,res){

        recipe.chefs(function(options){
            return res.render("admin/recipes/create", { chefsOptions: options })
        })
    },
    async post(req,res){
        const keys = Object.keys(req.body)
        for (key of keys){

            req.body.ingredients = req.body.ingredients.toString() 
            req.body.preparation = req.body.preparation.toString() 

            if (req.body[key] == ""){
                
                return res.send("Por favor, preencha todos os campos.")
            }
                
        } 
        
        if (req.files.length == 0)
            return res.send('Por favor, envie pelo menos uma imagem.')


        let results = await recipe.create(req.body)
        const recipeID = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeID}))

        await Promise.all(filesPromise)
        console.log()
        return res.redirect(`/admin/recipe/${recipeID}`)
    },
    async show(req,res){
        
        const result = await recipe.find(req.params.id)
        const selectedRecipe = result.rows[0]

        if (!selectedRecipe) return res.send("recipe not found!")
        
        selectedRecipe.ingredients = selectedRecipe.ingredients.split(",")
        selectedRecipe.preparation = selectedRecipe.preparation.split(",")
        selectedRecipe.created_at = date(selectedRecipe.created_at).format

        const recipe_files = await File.findRecipeFile(selectedRecipe.id)
        const files = recipe_files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        console.log(files)
        return res.render("admin/recipes/show", { item: selectedRecipe, images: files })
        
    },
    edit(req,res){
        recipe.find(req.params.id, function(recipe) {
            if (!recipe) return res.send("recipe not found!")
            
            recipe.ingredients = recipe.ingredients.split(",")
            recipe.preparation = recipe.preparation.split(",")
            recipe.created_at = date(recipe.created_at).format

            const {chefs} = require('../models/recipe')
            chefs( function(options){
                return res.render("admin/recipes/edit", { recipe, chefsOptions: options })
            })
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        recipe.update(req.body, function(){
            return res.redirect(`/admin/recipe/${req.body.id}`)
        })
    },
    delete(req,res){
        recipe.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
        })
    },
    search(req,res){
        recipe.search(req.params.filter, function(){
            return res.render("site/search")
        })
    },
    siteIndex(req, res){
        recipe.popular(function(popularRecipes){
            return res.render("site/index", { items: popularRecipes })
        })   
    },
    list(req, res){
        let { filter, page, limit } = req.query
        
        page = page || 1
        limit = limit || 12
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipe){
                const pagination = {
                    total: Math.ceil( recipe[0].total / limit ),
                    limit: limit,
                    page
                }
                return res.render("site/recipes", { items: recipe, pagination, filter })
            }
        }
        
        recipe.paginate(params)
    },
    open(req, res) {
        recipe.find(req.params.id, function(recipe) {
            if (!recipe) return res.send(`recipe not found! ${req.params.id}`)
            
            recipe.ingredients = recipe.ingredients.split(",")
            recipe.preparation = recipe.preparation.split(",")

        return res.render("site/recipe",{ item: recipe })
        })
    }
}

