let quant = document.getElementById('quant');
let quantInput = document.getElementsByName('quantidade')[0];
let mais = document.getElementById('img_mais');
let menos = document.getElementById('img_menos');
let preco = document.querySelector('#preco');

let valorUnit = parseFloat((preco.innerText).replace(',', '.'));
let numProd = parseInt(quant.innerText);

function aumentar() {
    numProd += 1;
    quant.innerText = numProd;
    quantInput.value = numProd;
    preco.innerText = (valorUnit * numProd).toFixed(2).replace('.', ',');
}

function diminuir() {
    if(numProd > 1) {
        numProd -= 1;
        quant.innerText = numProd;
        quantInput.value = numProd;
        preco.innerText = (valorUnit * numProd).toFixed(2).replace('.', ',');
    }
}