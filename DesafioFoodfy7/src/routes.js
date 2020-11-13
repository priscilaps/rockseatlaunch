const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const chefs = require('./app/controllers/chefs')
const recipes = require('./app/controllers/recipes')

/* ----- Rotas do site -----*/

routes.get("/", recipes.siteIndex)

routes.get("/site/about", function(req, res){
    return res.render("site/about")
})

routes.get("/site/recipes", recipes.list)
routes.get("/site/recipe/:id", recipes.open)
routes.get("/site/chefs", chefs.list)
routes.get("/site/chef/:id", chefs.open)

/* ----- ROUTES ADMIN ----- */

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get('/admin/chef/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)
routes.post("/admin/chefs", multer.array("photos", 5), chefs.post )
routes.put("/admin/chefs", multer.array("photos", 5), chefs.put )
routes.delete("/admin/chefs", chefs.delete )

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get('/admin/recipe/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post("/admin/recipes", multer.array("photos", 5), recipes.post )
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put )
routes.delete("/admin/recipes", recipes.delete )

module.exports = routes