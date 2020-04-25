const fs = require('fs')
const data = require('../data.json')
const { age } = require('../utils')
const { date } = require('../utils')

exports.index = function(req,res){
        return res.render("instructors/index", { instructors: data.instructors } )
}


// show
exports.show = function(req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado.")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.dob),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}

//edit
exports.edit = function(req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado.")

    const instructor = {
        ...foundInstructor,
        dob: date(foundInstructor.dob).iso
    }
    
    return res.render('instructors/edit', { instructor: instructor })
}

//create
exports.create =function(req, res){
    return res.render("instructors/create")
}
// post
exports.post = function(req,res){
    
    const keys = Object.keys(req.body)
    
    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos.")
        }
            
    }

    let {avatar_url, dob, name, services, gender} = req.body

    dob = Date.parse(req.body.dob)
    let created_at = Date.now()
    let id = Number(data.instructors.length + 1)

        data.instructors.push({
            id,
            name,
            avatar_url,
            dob,
            gender,
            services,
            created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })   

    //return res.send(req.body)
}

//put // update 
exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if ( instructor.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado.")

    const instructor = {
        ...foundInstructor,
        ...req.body, 
        dob: Date.parse(req.body.dob),
        id: Number(req.body.id)
    }
    
    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/instructors/${id}`)
    })   
}

//delete
exports.delete = function(req,res){
    const {id} = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })
    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/instructors`)
    })  
}