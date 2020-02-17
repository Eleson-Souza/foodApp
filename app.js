const express = require('express');
const router = require('./routes/routerIndex');
const mustache = require('mustache-express');

// Configurações
const app = express();

// Permite o acesso às requisições POST, que são enviadas internamente.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Torna o conteúdo pertencente a uma pasta, público, ou seja, pode ser acessado de qualquer lugar (sem especificar o nome da pasta).
app.use(express.static(__dirname+'/public'));

// Configura o motor que será utilizado na aplicação (mustache).
app.engine('mustache', mustache(__dirname+'/views/partials', '.mustache'));
app.set('view engine', 'mustache'); // Define o motor de visualização (layout).
app.set('views', __dirname + '/views');

app.use('/foodapp', router);

app.set('port', 1122);
app.listen(app.get('port'), () => {
    console.log('Aplicação rodando normalmente na porta 2222');
});