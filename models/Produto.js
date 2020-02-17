const conexao = require('./Conexao');

var sql1 = 'use foodapp';
var sql2 = "create table if not exists Produto (id int auto_increment, nome varchar(50) not null, descricao text, preco decimal(6,2) not null, imagem varchar(50), primary key(id))";

conexao.query(sql1);
conexao.query(sql2, (erro, resultado) => {
    if(erro) {
        console.log('Erro ao criar tabela: ' + erro);
        return;
    }
    console.log('Tabela criada com sucesso!');
});