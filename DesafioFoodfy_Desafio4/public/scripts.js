const recipes = document.querySelectorAll('.recipe')

for (const recipe of recipes) {
    recipe.addEventListener("click", function(){
        let recipeId = recipe.getAttribute("id")
        window.location.href = `/receita/${recipeId}`
    })
}

const wrappers = document.querySelectorAll(".wrapper")  //pega os wrappers de ingredientes, modo de preparo e informações adicionais
for (wrapper of wrappers){                                              //pra cada wrapper (cada um só tem .button e um .button-content)
    const buttonState = wrapper.querySelector(".button")                //pega o elemento do botao mostrar/esconder
    const contentDisplay = wrapper.querySelector(".button-content")     //pega a div que o botao vai esconder/mostrar

    buttonState.addEventListener('click', function(){

    const classes = contentDisplay.classList
    
        if ( classes.contains("show") ) {

            contentDisplay.classList.add("hide")
            contentDisplay.classList.remove("show")
            buttonState.textContent = "mostrar" 
    
        }else if (classes.contains("hide")){

            contentDisplay.classList.add("show")
            contentDisplay.classList.remove("hide")
            buttonState.textContent = "esconder"

        }
    
        
    })
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients")
  const fieldContainer = document.querySelectorAll(".ingredient")

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false

  // Deixa o valor do input vazio
  newField.children[0].value = ""
  ingredients.appendChild(newField)
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient)

function addPreparation() {
  const preparation = document.querySelector("#preparations")
  const fieldContainer = document.querySelectorAll(".preparation")

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false

  // Deixa o valor do input vazio
  newField.children[0].value = ""
  preparation.appendChild(newField)
}

document.querySelector(".add-preparation-step").addEventListener("click", addPreparation)

const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener("submit", function(){
    const confirmation = confirm("Tem certeza que deseja deletar?")
    if (!confirmation){
        event.preventDefault()
    }
})