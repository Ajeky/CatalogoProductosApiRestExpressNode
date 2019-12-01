const _ = require('lodash')

categorias = [{
    id: "1",
    nombre: "Componentes",
},
{
    id: "2",
    nombre: "Tarjetas Gráficas",
    categoria_padre_id: "1"
},
{
    id: "3",
    nombre: "Procesadores",
    categoria_padre_id: "1"
},
{
    id: "4",
    nombre: "Sobremesa"
}]

let service = {
    findById: (id) => {
        categoria = _.find(categorias, c => c.id == id);
        if (!categoria.categoria_padre_id) {
            return categoria;
        } else {
            categoriaDto = {
                nombre: categoria.nombre,
                categoriaPadre: this.findById(categoria.categoria_padre_id)
            }
            return categoriaDto;
        }
    }
}

module.exports = service