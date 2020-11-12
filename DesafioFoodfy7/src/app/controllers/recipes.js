const recipe = require('../models/recipe')


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
    post(req,res){
        const keys = Object.keys(req.body)
        for (key of keys){

            req.body.ingredients = req.body.ingredients.toString() 
            req.body.preparation = req.body.preparation.toString() 

            if (req.body[key] == ""){
                
                return res.send("Por favor, preencha todos os campos.")
            }
                
        } 
        recipe.create(req.body, function(recipe){        // recipe = { id: 11 } por exemplo
            return res.redirect(`/admin/recipe/${recipe.id}`)
        })
    },
    show(req,res){
        recipe.find(req.params.id, function(recipe){
            if (!recipe) return res.send("recipe not found!")
            
            recipe.ingredients = recipe.ingredients.split(",")
            recipe.preparation = recipe.preparation.split(",")
            recipe.created_at = date(recipe.created_at).format

            return res.render("admin/recipes/show", { item: recipe })
        })
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

