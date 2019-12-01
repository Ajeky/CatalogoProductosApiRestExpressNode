/**
 * .env:
 * JWT_SECRET=esteeselsecretomassecretodetodoslossecretos
 * BCRYPT_ROUNDS=12
 * JWT_LIFETIME=86400
 * JWT_ALGORITHM=HS256
 */

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const users_routes = require('./routes/users');
const UserService = require('./services/clientes')
const productos_routes = 

/* Configuración de Passport */
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, (email, password, done) => {
    let data = UserService.findUser({ email: email });
    if (data === undefined) return done(null, false);
    else if (!bcrypt.compareSync(password, data.password)) {
        return done(null, false);
    }
    return done(null, data); //login ok
}));
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("Ejecutando *callback verify* de estrategia jwt");
    let data = UserService.findById(jwt_payload.sub);
    if (data === null)
        return done(null, false);
    else
        return done(null, data);
}));


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/', users_routes)
app.use('/api/v1/products/', productos_routes)

module.exports = app
