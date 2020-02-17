const conexao = require('../models/Conexao');

exports.cadastro = (req, res) => {
    res.render('cadastro');
};

exports.cadastroAction = (req, res) => {
    var sql = `insert into produto (nome, descricao, preco, imagem) values ('${req.body.nome}', '${req.body.descricao}', ${req.body.preco}, '${req.body.imagem}')`;
    conexao.query(sql, (erro, result) => {
        if(erro) {
            console.log('Erro ao inserir: ' + erro);
            return;
        }
        console.log('Registro inserido com sucesso!');

        res.redirect('/foodapp');
    });
};

exports.editar = (req, res) => {
    conexao.query(`select * from produto where id = ${req.params.id}`, (erro, result) => {
        if(erro) {
            console.log('Erro: ' + erro);
            return;
        }
        res.render('edicao', { result });
    });
};

exports.editarAction = (req, res) => {
    let sql;
    if(req.body.imagem) {
        sql = `update produto set nome = '${req.body.nome}', descricao = '${req.body.descricao}', preco = ${req.body.preco}, imagem = '${req.body.imagem}' where id = ${req.params.id}`;
    } else {
        sql = `update produto set nome = '${req.body.nome}', descricao = '${req.body.descricao}', preco = ${req.body.preco} where id = ${req.params.id}`
    }
    
    conexao.query(sql, (erro, result) => {
        if(erro) {
            console.log('Erro ao atualizar: ' + erro);
            return;
        }
        res.redirect('/foodapp');
    });
};

exports.apagar = (req, res) => {
    conexao.query(`delete from produto where id = ${req.params.id}`);
    res.redirect('/foodapp');
};