function capitalizeFirstLetter(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;


function loadPokemonItems(offset, limit) {    
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {    
        const newHTML = pokemons.map((pokemon) =>`
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${capitalizeFirstLetter(pokemon.name)}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${capitalizeFirstLetter(type)}</li>`).join("")}
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="bordaimagem">
                </div>        
            </li>
        `).join('')

        pokemonList.innerHTML += newHTML       
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecorde = offset + limit

    if (qtdRecorde >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItems(offset, limit)
    }

    
})