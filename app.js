const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const app = express();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'prueba_session'
};

const sessionStore = new MySQLStore(options);

app.use(session({
    key: 'cookie_usuario',
    secret: '12312323213',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    req.session.usuario = 'Juan Perez';
    req.session.rol = 'Admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

    res.send(`El usuario <strong>${req.session.usuario}</strong> 
    con rol <strong>${req.session.rol}</strong>
    ha visitado esta pagina <strong>${req.session.visitas}</strong>`)
});

app.listen(3000, (req, res) => {
    console.log('SERVER UP');
});
