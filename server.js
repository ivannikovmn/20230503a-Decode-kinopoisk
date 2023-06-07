const express = require('express');
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express();

require('./server/config/db')
require('./server/config/passport')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())
// app.use(express.json())
app.use(express.json())
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7, // 7дней
    resave: false, 
    store: mongooseStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017'
    })
}))
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine" , "ejs")

app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Films/router'))
app.use(require('./server/Rates/router'))
app.use(require('./server/User/router'))

// app.get('/' , (req , res) =>{
//     res.render("index")
// })

// app.get('/login', (req, res) => {
//     res.render("login")
// })

// app.get('/register', (req, res) => {
//     res.render("register")
// })

// app.get('/profile', (req, res) => {
//     res.render("profile")
// })

// app.get('/admin', (req, res) => {
//     res.render("adminProfile")
// })

// app.get('/new', (req, res) => {
//     res.render("newFilm")
// })

// app.get('/edit', (req, res) => {
//     res.render("editFilm")
// })

const PORT = 8000;
app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`);
})