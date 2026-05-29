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

export async function getLocations() {
    try {
        const response = await httpClient.get('/location');
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}
