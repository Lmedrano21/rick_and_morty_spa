import { loadHTML } from '../utils/helpers.js';
import { getlocation } from '../services/api.js';
import { LocationsCard } from '../components/LocationsCard.js';

/**
 * Renderiza Home con ubicaciones
 */
export async function renderlocation() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/ubicaciones.html'
    );
    const container = document.getElementById('ubicaciones_container');
    
    const data = await getlocation();
    console.log('Datos recibidos:', data); // Para depurar
    
    // CORRECCIÓN: Iterar sobre el array de ubicaciones
    const locations = data.results || data;
    
    if (Array.isArray(locations)) {
        container.innerHTML = locations
            .map(location => LocationsCard(location))
            .join('');
    } else {
        console.error('No se recibió un array:', locations);
        container.innerHTML = '<p>Error al cargar ubicaciones</p>';
    }
}