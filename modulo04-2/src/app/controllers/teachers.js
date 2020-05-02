const teacher = require('../models/teacher')

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
            callback(teachers){
                const pagination = {
                    total: Math.ceil( teachers[0].total / limit ),
                    page
                }
                return res.render("teachers/index", { teachers: separateSubjects(teachers), pagination, filter })
            }
        }

        teacher.paginate(params)

    },
    create(req,res){
        return res.render("teachers/create")
    },
    post(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req,res){
        teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Teacher not found!")

            teacher.age = age(teacher.dob)
            teacher.education_lvl = graduation(teacher.education_lvl)
            teacher.subjects = teacher.subjects.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        })
    },
    edit(req,res){
        teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Teacher not found!")

            teacher.dob = date(teacher.dob).iso
            teacher.education_lvl = graduation(teacher.education_lvl)
            teacher.subjects = teacher.subjects.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/edit", { teacher })
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req,res){
        teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    }
}
