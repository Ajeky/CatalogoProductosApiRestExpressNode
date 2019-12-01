'use strict'
const passport = require('passport');
const error_types = require('../controllers/error_types');

let middlewares = {

    asegurarUsuarioLogeado: (req, res, next) => {
        passport.authenticate('jwt', { session : false }, (err, user, info) => {
            if (info) { return next(new error_types.Error401(info.message)); }

            if (err) { return next(err) }

            if (!user) { return next(new error_types.Error403("You are not allowed to access")); }

            req.user = user;
            next();
        })(req, res, next);
    },

    asegurarAdmin: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (info) { return next(new error_types.Error401(info.message))}
            
            if (err) { return next(err) }

            if (user.role != "admin" && user.role != "superAdmin") { return next(new error_types.Error403("You are not allowed to access")); }

            req.user = user;
            next();
        })(req, res, next)
    },

    asegurarSuperAdmin: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (info) { return next(new error_types.Error401(info.message))}
            
            if (err) { return next(err) }

            if (user.role != "superAdmin") { return next(new error_types.Error403("You are not allowed to access")); }

            req.user = user;
            next();
        })(req, res, next)
    }
}