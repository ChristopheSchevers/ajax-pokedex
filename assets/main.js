// Variables to store HTML elements
const info = document.getElementById("pokeInfo");
const pokeImg = document.getElementById("pokeImg");
const prevPokemon = document.getElementById("prevPokemon");

// Listener to fire function on button click
document.getElementById("button").addEventListener("click", loadPokemon);

// Function to get API of input pokemon
function loadPokemon() {
    // Fetch search input
    let pokemon = document.getElementById("search").value;
    
    // Declare variable for XML Http Request
    const xhr = new XMLHttpRequest();
    
    // Open GET request for search input in API pokemon folder
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon, true);
    
    xhr.onload = function() {
        // If request is successful
        if (this.status == 200) {
            let pokeFile = JSON.parse(this.response);

            let url = pokeFile.species.url;
            
            // Show image and set source url
            pokeImg.removeAttribute("hidden");
            pokeImg.setAttribute("src", pokeFile.sprites.front_default);
            
            // Output for info screen
            let output = `<ul>
            <li>Id: ${pokeFile.id}</li>
            <li>Moves:
            <ul>
            ${moveGen()}
            </ul>
            </li>`;
            
            // Function to build up moves list
            function moveGen() {
                if (pokeFile.moves.length <= 4) {
                    for (i = 0; i < pokeFile.moves.length; i++) {
                        return `<li>${pokeFile.moves[i].move.name}</li>`;
                    }
                } else {
                    return `<li>${pokeFile.moves[0].move.name}</li>
                    <li>${pokeFile.moves[1].move.name}</li>
                    <li>${pokeFile.moves[2].move.name}</li>
                    <li>${pokeFile.moves[3].move.name}</li>`;
                }
            }

            // Print output to info screen
            info.innerHTML = output;
            
            loadPrevPokemon(url);

        // If search was not successful, print message to info screen and clear other screens
        } else if (this.state == null) {
            info.innerHTML = "Could not find pokémon";
            pokeImg.hidden = true;
            prevPokemon.innerHTML = "";
        }
    }
    
    xhr.send();
}

// Function to retrieve previous pokemon information
function loadPrevPokemon(x) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", x, true);

    xhr.onload = function() {
        if (this.status == 200) {
            let pokEvol = JSON.parse(this.response);
            
            if (pokEvol.evolves_from_species == null) {
                prevPokemon.innerHTML = `No previous form`;
            } else {
                let pokName = pokEvol.evolves_from_species.name;
                prevPokemon.innerHTML = `Previous form:<br>${pokName}`;
                loadPrevPokePicture(pokName);
            }
        }
    }

    xhr.send();
}

// Function to retrieve previous pokemon image
function loadPrevPokePicture(y) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + y, true);

    xhr.onload = function() {
        if (this.status == 200) {
            let pokePic = JSON.parse(this.response);
            console.log(pokePic.sprites.front_default);

            let img = document.createElement("img");
            img.setAttribute("src", pokePic.sprites.front_default);
            prevPokemon.appendChild(img);
        }
    }

    xhr.send();
}