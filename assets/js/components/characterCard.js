/**
 * Character Card Component
 */

export function characterCard(character) {
    // Crear un ID único para cada personaje
    const popupId = `popup-${character.id || Math.random().toString(36).substr(2, 9)}`;

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
                
                <button popovertarget="${popupId}">Editar</button>

                
                <div id="${popupId}" popover>
                
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
                    
                </div>
        
                <button popovertarget="${popupId}" popovertargetaction="hide">Cerrar</button>
                </div>

                <button type="submit">Eliminar</button>
            </div>
        </article>
    `;
}