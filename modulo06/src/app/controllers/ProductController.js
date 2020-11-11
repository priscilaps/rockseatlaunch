const { formatPrice } = require('../../lib/utils')


const Category = require('../models/category')
const Product = require('../models/product')
const File = require('../models/file')

module.exports = {
    create(req, res){

        //pegar categorias
        Category.all()
        .then(function(results){

            const categories = results.rows

            return res.render("products/create.njk", { categories })
        }).catch(function(err){
            throw new Error(err)
        })

    },
    async post(req, res){
        // lógica de salvar

        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }
        
        if (req.files.length == 0)
            return res.send('Por favor, envie pelo menos uma imagem.')


        let results = await Product.create(req.body)
        const productID = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, product_id: productID}))
        await Promise.all(filesPromise)

        return res.redirect(`/products/${productID}/edit`)
    },
    async edit(req, res){
        
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        }

        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if (!product) return res.send("Produto não encontrado!")

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        //get categories
        results = await Category.all()
        const categories = results.rows

        //get images
        results = await Product.files(Product.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("products/edit.njk", { product, categories, files })
    },
    async put(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Por favor, preencha todos os campos.")
            }
                
        } 

        req.body.price = req.body.price.replace(/\D/g, "")
        
        if (req.body.old_price != req.body.price){
            const oldProduct = await Product.find(req.body.id)
            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)
    },
    async delete(req, res){
        await Product.delete(req.body.id)

        return res.redirect('/products/create')
    }
}