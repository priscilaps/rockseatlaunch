const recipe = require('../models/recipe')


const { date, grade, adjustGrade } = require('../../lib/utils')

module.exports = {
    index(req,res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                const pagination = {
                    total: Math.ceil( recipes[0].total / limit ),
                    page
                }
                return res.render("recipes/index", { recipes: adjustGrade(recipes, {grade} ), pagination, filter })
            }
        }

        recipe.paginate(params)

    },
    create(req,res){
        recipe.teachers(function(options){
            return res.render("recipes/create", { teacherOptions: options })
        })
    },
    post(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        recipe.create(req.body, function(recipe){
            return res.redirect(`/recipes/${recipe.id}`)
        })
    },
    show(req,res){
        recipe.find(req.params.id, function(recipe){
            if (!recipe) return res.send("recipe not found!")

            recipe.dob = date(recipe.dob).bDay
            recipe.school_grade = grade(recipe.school_grade)

            return res.render("recipes/show", { recipe })
        })
    },
    edit(req,res){
        recipe.find(req.params.id, function(recipe) {
            if (!recipe) return res.send("recipe not found!")

            recipe.dob = date(recipe.dob).iso
            recipe.school_grade = grade(recipe.school_grade)
            
            const {teachers} = require('../models/recipe')
            teachers( function(options){
                return res.render("recipes/edit", { recipe, teacherOptions: options })
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
            return res.redirect(`/recipes/${req.body.id}`)
        })
    },
    delete(req,res){
        recipe.delete(req.body.id, function(){
            return res.redirect(`/recipes`)
        })
    }
}

