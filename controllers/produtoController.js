const conexao = require('../models/Conexao');
const conversorFormatPreco = require('../public/assets/utils/conversorFormatPreco');

exports.cadastro = (req, res) => {
    res.render('cadastro');
};

exports.cadastroAction = (req, res) => {
    // troca vírgula por ponto, para ser inserido no banco.
    const p = req.body.preco;
    let preco = p.replace(',', '.');

    var sql = `insert into produto (nome, descricao, tipo_produto, preco, imagem) values ('${req.body.nome}', '${req.body.descricao}', '${req.body.tipo_produto}', ${preco}, '${req.body.imagem}')`;
    conexao.query(sql, (erro, result) => {
        if(erro) {
            req.flash('error', 'Ocorreu um erro ao cadastrar produto: ' + erro);
            return;
        }

        req.flash('success', 'Cadastro realizado com sucesso!');
        res.redirect('/foodapp');
    });
};

exports.editar = (req, res) => {
    conexao.query(`select * from produto where id = ${req.params.id}`, (erro, result) => {
        if(erro) {
            console.log('Erro: ' + erro);
            return;
        }

        result[0].preco = (result[0].preco).toFixed(2).replace('.', ',');
        res.render('edicao', { result: result[0] });
    });
};

exports.editarAction = (req, res) => {
    const p = req.body.preco;
    let preco = p.replace('.', '').replace(',', '.');
    let sql;
    // Se existir uma imagem para ser inserida, insere normalmente. Caso contrário não insere.
    if(req.body.imagem) {
        sql = `update produto set nome = '${req.body.nome}', descricao = '${req.body.descricao}', tipo_produto = '${req.body.tipo_produto}', preco = ${req.body.preco}, imagem = '${req.body.imagem}' where id = ${req.params.id}`;
    } else {
        sql = `update produto set nome = '${req.body.nome}', descricao = '${req.body.descricao}', tipo_produto = '${req.body.tipo_produto}', preco = ${preco} where id = ${req.params.id}`
    }
    
    conexao.query(sql, (erro, result) => {
        if(erro) {
            req.flash('error', 'Houve um erro ao atualizar o produto: ' + erro);
            return;
        }

        req.flash('success', 'Produto atualizado com sucesso!');        
        res.redirect('/foodapp');
    });
};

exports.apagar = (req, res) => {
    conexao.query(`delete from produto where id = ${req.params.id}`, (erro) => {
        if(erro) {
            req.flash('error', 'Houve um erro ao excluir o produto: ' + erro);
            return;
        }

        req.flash('error', 'Produto excluido com sucesso!');
        res.redirect('/foodapp');
    });
};

exports.buscarCategoria = (req, res) => {
    conexao.query(`select * from Produto where tipo_produto = '${req.params.nomeCategoria}'`, (erro, result) => {
        if(erro) {
            req.flash('error', 'Houve um erro ao realizar busca: ' + erro);
            return;
        }

        conversorFormatPreco.formatarPreco(result);
        res.render('home', { result });
    });
};

exports.buscarPorTexto = (req, res) => {
    conexao.query(`select * from Produto where nome like '%${req.params.texto}%' or descricao like '%${req.params.texto}%'`, (erro, result) => {
        if(erro) {
            req.flash('error', `Houve um erro ao realizar a busca: ${erro}`);
            return;
        }
        
        let texto = req.params.texto;
        conversorFormatPreco.formatarPreco(result);
        res.render('home', { result, texto });
    });
};

exports.abrirProduto = (req, res) => {
    let id = req.params.id;
    conexao.query(`select * from Produto where id = ${id}`, (erro, result) => {
        if(erro) {
            req.flash('error', 'Houve um erro ao abrir o produto, tente novamente!');
            return;
        }

        conversorFormatPreco.formatarPreco(result);
        res.render('openDelivery', { result: result[0] });
    });
};