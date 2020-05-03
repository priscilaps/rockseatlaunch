const db = require("../../config/db")

const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`
            SELECT chefs.*, count(students) AS total_students
            FROM chefs
            LEFT JOIN students ON (chefs.id = students.chef_id)
            GROUP BY chefs.id
            ORDER BY total_students DESC
            `, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
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
        FROM chefs
        WHERE id= $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows[0] )
        })
    },
    findBy(filter, callback){
        db.query(`
            SELECT chefs.*, count(students) AS total_students
            FROM chefs
            LEFT JOIN students ON (chefs.id = students.chef_id)
            WHERE chefs.name ILIKE '%${filter}%'
            OR chefs.subjects ILIKE '%${filter}%'
            GROUP BY chefs.id
            ORDER BY total_students DESC
            `, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })
    },
    update(data, callback){
        const query = `
            UPDATE chefs SET
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
        db.query(`DELETE FROM chefs WHERE id= $1`, [parseInt(id)], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM chefs
                ) AS total`

        if ( filter ){
            filterQuery = `${query}
                WHERE chefs.name ILIKE '%${filter}%'
                OR chefs.subjects ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM chefs
                ${filterQuery}
                ) AS total`
        }

        query = `
            SELECT chefs.*, ${totalQuery}, count(students) AS total_students
            FROM chefs
            LEFT JOIN students ON (chefs.id = students.chef_id)
            ${filterQuery}
            GROUP BY chefs.id LIMIT $1 OFFSET $2
            `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback( results.rows )
        })

    }
}