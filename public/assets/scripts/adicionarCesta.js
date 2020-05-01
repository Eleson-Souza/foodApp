if(!localStorage.precoTot) {
    localStorage.setItem('precoTot', 0);
}

function adicionarCesta() {

    const divCesta = document.querySelector('.cesta').style;
    const nomeProd = document.getElementById('nome-produto').innerText;
    const descProd = document.getElementById('descricao-produto').innerText;
    const quantProd = document.getElementById('quant').innerText;
    const preco = document.getElementById('preco').innerText;
    const precoTotal = document.getElementById('preco-total');
    const p1 = document.createElement('p');


    divCesta.visibility = 'visible';
    divCesta.width = '350px';

    p1.innerHTML = `
        ${quantProd}x 
        ${nomeProd} 
        <span style="float: right;">R$ ${preco}</span>`;
    document.querySelector('#lista-cesta').appendChild(p1);

    localStorage.precoTot = 
        parseInt(localStorage.precoTot) + parseFloat(preco.replace(',', '.'));
    
    precoTotal.innerHTML = `
        Total 
            <strong>
                <span style="float: right">
                    ${Number(localStorage.precoTot).toFixed(2).replace('.', ',')}
                </span>
            </strong>
    `;
    console.log(localStorage.precoTot);
}

function diminuirPagina() {
    const img = document.querySelector('.produto').style;
    const h1 = document.querySelectorAll('h1');
    const h3 = document.getElementsByTagName('h3')[0].style;
    const btnAdicionar = document.querySelector('.adicionar').style;
    const quantProduto = document.querySelector('.quant_produto').style;
    const quant = document.querySelector('#quant').style;
    const imgMais = document.querySelector('#img_mais').style;
    const imgMenos = document.querySelector('#img_menos').style;
    const containerCompraQuant = document.querySelector('.container_compra-quant').style;
    const container = document.querySelector('.container');

    img.width = '550px';
    h1[0].style.fontSize = '28pt';
    h1[1].style.fontSize = '28pt';
    h3.fontSize = '16pt';
    containerCompraQuant.width = '280px';

    quantProduto.height = '50px';
    imgMais.width = '15px';
    imgMenos.width = '15px';
    quant.fontSize = '12pt';

    btnAdicionar.width = '150px';
    btnAdicionar.height = '50px';
    btnAdicionar.fontSize = '12pt';

 container.style.position = 'absolute';
 container.style.left = '0px';
}