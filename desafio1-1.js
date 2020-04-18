// ex 1 - cálculo de IMC

const pessoa = {
    nome: "Carlos",
    peso: 64,
    altura: 1.68
}

function calculoIMC(pessoa){
    const imc = (pessoa.peso / (pessoa.altura * pessoa.altura))
    
    if (imc >= 30){
        console.log(`${pessoa.nome} você está acima do peso`)
    } else {
        console.log(`${pessoa.nome} você não está acima do peso`)
    }
    console.log(imc)
}

calculoIMC(pessoa)

// ex 2 - cálculo de aposentadoria

const pessoa2 = {
    nome: "Silvana",
    sexo: "F",
    idade: 53,
    contribuicao: 31
}
const valor = pessoa2.idade + pessoa2.contribuicao;

function calculaAposentadoria(pessoa2){
    if ( pessoa2.sexo === "F" && pessoa2.contribuicao >= 30 ){
            if ( valor >= 85){
                return exibeRsultado(true, valor)
            }else { 
                return exibeRsultado(false, `Valor base: ${valor} - Idade muito baixa ${pessoa2.idade}`)
            }
        } else{
        if( pessoa2.sexo === "M" && pessoa2.contribuicao >= 35){
            if (valor >= 95){
                return exibeRsultado(true, valor)
            }else { 
                return exibeRsultado(false, `Valor base: ${valor} - Idade muito baixa ${pessoa2.idade}`)
            }
        } else{
            return exibeRsultado(false, `Valor base: ${valor} - Contribuição muito baixa ${pessoa2.contribuicao}`)
        }
    }
}

function exibeRsultado(resultado, valor){
    if (resultado){
        return console.log(`${pessoa2.nome}, você pode se aposentar! Valor base: ${valor}`)
    }else{
       return console.log(`${pessoa2.nome}, você ainda não pode se aposentar! ${valor}`)
    }
}


calculaAposentadoria(pessoa2)