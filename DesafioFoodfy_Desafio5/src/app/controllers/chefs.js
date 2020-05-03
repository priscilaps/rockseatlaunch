const chef = require('../models/chef')

const { age, date, separateSubjects, graduation } = require('../../lib/utils')

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
            callback(chefs){
                const pagination = {
                    total: Math.ceil( chefs[0].total / limit ),
                    page
                }
                return res.render("chefs/index", { chefs: separateSubjects(chefs), pagination, filter })
            }
        }

        chef.paginate(params)

    },
    create(req,res){
        return res.render("chefs/create")
    },
    post(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        chef.create(req.body, function(chef){
            return res.redirect(`/chefs/${chef.id}`)
        })
    },
    show(req,res){
        chef.find(req.params.id, function(chef){
            if (!chef) return res.send("chef not found!")

            chef.age = age(chef.dob)
            chef.education_lvl = graduation(chef.education_lvl)
            chef.subjects = chef.subjects.split(",")
            chef.created_at = date(chef.created_at).format

            return res.render("chefs/show", { chef })
        })
    },
    edit(req,res){
        chef.find(req.params.id, function(chef){
            if (!chef) return res.send("chef not found!")

            chef.dob = date(chef.dob).iso
            chef.education_lvl = graduation(chef.education_lvl)
            chef.subjects = chef.subjects.split(",")
            chef.created_at = date(chef.created_at).format

            return res.render("chefs/edit", { chef })
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        chef.update(req.body, function(){
            return res.redirect(`/chefs/${req.body.id}`)
        })
    },
    delete(req,res){
        chef.delete(req.body.id, function(){
            return res.redirect(`/chefs`)
        })
    }
}
