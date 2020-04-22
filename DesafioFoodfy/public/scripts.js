const recipes = document.querySelectorAll('.recipe')

for (const recipe of recipes) {
    recipe.addEventListener("click", function(){
        let recipeId = recipe.getAttribute("id")
        window.location.href = `/receita/${recipeId}`
    })
}

const wrappers = document.querySelectorAll(".wrapper")  //pega os wrappers de ingredientes, modo de preparo e informações adicionais
for (wrapper of wrappers){
    const buttonState = wrapper.querySelector(".button")
    const contentDisplay = wrapper.querySelector(".button-content")

    console.log(buttonState)
    console.log(contentDisplay)

    buttonState.addEventListener('click', function(){
    console.log(contentDisplay.classList.contains("show"))
    console.log(buttonState.textContent)

    const classes = contentDisplay.classList
    
        if ( classes.contains("show") ) {

            console.log(`tenho a classe SHOW -> minhas classes: ${{classes}}`)
            contentDisplay.classList.add('hide')
            contentDisplay.classList.remove("show")
            buttonState.textContent = "mostrar" 
            console.log(buttonState.textContent)
            console.log(classes)
    
        }else if (classes.contains("hide")){
    
            console.log(`tenho a classe HIDE -> minhas classes:${{classes}}`)
            
            contentDisplay.classList.add("show")
            contentDisplay.classList.remove("hide")
            buttonState.textContent = "esconder"
        }
    
        
    })
}