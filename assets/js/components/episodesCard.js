/**
 * Episode Card Component 
 */

export function episodeCard(episode) {
    return `
        <article class="card episode-card">
            <div class="episode-header">
                <h3>${episode.name}</h3>
                <span class="episode-code">${episode.episode}</span>
            </div>

            <div class="card-body">
                <p>
                    <strong>Fecha de emisión:</strong>
                    ${episode.air_date}
                </p>
                <p>
                    <strong>Personajes:</strong>
                    ${episode.characters.length} personajes
                </p>
    
                <div class="characters-section">
                    <h4>Personajes en este episodio:</h4>
                    <p>Total: ${episode.characters.length} personajes</p>
                    <details>
                        <summary>Ver lista de personajes</summary>
                        <ul class="character-list">
                            ${episode.characters.map(url => {
                                const characterId = url.split('/').pop();
                                return `<li>Personaje #${characterId}</li>`;
                            }).join('')}
                        </ul>
                    </details>
                </div>
            </div>
        </article>
    `;
}