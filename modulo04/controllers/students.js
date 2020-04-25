const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')
const { grade } = require('../utils')

exports.index = function(req,res){
    let i = 0
    let studentShow = []
    for (student of data.students){
    
        studentShow[i] = {

            ...student,
            schoolGrade: grade(student.schoolGrade)
        }
        i++      
    }
    return res.render("students/index", { students: studentShow } )
}
// show
exports.show = function(req,res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Instrutor não encontrado.")

    const student = {
        ...foundStudent,
        dob: date(foundStudent.dob).bDay,
        schoolGrade: grade(foundStudent.schoolGrade)
    }

    return res.render("students/show", { student })
}
//create
exports.create = function(req, res){
    return res.render("students/create")
}
// post -> salvar dados
exports.post = function(req,res){
    
    const keys = Object.keys(req.body)
    
    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos.")
        }
            
    }

    dob = Date.parse(req.body.dob)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent){
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        dob
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/students")
    })   

    //return res.send(req.body)
}
//edit
exports.edit = function(req,res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Instrutor não encontrado.")

    const student = {
        ...foundStudent,
        dob: date(foundStudent.dob).iso
    }
    
    return res.render('students/edit', { student: student })
}
//put // update 
exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if ( student.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Instrutor não encontrado.")

    const student = {
        ...foundStudent,
        ...req.body, 
        dob: Date.parse(req.body.dob),
        id: Number(req.body.id)
    }
    
    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/students/${id}`)
    })   
}
//delete
exports.delete = function(req,res){
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })
    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/students`)
    })  
}