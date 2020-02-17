const conexao = require('../models/Conexao');

exports.home = function(req, res) {
    conexao.query('select * from produto', (erro, result) => {
        if(erro) {
            console.log('Erro: ' + erro);
        }
        res.render('home', { result });
    });
};