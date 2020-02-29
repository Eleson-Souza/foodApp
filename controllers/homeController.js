const conexao = require('../models/Conexao');
const conversorFormatPreco = require('../public/assets/utils/conversorFormatPreco');

exports.home = function(req, res) {
    conexao.query('select * from produto', (erro, result) => {
        if(erro) {
            console.log('Erro: ' + erro);
        }
        
        conversorFormatPreco.formatarPreco(result);
        res.render('home', { result });
    });
};