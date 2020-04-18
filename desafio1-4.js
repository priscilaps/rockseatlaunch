const user = {
    name: "Mariana",
    transactions: [],
    balance: 0
  };
const transactions = [
    {
        type: 'credit',
        value: 50
    },
    {
        type: 'credit',
        value: 120
    },
    {
        type: 'debit',
        value: 80
    },
    {
        type: 'debit',
        value: 30
    }
]
let balance = 0

function createTransaction(transactions){
     

    if (transactions.type === "credit"){
        balance += transactions.value
    }else if (transactions.type === "debit"){
        balance -= transactions.value
    }else{
        return console.log('Transação inexistente.')
    }
    return balance
}

for (transaction of transactions){
    console.log(createTransaction(transaction))
}

function getHigherTransactionByType(type){
    let higher = 0
    for (transaction of transactions){
        if (type === transaction.type){
            if (transaction.value > higher){
                //console.log(`Valor do ${transaction.type}o atual: ${transaction.value}`)
                higher = transaction.value
            }
        }
    }
    console.log(`O maior valor do ${type}o é: ${higher}`)

}
function getAverageTransactionValue(){
    let sum = 0
    for (transaction of transactions){
        sum += transaction.value
    }
    return sum / transactions.length
}

function getTransactionsCount(){
    let creditCount = 0, debitCount = 0
    for (transaction of transactions){
        switch (transaction.type){
            case 'credit':
                creditCount++
                break
            case 'debit':
                debitCount++
                break
        }   
    }
    return `credit: ${creditCount}, debit: ${debitCount}`
}

getHigherTransactionByType("credit") // { type: 'credit', value: 120 }
getHigherTransactionByType("debit") // { type: 'debit', value: 80 }

console.log(getAverageTransactionValue()) // 70

console.log(getTransactionsCount()) // { credit: 2, debit: 2 }