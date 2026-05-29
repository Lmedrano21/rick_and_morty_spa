/**
 * Locations Card Component
 */

export function LocationsCard(location) {
    // Crear un ID único para cada ubicación

    // return `
    //     <article class="card location-card">
    //         <div class="location-header">
    //             <h3>${location.name}</h3>
    //             <span class="location-type">${location.type}</span>
    //         </div>

    //         <div class="card-body">
    //             <p>
    //                 <strong>Dimensión:</strong>
    //                 ${location.dimension}
    //             </p>
    //             <p>
    //                 <strong>Residentes:</strong>
    //                 ${location.residents.length} residentes
    //             </p>
    //         </div>
    //     </article>
    // `;
// Ejemplo de estructura en tu componente de Location
return `
    <article class="card card-location">
        <div class="card-body">
            <h3>${location.name}</h3>
            <p><strong>Type:</strong> ${location.type}</p>
            <p><strong>Dimension:</strong> ${location.dimension}</p>
        </div>
    </article>
`;
    
}