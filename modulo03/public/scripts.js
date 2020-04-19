const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
        let cardId = card.getAttribute("id")
        let cardTitle = card.querySelector("h1").textContent
        modalOverlay.classList.add('active')
        modalOverlay.querySelector(".title-modal").textContent = `Mais informações sobre o curso ${cardTitle}`
        modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${cardId}`

    })
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector("iframe").src = ""
})
document.querySelector(".maximize-modal").addEventListener("click", function(){
    if (document.querySelector(".modal").classList.contains("maximize")){
        document.querySelector(".modal").classList.remove("maximize")
        document.querySelector("i#maximize").textContent = "fullscreen"
    }else{
        document.querySelector(".modal").classList.add("maximize")
        document.querySelector("i#maximize").textContent = "fullscreen_exit"
    }
    
})


