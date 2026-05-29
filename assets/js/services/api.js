/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
    try {
        const response = await httpClient.get('/character');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 *  obtener episodes
 */
export async function getEpisodes() {
    try {
        const response = await httpClient.get('/episode');
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }   

}

/**
 * obtener locations
 */

export async function getlocation() {
    try {
        const response = await httpClient.get('/location');
        console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
        return [];
    }
}
