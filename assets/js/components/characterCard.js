/**
 * Character Card Component
 */

export function characterCard(character) {
    const source = character.source || 'api';
    const origin = character.origin?.name || character.origin || 'Desconocido';
    const location = character.location?.name || character.location || 'Desconocida';

    return `
        <article class="card">
            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Status:</strong>
                    ${character.status}
                </p>
                <p>
                    <strong>Species:</strong>
                    ${character.species}
                </p>
                <p>
                    <strong>Gender:</strong>
                    ${character.gender}
                </p>
                <p>
                    <strong>Origin:</strong>
                    ${origin}
                </p>
                <p>
                    <strong>Location:</strong>
                    ${location}
                </p>
                
                <button
                    type="button"
                    class="edit-btn"
                    data-id="${character.id}"
                    data-source="${source}"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="delete-btn"
                    data-id="${character.id}"
                    data-source="${source}"
                >
                    Eliminar
                </button>
            </div>
        </article>
    `;
}
