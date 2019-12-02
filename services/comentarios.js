const clientesServicio = require('./clientes')
const _ = require('lodash')

const comentarios = [{
        id: "1",
        autor_id: "3",
        cuerpo: "Una trajeta de las mejores del mercado, El hecho que sus ventiladores no funcionen en el escritorio si no estamos dandole carga de trabajo la haces muy polivalente y en juegos es una bestia a 2k mas de 60 fps con rtx activado",
        fecha_publicación: JSON.stringify(new Date(2019, 10, 30))
    },
    {
        id: "2",
        autor_id: "3",
        cuerpo: "Gráfica de alta gama ideal para jugará tope de resolución y refresco del juego No hace excesivo ruido refrigeración Ideal para jugar",
        fecha_publicación: JSON.stringify(new Date(2019, 10, 30))
    },
    {
        id: "3",
        autor_id: "3",
        cuerpo: "Tarjeta gráfica espectacular. Casi casi al nivel de la 2080, por muy poquitos fps. A nivel de refrigeración no supera los 65 grados... una pasada",
        fecha_publicación: JSON.stringify(new Date(2019, 10, 22))
    },
    {
        id: "4",
        autor_id: "2",
        cuerpo: "PC que te servirá para todo, Internet, Ofimática, Desarrollo de aplicaciones, Juegos en Ultra con una resolución a 1080p o 2K,...",
        fecha_publicación: JSON.stringify(new Date(2019, 10, 17))
    },
    {
        id: "5",
        autor_id: "1",
        cuerpo: "Gran ordenador. La instalación de sistema operativo muy sencilla y muchos drivers ya instalados. Muy satisfecho",
        fecha_publicación: JSON.stringify(new Date(2019, 10, 15))
    },
]

let service = {
    findById: (id) => {
        let comentario = _.find(comentarios, c => c.id == id);
        let comentarioDto = {
            id: comentario.id,
            nombre_autor: clientesServicio.findById(comentario.autor_id).nombre_completo,
            cuerpo: comentario.cuerpo,
            fecha_publicación: comentario.fecha_publicación
        }
        return comentarioDto;
    }
}

module.exports = service