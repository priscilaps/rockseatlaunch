const recipes = require('./admin/recipes')

/* ----- Rotas do admin -----*/

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita


/* ----- Rotas das views -----*/

server.get("/", recipes.index)

server.get("/sobre", function(req, res){
    return res.render("sobre")
})

server.get("/receitas", recipes.list)

server.get("/receita/:index", recipes.open)

module.exports = routes