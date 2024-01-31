const pokemonName = document.getElementById('pokename');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonImg = document.getElementById('pokemon-img');
const form = document.getElementById('form');
const input = document.getElementById('input-search');
const buttonPrev = document.getElementById('btn_prev');
const buttonNext = document.getElementById('btn_next');


let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status == 200) {
        
        const data = await apiResponse.json();
        
        return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '?'

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        //caminho da API para renderizar as imagens//
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '?';
        pokemonImg.style.display = 'none';

    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
})

//BUTTONS ACTVES//

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)};
})

buttonNext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);











