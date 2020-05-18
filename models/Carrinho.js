const conexao = require('./Conexao');

var sql1 = 'use foodapp';
var sql2 = `create table carrinho (
    id int primary key auto_increment,
    produto varchar(40) not null,
    quantidade int not null,
    valor_unitario decimal(5, 2) not null,
    id_produto int,
    foreign key(id_produto) references produto(id)
)`;

conexao.query(sql1);
conexao.query(sql2, (erro, resultado) => {
    if(erro) {
        console.log('Erro ao criar tabela: ' + erro);
        return;
    }
    console.log('Tabela criada com sucesso!');
});