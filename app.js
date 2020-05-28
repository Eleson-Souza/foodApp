const express = require('express');
const router = require('./routes/routerIndex');
const mustache = require('mustache-express');
const session = require('express-session');
const flash = require('connect-flash');
const paypal = require('paypal-rest-sdk');

// Configurações
const app = express();

app.use(session({
    secret: '1234', cookie: {maxAge: 300000000},
    saveUninitialized: true, // Não salva sessão caso não haja dados. 
    resave: true // determina se a sessão será reconstruída em caso de uma nova requisição, mesmo que não haja modificação na página.
}));
app.use(flash());

// Permite o acesso às requisições POST, que são enviadas internamente.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Torna o conteúdo pertencente a uma pasta, público, ou seja, pode ser acessado de qualquer lugar (sem especificar o nome da pasta).
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs'); // Define o motor de visualização (layout).

// configuração do Paypal.
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcHaEkG0CzNxjchGN_6kqrPVWA75ZsMd-SCQVEgX4ZG59KVMoLCPzZ-1b40XX6M79L0wjyK62-xQakpP',
    'client_secret': 'EPL79_fSsvk6OmJfkRR4VtAqseegziw13bIJQfFA0nhWY13amvs8ENXcIq3xDjXEcLAcSbReknk2iMdF'
});

app.use('/foodapp', router);

app.set('port', 1122);
app.listen(app.get('port'), () => {
    console.log('Aplicação rodando normalmente na porta 1122');
});