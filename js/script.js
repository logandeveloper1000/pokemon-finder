async function searchPokemon() {
    const input = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const container = document.getElementById('pokemon-container');

    container.innerHTML = '';

    if (!input) {
        container.innerHTML = '<p class="error">Please enter a Pokémon name or ID.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const data = await response.json();
        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const imageUrl = data.sprites.front_default;
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

        container.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h2>${name}</h2>
            <p><strong>Type:</strong> ${types}</p>
        `;
    } catch (error) {
        container.innerHTML = `<p class="error">Pokémon not found. Please try again.</p>`;
    }
}
