const _ = require('lodash')
const bcrypt = require('bcryptjs')

clientes = [
    {
        id: "1",
        email: "alvaro@alvaro.com",
        nombre_completo: "Alvaro Marquez Mata",
        password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS)),
        role: "admin"
    },
    {
        id: "2",
        email: "kelpie@kelpie.com",
        nombre_completo: "Ana Arana Roncero",
        password: bcrypt.hashSync("si", parseInt(process.env.BCRYPT_ROUNDS)),
        role: "superAdmin"
    },
    {
        id: "3",
        email: "paco@paco.com",
        nombre_completo: "Paco Paco Paco",
        password: bcrypt.hashSync("paco", parseInt(process.env.BCRYPT_ROUNDS)),
        role: "paco"
    }
]

let service = {
    findUser: (cliente) => {
        return _.find(clientes, c => c.email == cliente.email);
    },
    findById: (id) => {
        return _.find(clientes, c => c.id == id);
    },
    addUser: (cliente) => {
        clientes.push({
            id: clientes.length,
            email: cliente.email,
            nombre_completo: cliente.nombre_completo,
            password: cliente.password,
            role: cliente.role
        });
    }
}

module.exports = service