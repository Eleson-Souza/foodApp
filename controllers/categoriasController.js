const conexao = require('../models/Conexao');
const slugify = require('slugify');

exports.categorias = (req, res) => {
    conexao.query(`select * from categoria order by nome asc`, (erro, categorias) => {
        res.render('categoria/index', {categorias});
    });
};

exports.novaCategoria = (req, res) => {
    res.render('categoria/novaCategoria');
};

exports.novaCategoriaAction = (req, res) => {
    var nome = req.body.nome;
    var slug = slugify(nome);
    conexao.query(`insert into categoria(nome, slug) values
        ('${nome}', '${slug}');`, (erro, result) => {
            if(erro) {
                res.redirect('/foodapp/categoria/nova');
                return;
            }
            
            res.redirect('/foodapp/categorias');
    });
};