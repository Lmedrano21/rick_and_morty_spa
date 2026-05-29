import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

const CREATED_CHARACTERS_KEY = 'createdCharacters';
const DELETED_CHARACTERS_KEY = 'deletedCharacters';
const EDITED_API_CHARACTERS_KEY = 'editedApiCharacters';
const DEFAULT_CHARACTER_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';

function getFromLocalStorage(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

function saveInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getCreatedCharacters() {
    return getFromLocalStorage(CREATED_CHARACTERS_KEY, []);
}

function saveCreatedCharacters(characters) {
    saveInLocalStorage(CREATED_CHARACTERS_KEY, characters);
}

function getDeletedCharacters() {
    return getFromLocalStorage(DELETED_CHARACTERS_KEY, []);
}

function saveDeletedCharacters(deletedCharacters) {
    saveInLocalStorage(DELETED_CHARACTERS_KEY, deletedCharacters);
}

function getEditedApiCharacters() {
    return getFromLocalStorage(EDITED_API_CHARACTERS_KEY, {});
}

function saveEditedApiCharacters(characters) {
    saveInLocalStorage(EDITED_API_CHARACTERS_KEY, characters);
}

function getDeleteKey(source, id) {
    return `${source}-${id}`;
}

function isDeletedCharacter(source, id) {
    const deletedCharacters = getDeletedCharacters();

    return deletedCharacters.includes(getDeleteKey(source, id))
        || deletedCharacters.includes(id)
        || deletedCharacters.includes(String(id));
}

function getFormData(prefix) {
    return {
        name: document.getElementById(`${prefix}-name`).value,
        status: document.getElementById(`${prefix}-status`).value,
        species: document.getElementById(`${prefix}-species`).value,
        type: document.getElementById(`${prefix}-type`).value,
        gender: document.getElementById(`${prefix}-gender`).value,
        origin: {
            name: document.getElementById(`${prefix}-origin`).value
        },
        location: {
            name: document.getElementById(`${prefix}-location`).value
        },
        image: document.getElementById(`${prefix}-image`).value || DEFAULT_CHARACTER_IMAGE
    };
}

function fillEditForm(character) {
    showEditForm();
    document.getElementById('edit-character-id').value = character.id;
    document.getElementById('edit-character-source').value = character.source;
    document.getElementById('edit-name').value = character.name || '';
    document.getElementById('edit-status').value = character.status || '';
    document.getElementById('edit-species').value = character.species || '';
    document.getElementById('edit-type').value = character.type || '';
    document.getElementById('edit-gender').value = character.gender || '';
    document.getElementById('edit-origin').value = character.origin?.name || '';
    document.getElementById('edit-location').value = character.location?.name || '';
    document.getElementById('edit-image').value = character.image || '';
}

function resetCreateForm() {
    document.getElementById('create-character-form').reset();
}

function resetEditForm() {
    document.getElementById('edit-character-form').reset();
    document.getElementById('edit-character-id').value = '';
    document.getElementById('edit-character-source').value = '';
}

function showCreateForm() {
    hideEditForm();
    document.getElementById('create-character-form').hidden = false;
}

function hideCreateForm() {
    document.getElementById('create-character-form').hidden = true;
}

function showEditForm() {
    hideCreateForm();
    document.getElementById('edit-character-form').hidden = false;
}

function hideEditForm() {
    document.getElementById('edit-character-form').hidden = true;
}

function renderCharacters(container, characters) {
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}

function eliminarPersonaje(source, characterId) {
    const deletedCharacters = getDeletedCharacters();
    const deleteKey = getDeleteKey(source, characterId);

    if (!deletedCharacters.includes(deleteKey)) {
        deletedCharacters.push(deleteKey);
        saveDeletedCharacters(deletedCharacters);
    }
}

function buildApiCharacters(characters) {
    const editedCharacters = getEditedApiCharacters();

    return characters
        .map(character => ({
            ...character,
            ...editedCharacters[character.id],
            source: 'api'
        }))
        .filter(character => !isDeletedCharacter('api', character.id));
}

function buildCreatedCharacters() {
    return getCreatedCharacters()
        .map(character => ({
            ...character,
            source: 'created'
        }))
        .filter(character => !isDeletedCharacter('created', character.id));
}

function renderAllCharacters(apiContainer, createdContainer, apiCharacters) {
    renderCharacters(apiContainer, buildApiCharacters(apiCharacters));
    renderCharacters(createdContainer, buildCreatedCharacters());
}

function findCharacter(apiCharacters, source, characterId) {
    if (source === 'api') {
        return buildApiCharacters(apiCharacters).find(
            character => String(character.id) === String(characterId)
        );
    }

    return buildCreatedCharacters().find(
        character => String(character.id) === String(characterId)
    );
}

function addCharacterEvents(apiContainer, createdContainer, apiCharacters) {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const character = findCharacter(
                apiCharacters,
                button.dataset.source,
                button.dataset.id
            );

            if (character) {
                fillEditForm(character);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const confirmDelete = confirm('¿Estás seguro de eliminar este personaje?');

            if (!confirmDelete) {
                return;
            }

            eliminarPersonaje(button.dataset.source, button.dataset.id);
            renderAllCharacters(apiContainer, createdContainer, apiCharacters);
            addCharacterEvents(apiContainer, createdContainer, apiCharacters);
            alert('Personaje eliminado con éxito');
        });
    });
}

