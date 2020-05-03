const db = require("../../config/db")

const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO recipes (
                name,
                avatar_url,
                dob,
                email,
                school_grade,
                weekly_workload,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.dob).iso,
            data.email,
            data.school_grade,
            parseInt(data.weekly_workload),
            data.teacher
        ]
        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows[0] )
        })
    },
    find(id, callback){
        db.query(`
        SELECT recipes.*, teachers.name AS teacher_name
        FROM recipes
        LEFT JOIN teachers ON (recipes.teacher_id = teachers.id)
        WHERE recipes.id= $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows[0] )
        })
    },
    update(data, callback){
        const query = `
            UPDATE recipes SET
                avatar_url=($1),
                name=($2),
                dob=($3),
                email=($4),
                school_grade=($5),
                weekly_workload=($6),
                teacher_id=($7)
            WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.dob).iso,
            data.email,
            data.school_grade,
            parseInt(data.weekly_workload),
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id= $1`, [parseInt(id)], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    teachers( callback ) {
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
                ) AS total`

        if ( filter ){
            filterQuery = `${query}
                WHERE recipes.name ILIKE '%${filter}%'
                OR recipes.email ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
                ) AS total`
        }

        query = `
            SELECT recipes.*, ${totalQuery}
            FROM recipes
            ${filterQuery}
            LIMIT $1 OFFSET $2
            `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })

    }
}