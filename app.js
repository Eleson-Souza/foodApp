const express = require('express');
const router = require('./routes/routerIndex');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

// Configurações
const app = express();

// Permite o acesso às requisições POST, que são enviadas internamente.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Torna o conteúdo pertencente a uma pasta, público, ou seja, pode ser acessado de qualquer lugar (sem especificar o nome da pasta).
app.use(express.static(__dirname+'/public'));

app.use(cookieParser('1234'));
app.use(session({
    secret: '1234',
    resave: false, // determina se a sessão será reconstruída em caso de uma nova requisição, mesmo que não haja modificação na página.
    saveUninitialized: false // Não salva sessão caso não haja dados. 
}));
app.use(flash());

// Configurando objetos globais
app.use((req, res, next) => {
    res.locals.flashes = req.flash();
    next();
});

app.set('view engine', 'ejs'); // Define o motor de visualização (layout).

app.use('/foodapp', router);

app.set('port', 1122);
app.listen(app.get('port'), () => {
    console.log('Aplicação rodando normalmente na porta 1122');
});