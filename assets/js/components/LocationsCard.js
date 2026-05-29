/**
 * Locations Card Component
 */

export function LocationsCard(location) {

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