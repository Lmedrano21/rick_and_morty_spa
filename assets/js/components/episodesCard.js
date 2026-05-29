/**
 * Episode Card Component (Solo lectura)
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
                    <details>
                        <p>
                            <strong>Fecha de emisión:</strong>
                            <span>10 de mayo de 2020</span>
                        </p>
                        <p>
                            <strong>Duración:</strong>
                            <span>22 minutos</span>
                        </p>    
                        <p>
                            <strong>Personajes destacados:</strong>
                            <span>Rick, Morty, Snuffles</span>
                        </p>
                    </details>
                </div>
            </div>
        </article>
    `;
}