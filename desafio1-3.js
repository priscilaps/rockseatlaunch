const usuarios = [
    { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
    { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
    { nome: "Tuane", tecnologias: ["HTML", "Node.js"] },
    { nome: "Priscila", tecnologias: ["html","CSS"]}
  ];

function exibe(usuarios){
    for (let user of usuarios){
        const tech1 = exibeTechnologias(user.tecnologias)
        console.log(`${user.nome} trabalha com ${tech1}`)
    }
}
function exibeTechnologias(tecnologia){
    let tecnologias = ''
    let contador = 0 

    for (let i of tecnologia){

        if ( contador != 0){
            tecnologias = tecnologias +  ', '
        }

        tecnologias += i 
        contador++      
    }

    return tecnologias
}

exibe(usuarios)


// busca por tecnologia

function checaSeUsuarioUsaCSS(usuario) {
    // Percorra o array de tecnologias do usuário até encontrar se ele trabalha com CSS
    // SE encontrar, retorne true da função, caso contrário retorne false

    for (let i of usuario){
        if ( i === "CSS"){
            return true
        }      
    }
    return false
  }
  
for (let i = 0; i < usuarios.length; i++) {
    const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i].tecnologias);

    if (usuarioTrabalhaComCSS) {
        console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
    }
}


//Soma de despesas e receitas

const users = [
    {
      nome: "Salvio",
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },
    {
      nome: "Marcio",
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },
    {
      nome: "Lucia",
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
];


function calculaSaldo(receitas, despesas) {
    return saldo = (somaNumeros(receitas) - somaNumeros(despesas))
}

function somaNumeros(numeros) {
  // Soma todos números dentro do array "numeros"
  let soma = 0
  for(i of numeros){
      soma += i
  }
  return soma
}

for (user of users){
    let status = ''
    const saldo = calculaSaldo(user.receitas, user.despesas).toFixed(2)
    if ( saldo > 0 ){
        status = 'positivo'
    }else{
        status = 'negativo'
    }

    console.log(`${user.nome} possui saldo ${status} de ${saldo}`)
}