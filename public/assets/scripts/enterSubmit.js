function confirmar(evento) {
    let texto = document.getElementById('campoBusca').value;
    if(evento.keyCode == 13 && texto.length >= 3) {
        window.location = `/foodapp/busca/${texto}`;
    }
}