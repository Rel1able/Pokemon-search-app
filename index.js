const form = document.querySelector("form");


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
        

        setPokemonStats(pokName, pokemonHeight, pokemonWeight, pokemonId, pokemonType);

        const pokPic = document.getElementById("pok-pic");
        pokPic.src = await pokemonSprite;
        pokPic.style.display = "block";
        console.log(pokName, pokemonHeight, pokemonWeight, pokemonId, pokemonType);
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