const servicio = require('../services/productos');

module.exports.reqlogger = (req, res, next) => {
    console.log(req);
    next();
}

module.exports.reslogger = (req, res, next) => {
    console.log(res);
    next();
}

module.exports.loggerDelete = (req, res, next) => {
    console.log('Borrando un elemento');
    next();
}

module.exports.findAll = (req, res) => {
    res.status(200).json(servicio.findAll);
}

module.exports.findById = (req, res) => {
    res.status(200).json(servicio.findById(req.params.id));
}