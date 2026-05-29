import { loadHTML } from '../utils/helpers.js';
import { getEpisodes } from '../services/api.js';
import { episodeCard } from '../components/episodesCard.js';

/**
 * Renderiza Home con episodios
 */
export async function renderEpisodes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodios.html'
    );
    const container = document.getElementById(
        'episodios_container'  // Puedes cambiar este ID a 'episodes-container' si prefieres
    );
    const episodes = await getEpisodes();
    container.innerHTML = episodes
        .map(episode => episodeCard(episode))
        .join('');
}