const Conexao = require('../models/Conexao');

exports.novoCarrinho = (req, res) => {
    var {produto, descricao, quantidade, preco, id} = req.body;
    preco = preco.replace(',', '.');

    Conexao.query(`select * from carrinho where id_produto = ${id}`, (erro, prod) => {
        
        // se o produto já estiver no carrinho, apenas atualiza a quantidade.
        if(prod[0]) {
            
            var quant = prod[0].quantidade + parseInt(quantidade);
            Conexao.query(`update carrinho
                set quantidade = ${quant} where id = ${prod[0].id}`, (erro) => {
                    req.flash('success', 'Produto adicionado no carrinho com sucesso!');
                    res.redirect('/foodapp');
                });

        } else {            
            Conexao.query(`insert into carrinho values
            (default, '${produto}', '${descricao}', ${quantidade}, ${preco}, ${id})`, (erro) => {
                if(erro) {
                    req.flash('error', 'Houve um erro ao inserir no carrinho');
                    console.log(erro);
                    return;
                }

                req.flash('success', 'Produto adicionado no carrinho com sucesso!');
                res.redirect('/foodapp');
            });
        }
    });
};

// Recebe um valor e retorna uma string com o valor convertido em reais. 
function converteMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

exports.abrirCarrinho = (req, res) => {
    Conexao.query(`select * from carrinho`, (erro, carrinho) => {

        var valorTotal = 0;
        carrinho.forEach(item => {
            valorTotal += (item.valor_unitario * item.quantidade);
            item.valor_unitario = converteMoeda(item.valor_unitario);
        });
        
        valorTotal = converteMoeda(valorTotal);
       res.render('produto/carrinho', {carrinho, valorTotal});
       //res.json(carrinho);
    });
};

exports.apagarItem = (req, res) => {
    var id = req.body.id;
    Conexao.query(`delete from carrinho where id = ${id}`, (erro) => {
        if(erro) {
            req.flash('error', 'Ocorreu um erro ao deletar!');
            return;
        }

        res.redirect('/foodapp/carrinho');
    });
};