const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

con.connect(function(erro) {
    if(erro) {
        console.log('Ocorreu um erro ao se conectar: ' + erro);
        return;
    };
    console.log("Conexão realizada com sucesso!");
    con.query('use foodapp');
});

module.exports = con;