const recipes = document.querySelectorAll('.recipe')

for (const recipe of recipes) {
    recipe.addEventListener("click", function(){
        let recipeId = recipe.getAttribute("id")
        window.location.href = `/receita/${recipeId}`
    })
}

const meleca = document.querySelectorAll(".button")
console.log(meleca)
  
for (let button of meleca) {
    button.addEventListener("click", function(){
                
        if ( button.classList.contains("show") ) {

            console.log("tenho a classe SHOW")
            button.classList.add('hide')
            button.classList.remove("show")
            button.textContent.replace("mostrar")

        }else if (button.classList.contains("hide")){

            console.log("tenho a classe HIDE")
            button.classList.add("show")
            button.classList.remove("hide")
            button.textContent.replace("esconder")
        }

    console.log("BUGUEI")   
    })
}
