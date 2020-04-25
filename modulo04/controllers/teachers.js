const fs = require('fs')
const data = require('../data.json')
const { age } = require('../utils')
const { date } = require('../utils')
const { graduation } = require('../utils')
const { subjects } = require('../utils')

exports.index = function(req,res){
    let i = 0
    let teacherShow = []
    for (teacher of data.teachers){
    
        teacherShow[i] = {

            ...teacher,
            subjects: teacher.subjects.split(",")
        }
        i++      
    }
    return res.render("teachers/index", { teachers: teacherShow } )
}


// show
exports.show = function(req,res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Professor não encontrado.")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.dob),
        educationLvl: graduation(foundTeacher.educationLvl),
        subjects: foundTeacher.subjects.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher })
}

//edit
exports.edit = function(req,res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Professor não encontrado.")

    const teacher = {
        ...foundTeacher,
        dob: date(foundTeacher.dob).iso
    }
    
    return res.render('teachers/edit', { teacher: teacher })
}

//create
exports.create =function(req, res){
    return res.render("teachers/create")
}
// post
exports.post = function(req,res){
    
    const keys = Object.keys(req.body)
    
    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos.")
        }
            
    }

    let {avatar_url, dob, name, subjects, typeOfClass} = req.body

    dob = Date.parse(req.body.dob)
    let created_at = Date.now()
    let id = Number(data.teachers.length + 1)

        data.teachers.push({
            id,
            name,
            avatar_url,
            dob,
            typeOfClass,
            subjects,
            created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/teachers")
    })   

    //return res.send(req.body)
}

//put // update 
exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if ( teacher.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Professor não encontrado.")

    const teacher = {
        ...foundTeacher,
        ...req.body, 
        dob: Date.parse(req.body.dob),
        id: Number(req.body.id)
    }
    
    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/teachers/${id}`)
    })   
}

//delete
exports.delete = function(req,res){
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })
    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/teachers`)
    })  
}