const db = require("../../config/db")

const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers`, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                name,
                avatar_url,
                dob,
                education_lvl,
                type_of_class,
                subjects,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.dob).iso,
            data.education_lvl,
            data.type_of_class,
            data.subjects,
            date(Date.now()).iso
        ]
        console.log(values)
        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows[0] )
        })
    },
    find(id, callback){
        db.query(`
        SELECT *
        FROM teachers
        WHERE id= $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows[0] )
        })
    },
    update(data, callback){
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),
                dob=($3),
                education_lvl=($4),
                type_of_class=($5),
                subjects=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.dob).iso,
            data.education_lvl,
            data.type_of_class,
            data.subjects,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM teachers WHERE id= $1`, [parseInt(id)], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}