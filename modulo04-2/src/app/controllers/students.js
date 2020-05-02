const student = require('../models/student')


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
            callback(students){
                const pagination = {
                    total: Math.ceil( students[0].total / limit ),
                    page
                }
                return res.render("students/index", { students: adjustGrade(students, {grade} ), pagination, filter })
            }
        }

        student.paginate(params)

    },
    create(req,res){
        student.teachers(function(options){
            return res.render("students/create", { teacherOptions: options })
        })
    },
    post(req,res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req,res){
        student.find(req.params.id, function(student){
            if (!student) return res.send("Student not found!")

            student.dob = date(student.dob).bDay
            student.school_grade = grade(student.school_grade)

            return res.render("students/show", { student })
        })
    },
    edit(req,res){
        student.find(req.params.id, function(student) {
            if (!student) return res.send("Student not found!")

            student.dob = date(student.dob).iso
            student.school_grade = grade(student.school_grade)
            
            const {teachers} = require('../models/student')
            teachers( function(options){
                return res.render("students/edit", { student, teacherOptions: options })
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

        student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req,res){
        student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    }
}

