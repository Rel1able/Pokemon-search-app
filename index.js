const form = document.querySelector("form");
const searchHistory = document.querySelector(".search-history");
const pokemonsInSearchHistory = document.querySelector(".pokemons");
const searchedPokemons = [];


function savePokemonsToLocalStorage() {
    localStorage.setItem("pokemons", JSON.stringify(searchedPokemons));
}
function loadPokemonsFromLocalStorage() {
    const storedPokemons = JSON.parse(localStorage.getItem("pokemons"));
    if (storedPokemons) {
        searchedPokemons.length = 0;
        searchedPokemons.push(...storedPokemons);
    }
}

loadPokemonsFromLocalStorage();

async function fetchPokemonData() {
    try {
        let pokemonName = document.getElementById("pokemonName").value.toLowerCase().trim();
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!request.ok) {
            throw new Error("Failed to fetch the data");
        }
        const data = await request.json();
        console.log(data);

        const pokemonId = data.id;
        const pokName = data.name;
        const pokemonWeight = data.weight;
        const pokemonHeight = data.height;
        const pokemonSprite = data.sprites.front_default;
        const pokemonType = data.types[0]["type"]["name"];
        
        addPokemonsToHistory(pokName);

        setPokemonStats(pokName, pokemonHeight, pokemonWeight, pokemonId, pokemonType);

        const pokPic = document.getElementById("pok-pic");
        pokPic.src = await pokemonSprite;
        pokPic.style.display = "block";
        console.log(pokName, pokemonHeight, pokemonWeight, pokemonId, pokemonType);
        console.log(searchedPokemons);
    }
    catch(error) {
        alert(error); 
    }
    
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
})


function setPokemonStats(name,height, weight, id, type) {
    const pokName = document.getElementById("name");
    pokName.textContent = `Name: ${name}`;

    const pokHeight = document.getElementById("height");
    pokHeight.textContent = `Height: ${convertHeight(height)}m`;

    const pokWeight = document.getElementById("weight");
    pokWeight.textContent = `Weight: ${convertWeight(weight)}kg`;

    const pokId = document.getElementById("pok-id");
    pokId.textContent = `Id: ${id}`;

    const pokType = document.getElementById("type");
    pokType.textContent = `Type: ${type}`;

}

function convertWeight(weight) {
    const newWeight = weight / 10;
    return newWeight;
}

function convertHeight(height) {
    const newHeight = height / 10;
    return newHeight;
}



searchHistory.addEventListener("click", () => {
    pokemonsInSearchHistory.innerHTML = "";
     searchedPokemons.forEach(pokemon => {
        let newPokemon = document.createElement("div")
        newPokemon.textContent = pokemon;
        pokemonsInSearchHistory.appendChild(newPokemon);
    }
        
    );
})


function addPokemonsToHistory(pokemonName) {
    if (!searchedPokemons.includes(pokemonName)) {
        searchedPokemons.push(pokemonName);
        savePokemonsToLocalStorage();
    }
}