function createCharacter(apiContainer, createdContainer, apiCharacters) {
    const newCharacter = {
        id: Date.now(),
        ...getFormData('create')
    };

    saveCreatedCharacters([
        ...getCreatedCharacters(),
        newCharacter
    ]);
    resetCreateForm();
    hideCreateForm();
    renderAllCharacters(apiContainer, createdContainer, apiCharacters);
    addCharacterEvents(apiContainer, createdContainer, apiCharacters);
    alert('Personaje creado con éxito');
}

function updateCharacter(apiContainer, createdContainer, apiCharacters) {
    const characterId = document.getElementById('edit-character-id').value;
    const characterSource = document.getElementById('edit-character-source').value;
    const formData = getFormData('edit');

    if (characterSource === 'api') {
        const editedCharacters = getEditedApiCharacters();
        editedCharacters[characterId] = formData;
        saveEditedApiCharacters(editedCharacters);
    } else {
        const createdCharacters = getCreatedCharacters().map(character => {
            if (String(character.id) === String(characterId)) {
                return {
                    ...character,
                    ...formData
                };
            }

            return character;
        });
        saveCreatedCharacters(createdCharacters);
    }

    resetEditForm();
    hideEditForm();
    renderAllCharacters(apiContainer, createdContainer, apiCharacters);
    addCharacterEvents(apiContainer, createdContainer, apiCharacters);
    alert('Personaje actualizado con éxito');
}

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const apiContainer = document.getElementById(
        'characters-container'
    );
    const createdContainer = document.getElementById(
        'created-characters-container'
    );
    const createForm = document.getElementById('create-character-form');
    const editForm = document.getElementById('edit-character-form');
    const openCreateForm = document.getElementById('open-create-form');
    const cancelCreate = document.getElementById('cancel-create');
    const cancelEdit = document.getElementById('cancel-edit');
    const apiCharacters = await getCharacters();

    renderAllCharacters(apiContainer, createdContainer, apiCharacters);
    addCharacterEvents(apiContainer, createdContainer, apiCharacters);

    createForm.addEventListener('submit', event => {
        event.preventDefault();
        createCharacter(apiContainer, createdContainer, apiCharacters);
    });

    editForm.addEventListener('submit', event => {
        event.preventDefault();
        updateCharacter(apiContainer, createdContainer, apiCharacters);
    });

    openCreateForm.addEventListener('click', () => {
        resetCreateForm();
        showCreateForm();
    });

    cancelCreate.addEventListener('click', () => {
        resetCreateForm();
        hideCreateForm();
    });

    cancelEdit.addEventListener('click', () => {
        resetEditForm();
        hideEditForm();
    });
}
