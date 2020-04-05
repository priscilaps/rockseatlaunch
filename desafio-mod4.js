var checaIdade = function(idade){
    return new Promise(function(resolve, reject){
        if (idade >= 18){
            resolve();
        }else{
            reject();
        }
    });
}

checaIdade(15)
  .then(function(response) { 
        console.log("Maior que 18");
    })
  .catch(function(error) {
        console.log("Menor que 18");
    });
    
//ex2
var busca = function(valor){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', valor);
        xhr.send(null);
        
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }
            }else{
                reject('Erro na requisição!');
            }
        }
    });
}


var user;
var nInput1 = document.createElement('input');
nInput1.setAttribute('type','text');
nInput1.setAttribute('name','user');

var nButton1 = document.createElement('button');
nButton1.onclick = function verifica(){
    var exibe = busca('https://api.github.com/users/' + nInput1.value + '/repos');
    
    busca(exibe)
        .then(function(response) { 
            console.log(response);
            console.log(exibe);
        })
        .catch(function(error) {
            console.log(error);
            console.log(exibe);
        });
}

var elementContainer = document.querySelector('#main');
elementContainer.appendChild(nInput1);
elementContainer.appendChild(nButton1);
nButton1.textContent = 'Adicionar';

