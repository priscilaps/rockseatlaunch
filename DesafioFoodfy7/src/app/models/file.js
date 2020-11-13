const db = require("../../config/db")
const fs = require('fs')

module.exports = {
    async create({filename, path, recipe_id}) {
        const query = `
            INSERT INTO files(
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            filename,
            path
        ]

        const file_id = await db.query(query, values)
        
        return db.query( `
            INSERT INTO recipe_files(
                recipe_id,
                file_id
            ) VALUES ($1, $2)
            RETURNING id
            `, [ recipe_id, file_id.rows[0].id])
    },
    async delete(id) {

        try{

            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)

        }catch(err){
            console.error(err)
        }

        

        return db.query(`
            DELETE FROM files WHERE id = $1
        `, [id]) 
    },
    async findRecipeFile(id){
        try{

            const result = await db.query(`
                SELECT * 
                FROM files
                LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                WHERE recipe_files.recipe_id = $1
                `, [id])
            const files = result.rows

            return files

        }catch(err){
            console.error(`Não consegui encontrar recipe file: ${err}`)
        }
    }
}