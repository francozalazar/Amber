const btnlupa = document.querySelector('.lupa')
const contenedorInfoCarrito = document.querySelector('.estilo-buscador')

btnlupa.addEventListener('click', () => {
    contenedorInfoCarrito.classList.toggle('toggle')
})