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
                }else{
                if(xhr.status === 404){
                    reject('O usuário não existe!');
                } else {
                    reject('Erro na requisição!');
                    console.log(xhr.responseText);
                }
            }
            }
        }
    });
}


var user;
var nInput1 = document.createElement('input');
nInput1.setAttribute('type','text');
nInput1.setAttribute('name','user');

var nButton1 = document.createElement('button');
var newUl = document.createElement('ul');

nButton1.onclick = function verifica(){
    
    var inicialLi = document.createElement('li');

    newUl.innerHTML = '';
    inicialLi.innerText = 'Carregando...';
    newUl.appendChild(inicialLi);
    elementContainer.appendChild(newUl);

    var guardaUrl = 'https://api.github.com/users/' + nInput1.value + '/repos';
    console.log(guardaUrl);

    busca(guardaUrl);
    
    busca(guardaUrl)
        .then(function(response) { 
            console.log(response);
            
            newUl.innerHTML = '';

            for (let value of response){
                var newLi = document.createElement('li');
                newLi.innerText = value.name;
                console.log(newLi);
                newUl.appendChild(newLi);
            }
            elementContainer.appendChild(newUl);
        })
        .catch(function(error) {
            console.log(error);
            alert(error);
        });
}

var elementContainer = document.querySelector('#main');
elementContainer.appendChild(nInput1);
elementContainer.appendChild(nButton1);
nButton1.textContent = 'Adicionar';

