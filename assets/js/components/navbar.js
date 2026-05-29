/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar">
            <a href="/" data-link>Home</a>
            <a href="/contacts" data-link>Contactos</a>
            <a href="/episodes" data-link> Episodes</a>
            <a href="#david"> Locations</a>
        </nav>
    `;
}