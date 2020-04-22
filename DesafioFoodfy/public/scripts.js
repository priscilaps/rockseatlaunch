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