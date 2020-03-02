const conexao = require('../../../models/Conexao');

function abrirProduto(id) {
    conexao.query(`select * from Produto where id = ${id}`, (erro, result) => {
        if(erro) {
            req.flash('error', 'Houve o seguinte erro: ' + erro);
        }
        
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML = `        
        <strong>TESTE</strong>
        `;
        console.log(result);
    });
}