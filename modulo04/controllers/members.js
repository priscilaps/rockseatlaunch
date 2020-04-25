const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.index = function(req,res){
        return res.render("members/index", { members: data.members } )
}
// show
exports.show = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Instrutor não encontrado.")

    const member = {
        ...foundMember,
        dob: date(foundMember.dob).bDay
    }

    return res.render("members/show", { member })
}
//create
exports.create = function(req, res){
    return res.render("members/create")
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
    const lastMember = data.members[data.members.length - 1]

    if (lastMember){
        id = lastMember.id + 1
    }

    data.members.push({
        id,
        ...req.body,
        dob
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/members")
    })   

    //return res.send(req.body)
}
//edit
exports.edit = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Instrutor não encontrado.")

    const member = {
        ...foundMember,
        dob: date(foundMember.dob).iso
    }
    
    return res.render('members/edit', { member: member })
}
//put // update 
exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if ( member.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Instrutor não encontrado.")

    const member = {
        ...foundMember,
        ...req.body, 
        dob: Date.parse(req.body.dob),
        id: Number(req.body.id)
    }
    
    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/members/${id}`)
    })   
}
//delete
exports.delete = function(req,res){
    const {id} = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })
    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/members`)
    })  
}