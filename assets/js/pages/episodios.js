import { loadHTML } from '../utils/helpers.js';


const API_URL = 'https://rickandmortyapi.com';
const container = document.getElementById('episodios-container');

async function cargarEpisodios() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        renderizarEpisodios(datos.results);
    } catch (error) {
        container.innerHTML = '<p>Error al cargar los datos.</p>';
    }
}

function renderizarEpisodios(episodios) {
    container.innerHTML = '';
    episodios.forEach(epi => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${epi.name}</h3>
            <p><strong>Fecha:</strong> ${epi.air_date}</p>
            <p><strong>Código:</strong> ${epi.episode}</p>
        `;
        container.appendChild(tarjeta);
    });
}

cargarEpisodios();

