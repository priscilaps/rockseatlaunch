const empresa = {
    nome: "Rocketseat",
    cor: "roxo",
    foco: "Programação",
    endereco: {
        rua: "Rua Guilherme Gembala",
        numero: 260
    }
}
console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`);

// vetores e objetos

const programador = {
    nome: "Priscila",
    idade: 33,
    tecnologias: [
        {
            nome: "html",
            especialidade: "web"
        },
        {
            nome: "css",
            especialidade: "web"
        }
    ]
}

console.log(`O ussuário ${programador.nome} tem ${programador.idade} e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)