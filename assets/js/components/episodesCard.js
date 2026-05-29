


/**
 * Episode Card Component
 */
export function episodeCard() {
    return `
        <article class="card card-episode">
            <!-- Espacio para la imagen o vector de portada del episodio -->
            <div class="episode-image-placeholder"></div>

            <div class="card-body">
                <h3>Odisea contra las Serpientes</h3>
                <p>
                    <strong>Temporada/Episodio:</strong>
                    <span>S04E05</span>
                </p>
                <p>
                    <strong>Trama:</strong>
                    <span>Rick y Morty se enfrentan a serpientes viajeras en el tiempo.</span>
                </p>
                
                <div class="card-buttons">
                    <button class="btn-watch" type="button">Detalles</button>
                </div>
            </div>
        </article>
    `;
}
