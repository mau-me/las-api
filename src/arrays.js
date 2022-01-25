const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    return Array.isArray(lista) && lista.length !== 0 ? Math.min(...lista) : undefined
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    return Array.isArray(lista) && lista.length !== 0 ? Math.max(...lista) : undefined
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]

function capitalizarNomes(names) {
    return Array.isArray(names) && names.length !== 0 
    ? names.map(nome => nome[0].toUpperCase() + nome.slice(1).toLowerCase())
    : undefined
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil', 'NULABSSA', 'ALURANU'];
    const descontos = [30, 15]

    return {'Alimentação' : 30, "Infantil" : 15 }[categoria] | undefined
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    return Array.isArray(lista) && lista.length !== 0 
    ? lista.filter( x => x <= precoMaximo )
    : undefined
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    return Array.isArray(lista) && lista.length !== 0 
    ? lista.reduce((a, b) => a + b, 0)
    : undefined
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    return Array.isArray(lista) && lista.length !== 0 
    ? [Math.min(...lista), Math.max(...lista)]
    : undefined
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    return menorValor <= maiorValor && Array.isArray(lista) && lista.length !== 0 
    ? lista.filter( x => x >= menorValor && x <= maiorValor )
    : undefined
}


// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function obterDescontoTotal(categoria, cupom) {
    const desconto = obterDescontoCategoria(categoria)
    return desconto !== undefined
    ? cupom !== 'CUPOM-INVALIDO' && cupom !== 'INVALIDO'? desconto + 10 : desconto
    : 0
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente

function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    let resp = 0

    if (!Array.isArray(precos) 
        || !Array.isArray(categorias) 
        || precos.length === 0
        || categorias.length === 0 ) {

        return undefined
    }

    for (let i = 0; i < categorias.length; i++)  {
        resp += precos[i] - (precos[i] * (obterDescontoTotal(categorias[i], cupom) / 100))
    }
    return  resp
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
   
    return nomeCompleto.split(' ').map(word => {
        return word.length >= 3 
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word
    }).join(' ')
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') => 
// Nome           Valor     Desconto  Imposto Total     
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
// Refrigerante   R$   7,00 R$   0,70         R$   6,30 
// Subtotal                                   R$  24,30 
// Cupom de Desconto: NULABSSA                R$   3,00 
// Total                                      R$  21,30

function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {

    const checarTipoETamanho = arr => arr.every(element => Array.isArray(element) && element.length !== 0)
    const obterDescontoSemAcrescimo = categoria => ( {Alimentação : 30, Infantil : 15 }[categoria] | 0 )

    if (!checarTipoETamanho([listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos])) return undefined

    const imposto = 15
    const subtotais = []
    const descontos = []
    const descontosSemAcrescimo = []
    const valorImposto = listaPrecosProdutos[0] * imposto / 100
    const total = calcularTotalDaCompraComDescontos(listaPrecosProdutos, listaCategoriasProdutos, cupom).toFixed(2)

    let resp = "Nome           Valor     Desconto  Imposto Total     \n"

    // ============================= Cálculos de subtotal e descontos ===============================================
    
    listaCategoriasProdutos.forEach((categoria, index) => {
        const desconto =  listaPrecosProdutos[index] * (obterDescontoTotal(categoria, cupom) / 100 )
        const descontoSemAcrescimo = listaPrecosProdutos[index] * (obterDescontoSemAcrescimo(categoria) / 100)
        const subtotal = listaPrecosProdutos[index] - desconto

        index === 0 
        ? subtotais.push((subtotal + listaPrecosProdutos[0] * (imposto / 100)))
        : subtotais.push(subtotal)

        descontos.push(desconto.toFixed(2))
        descontosSemAcrescimo.push(descontoSemAcrescimo.toFixed(2))
    })
    //=================================================================================================================

    // ============= Encontrando maior palavra para igualar os espaços das demais ===================
    let maiorPalavra = listaNomesProdutos[0]

    for (let i = 1; i < listaNomesProdutos.length; i++ ) {
        if (listaNomesProdutos[i].length > maiorPalavra.length) maiorPalavra = listaNomesProdutos[i]
    }

    maiorPalavra += ' '.repeat(3)
    //===============================================================================================

    for (let i = 0; i < listaNomesProdutos.length; i++) {

        const precoProduto = listaPrecosProdutos[i].toFixed(2)
        const precoTotalProduto = (listaPrecosProdutos[i] - (descontos[i] - descontosSemAcrescimo[i])).toFixed(2)
        const valorComImpostoDebitado = (listaPrecosProdutos[i] - descontos[i] + valorImposto).toFixed(2)
        let nomeAtual = listaNomesProdutos[i]
        
        //=============================== Aplicando espaços à palavra menor ================================
        if (nomeAtual.length < maiorPalavra.length) {
            const lengthDifference = maiorPalavra.length - nomeAtual.length
            
            nomeAtual += ' '.repeat(lengthDifference)
        }
         //=================================================================================================

        i === 0 
        ? resp += `${nomeAtual}R$  ${precoProduto} R$   ${descontos[i]}     ${imposto}% R$  ${valorComImpostoDebitado} \n` 
        : resp += `${nomeAtual}R$   ${precoProduto} R$   ${descontos[i]}         R$   ${precoTotalProduto} \n` 
    }

    const subTotal = subtotais.reduce((a, b) => a + b, 0).toFixed(2)
    resp +=   `Subtotal                                   R$  ${subTotal} \n`

    descontosSemAcrescimo.forEach(desconto => {
        desconto > 0 
        ? resp += `Cupom de Desconto: ${cupom}                R$   ${valorImposto.toFixed(2)} \n`
        : ''
    })
    resp += `Total                                      R$  ${total}`
    return resp.replace(/[.]/g, ',')
}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    capitalizarNomes,
    obterDescontoCategoria,
    obterPrecosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterPrecosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    capitalizarNomeCompleto,
    gerarCupomFiscal
};
