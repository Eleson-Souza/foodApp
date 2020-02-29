exports.formatarPreco = function (consulta) {
    for(var i = 0; i < consulta.length; i++) {
        consulta[i].preco = (consulta[i].preco).toFixed(2).replace('.', ',');
    }
}