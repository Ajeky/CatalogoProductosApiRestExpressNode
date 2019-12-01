'use strict'

const Servicio = require('../services/clientes')
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');

let controller = {
    register: (req, res, next) => {
        let resultado = Servicio.findUser({email : req.body.email});
        if (resultado != undefined) {
            next(new error_types.InfoError("user already exists"));
        } else {
            let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let inserted = UserService.addUser({
                email: req.body.email,
                nombre_completo: req.body.nombre_completo,
                password: hash,
                role: req.body.role
            })
            res.json(inserted)
        }
   },
   login : (req, res, next) => {
       passport.authenticate("local", {session: false}, (error, user) => {
           if (error || !user) {
            next(new error_types.Error404("Username or password not correct."))
           } else {
            const payload = {
                sub: user.id,
                exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                email: user.email
            };
            const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
            res.json({
                email: user.email,
                token: token
            });
           }
       })(req, res)
   }
}

module.exports = controller;